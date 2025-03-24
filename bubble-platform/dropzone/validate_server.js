function(instance, properties, context) {
  let isTest = properties.istest;
  const investorType = properties.InvestorType;

  function capitalizeEachWord(sentence) {
    return sentence
      .split(' ')          // Split the sentence into words
      .map(word => {       // Map over each word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');          // Join the words back into a single string
  }

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
    "",
  ].map(item => item.toLowerCase().replace(/[?!.]/g, ''));

  const LTR_ActivityGroups = [
    "Business Oversight",
    "Real Estate Career Development",
    "Dealing with Vendors",
    "Networking",
    "Property Acquisition (successful)",
    "Attempted property acquisitions",
    "Property Improvements",
    "Property Management",
    "Property Selling",
    "Rental Property Business",
    "Other",
    "",
  ].map(item => item.toLowerCase().replace(/[?!.]/g, ''));

  const STR_Activity_Group = [
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
    "",
  ].map(item => item.toLowerCase().replace(/[?!.]/g, ''));


  function createReplaceObject(objSet, keyProp, valProp = "") {
    let objProps = objSet.listProperties();
    //console.log(objProps);
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }

    console.log("res", resObj);
    console.log("keyVal", resObj[keyProp]);
    console.log("valProp", resObj[valProp]);

    let outObj = {};

    const keyPropData = resObj[keyProp];
    if (keyPropData !== undefined && keyPropData !== null) {
      outObj[(keyPropData || "").toLowerCase()] = resObj["_id"];
    }
    if (valProp !== "") {
      const valPropData = resObj[valProp];
      if (valPropData !== undefined && valPropData !== null) {
        outObj[(valPropData || "").toLowerCase()] = resObj["_id"];
      }
    }
    //console.log("the rl out", outObj);

    return outObj;
  }

  function createLTRReplaceObject(objSet, keyProp, valProp = "") {
    let objProps = objSet.listProperties();
    console.log("LTRProps", objProps);
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }

    console.log("res", resObj);
    console.log("keyVal", resObj[keyProp]);
    console.log("valProp", resObj[valProp]);

    let outObj = {};
    const isSpouseVal = isTest ? "isspouse_boolean" : "is_spouse__boolean";
    if (resObj[isSpouseVal] === true) {
      const keyPropData = resObj[keyProp];
      if (keyPropData !== undefined && keyPropData !== null) {
        outObj[(keyPropData || "").toLowerCase()] = resObj["_id"];
      }
      if (valProp !== "") {
        const valPropData = resObj[valProp];
        if (valPropData !== undefined && valPropData !== null) {
          outObj[(valPropData || "").toLowerCase()] = resObj["_id"];
        }
      }
    }
    console.log("the rl out", outObj);

    return outObj;
  }

  let propertyObjList = properties.Property;
  let teamObjList = properties.TeamMember;

  let activityOptionList = properties.activityGroup;
  let activitySTROptionList = properties.activityGroupStr;
  let activitySubcategory = properties.activitySubcategory;

  function createLookupCollection(objSet, keyProp, valProp = "") {
    //console.log(objSet);
    let collectionLen = objSet.length();
    console.log(collectionLen);
    let collectionObjs = objSet.get(0, collectionLen);
    //console.log("collection", collectionObjs);
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

  function createLTRTeamLookupCollection(objSet, keyProp, valProp = "") {
    let collectionLen = objSet.length();
    let collectionObjs = objSet.get(0, collectionLen);
    let outObject = {};
    collectionObjs.map((item) => {
      outObject = {
        ...outObject,
        ...createLTRReplaceObject(item, keyProp, valProp),
      };
    });
    return outObject;
  }

  console.log("Collections");
  let addressFieldName = isTest ? "address_text_text" : "address__text__text"; //"address__text__text"
  let addressNickname = "nickname_text";
  const propertyLookup = createLookupCollection(
    propertyObjList,
    addressNickname,
    addressFieldName
  );

  const STRPropertyLookUp = { ...propertyLookup };
  delete STRPropertyLookUp[undefined];
  let teamName = "name_text";
  const teamLookup = createLookupCollection(teamObjList, teamName);
  const LTRTeamLookup = createLTRTeamLookupCollection(teamObjList, teamName);

  //////
  //////
  /////

  function createDynamicObject(optionObj) {
    let objProps = optionObj.listProperties();
    //console.log(objProps);
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = optionObj.get(propName);
    }
    return resObj;
  }

  function createDynamicDisplayObject(optionObj) {
    let val = createDynamicObject(optionObj)
    return val.display || "";
  }
  function createObject(objSet, categoryKey = "undefined", valProp = "undefined") {
    let objLength = objSet.length();
    const optionCollections = objSet.get(0, objLength);
    const outputObj = [];
    for (let x = 0; x < objLength; x++) {
      const optionObj = optionCollections[x];
      /*let objProps = optionObj.listProperties();
      //console.log(objProps);
      let totalProps = objProps.length;
      let resObj = {};

      for (let i = 0; i < totalProps; i++) {
        let propName = objProps[i];
        resObj[propName] = optionObj.get(propName);
      }*/
      const resObj = createDynamicObject(optionObj)
      if (categoryKey !== "undefined") {
        if (resObj[categoryKey]) {
          resObj[categoryKey] = createDynamicDisplayObject(resObj[categoryKey]);
        } else {
          resObj[categoryKey] = "";
        }
      }
      if (valProp !== "undefined") {
        if (resObj[valProp]) {
          resObj[valProp] = createDynamicDisplayObject(resObj[valProp]);
        } else {
          resObj[valProp] = "";
        }
      }
      outputObj.push(resObj);
    }
    /*
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

    /*  let outObj = {};
      outObj[resObj[keyProp].toLowerCase()] = resObj["_id"];
      if (valProp !== "") outObj[resObj[valProp].toLowerCase()] = resObj["_id"];
      //console.log("the rl out", outObj);*/
    return outputObj;
  }

  let categoryLabel = isTest ? "category" : "activity_category_type";
  let subCatTimeCategoryLabel = isTest ? "time_category" : "type0";
  let subCatGroupLabel = isTest ? "group" : "group__os_";

  function STRgroupLookUps(data) {
    const condensed = [""];

    data.forEach(item => {
      // Extract properties

      const display = item.display;

      // Add the display to the group's array
      condensed.push(display);
    });
    return condensed.map(item => item.toLowerCase());
  }

  function groupLookUps(data) {
    const condensed = {};

    data.forEach(item => {
      // Extract properties

      const time_category = item[categoryLabel]
      const display = item.display;

      // Initialize the time category if it doesn't exist
      if (!condensed[time_category]) {
        condensed[time_category] = [];
      }

      // Add the display to the group's array
      condensed[time_category].push(display);
    });

    /* if (!condensed[""]) {
       condensed[""] = [];
   }
     condensed[""].push("");*/

    return condensed;
  }

  function subgroupLookUps(data) {
    const condensed = {};

    data.forEach(item => {
      // Extract properties

      const time_category = item[subCatTimeCategoryLabel]
      const group = item[subCatGroupLabel]
      const display = item.display;

      // Initialize the time category if it doesn't exist
      if (!condensed[time_category]) {
        condensed[time_category] = {};
      }

      // Initialize the group if it doesn't exist within the time category
      if (!condensed[time_category][group.toLowerCase()]) {
        condensed[time_category][group.toLowerCase()] = [];
      }

      // Add the display to the group's array
      condensed[time_category][group.toLowerCase()].push(display);
    });

    /*if (!condensed[""]) {
      condensed[""] = [];
  }
 
    condensed[""][""].push("");*/

    return condensed;
  }
  //createObject(activitySTROptionList);
  const groupValidations = createObject(activityOptionList, categoryLabel);
  const LTRGroupLookUps = groupLookUps(groupValidations);

  const subCategoryValidations = createObject(activitySubcategory, subCatGroupLabel, subCatTimeCategoryLabel);
  const LTRSubGroupLookUps = subgroupLookUps(subCategoryValidations);

  const STRgroupValidations = createObject(activitySTROptionList);
  const STR_Activity_Groups = STRgroupLookUps(STRgroupValidations)

  const MaterialReplace = {
    yes: "Material Participation",
    no: "General Real Estate Activity",
    true: "Material Participation",
    false: "General Real Estate Activity",
    "": "General Real Estate Activity",
  };

  const CategoryReplace = {
    yes: "Material Participation",
    no: "General Real Estate Activity",
    true: "Material Participation",
    false: "General Real Estate Activity",
    "": "",
    material: "Material Participation",
    general: "General Real Estate Activity",
    "general real estate": "General Real Estate Activity",
    "material participation": "Material Participation",
    g: "General Real Estate Activity",
    m: "Material Participation",
    "general real estate activity": "General Real Estate Activity",
    "material participation activity": "Material Participation",
    other: "General Real Estate Activity",
  };

  const YesNoLookup = [
    "",
    "yes",
    "no",
    "true",
    "false",
  ];

  const CategoryLookup = [
    "",
    "general",
    "material",
    "general real estate activity",
    "material participation activity",
    "general real estate",
    "material participation",
    "g",
    "m",
    "other",
  ];

  const MaterialCheck = [
    "material",
    "material participation",
    "material participation activity",
    "m",
    "yes",
    "true",
  ];

  const LTRMaterialYesNoLookup = [
    "yes",
    "no",
    "true",
    "false",
  ];

  const LTRCategoryLookup = [
    "general",
    "material",
    "general real estate activity",
    "material participation activity",
    "general real estate",
    "material participation",
    "g",
    "m",
    "other",
  ];

  let typeLookUp = {
    "str": "STR", "ltr": "LTR", "lt": "LTR", "st": "STR", "l": "LTR", "s": "STR"
  }
  /*
    function generateListFromMap(map) {
      let objKeys = Object.keys(map);
      let itemList = [];
      for (let i = 0; i < objKeys.length; i++) {
        itemList.push(map[objKeys[i]]);
      }
      return [...objKeys, ...itemList];
    }
  */
  function supportOptional(val, optional, out) {
    return optional && (val === undefined || val === "") ? true : out();
  }

  function lookUp(table, val, valOverride) {
    return table.includes(valOverride || val.toLowerCase());
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

  function dynamicLookUpTableGroup(type, table, optional = false, valOverride = undefined) {
    if (Array.isArray(table)) {
      return (val, mresult, group) => {
        //console.log("mresult", mresult)
        const validationVals = [...LTRGroupLookUps[mresult], ""].map(item => item.toLowerCase());
        //console.log(validationVals);
        //console.log("groupValidations", LTRGroupLookUps);
        //console.log("groupVal", group)
        const isValid = supportOptional(
          val,
          optional,
          () => lookUp(validationVals, val, valOverride) || false
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

  function dynamicLookUpTableSubgroup(type, table, optional = false, valOverride = undefined) {
    if (Array.isArray(table)) {
      return (val, mresult, group) => {
        const TypeGroup = LTRSubGroupLookUps[mresult];
        const SubTypeGroup = TypeGroup[group.toLowerCase()] || [];
        const validationVals = [...SubTypeGroup, ""].map(item => item.toLowerCase());
        const isValid = supportOptional(
          val,
          optional,
          () => lookUp(validationVals, val, valOverride) || false
        );

        return {
          isValid: isValid,
          cellValue: val,
          category: capitalizeEachWord(group),
          type,
        };
      };
    } else {
      return replaceLookUp(type, table, optional, valOverride);
    }
  }

  function dynamicLookUpTableSTRSubgroup(type, table, optional = false, valOverride = undefined) {
    if (Array.isArray(table)) {
      return (val, mresult, group) => {
        const validationVals = [""];
        const isValid = supportOptional(
          val,
          optional,
          () => lookUp(validationVals, val, valOverride) || false
        );

        return {
          isValid: isValid,
          cellValue: val,
          category: capitalizeEachWord(group),
          type,
        };
      };
    } else {
      return replaceLookUp(type, table, optional, valOverride);
    }
  }
  /*
    function replaceValue(val, replaceMatrix) {
      const keyList = Object.keys(replaceMatrix);
      const indexOf = keyList.indexOf(val);
      if (indexOf > -1) {
        return replaceMatrix[keyList[indexOf]];
      }
      return val;
    }
  */
  function replaceLookUp(
    type,
    replaceMatrix,
  ) {
    return (val) => {
      const replVal = replaceMatrix[val.toLowerCase()];

      // console.log("replVal", replVal);
      // console.log("replaceMatrix", replaceMatrix)
      return {
        isValid: replVal !== undefined,
        cellValue: val,
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

  function isValidNumber(num) {
    const isNum = !isNaN(parseInt(num));
    return isNum && parseInt(num) > 0;
  }

  propertyLookup[""] = "";
  teamLookup[""] = "";
  LTRTeamLookup[""] = "";
  const typesValidatorList = {
    Date: validateBaseType("Date", (val) => isValidDate(Date.parse(val))),
    Optional: validateBaseType("Optional", () => true),
    Number: validateBaseType("Number", (val) =>
      val === "" ? true : !isNaN(parseInt(val))
    ),
    MinNumber: validateBaseType("Minutes", (val) =>
      val === "" ? true : (!isNaN(parseInt(val)) && val >= 0 && val < 60)
    ),
    //PropertyLookUp: lookUpTable("Property", definePropertyTablesMatrix()),
    //TeamMemberLookUp: lookUpTable("Team Member", AccountTeamMemberValues, true),
    PropertyLookUp: replaceLookUp("Property", propertyLookup),
    LTRMaterialPropertyLookUp: replaceLookUp("Property", STRPropertyLookUp),
    STRPropertyLookUp: replaceLookUp("Property", STRPropertyLookUp),
    TeamMemberLookUp: lookUpTable("Team Member", teamLookup, true),
    LTRTeamMemberLookUp: lookUpTable("Team Member", LTRTeamLookup, true),
    MaterialLookUp: lookUpTable("Material", YesNoLookup),
    LTRMaterialLookUp: lookUpTable("Material", LTRMaterialYesNoLookup),
    CategoryLookUp: lookUpTable("Category", CategoryLookup),
    LTRCategoryLookUp: lookUpTable("Category", LTRCategoryLookup),
    LtrActivityGroupLookUp: dynamicLookUpTableGroup("Activity Group", LTR_ActivityGroups),
    LtrActivitySubgroupLookUp: dynamicLookUpTableSubgroup(
      "Activity Subgroup",
      LTR_SubActivity_Groups
    ),
    StrActivitySubgroupLookUp: dynamicLookUpTableSTRSubgroup("Activity Subgroup", [""]),
    StrActivityGroupLookUp: lookUpTable("Activity Group", STR_Activity_Groups),
    TypeLookUp: lookUpTable("Type", Object.keys(typeLookUp), true),
  };

  const LTRTypes = {
    date: "Date",
    description: "Optional",
    hours: "Number",
    minutes: "MinNumber",
    mproperty: "LTRMaterialPropertyLookUp",
    "team member": "LTRTeamMemberLookUp",
    "activity group": "LtrActivityGroupLookUp",
    group: "LtrActivityGroupLookUp",
    "activity subgroup": "LtrActivitySubgroupLookUp",
    subgroup: "LtrActivitySubgroupLookUp",
    "activity subcategory": "LtrActivitySubgroupLookUp",
    subcategory: "LtrActivitySubgroupLookUp",
    category: "LTRCategoryLookUp",
    material: "LTRMaterialLookUp",
    type: "TypeLookUp",
    property: "PropertyLookUp",
  };

  for (let i = 0; i < Object.keys(propertyLookup).length; i++) {
    if (i != 0) {
      LTRTypes["property " + i] = "PropertyLookUp";
    }
  }

  const STRTypes = {
    date: "Date",
    description: "Optional",
    hours: "Number",
    minutes: "MinNumber",
    "team member": "TeamMemberLookUp",
    "activity group": "StrActivityGroupLookUp",
    "activity subgroup": "StrActivitySubgroupLookUp",
    group: "StrActivityGroupLookUp",
    subgroup: "StrActivitySubgroupLookUp",
    "activity subcategory": "StrActivitySubgroupLookUp",
    subcategory: "StrActivitySubgroupLookUp",
    category: "CategoryLookUp",
    material: "MaterialLookUp",
    type: "TypeLookUp",
    property: "STRPropertyLookUp",
  };

  for (let i = 0; i < Object.keys(STRPropertyLookUp).length; i++) {
    if (i != 0) STRTypes["property " + (i + 1)] = "PropertyLookUp";
  }

  const typesKeyList = Object.keys(typesValidatorList);

  function CapitalizeWord(str) {
    const words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

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
  function convertKeysToLowercase(obj) {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key.toLowerCase()] = obj[key];
      }
    }
    return newObj;
  }
  function findDuplicateRows(arrayOfObjects) {
    const duplicates = {};
    const result = [];

    arrayOfObjects.forEach((obj, index) => {
      const lowerCaseObj = convertKeysToLowercase(obj);
      const objWithRowId = { ...lowerCaseObj, rowId: index };
      const key = JSON.stringify(obj, Object.keys(obj).sort());
      if (!duplicates[key]) {
        duplicates[key] = [];
      }
      duplicates[key].push(objWithRowId);
    });

    for (const key in duplicates) {
      if (duplicates[key].length > 1) {
        result.push(duplicates[key]);
      }
    }

    return result;
  }

  function createDuplicatesObject(duplicatesArray) {
    let outObject = [];

    for (let i = 0; i < duplicatesArray.length; i++) {
      let copiesArray = duplicatesArray[i];
      const idArray = copiesArray.map((item) => item.rowId);

      // Store processed items to avoid duplicates in outObject
      let processedItems = {};

      for (let x = 0; x < copiesArray.length; x++) {
        let item = copiesArray[x];
        let array = idArray.filter((index) => index !== item.rowId);

        // Check if item already processed to avoid duplicates in outObject
        if (!processedItems[item.rowId]) {
          item.duplicates = array;
          outObject.push(item);
          processedItems[item.rowId] = true; // Mark item as processed
        }
      }
    }

    return outObject;
  }

  function addError(err, currErrors) {
    if (currErrors === "") return err;
    return currErrors + "|" + err;
  }

  function processLTRItem(obj, id, invalidCol = [], originalKeys) {
    const invalidColumns = invalidCol.map((item) => item.toLowerCase());
    let keys = Object.keys(obj);
    let keysLow = keys.map((item) => item.toLowerCase().replace("?", ""));
    let errors = "";

    let categoryField = "";
    if (!keysLow.includes("category") && !keysLow.includes("material"))
      errors = addError("category is a required field for LTR", errors);
    else {
      for (let i = 0; i < keysLow.length; i++) {
        if (
          (keysLow[i] === "category" || keysLow[i] === "material") &&
          categoryField === ""
        ) {
          categoryField = keys[i];
        }
      }
    }

    let groupField = "";
    if (!keysLow.includes("group") && !keysLow.includes("activity group"))
      errors = addError("group is a required field for STR", errors);
    else {
      for (let i = 0; i < keysLow.length; i++) {
        if (
          (keysLow[i] === "group" || keysLow[i] === "activity group") &&
          groupField === ""
        ) {
          groupField = keys[i];
        }
      }
    }

    console.log("groupField", groupField)

    console.log("Object", obj);
    for (let i = 0; i < keys.length; i++) {
      //const key = keys[i];
      const originalKey = originalKeys[i];
      //console.log(keys[i], obj[keys[i]]);
      let key = keys[i].toLowerCase().replace("?", "");
      const materialCheck = obj[categoryField] || "";

      const mresult = MaterialCheck.includes(materialCheck.toLowerCase());
      // console.log("materialCheck", mresult);
      const groupVal = obj[groupField] || "";
      if (key === "property") {
        if (mresult) key = "m" + key;
      }

      if (!invalidColumns.includes(key)) {

        const res = typesValidatorList[LTRTypes[key]](obj[keys[i]],
          mresult ? "Material Participation" : "General Real Estate Activity",
          groupVal);
        if (!res.isValid) {
          let errMessage = `"${res.cellValue}" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined ? `in group of ´${res.category}´ ` : ""}for General Long Term Rental`;
          if (materialCheck === "")
            errMessage = `"${res.cellValue}" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined ? `in group of ´${res.category}´ ` : ""}for Long Term Rental`;
          if (mresult)
            errMessage = `"${res.cellValue}" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined ? `in group of ´${res.category}´ ` : ""}for Material Long Term Rental`;
          errors = addError(errMessage, errors);
        }
      }
    }
    if (!isValidNumber(obj["minutes"]) && !isValidNumber(obj["hours"])) errors = addError("Hours and Minutes cannot be empty values.", errors);
    return { id, errors };
  }

  function processSTRItem(obj, id, invalidCol = [], originalKeys = []) {
    const invalidColumns = invalidCol.map((item) => item.toLowerCase());
    let Fullkeys = Object.keys(obj);
    let keys = Fullkeys.map((item) => item);
    console.log(keys);
    let keysLow = keys.map((item) => item.toLowerCase().replace("?", ""));
    let errors = "";

    let groupField = "";
    if (!keysLow.includes("group") && !keysLow.includes("activity group"))
      errors = addError("group is a required field for STR", errors);
    else {
      for (let i = 0; i < keysLow.length; i++) {
        if (
          (keysLow[i] === "group" || keysLow[i] === "activity group") &&
          groupField === ""
        ) {
          groupField = keys[i];
        }
      }
    }

    console.log("groupField", groupField)

    for (let i = 0; i < keys.length; i++) {
      const originalKey = originalKeys[i];
      const key = keys[i].toLowerCase().replace("?", "");
      const groupVal = obj[groupField];
      console.log(groupVal)
      if (!invalidColumns.includes(key)) {

        const res = typesValidatorList[STRTypes[key]](
          obj[keys[i]],
          "",
          groupVal
        );
        if (!res.isValid) {
          console.log("error2", res)
          const errMessage = `"${res.cellValue}" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined ? `in group of ´${res.category}´ ` : ""}for Short Term Rental`;
          errors = addError(errMessage, errors);
        }
      }
    }
    if (!isValidNumber(obj["minutes"]) && !isValidNumber(obj["hours"])) errors = addError("Hours and Minutes cannot be empty values.", errors);
    return { id, errors };
  }

  function processData(rowObj, str, originalKeys) {
    typeLookUp[""] = str;
    console.log("rows", rowObj)
    let objResults = [];
    const duplicates = findDuplicateRows(rowObj);
    const currentColumns = Object.keys(rowObj[0]);
    const availableColumns = Object.keys(LTRTypes).filter(
      (item) => item !== "mproperty"
    );
    console.log("Columns", currentColumns);
    console.log("AvailableColumns", availableColumns);
    const invalidColumns = currentColumns.filter(
      (item) => !availableColumns.map(item => item.toLowerCase()).includes(item.replace("?", "").toLowerCase())
    );
    console.log("InvalidColumns", invalidColumns);

    for (let i = 0; i < rowObj.length; i++) {
      let typeVal = str;
      if (rowObj[i].type && rowObj[i].type !== "") {
        typeVal = typeLookUp[rowObj[i].type.toLowerCase()]
      }


      //console.log('typeVal', typeVal);
      if (typeVal === undefined) {
        console.log("typeVal", typeVal);
        objResults = [
          ...objResults,
          { id: i, errors: `Unable to process row due to invalid type \`${rowObj[i].type} \` specified. Please enter "LTR", "STR", or leave blank` }
        ];

      } else {

        console.log(rowObj[i]);
        rowObj[i].type = typeVal;
        if (rowObj[i].type === "LTR") {
          objResults = [
            ...objResults,
            processLTRItem(rowObj[i], i, invalidColumns, originalKeys),
          ];
        } else {
          objResults = [
            ...objResults,
            processSTRItem(rowObj[i], i, invalidColumns, originalKeys),
          ];
        }
      }
    }

    const errorObjs = objResults.filter((item) => item.errors !== "");

    let errCount = 0;
    errorObjs.map((item) => (errCount += item.errors.split("|").length));

    return {
      errors: errorObjs,
      errorCount: errCount,
      csv: rowObj,
      duplicates: createDuplicatesObject(duplicates),
      columnWarnings: invalidColumns,
      validColumns: availableColumns.map(item => CapitalizeWord(item)),
    };
  }

  function normalizeKeys(objects) {
    return objects.map(obj => {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Convert key to lowercase and remove punctuation
          let newKey = key.toLowerCase().replace(/[?!.]/g, '');
          //Activity Group
          if (newKey === "group") newKey = "activity group";
          //Activity Subcategory
          if (newKey === "subcategory" || newKey === "subgroup") newKey = "activity subcategory";
          //Activity Group
          if (newKey === "team") newKey = "team member";
          //Category
          //if(newKey === "material") newKey = "category";
          newObj[newKey] = obj[key];
        }
      }
      return newObj;
    });
  }

  function validateCSVData(results) {
    console.log("Active Type", investorType);
    //console.log("properties", properties);
    let headerArray = results.data[0], // This gets the column headers from the CSV and sets them as an array of texts
      csv_rows = results.data.length - 1;

    let csv_content = results.data;

    /* let csv_row_data = {};
     for (let headerId = 0; headerId < headerArray.length; headerId++) {
       csv_row_data[headerArray[headerId]] = [];
     }
 
     for (let i = 0; i < csv_rows; i++) {
       for (let headerId = 0; headerId < headerArray.length; headerId++) {
         csv_row_data[headerArray[headerId]].push(csv_content[i][headerId]);
       }
     }*/

    const originalKeys = Object.keys(csv_content[0])
    console.log("rows", normalizeKeys(csv_content));

    const res = processData(normalizeKeys(csv_content), investorType, originalKeys);
    return res;
  }

  async function parseCSVForValidation(csv_text) {

    let res = await Papa.parse(csv_text, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: "greedy",
    });
    let res2 = validateCSVData(res);
    return res2;
  }

  function convertDuplicates(duplicates) {
    let duplicatesArray = [...duplicates];
    for (let i = 0; i < duplicatesArray.length; i++) {
      let Fullkeys = Object.keys(duplicatesArray[i]);
      let keys = Fullkeys.map((item) => item);

      let keysLow = keys.map((item) => item.toLowerCase().replace("?", ""));
      let categoryField = "";
      if (keysLow.includes("category") || keysLow.includes("material")) {
        for (let i = 0; i < keysLow.length; i++) {
          if (
            (keysLow[i] === "category" || keysLow[i] === "material") &&
            categoryField === ""
          ) {
            categoryField = keys[i];
          }
        }
      }

      const rowType = duplicatesArray[i]["type"] || investorType

      duplicatesArray[i]["date"] = Date.now(duplicatesArray[i]["date"]);
      duplicatesArray[i]["team member"] =
        teamLookup[(duplicatesArray[i]["team member"] || "").toLowerCase()];

      console.log("category value", duplicatesArray[i][categoryField]);
      let replaceObj = categoryField === "category" ? CategoryReplace : MaterialReplace;
      duplicatesArray[i]["category"] =
        rowType === "LTR" ? replaceObj[(duplicatesArray[i][categoryField] || "").toLowerCase()] : "";
      const idArray = Object.keys(duplicatesArray[i]).filter((item) =>
        item.startsWith("property")
      );
      const properties = [];
      for (let x = 0; x < idArray.length; x++) {
        properties.push(propertyLookup[(duplicatesArray[i][idArray[x]] || "").toLowerCase()]);
        duplicatesArray[i][idArray[x]] =
          propertyLookup[duplicatesArray[i][idArray[x]]];
        delete duplicatesArray[i][idArray[x]];
      }
      duplicatesArray[i]["properties"] = properties.filter(
        (item) => item !== ""
      );
    }
    return duplicatesArray;
  }

  parseCSVForValidation(instance.data.csv_text).then((result) => {
    console.log("Final", result);
    const final = updateKeysWithPrefix(result);
    console.log("property lookup", propertyLookup);

    console.log("teamLookup", teamLookup);
    console.log("LTRTeamLookup", LTRTeamLookup);

    console.log("LTR grouplookups", LTRGroupLookUps);
    console.log("LTR sublookups", LTRSubGroupLookUps);
    console.log("STRgrouplookups", STR_Activity_Groups);

    console.log("testVal", isTest);

    if (result.errors.length > 0) {
      console.log("NO UPLOADING!");
    } else {
      console.log("VALID YOU MAY UPLOAD");
    }

    console.log("duplicates", result.duplicates);
    const dupeResult = convertDuplicates(result.duplicates);
    console.log("dupeResult", dupeResult);
    const defaultDupeSkips = dupeResult.filter(item => item.duplicates[0] < item.rowId).map(item => item.rowId)

    //let dupCount = result.duplicates.length;
    let dupCount = defaultDupeSkips.length;
    let errCount = result.errors.length;

    //instance.publishState("errors", updateListWithPrefix(result.errors));
    //const duplicates = updateListWithPrefix(result.duplicates)
   
    console.log("new dupe result", defaultDupeSkips)
    instance.publishState("defaultDuplicateSkips", defaultDupeSkips)
    instance.publishState("errorCount", errCount);
    instance.publishState("duplicateCount", dupCount);
    instance.publishState("rowCount", result.csv.length);



    instance.publishState(
      "duplicates",
      errCount === 0 ? updateListWithPrefix(dupeResult) : []
      //updateListWithPrefix(dupeResult)
    );

    instance.publishState("newerrortype", updateListWithPrefix(result.errors));

    instance.publishState("errors", updateListWithPrefix(result.errors));
    /*
      console.log( updateListWithPrefix([
        { id: "1", errors: "error1|error2" },
        { id: "2", errors: "error1|error2" },
      ]));*/

    if (errCount === 0) {
      instance.triggerEvent("fileisvalidated");
    }

    // console.log({
    //   duplicateCount: dupCount,
    //   errorCount: errCount,
    //   rowCount: result.csv.length,
    //   csv: updateListWithPrefix(result.csv),
    //   errors: updateListWithPrefix(result.errors),
    //   duplicates: updateListWithPrefix(result.duplicates),
    // });
    /////d71c41414056ec07ee2cb9e8a86607d3.cdn.bubble.io/f1715777128123x873282763320406100/file__upload_1715777130153.csv
  });
}
