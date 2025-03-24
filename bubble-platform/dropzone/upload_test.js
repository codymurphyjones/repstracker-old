function test(instance, properties, context) {
  const LTR_ActivityGroups = [
    "Property Acquisition (successful) / Negotiations",
    "Property Acquisition (successful) / Property inspections",
    "Property Acquisition (successful) / Reviewing sale agreements",
    "Property Acquisition (successful) / Making offer contracts",
    "Property Acquisition (successful) / Researching terms of financing",
    "Property Acquisition (successful) / Communications with agent or broker",
    "Property Acquisition (successful) / Obtaining financing",
    "Property Acquisition (successful) / Generating financial projections",
    "Property Acquisition (successful) / Communications with seller",
    "Property Acquisition (successful) / Other",
    "Property Management / Advertising",
    "Property Management / Meeting with prospective tenants",
    "Property Management / Approving tenants and leases",
    "Property Management / Evictions and other litigation",
    "Property Management / Service provider supervision",
    "Property Management / Dealing with HOAs",
    "Property Management / Collecting rent",
    "Property Management / Bookkeeping",
    "Property Management / Travel to property",
    "Property Management / Property showings",
    "Property Management / Leasing activities (other)",
    "Property Management / Paying bills or making deposits",
    "Property Management / Property inspections",
    "Property Management / Other",
    "Property Improvements / Managing & overseeing projects",
    "Property Improvements / Development activities",
    "Property Improvements / Staging and decorating",
    "Property Improvements / Performing repairs",
    "Property Improvements / 3rd party contractor, vendor supervision",
    "Property Improvements / Performing improvement work",
    "Property Improvements / Other",
    "Rental Property Business / Managing of property managers",
    "Rental Property Business / Generating financial statements",
    "Rental Property Business / Investigating market rents and services",
    "Rental Property Business / Emails and other correspondence",
    "Rental Property Business / Reviewing zoning",
    "Rental Property Business / Obtaining property permits",
    "Rental Property Business / Maintaining legal compliance",
    "Rental Property Business / Paying bills or making deposits",
    "Rental Property Business / Other",
    "Dealing with vendors / Negotiating property services",
    "Dealing with vendors / Reviewing proposals and contracts",
    "Dealing with vendors / Supervision of work",
    "Dealing with vendors / Other",
    "Property Selling / Reviewing sale agreements",
    "Property Selling / Staging and decorating",
    "Property Selling / Advertising",
    "Property Selling / Communications with buyer",
    "Property Selling / Communications with agent/broker",
    "Property Selling / Negotiations",
    "Property Selling / Other",
    "Other / Other",
  ];

  const LTR_SubActivity_Groups = [
    "Attempted property acquisitions / Researching market",
    "Attempted property acquisitions / Travel to view potential deals/markets",
    "Attempted property acquisitions / Making offer contracts",
    "Attempted property acquisitions / Speaking to prospective sellers",
    "Attempted property acquisitions / Property inspections",
    "Attempted property acquisitions / Reviewing sale agreements",
    "Attempted property acquisitions / Meeting with agents/brokers",
    "Attempted property acquisitions / Communications with agents/brokers",
    "Attempted property acquisitions / Analyzing potential deals",
    "Attempted property acquisitions / Property viewing",
    "Attempted property acquisitions / Communications with seller",
    "Attempted property acquisitions / Other",
    "Real Estate Career Development / Meeting with real estate coach",
    "Real Estate Career Development / Obtaining real estate license",
    "Real Estate Career Development / Real estate course",
    "Real Estate Career Development / Real estate educational activity",
    "Real Estate Career Development / Other",
    "Networking / Meeting with lenders",
    "Networking / Meeting with investors",
    "Networking / Attending networking events",
    "Networking / Meeting with agents/brokers",
    "Networking / Money-raising",
    "Networking / Attending real estate club meeting",
    "Networking / Other",
    "Business Oversight / Money-raising",
    "Business Oversight / Meeting with RE tax advisor",
    "Business Oversight / Meeting with RE financial advisor",
    "Business Oversight / Other",
    "Other / Other",
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
    "Hell's Kitchen, New York, NY, USA",
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
    "Hell's Kitchen",
  ];

  function definePropertyTablesMatrix() {
    const outObj = {};

    property_names.map((item) => outObj[item]);
    propertyAddress.map((item, i) => (outObj[property_names[i]] = item));

    return outObj;
  }

  const AccountPropertyValues = [...propertyAddress, ...property_names];

  const AccountTeamMemberValues1 = [
    undefined,
    "Emmanuel Magnúsdóttir",
    "Chao Sunday",
    "Tebogo Jóhannesdóttir",
    "Aleksander Sveinsson",
    "Sita Þorsteinsson",
  ];

  const AccountTeamMemberValues = [undefined, "Fire", "Fireina"];

  const YesNoLookup = [
    "yes",
    "no",
    "YES",
    "NO",
    "Yes",
    "No",
    true,
    false,
    undefined,
  ];

  const normHeaderMap = {
    Date: "Date",
    description: "Description",
    hours: "Hours",
    minutes: "Minutes",
    property: "Property",
    "team member": "Team Member",
    category: "Category",
    "activity group": "Activity Group",
    "activity subcategory": "Activity Subgroup",
    type: "Type",
  };

  const brokeHeaderMap = {
    date: "Date",
    description: "Description",
    hours: "Hours",
    minutes: "Minutes",
    property: "Property",
    "team member": "Team Member",
    category: "Category",
    "activity group": "Activity Group",
    "activity subcategory": "Activity Subgroup",
    type: "Type",
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

  const typesValidatorList = {
    Date: validateBaseType("Date", (val) => isValidDate(Date.parse(val))),
    Optional: validateBaseType("Optional", () => true),
    Number: validateBaseType("Number", (val) => !isNaN(parseInt(val))),
    PropertyLookUp: lookUpTable("Property", definePropertyTablesMatrix()),
    TeamMemberLookUp: lookUpTable("Team Member", AccountTeamMemberValues, true),
    MaterialLookUp: lookUpTable("Category", YesNoLookup),
    LtrActivityGroupLookUp: lookUpTable("Activity Group", LTR_ActivityGroups),
    LtrActivitySubgroupLookUp: lookUpTable(
      "Activity Subgroup",
      LTR_SubActivity_Groups
    ),
    StrActivityGroupLookUp: lookUpTable("Activity Group", STR_Activity_Groups),
    TypeLookUp: lookUpTable("Type", ["STR", "LTR"], true),
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
    Type: "TypeLookUp",
  };

  const STRTypes = {
    Date: "Date",
    Description: "Optional",
    Hours: "Number",
    Minutes: "Number",
    Property: "PropertyLookUp",
    "Team Member": "TeamMemberLookUp",
    "Activity Group": "LtrActivityGroupLookUp",
    Type: "TypeLookUp",
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
    console.log("headerkeys", headerKeys);
    const newHeaderMap = {};
    Object.keys(headerMap).map(
      (item) => (newHeaderMap[item.toLowerCase()] = headerMap[item])
    );
    headerMap = newHeaderMap;
    const outMap = { ...headerMap };

    console.log("currentOutmap", outMap);

    if (str) {
      for (let i = 0; i < headerKeys.length; i++) {
        outMap[headerKeys[i]] = STRTypes[headerMap[headerKeys[i]]];
      }
    } else {
      for (let i = 0; i < headerKeys.length; i++) {
        outMap[headerKeys[i]] = LTRTypes[headerMap[headerKeys[i]]];
      }
    }
    console.log("outmap", outMap);
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
    console.log("keysmap", keysMap);
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
    console.log("validationMap", validationMap);
    let keysMap = {};
    for (let i = 0; i < keys.length; i++) {
      let keyName = keys[i];
      if (keyName === "Type" || keyName === "Date")
        console.log("keyName", keyName);
      let items = rowObj[keyName];
      if (keyName === "Type" || keyName === "Date") console.log("items", items);
      const contentValidation = validateContentData(
        items,
        keyName,
        validationMap
      );
      if (keyName === "Type" || keyName === "Date")
        console.log("contentValidation", contentValidation);
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
    let res2 = validateCSVData(res);
    return res2;
  }

  console.log(instance.data);

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

    if (dupCount === 0 || errCount === 0) {
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
    ///     //d71c41414056ec07ee2cb9e8a86607d3.cdn.bubble.io/f1715777128123x873282763320406100/file__upload_1715777130153.csv
  });

  async function csvToTime() {
    // Use the node-fetch module to make an HTTP request
    console.log("CSVToData");
    function createTimeEntry(
      group,
      subcategory,
      date,
      desc,
      hours,
      minutes,
      property,
      member,
      material,
      type
    ) {
      if (type === "STR") {
        return {
          Date: date,
          Description: desc,
          Hours: hours,
          Minutes: minutes,
          "Property Address": property,
          "Team Member": member,
          Material: material,
          "Activity Group": group,
          "Activity Subcategory": subcategory,
          type,
        };
      } else {
        return {
          Date: new Date(date),
          Description: desc,
          Hours: hours,
          Minutes: minutes,
        };
      }
    }

    Papa.parsePromise = function (file, options) {
      return new Promise(function (complete, error) {
        Papa.parse(file, { ...options, complete, error });
      });
    };
    const str = await properties.csv_data;

    const res = await Papa.parsePromise(
      "//d71c41414056ec07ee2cb9e8a86607d3.cdn.bubble.io/f1715777128123x873282763320406100/file__upload_1715777130153.csv",
      {
        download: true,
        header: true,
        dynamicTyping: false,
        skipEmptyLines: "greedy",
      }
    );

    console.log(res);
    let headerArray = res.data[0]; // This gets the column headers from the CSV and sets them as an array of texts
    let csv_rows = Object.keys(res.data).length - 1;

    const entryArray = [];
    for (let i = 0; i <= csv_rows; i += 1) {
      console.error(res.data);

      const slice = createTimeEntry(
        res.data[i]["Activity Group"],
        res.data[i]["Activity Subcategory"],
        res.data[i].Date,
        res.data[i].Description,
        res.data[i].Hours,
        res.data[i].Minutes,
        res.data[i]["Property Address"],
        res.data[i]["Team Member"],
        res.data[i].Material
      );

      entryArray.push(slice);
    }

    console.log("entryArray", entryArray);
  }

  csvToTime();
}
