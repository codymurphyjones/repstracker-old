function(instance, properties, context) {
  const LTR_ActivityGroups = [
    "Attempted property acquisitions",
  "Real Estate Career Development",
  "Networking",
  "Property Acquisition (successful)",
  "Business Oversight",
  "Property Management",
  "Property Improvements",
  "Rental Property Business",
  "Dealing with vendors",
  "Property Selling",
  "Other",
  ""
  ];

    
  const LTR_SubActivity_Groups = [
    "Negotiations",
  "Obtaining financing",
  "Property inspections",
  "Advertising",
  "Meeting with prospective tenants",
  "Approving tenants and leases",
  "Evictions and other litigation",
  "Negotiating property services",
  "Managing & overseeing projects",
  "Service provider supervision",
  "Managing of property managers",
  "Dealing with HOAs",
  "Development activities",
  "Generating financial statements",
  "Collecting rent",
  "Bookkeeping",
  "Investigating market rents and services",
  "Emails and other correspondence",
  "Reviewing zoning",
  "Researching market",
  "Travel to property",
  "Reviewing sale agreements",
  "Staging and decorating",
  "Performing repairs",
  "Obtaining property permits",
  "Money-raising",
  "Meeting with lenders",
  "Meeting with investors",
  "Meeting with RE tax advisor",
  "Meeting with real estate coach",
  "Attending networking events",
  "Attending local real estate clubs",
  "Travel to view potential deals/markets",
  "Making offer contracts",
  "Physically searching for properties",
  "Property viewing",
  "Speaking to prospective sellers",
  "Obtaining real estate license",
  "Meeting with agents/brokers",
  "Reviewing financial statements provided by 3rd parties",
  "Reviewing or reading property manager reports",
  "Making offer contracts",
  "Property inspections",
  "Property showings",
  "Leasing activities (other)",
  "Maintaining legal compliance",
  "Reviewing proposals and contracts",
  "3rd party contractor, vendor supervision",
  "Paying bills or making deposits",
  "Researching terms of financing",
  "Reviewing sale agreements",
  "Staging and decorating",
  "Performing improvement work",
  "Money-raising",
  "Meeting with agents/brokers",
  "Real estate course",
  "Communications with agents/brokers",
  "Real estate educational activity",
  "Analyzing potential deals",
  "Property viewing",
  "Attending real estate club meeting",
  "Communications with agent or broker",
  "Obtaining financing",
  "Generating financial projections",
  "Supervision of work",
  "Advertising",
  "Communications with buyer",
  "Meeting with RE financial advisor",
  "Property inspections",
  "Negotiations",
  "Other", 
  ""
  ];

  const STR_Activity_Groups = [
    "Property acquisition activities",
    "Property inspections",
    "Advertising/Marketing",
    "Guest communications",
    "Improvements or Repairs",
    "Team Member communications",
    "Turnover/Cleaning",
    "Purchasing Items",
    "Dealing with HOAs",
    "Travel to/from property",
    "Bookkeeping",
    "Other",
    ""
  ];

  const propertyAddress = [
    "437 Genesis Plaza, Henderson, Greater Manchester, Puerto Rico, 64577",
    "1436 Oswald Junction, Tabithaville, Greater London, Bahrain, 76972",
    "476 Heathcote Cliff, Bahringertown, South Yorkshire, Greece, 29634",
    "162 Elian Road, Kissimmee, Cumbria, Qatar, 16099-3731",
    "1156 Conner Vista, Borerville, West Yorkshire, Mozambique, 62725",
    "158 Zulauf Branch, Murray, Wiltshire, Dominican Republic, 15990-5657",
    "1398 Eugenia Heights, Lake Cesar, Shropshire, Brazil, 39056-1071",
    "861 Kihn Expressway, West Estaton, Buckinghamshire, Guinea-Bissau, 69923",
    "1267 Esteban Inlet, South Ahmedfort, Northumberland, Tunisia, 85985-1978",
    "20 W 34th St., New York, NY 10001, USA",
    "Hell's Kitchen, New York, NY, USA"
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
    "Empire State Building",
    "Hell's Kitchen"
  ];

  function definePropertyTablesMatrix() {
    const outObj = {};

    property_names.map((item) => outObj[item]);
    propertyAddress.map((item, i) => (outObj[property_names[i]] = item));

    return outObj;
  }

  
  const AccountTeamMemberValues = [
    undefined,
    "Fire",
    "Fireina"
  ];

  function createReplaceObject(objSet, keyProp, valProp = "") {
    let objProps = objSet.listProperties();
    //console.log(objProps);
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }

    /*console.log("res", resObj);
    console.log("keyVal", resObj[keyProp]);
    console.log("valProp", resObj[valProp]);*/

    let outObj = {};
    outObj[resObj[keyProp]] = resObj["_id"];
    if (valProp !== "") outObj[resObj[valProp]] = resObj["_id"];
    //console.log("the rl out", outObj);

    return outObj;
  }


  console.log("init value", properties.Property);
    let propertyObjList = properties.Property;
    let teamObjList = properties.TeamMember;
    console.log("test1", propertyObjList);
    console.log(properties);

    function createLookupCollection(objSet, keyProp, valProp = "") {
      console.log(objSet);
      let collectionLen = objSet.length();
      console.log(collectionLen);
      let collectionObjs = objSet.get(0, collectionLen);
      console.log("collection", collectionObjs);
      let outObject = {};
      collectionObjs.map(
        (item) =>
          (outObject = {
            ...outObject,
            ...createReplaceObject(item, keyProp, valProp),
          })
      );
      console.log("final", outObject);
      return outObject;
    }

    console.log("Collections");
    let addressFieldName = "address__text__text"; //"address__text__text"
    let addressNickname = "nickname_text";
    const propertyLookup = createLookupCollection(
      propertyObjList,
      addressNickname,
      addressFieldName
    );
    console.log("property lookup", propertyLookup);
    let teamName = "name_text"; //"address__text__text"
    const teamLookup = createLookupCollection(teamObjList, teamName);
    console.log("teamLookup", teamLookup);

  const YesNoLookup = [
    "",
    "yes",
    "no",
    "YES",
    "NO",
    "Yes",
    "No",
    "True",
    "true",
    "True",
    "false",
    "FALSE",
    "False",
    true,
    false,
    undefined,
  ];

  const normHeaderMap = {
    Date: "Date",
    description: "Description",
    hours: "Hours",
    minutes: "Minutes",
    "property": "Property",
    "team member": "Team Member",
    category: "Category",
    "activity group": "Activity Group",
    "activity subcategory": "Activity Subgroup",
    "type": "Type"
  };

  const brokeHeaderMap = {
    date: "Date",
    description: "Description",
    hours: "Hours",
    minutes: "Minutes",
    "property": "Property",
    "team member": "Team Member",
    category: "Category",
    "activity group": "Activity Group",
    "activity subcategory": "Activity Subgroup",
    "type": "Type"
  };

  const defHeaderMap = properties?.mapheader ? brokeHeaderMap : normHeaderMap;

  function generateListFromMap(map) {
    let objKeys = Object.keys(map);
    let itemList = [];
    for (let i = 0; i < objKeys.length; i++) {
      itemList.push(map[objKeys[i]]);
    }
    return [...objKeys, ...itemList];
  }

  function supportOptional(val, optional, out) {
    return optional && (val === undefined || val === "") ? true : out();
  }

  function lookUp(table, val, valOverride) {
    return table.includes(valOverride || val);
  }

  function lookUpTable(type, table, optional = false, valOverride = undefined) {
    if (Array.isArray(table)) {
      return (val) => {
        const isValid = supportOptional(
          val,
          optional,
          () => lookUp(table, val, valOverride) || false
        );

        return {
          isValid: isValid,
          cellValue: val,
          type,
        };
      };
    } else {
      return replaceLookUp(type, table, optional, valOverride);
    }
  }

  function replaceValue(val, replaceMatrix) {
    const keyList = Object.keys(replaceMatrix);
    const indexOf = keyList.indexOf(val);
    if (indexOf > -1) {
      return replaceMatrix[keyList[indexOf]];
    }
    return val;
  }

  function replaceLookUp(
    type,
    replaceMatrix,
    optional = false,
    valOverride = undefined
  ) {
    const lookUpList = generateListFromMap(replaceMatrix);
    return (val) => {
      const isValid = supportOptional(
        val,
        optional,
        () => lookUp(lookUpList, val, valOverride) || false
      );

      return {
        isValid: isValid,
        cellValue: replaceValue(val, replaceMatrix),
        type,
      };
    };
  }

  function validateBaseType(type, validation) {
    return (val) => ({
      isValid: validation(val),
      cellValue: val,
      type,
    });
  }

  function isValidDate(date) {
    return date && date.toString() !== "Invalid Date" && !isNaN(date);
  }

  console.log("matrix:", definePropertyTablesMatrix());
  console.log("property", propertyLookup);
  console.log('array', AccountTeamMemberValues)
    console.log("teamLookup", teamLookup);
    propertyLookup[""] = ""
    teamLookup[""] = ""
  const typesValidatorList = {
    Date: validateBaseType("Date", (val) => isValidDate(Date.parse(val))),
    Optional: validateBaseType("Optional", () => true),
    Number: validateBaseType("Number", (val) => !isNaN(parseInt(val))),
    //PropertyLookUp: lookUpTable("Property", definePropertyTablesMatrix()),
    //TeamMemberLookUp: lookUpTable("Team Member", AccountTeamMemberValues, true),
    PropertyLookUp: lookUpTable("Property", propertyLookup),
    TeamMemberLookUp: lookUpTable("Team Member", teamLookup, true),
    MaterialLookUp: lookUpTable("Category", YesNoLookup),
    LtrActivityGroupLookUp: lookUpTable("Activity Group", LTR_ActivityGroups),
    LtrActivitySubgroupLookUp: lookUpTable(
      "Activity Subgroup",
      LTR_SubActivity_Groups
    ),
    StrActivityGroupLookUp: lookUpTable("Activity Group", STR_Activity_Groups),
    TypeLookUp: lookUpTable("Type", ["STR", "LTR"], true)
  };

  const LTRTypes = {
    Date: "Date",
    Description: "Optional",
    Hours: "Number",
    Minutes: "Number",
    Property: "PropertyLookUp",
    "Team Member": "TeamMemberLookUp",
    "Activity Group": "LtrActivityGroupLookUp",
    "Activity Subgroup": "LtrActivitySubgroupLookUp",
    Category: "MaterialLookUp",
    Type: "TypeLookUp"
  };

  const STRTypes = {
    Date: "Date",
    Description: "Optional",
    Hours: "Number",
    Minutes: "Number",
    Property: "PropertyLookUp",
    "Team Member": "TeamMemberLookUp",
    "Activity Group": "LtrActivityGroupLookUp",
    Type: "TypeLookUp"
  };

  const typesKeyList = Object.keys(typesValidatorList);

  function validateType(type, val) {
    if (!typesKeyList.includes(type)) return { isValid: false, cellValue: val };

    const obj = typesValidatorList[type](val);
    return obj;
  }
  function updateKeysWithPrefix(obj, prefix = "_p_") {
    const updatedObj = {};
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = `${prefix}${key}`;
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        updatedObj[newKey] = updateKeysWithPrefix(value, prefix);
      } else if (Array.isArray(value)) {
        updatedObj[newKey] = value.map((item) =>
          typeof item === "object" && item !== null
            ? updateKeysWithPrefix(item, prefix)
            : item
        );
      } else {
        updatedObj[newKey] = value;
      }
    });
    return updatedObj;
  }

  function updateListWithPrefix(list) {
    return updateKeysWithPrefix({ items: list })._p_items || [];
  }

  function findDuplicateObjects(objects) {
    let seenObjects = new Map();
    let duplicates = {};

    objects.forEach((obj, index) => {
      let sortedKeys = Object.keys(obj).sort();
      let sortedObj = {};
      sortedKeys.forEach((key) => {
        sortedObj[key] = obj[key];
      });

      let key = JSON.stringify(sortedObj);

      if (seenObjects.has(key)) {
        let firstIndex = seenObjects.get(key);
        if (duplicates[firstIndex]) {
          duplicates[firstIndex].push(index);
        } else {
          duplicates[firstIndex] = [index];
        }
      } else {
        seenObjects.set(key, index);
      }
    });
    let output = [];
    for (let [firstIndex, indices] of Object.entries(duplicates)) {
      //output[firstIndex] = indices;
      output.push({ row: firstIndex, duplicates: (indices || []).join(",") });
    }

    return output;
  }

  function generateValidationMap(headerMap, str = false) {
    const headerKeys = Object.keys(headerMap).map((item) => item.toLowerCase());
    console.log('headerkeys', headerKeys);
    const newHeaderMap = {};
    Object.keys(headerMap).map(
      (item) => (newHeaderMap[item.toLowerCase()] = headerMap[item])
    );
    headerMap = newHeaderMap;
    const outMap = { ...headerMap };

    console.log("currentOutmap", outMap)

    if (str) {
      for (let i = 0; i < headerKeys.length; i++) {
        outMap[headerKeys[i]] = STRTypes[headerMap[headerKeys[i]]];
      }
    } else {
      for (let i = 0; i < headerKeys.length; i++) {
        outMap[headerKeys[i]] = LTRTypes[headerMap[headerKeys[i]]];
      }
    }
    console.log('outmap', outMap);
    return outMap;
  }

  function validateContentData(colObj, validator, validationMap) {
    const colObjLen = colObj.length;
    const item = validationMap[validator.toLowerCase()];
    const resCollection = [];
    for (let k = 0; k < colObjLen; k++) {
      let colItem = colObj[k];
      const res = validateType(item, colItem);
      resCollection.push(res);
    }
    const out = {};
    out[validator] = resCollection;
    return out;
  }

  function keyMapToCSVData(keysMap) {
    let dataCollection = [];
    let keys = Object.keys(keysMap);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const items = keysMap[key];
      for (let k = 0; k < items.length; k++) {
        const item = items[k];
        if (i === 0) dataCollection.push({});
        dataCollection[k][key] = item.cellValue;
      }
    }
    return dataCollection;
  }

  function keyMapToInvalid(keysMap) {
    console.log('keysmap', keysMap);
    let dataCollection = {};
    let columnCollection = {};
    let keys = Object.keys(keysMap);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const items = keysMap[key];
      for (let k = 0; k < items.length; k++) {
        const item = items[k];
        if (!item.isValid) {
          if (!dataCollection[k]) {
            dataCollection[k] = [];
            columnCollection[k] = [];
          }
          const invalStr = `"${item.cellValue}" in column ´${key}´ values is not a valid ${item.type} type"`;
          dataCollection[k].push(invalStr);
          columnCollection[k].push(key);
        }
      }
    }
    const output = [];
    const outKeys = Object.keys(dataCollection);
    for (let i = 0; i < outKeys.length; i++) {
      const items = dataCollection[outKeys[i]] || [];
      const column = columnCollection[outKeys[i]] || [];

      console.log(items);
      console.error(i, column);
      const newItem = {
        data: items.join("||"),
        row: outKeys[i],
        columns: column.join(","),
      };
      output.push(newItem);
    }
    console.log("validationOutput", output);
    return output;
  }

  function processData(rowObj, headerMap = defHeaderMap) {
    let keys = Object.keys(rowObj);
    const validationMap = generateValidationMap(headerMap);
    console.log('validationMap', validationMap)
    let keysMap = {};
    for (let i = 0; i < keys.length; i++) {
      let keyName = keys[i];
      if(keyName === 'Type' || keyName === "Date") console.log('keyName', keyName)
      let items = rowObj[keyName];
      if(keyName === 'Type' || keyName === "Date") console.log('items', items)
      const contentValidation = validateContentData(items, keyName, validationMap);
      if(keyName === 'Type' || keyName === "Date") console.log('contentValidation', contentValidation)
      keysMap = {
        ...keysMap,
        ...contentValidation,
      };
    }
    const csvData = keyMapToCSVData(keysMap);

    const res = findDuplicateObjects(csvData);

    return {
      errors: keyMapToInvalid(keysMap),
      csv: csvData,
      duplicates: res,
    };
  }

  function validateCSVData(results) {
    let headerArray = results.data[0], // This gets the column headers from the CSV and sets them as an array of texts
      csv_rows = results.data.length - 1;

    let csv_content = results.data.slice(1);

    let csv_row_data = {};
    for (let headerId = 0; headerId < headerArray.length; headerId++) {
      csv_row_data[headerArray[headerId]] = [];
    }

    for (let i = 0; i < csv_rows; i++) {
      for (let headerId = 0; headerId < headerArray.length; headerId++) {
        csv_row_data[headerArray[headerId]].push(csv_content[i][headerId]);
      }
    }

    const res = processData(csv_row_data);
    return res;
  }

  async function parseCSVForValidation(csv_text) {
      let res = await Papa.parse(csv_text, {
        header: false,
        dynamicTyping: false,
        skipEmptyLines: "greedy",
      });
      console.log("data", res)
      let res2 = validateCSVData(res);
      return res2;
  }
  

  parseCSVForValidation(instance.data.csv_text).then((result) => {
    console.log("Final", result);
    const final = updateKeysWithPrefix(result);

    console.log("Mutanous Final", final);

    const dupKeyList = Object.keys(result.duplicates);
    if (dupKeyList.length > 0 || result.errors.length > 0) {
      console.log("NO UPLOADING!");
    } else {
      console.log("VALID YOU MAY UPLOAD");
    }

    /*let return_data = [];
    return_data.push(
      updateKeysWithPrefix({
        invalidrows: [1, 3, 4],
        invalidcolumns: [
          "`Date` values is not valid date type",
          "`Activity` values is not valid date type",
        ],
      })
    );
    return_data.push(
      updateKeysWithPrefix({
        invalidrows: [5, 6, 8],
        invalidcolumns: [
          "`Date` values is not valid date type",
          "`Activity` values is not valid date type",
        ],
      })
    );*/

    function countChildArrays(obj, field, splitter = ",") {
      console.log(obj);
      let count = 0;
      for (let i = 0; i < obj.length; i++) {
        const item = obj[i];
        const vals = item[field].split(splitter);
        count = count + vals.length;
      }
      return count;
    }

    let dupCount = countChildArrays(result.duplicates, "duplicates");
    let errCount = countChildArrays(result.errors, "columns");


    console.log("dupes", dupCount);
    console.log("errCount", errCount);
    instance.publishState("errorCount", errCount);
    instance.publishState("duplicateCount", dupCount);
    instance.publishState("rowCount", result.csv.length);
    instance.publishState("errors", updateListWithPrefix(result.errors));
    instance.publishState(
      "duplicates",
      updateListWithPrefix(result.duplicates)
    );

    if(dupCount === 0 || errCount === 0) {
      instance.triggerEvent("fileisvalidated");
    }

    console.log({
      duplicateCount: dupCount,
      errorCount: errCount,
      rowCount: result.csv.length,
      csv: updateListWithPrefix(result.csv),
      errors: updateListWithPrefix(result.errors),
      duplicates: updateListWithPrefix(result.duplicates),
    });
    /////d71c41414056ec07ee2cb9e8a86607d3.cdn.bubble.io/f1715777128123x873282763320406100/file__upload_1715777130153.csv
  });
}
