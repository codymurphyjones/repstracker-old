function(instance, properties, context) {
  const allowDebugging = properties.LoggingLevel === "true" ? true : properties.LoggingLevel;
  let investorTypeObject = properties.optiondata;
  function logOut(...str) {
    if (allowDebugging) {
      if (str.length) {
        const tag = typeof str[0] === 'string' ? str[0] : null;
        const res = tag ? str.slice(1) : str;
        if (tag && (allowDebugging === true || tag.toLowerCase().startsWith(allowDebugging.toLowerCase()))) {
          console.log(`[${tag}]`, ...res);
        }
      } else {
        console.log(...str);
      }
    }
  }

  /*function getOptions(optionObject) {
    let optionLength = optionObject.length();
    let optionsList = optionObject.get(0, optionLength);
    logOut("DYNAMIC", optionsList);

    for (const item of optionsList) {
      const properties = item.listProperties();

      logOut("DYNAMIC", properties)
      let createdObj = {};
      for (const prop of properties) {
        logOut("DYNAMIC", prop)
        let val = item.get(prop);
        if (val && val.get) {
          logOut("DYNAMIC", val.listProperties);
          val = val.get('display')
        }
        createdObj[prop] = val;
      }
      logOut("DYNAMIC", createdObj);
    }
  }*/

  /*
  function setDynamicData(dataSet, bubbleObject, key) {
    console.log("DYNAMIC DATACHECK", bubbleObject);
    
    if (!bubbleObject) {
      console.log("INVALID DATA", bubbleObject);
    } else {
      dataSet.dynamicData[key] = getOptions(bubbleObject) || [];
    }
  }

  setDynamicData(instance.data, investorTypeObject, "investorType");

  console.log(instance.data.dynamicData);*/

  function renameFile(name, myFile) {
    let sep = properties.FileLabelSeperator;
    let suffix =
      properties.fileNameSuffix === "DateTime"
        ? Date.now()
        : properties.fileNameSuffix;
    let root = properties.useOriginalFilename ? name : properties.fileNameRoot;
    let sort = properties.fileSortLabel;
    let ext = properties.fileNameExtension;
    const newFileName = `${sort}${sep}${root}${sep}${suffix}${ext}`;
    const myRenamedFile = new File([myFile], newFileName);
    return myRenamedFile;
  }

  function pushToServer(url) {
    if (url && url.length > 5) {
      instance.publishState("file_url", url);

      instance.triggerEvent("filereadyforprocessing");
    }
  }

  function generateHeaderMappingResult(headers, mappingTarget) {
    const headersLow = headers.map((item) => item.toLowerCase());
    const mapTargetLow = mappingTarget.map((item) => item.toLowerCase());
    return {
      headers: headers.map((item) => ({
        isMatch: mapTargetLow.indexOf(item.toLowerCase()) > -1,
        name: item,
      })),
      maps: mappingTarget.map((item) => ({
        isMatch: headersLow.indexOf(item.toLowerCase()) > -1,
        name: item,
        matchIndex: headersLow.indexOf(item.toLowerCase()),
      })),
      match: compareArrays(headers, mappingTarget),
    };
  }

  function validateCSVData(csv_rows, headers) {
    instance.data.publishIsReadyForValidation();
  }

  function validateRequiredHeaders(headers, csv_text) {
    let outVal = true;
    let columnErrors = [];
    let lowerHeaders = headers.map(item => item.toLowerCase());
    if (!lowerHeaders.includes("date")) {
      logOut("UPDATE", "Date is a required column");
      columnErrors.push("Date is a required column");
      outVal = false;
    }

    if (!lowerHeaders.includes("hours")) {
      logOut("UPDATE", "Hours is a required column");
      columnErrors.push("Hours is a required column");
      outVal = false;
    }

    if (!lowerHeaders.includes("minutes")) {
      logOut("UPDATE", "Minutes is a required column");
      columnErrors.push("Minutes is a required column");
      outVal = false;
    }

    if (!lowerHeaders.includes("property")) {
      logOut("UPDATE", "Property is a required column");
      columnErrors.push("Property is a required column");
      outVal = false;
    }

    if (!lowerHeaders.includes("team member") && !lowerHeaders.includes("team")) {
      logOut("UPDATE", "Team Member is a required column");
      columnErrors.push("Team Member is a required column");
      outVal = false;
    }

    if (!lowerHeaders.includes("hours")) {
      logOut("UPDATE", "Hours is a required column");
      columnErrors.push("Hours is a required column");
      outVal = false;
    }

    if (lowerHeaders.includes("activity") && (lowerHeaders.includes("activity group") || lowerHeaders.includes("group"))) {
      logOut("UPDATE", `Import system does not support \`${headers[lowerHeaders.indexOf("activity")]}\` and \`${headers[lowerHeaders.indexOf("activity") > -1 ? lowerHeaders.indexOf("activity group") : lowerHeaders.indexOf("group")]}\` columns`);
      columnErrors.push(`Import system does not support \`${headers[lowerHeaders.indexOf("activity")]}\` and \`${headers[lowerHeaders.indexOf("activity") > -1 ? lowerHeaders.indexOf("activity group") : lowerHeaders.indexOf("group")]}\` columns at the same time, remove one to continue`);
      outVal = false;
    }

    const csvDataSplit = csv_text.replaceAll("\r\n", "\n").split("\n");
    if (csvDataSplit.length > 1) {
      const columns = csvDataSplit[0].split(',').filter((item) =>
        item !== ""
      );
      logOut("UPDATE", 'columnsSplit', columns)

      const uniqueColumns = columns.filter((item) =>
        item !== ""
      ).filter((item, index, arr) =>
        arr.indexOf(item) === index
      );
      /*const emptyColumnCheck = lowerHeaders.indexOf("");
      const emptyCheckHeaders = lowerHeaders.slice(emptyColumnCheck, lowerHeaders.length).indexOf("")*/
      if (columns.length !== uniqueColumns.length) {
        logOut("UPDATE", "Duplicate column names are not allowed")
        columnErrors.push("Duplicate column names are not allowed");
        outVal = false;
      }


      logOut("UPDATE", csv_text.replaceAll("\r\n", "\n").split("\n"))
    } else {
      logOut("UPDATE", "Empty files cannot be processed or imported")
      columnErrors.push("Empty files cannot be processed or imported");
      outVal = false;
    }

    lowerHeaders.pop();
    if (lowerHeaders.includes("")) {
      columnErrors.push("Empty Column Names are not supported");
      outVal = false;
  }

    return {
      result: outVal,
      errors: columnErrors,
    };
  }


  async function pushFileDetails(csv_text) {
    let results = await instance.data.parseCSV(csv_text);
    let headerArray = results.data[0], // This gets the column headers from the CSV and sets them as an array of texts
      csv_rows = results.data.length - 1;
    const headerObj = generateHeaderMappingResult(
      headerArray,
      instance.data.mappingTarget
    );

    logOut("UPDATE", "headers", headerArray);
    instance.publishState("mapped_fields", headerArray);

    instance.publishState(
      "mapped_fields",
      headerObj.headers.filter((item) => item.isMatch).map((item) => item.name)
    );
    instance.publishState(
      "unmapped_fields",
      headerObj.maps.filter((item) => !item.isMatch).map((item) => item.name)
    );

    instance.data.publishHeaders(headerArray);
    instance.data.fileHeaders = headerArray;
    instance.data.publishCSVRows(csv_rows);
    instance.data.csv_text = csv_text;
    const headerValidationResult = validateRequiredHeaders(headerArray, csv_text);

    if (headerValidationResult.result) {
      logOut("UPDATE", "Move on to field validation");
      instance.publishState("headersValid", true);
      validateCSVData(results.data.slice(1, csv_rows), headerArray);
    } else {
      logOut("UPDATE", "headers_mismatch");
      instance.publishState("headersValid", false);
      logOut("UPDATE", headerValidationResult.errors);
      instance.publishState("columnErrors", headerValidationResult.errors);
      instance.triggerEvent("headers_mismatch");
    }
  }

  function renderuploadzone(instance, properties, context) {
    let uploadId = properties.uploadzoneid;
    if (uploadId != null && uploadId !== "") {
      uploadId = "uploadzone-" + properties.uploadzoneid;
      instance.data.id = uploadId;
    }

    instance.canvas.html(`<form
                  class="dropzone dz-dynamic point"
                  id="${instance.data.id}"></form>`);

    var parentQuery = document.querySelector("#" + instance.data.id);
    var parent = parentQuery.parentElement;

    parent.style.backgroundColor = "green";
    parent.className = parent.className + " inherit-radius absolute-container";
    parent.parentElement.children.forEach((item) => {
      item.style.pointerEvents = "none";
    });

    function createReplaceObject(objSet, keyProp, valProp = "") {
      let objProps = objSet.listProperties();
      //logOut("UPDATE",objProps);
      let totalProps = objProps.length;
      let resObj = {};

      for (let i = 0; i < totalProps; i++) {
        let propName = objProps[i];
        resObj[propName] = objSet.get(propName);
      }

      /*logOut("UPDATE","res", resObj);
      logOut("UPDATE","keyVal", resObj[keyProp]);
      logOut("UPDATE","valProp", resObj[valProp]);*/

      let outObj = {};
      outObj[resObj[keyProp]] = resObj["_id"];
      if (valProp !== "") outObj[resObj[valProp]] = resObj["_id"];
      //logOut("UPDATE","the rl out", outObj);

      return outObj;
    }

    //logOut("UPDATE","init value", properties.Property);
    let propertyObjList = properties.Property;
    let teamObjList = properties.TeamMember;
    //logOut("UPDATE","test1", propertyObjList);
    //logOut("UPDATE",properties);

    function createLookupCollection(objSet, keyProp, valProp = "") {
      if(!objSet) return {};
      logOut("UPDATE",objSet);
      let collectionLen = objSet && objSet.length && objSet.length() || 0;
      logOut("UPDATE",collectionLen);
      let collectionObjs = collectionLen > 0 && objSet.get && objSet.get(0, collectionLen) || [];
      logOut("UPDATE","collection", collectionObjs);
      let outObject = {};
      collectionObjs.map(
        (item) =>
        (outObject = {
          ...outObject,
          ...createReplaceObject(item, keyProp, valProp),
        })
      );
      logOut("UPDATE","final", outObject);
      return outObject;
    }

    //logOut("UPDATE","Collections");
    let addressFieldName = "address__text__text"; //"address__text__text"
    let addressNickname = "nickname_text";

    const propertyLookup = propertyObjList ? createLookupCollection(
      propertyObjList,
      addressNickname,
      addressFieldName
    ) : {};
    //logOut("UPDATE","property lookup", propertyLookup);
    let teamName = "name_text"; //"address__text__text"
    const teamLookup = createLookupCollection(teamObjList, teamName);
    //logOut("UPDATE","teamLookup", teamLookup);

    let myDropzone = new Dropzone(`#${instance.data.id}`, {
      //previewsContainer: "#" + uploadId + "_previews",
      //previewTemplate: previewTemplate,
      createImageThumbnails: false,
      uploadMultiple: false,
      autoProcessQueue: false,
      maxFiles: 1,
      accept: async function (file, done) {
        const fileSize = formatFileSize(file.size);
        const name = file.name;
        instance.publishState("file_size", fileSize);
        instance.publishState("file_name", name);
        done();
        var reader = new FileReader();
        reader.addEventListener("loadend", async function (event) {
          instance.publishState("file_text", event.target.result);
          pushFileDetails(event.target.result);
        });
        reader.readAsText(file);
        instance.triggerEvent("fileaccept");
        instance.publishState("fileisactive", true);

        //myDropzone.processQueue();
      },
      renameFile: function (file) {
        let newName = new Date().getTime() + "_" + file.name;
        return newName;
      },
      removeFile: function (file) {
        instance.triggerEvent("filedetailschanged");
        instance.publishState("fileisactive", false);
      },
      url: function (_, dataBlocks) {
        logOut("UPDATE", "I AM HERE FOR THE URL");
        if (_.length == 0) return;

        logOut("UPDATE",
          "Blob",
          renameFile(
            "test_csv",
            new Blob([instance.data.csv_content], { type: "text/csv" })
          )
        );

        instance.uploadFile(renameFile("test", _[0]), (err, url) => {
          if (!err) {
            // Assuming uploadFile callback returns the URL on success
            logOut("UPDATE", "Upload URL:", url);
            pushToServer(url);
            // You can use the URL here or perform additional actions
          } else {
            logOut("UPDATE","Error:", err);
          }
        }, 
        context.currentUser
      );
        // Return a placeholder URL while waiting for the callback
        return "/";
      },
      init: function () {
        this.on("addedfile", function () {
          if (this.files[1] != null) {
            this.removeFile(this.files[0]);
          }
        });
        this.on("renameFile", function (file) {
          let newName = new Date().getTime() + "_" + file.name;
          return "test";
        });
        this.on("removeFile", function (file) {
          instance.triggerEvent("filedetailschanged");
        });
      },
    });
    instance.data.dropzone = myDropzone;
    instance.data.removeFile = (file) => myDropzone.removeFile(file);
    parent = document.querySelector("#" + instance.data.id).parentElement;
    parent.style.borderRadius = "inherit";
  }


  if (!instance.data.initialized) {
    renderuploadzone(instance, properties, context);

    instance.data.initialized = true;
    instance.data.updateMappings = async function (instance, properties) {
      const len = properties.headermapping?.length() || 0;
      const headerMappings = properties.headermapping?.get(0, len) || [
        "testing",
      ];
      if (
        instance.data.csv_content &&
        headerMappings != instance.data.prevHeaderMapping
      ) {
        let res = await Papa.unparse([
          instance.data.fileHeaders,
          ...instance.data.csv_content,
        ]);
        //instance.data.processCSV(res, instance.data.dropzone, headerMappings);
        instance.data.prevHeaderMapping = headerMappings;
      }
    };
  }
  if (properties.headermapping) {
    const len = properties.headermapping?.length() || 0;
    instance.data.mappingTarget = properties.headermapping?.get(0, len) || [
      "Date",
      "Description",
      "Hours",
      "Minutes",
      "Property",
      "Team Member",
      "Material",
      "Activity Group",
      "Activity Subcategory",
    ];
    if (instance.data.csv_text) {
      pushFileDetails(instance.data.csv_text);
    }
  } else {
    instance.data.mappingTarget = [
      "Date",
      "Description",
      "Hours",
      "Minutes",
      "Property",
      "Team Member",
      "Material",
      "Activity Group",
      "Activity Subcategory",
    ];
  }

  let test = properties.optiontest;
  let optionObject = properties.optiondata;

  //logOut("UPDATE","OptionType");
  //logOut("UPDATE",test, optionObject);

  function getOptions(optionObject) {
    let optionLength = optionObject.length();
    let optionsList = optionObject.get(0, optionLength);
    logOut("UPDATE", optionsList);
    let fullOptions = [];

    for (const item of optionsList) {
      const properties = item.listProperties();

      logOut("UPDATE", properties)
      let createdObj = {};
      for (const prop of properties) {
        logOut("UPDATE", prop)
        let val = item.get(prop);
        if (val && val.get) {
          logOut("UPDATE", val.listProperties);
          val = val.get('display')
        }
        createdObj[prop] = val;
      }
      logOut("UPDATE", createdObj);
    }
  }
  getOptions(optionObject);

  /* async function getOptionsObject(optionObject) {
     let optionLength = await optionObject.length();
     let optionsList = await optionObject.get(0, optionLength);
     logOut("UPDATE",optionsList);
     let fullOptions = [];
 
     for (const item of optionsList) {
       const properties = await item.listProperties();
 
       logOut("UPDATE",properties)
       let createdObj = {};
       for (const prop of properties) {
         logOut("UPDATE",prop)
         let val = await item.get(prop);
         if (val && val.get) {
           val = await val.get('display')
         }
         createdObj[prop] = val;
       }
       logOut("UPDATE",createdObj);
     }
   }*/
}
