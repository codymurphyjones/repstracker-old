function(instance, context) {
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
  logOut("DYNAMIC4",investorTypeObject);
  instance.data.updateMapping = async function (headers, headerMaps) {
    if (headers.length !== headerMaps.length) {
      // If they are not of the same length, they cannot match completely
      return false;
    } else {
      for (let i = 0; i < headers.length; i++) {
        if (headers[i] !== headerMaps[i]) return false;
      }
    }
    return true;
  };

  logOut("DYNAMIC3",investorTypeObject);
  function executeProcess(results, headers, csv_text) {
    let realHeaders = headers || [
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

    const property = "Property Address";
    const properties = [
      "437 Genesis Plaza, Henderson, Greater Manchester, Puerto Rico, 64577",
      "1436 Oswald Junction, Tabithaville, Greater London, Bahrain, 76972",
      "476 Heathcote Cliff, Bahringertown, South Yorkshire, Greece, 29634",
      "162 Elian Road, Kissimmee, Cumbria, Qatar, 16099-3731",
      "1156 Conner Vista, Borerville, West Yorkshire, Mozambique, 62725",
      "158 Zulauf Branch, Murray, Wiltshire, Dominican Republic, 15990-5657",
      "1398 Eugenia Heights, Lake Cesar, Shropshire, Brazil, 39056-1071",
      "861 Kihn Expressway, West Estaton, Buckinghamshire, Guinea-Bissau, 69923",
      "1267 Esteban Inlet, South Ahmedfort, Northumberland, Tunisia, 85985-1978",
    ];

    const property_names = [
      "Genesis",
      "Oswald",
      "Heathcote Cliff",
      "Elian Road",
      "Conner Vista",
      "Zulauf Branch",
      "Eugenia Heights",
      "Kihn Expressway",
      "Esteban Inlet,",
    ];

    // SET COLUMN OPTIONS FROM CSV
    let headerArray = results.data[0], // This gets the column headers from the CSV and sets them as an array of texts
      csv_rows = results.data.length - 1;
   /* if (!compareArrays(headerArray, realHeaders)) {
      console.log("Headers don't match");
    } else {
      console.log("Headers match!!");
    }
*/
    let propertyIndex = headerArray.indexOf(property);

    let csv_content = results.data.slice(1);

    let propertyRows = [];

    for (let i = 0; i < csv_content.length; i++) {
      propertyRows.push(csv_content[i][propertyIndex]);
    }

    for (let i = 0; i < propertyRows.length; i++) {
      if (property_names.includes(propertyRows[i])) {
        let indexOfProp = property_names.indexOf(propertyRows[i]);
        propertyRows[i] = properties[indexOfProp];
      }
    }

    for (let i = 0; i < csv_content.length; i++) {
      csv_content[i][propertyIndex] = propertyRows[i];
    }

    instance.data.publishHeaders(headerArray);
    instance.data.fileHeaders = headerArray;
    instance.data.publishCSVRows(csv_rows);
    instance.data.csv_content = csv_content;
    instance.data.csv_text = csv_text;
    checkForDuplicates(csv_content);
    instance.data.publishIsReadyForValidation(true);
  }

  instance.data.parseCSV = function (csv_text, header = false) {
    return Papa.parse(csv_text, {
      header,
      dynamicTyping: false,
      skipEmptyLines: "greedy",
    });
  };
  logOut("DYNAMIC2",investorTypeObject);

  instance.data.processCSV = async function (csv_text, myDropzone, headers) {
    let csv = await Papa.parse(csv_text, {
      header: false,
      dynamicTyping: false,
      skipEmptyLines: "greedy",
    });

    instance.data.updateMappings(instance, context);
    executeProcess(csv, headers, csv_text);
  };

  init(instance, context);

  logOut("DYNAMIC1",investorTypeObject);

  //logOut("UPDATE","OptionType");
  //logOut("UPDATE",test, optionObject);

 function getOptions(optionObject) {
    let optionLength = optionObject.length();
    let optionsList = optionObject.get(0, optionLength);
    logOut("DYNAMIC",optionsList);

    for (const item of optionsList) {
      const properties = item.listProperties();

      logOut("DYNAMIC",properties)
      let createdObj = {};
      for (const prop of properties) {
        logOut("DYNAMIC",prop)
        let val = item.get(prop);
        if (val && val.get) {
          logOut("DYNAMIC",val.listProperties);
          val = val.get('display')
        }
        createdObj[prop] = val;
      }
      logOut("DYNAMIC",createdObj);
    }
  }

  function setDynamicData(dataSet, bubbleObject, key) {
    if(!bubbleObject) {}
    else {
    const original =  dataSet.dynamicData
    original[key] = [] || getOptions(bubbleObject);
    dataSet.dynamicData = {
      ...original,
    }
  }
  }

  setDynamicData(instance.data, investorTypeObject, "investorType");

  instance.data.previewNode = false;
}
