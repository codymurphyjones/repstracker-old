function(instance, properties, context) {
  const {
    istest: isTest,
    LoggingLevel,
    InvestorType: investorType,
    TimeCategoryList: timeCategoryData,
    Property: propertyObjList,
    TeamMember: teamObjList,
    activityGroup: activityOptionList,
    ActivitiesData: activityDataList,
    activityGroupStr: activitySTROptionList,
    activitySubcategory,
    OwnerId,
    OwnerName
  } = properties;

  const allowDebugging = LoggingLevel === "true" ? true : LoggingLevel;

  function logOut(...str) {
    if (allowDebugging) {
      if (str.length) {
        const tag = typeof str[0] === "string" ? str[0] : null;
        const res = tag ? str.slice(1) : str;
        if (
          tag &&
          (allowDebugging === true ||
            tag.toLowerCase().startsWith(allowDebugging.toLowerCase()))
        ) {
          console.log(`[${tag}]`, ...res);
        }
      } else {
        console.log(...str);
      }
    }
  }

  function CapitalizeWord(str) {
    const words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

  function iterOverArray(option, out) {
    const timeEntryCatLength = option.length();
    const timeEntryCatValues = option.get(0, timeEntryCatLength);
    return iterOverObject(timeEntryCatValues);
  }

  function iterOverFields(option, out) {
    const outPut = {};
    const timeEntryCatProps = option.listProperties();
    for (let i = 0; i < timeEntryCatProps.length; i++) {
      const fieldName = timeEntryCatProps[i];
      const timeEntryValue = option.get(fieldName);
      const objData = iterOverObject(timeEntryValue, out);
      outPut[fieldName] = objData;
    }
    logOut(outPut);
    return outPut;
  }

  let isString = (value) =>
    typeof value === "string" || value instanceof String;

  function iterOverObject(option, out) {
    out;
    if (option.listProperties) {
      return iterOverFields(option, out);
    } else if (Array.isArray(option)) {
      const outArry = [];
      option.forEach((item) => outArry.push(iterOverObject(item, out)));
      return outArry;
    } else if (isString(option)) {
      return option;
    } else if (option.length && option.get) {
      return iterOverArray(option, out);
    } else {
      logOut(option);
      return option;
    }
  }

  function convertTimeCategoryList(list) {
    return list.map((item) => {
      return {
        short: item.short0,
        shorter: item.short,
        shortest: item.shorter,
        values: item.system_values,
        id: item.system_identifier0,
      };
    });
  }

  function convertTimeCategoryListToKeys(list) {
    const keySet = {};

    list.map((obj) => {
      obj.values.map((item) => (keySet[(item || "").toLowerCase()] = obj.id));
    });
    return keySet;
  }
  logOut("TimeEntryCategory", "Time Entry Category", timeCategoryData);
  const timeEntryCategory = iterOverObject(timeCategoryData);
  logOut("TimeEntryCategory", "timeEntryCategory", timeEntryCategory);
  const timeEntryCategories = convertTimeCategoryList(timeEntryCategory);
  logOut("TimeEntryCategory", "timeEntryCategories", timeEntryCategories);

  const materialRanking = timeEntryCategory
    .sort((a, b) => a["system_identifier0"] - b["system_identifier0"])
    .map((item) => item.display);
  logOut("TimeEntryCategory", "timeEntry", materialRanking);
  const materialRankingShort = timeEntryCategory
    .sort((a, b) => a["system_identifier0"] - b["system_identifier0"])
    .map((item) => item.short);
  logOut("TimeEntryCategory", "timeEntry", materialRankingShort);

  const timeEntryCategoriesKeys =
    convertTimeCategoryListToKeys(timeEntryCategories);
  logOut(
    "TimeEntryCategory",
    "timeEntryCategoriesKeys",
    timeEntryCategoriesKeys
  );

  const staticValuesForCategory = timeEntryCategory.map((item) => item.short);
  logOut(
    "TimeEntryCategory",
    "staticValuesForCategory",
    staticValuesForCategory
  );
  const MaterialValues = materialRanking[1] || "Material Participation";
  const NonMaterialValues =
    materialRanking[0] || "General Real Estate Activity";
  const MaterialValuesShort = materialRankingShort[1] || "Material";
  const NonMaterialValuesShort = materialRankingShort[0] || "General";

  function capitalizeEachWord(sentence) {
    return sentence
      .split(" ") // Split the sentence into words
      .map((word) => {
        // Map over each word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" "); // Join the words back into a single string
  }

  function createTeamMemberReplaceObject(objSet, keyProp, valProp = "") {
    let objProps = objSet.listProperties();

    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }

    let outObj = {};

    const keyPropData = resObj[keyProp];
    const valPropData = resObj[valProp];
    if (
      valPropData !== "" &&
      valPropData !== null &&
      valPropData !== undefined
    ) {
      outObj[
        (keyPropData || "").toLowerCase() +
        (" " + valPropData || "").toLowerCase()
      ] = resObj["_id"];
    } else {
      if (keyPropData !== undefined && keyPropData !== null) {
        outObj[(keyPropData || "").toLowerCase()] = resObj["_id"];
      }
    }

    return outObj;
  }

  function createObj(objSet) {
    let objProps = objSet.listProperties();

    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }
    return resObj;
  }
  function createActivityObject(objSet) {
    let objProps = objSet.listProperties();

    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      let obj = objSet.get(propName);
      if (obj && obj.listProperties) obj = createObj(obj);
      resObj[propName] = obj;
    }

    return resObj;
  }

  function createReplaceObject(objSet, keyProp, valProp = "") {
    let objProps = objSet.listProperties();

    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }

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

    return outObj;
  }
  function isSpouse(resObj, key) {
    return convertBubbleString(resObj[key]).toLowerCase().includes("spouse");
  }
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((value, index) => value === arr2[index]);
  }

  function convertBubbleString(objSet) {
    let objProps = objSet.listProperties();
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }
    const displayOnly = arraysEqual(Object.keys(resObj), ["display"]);
    return displayOnly ? resObj.display : resObj;
  }

  function convertBubbleObj(objSet) {
    let objProps = objSet.listProperties();
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }
    return resObj;
  }

  function createLTRReplaceObject(objSet, keyProp, valProp = "") {
    let objProps = objSet.listProperties();
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = objSet.get(propName);
    }

    resObj = convertBubbleObj(objSet);

    let outObj = {};
    const isSpouseVal = isSpouse(
      resObj,
      isTest ? "role_option_team_role" : "role_option_team_role"
    );

    if (isSpouseVal) {
      const keyPropData = resObj[keyProp];
      const valPropData = resObj[valProp];
      if (
        valPropData !== "" &&
        valPropData !== null &&
        valPropData !== undefined
      ) {
        outObj[
          (keyPropData || "").toLowerCase() +
          (" " + valPropData || "").toLowerCase()
        ] = resObj["_id"];
      } else {
        if (keyPropData !== undefined && keyPropData !== null) {
          outObj[(keyPropData || "").toLowerCase()] = resObj["_id"];
        }
      }
    }

    return outObj;
  }

  function createTeamLookupCollection(objSet, keyProp, valProp = "") {
    //logOut(objSet);
    let collectionLen = objSet.length();
    let collectionObjs = objSet.get(0, collectionLen);
    //logOut("collection", collectionObjs);
    let outObject = {};
    collectionObjs.map(
      (item) =>
      (outObject = {
        ...outObject,
        ...createTeamMemberReplaceObject(item, keyProp, valProp),
      })
    );
    return outObject;
  }

  function createActivityLookupCollection(objSet, keyProp, valProp = "") {
    let collectionLen = objSet.length();
    let collectionObjs = objSet.get(0, collectionLen);
    let objList = collectionObjs.map((item) => ({
      ...createActivityObject(item, keyProp, valProp),
    }));
    const outObject = {};
    objList.map((item) => {
      const entry = item["type_option_activity_category_type"] || {
        display: "",
      };
      const catObj = outObject[entry.display] || [];
      outObject[entry.display] = [
        ...catObj,
        (item["name_text"] || "").toLowerCase(),
      ];
    });
    return outObject;
  }

  function createLookupCollection(objSet, keyProp, valProp = "") {
    let collectionLen = objSet.length();
    let collectionObjs = objSet.get(0, collectionLen);
    let outObject = {};
    collectionObjs.map(
      (item) =>
      (outObject = {
        ...outObject,
        ...createReplaceObject(item, keyProp, valProp),
      })
    );
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

  let addressFieldName = isTest ? "address_text_text" : "address__text__text";
  let addressNickname = "nickname_text";
  const propertyLookup = createLookupCollection(
    propertyObjList,
    addressNickname,
    addressFieldName
  );

  const STRPropertyLookUp = { ...propertyLookup };
  delete STRPropertyLookUp[undefined];
  let teamName = "name_text";
  let lastNameTeam = "last_name_text";
  const teamLookup = createTeamLookupCollection(
    teamObjList,
    teamName,
    lastNameTeam
  );
  const SpouseTeamLookup = createLTRTeamLookupCollection(
    teamObjList,
    teamName,
    lastNameTeam
  );

  function createDynamicObject(optionObj) {
    let objProps = optionObj.listProperties();
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = optionObj.get(propName);
    }
    return resObj;
  }

  function createDynamicDisplayObject(optionObj) {
    let val = createDynamicObject(optionObj);
    return val.display || "";
  }
  function createObject(
    objSet,
    categoryKey = "undefined",
    valProp = "undefined"
  ) {
    let objLength = objSet.length();
    const optionCollections = objSet.get(0, objLength);
    const outputObj = [];
    for (let x = 0; x < objLength; x++) {
      const optionObj = optionCollections[x];

      const resObj = createDynamicObject(optionObj);
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

    return outputObj;
  }

  let categoryLabel = isTest ? "category" : "activity_category_type";
  let subCatTimeCategoryLabel = isTest ? "time_category" : "type0";
  let subCatGroupLabel = isTest ? "group" : "group__os_";

  function STRgroupLookUps(data) {
    const condensed = [""];

    data.forEach((item) => {
      const display = item.display;
      condensed.push(display);
    });
    return condensed.map((item) => item.toLowerCase());
  }

  function groupLookUps(data) {
    const condensed = {};

    data.forEach((item) => {
      const time_category = item[categoryLabel];
      const display = item.display;

      if (!condensed[time_category]) {
        condensed[time_category] = [];
      }

      condensed[time_category].push((display || "").toString().toLowerCase());
    });

    return condensed;
  }

  function subgroupLookUps(data) {
    const condensed = {};

    data.forEach((item) => {
      const time_category = item[subCatTimeCategoryLabel];
      const group = item[subCatGroupLabel];
      const display = item.display;

      if (!condensed[time_category]) {
        condensed[time_category] = {};
      }

      if (!condensed[time_category][group.toLowerCase()]) {
        condensed[time_category][group.toLowerCase()] = [];
      }

      condensed[time_category][group.toLowerCase()].push(display);
    });

    return condensed;
  }

  const groupValidations = createObject(activityOptionList, categoryLabel);
  const activityValidations = createActivityLookupCollection(
    activityDataList,
    categoryLabel
  );
  logOut("LOOKUPS", "dataList", activityValidations);
  const LTRGroupLookUps = groupLookUps(groupValidations);
  logOut("LOOKUPS", "lookups", LTRGroupLookUps);
  if (!activityValidations[MaterialValues])
    activityValidations[MaterialValues] = [];
  if (!activityValidations[NonMaterialValues])
    activityValidations[NonMaterialValues] = [];
  activityValidations[MaterialValues].push("");
  activityValidations[NonMaterialValues].push("");
  const strActivityValidations = { ...activityValidations };
  delete strActivityValidations[NonMaterialValues];
  logOut("LOOKUPS", "STRActivity", strActivityValidations);
  logOut("LOOKUPS", "LTRActivity", activityValidations);

  const subCategoryValidations = createObject(
    activitySubcategory,
    subCatGroupLabel,
    subCatTimeCategoryLabel
  );
  const LTRSubGroupLookUps = subgroupLookUps(subCategoryValidations);

  const STRgroupValidations = createObject(activitySTROptionList);
  const STR_Activity_Groups = STRgroupLookUps(STRgroupValidations);
  logOut("LOOKUPS", "STR_LookUps", STR_Activity_Groups);

  const CategoryReplace = timeEntryCategoriesKeys;
  logOut("Material", "CategoryReplace", CategoryReplace);
  logOut("Material", "CategoryReplaceKeys", Object.keys(CategoryReplace));

  const objToFilterArraySet = (obj, match) => {
    const out = [];
    Object.keys(obj).map((item) => obj[item] === match && out.push(item));
    return out;
  };

  const YesNoLookupObj = {
    "": 0,
    yes: 1,
    no: 0,
    true: 1,
    false: 0,
  };

  const YesNoLookup = Object.keys(YesNoLookupObj);

  const CategoryLookup = [...Object.keys(CategoryReplace), ""];
  let LTRCategoryLookup = Object.keys(CategoryReplace);

  logOut("Material", "CategoryMaterialTrue", LTRCategoryLookup);
  logOut("Material", "CategoryLookup", CategoryLookup);
  logOut("Material", "YesNo", YesNoLookup);
  const CategoryMaterialYes = objToFilterArraySet(YesNoLookupObj, 1);
  logOut("Material", "CategoryMaterialYes", CategoryMaterialYes);

  const CategorySTRLookUp = objToFilterArraySet(CategoryReplace, 1);
  const CategorySTRLookUpWrong = objToFilterArraySet(CategoryReplace, 0);
  CategorySTRLookUp.push("");
  logOut("Material", "CategorySTRLookUp", CategorySTRLookUp);
  logOut("Material", "CategorySTRLookUpWrong", CategorySTRLookUpWrong);
  const MaterialCheck = [
    ...CategoryMaterialYes,
    ...objToFilterArraySet(CategoryReplace, 1),
  ];
  logOut("Material", "MaterialCheck", MaterialCheck);

  const LTRMaterialYesNoLookup = Object.keys(YesNoLookupObj);
  logOut("Material", "LTRMaterialYesNoLookup", LTRMaterialYesNoLookup);

  let typeLookUp = {
    str: "STR",
    ltr: "LTR",
    lt: "LTR",
    st: "STR",
    l: "LTR",
    s: "STR",
  };

  function supportOptional(val, optional, out) {
    return optional && (val === undefined || val === "") ? true : out();
  }

  function lookUp(table, val, valOverride) {
    return table.includes(valOverride || val.toLowerCase());
  }

  function lookUpTable(type, table, optional = false, valOverride = undefined) {
    if (Array.isArray(table)) {
      return (val) => {
        const actualVal = val || "";
        const isValid = supportOptional(
          actualVal.toLowerCase(),
          optional,
          () => lookUp(table, actualVal.toLowerCase(), valOverride) || false
        );

        return {
          isValid: isValid,
          cellValue: actualVal,
          type,
        };
      };
    } else {
      return replaceLookUp(type, table, optional, valOverride);
    }
  }

  function dynamicLookUpTableGroup2(
    type,
    table,
    optional = false,
    valOverride = undefined
  ) {
    if (Array.isArray(table)) {
      return dynamicLookUpVerify(
        type,
        (optional = false),
        (valOverride = undefined)
      );
    } else {
      return replaceLookUp2(type, table, optional, valOverride);
    }
  }

  function replaceLookUp2(type, replaceMatrix) {
    return (val, mresult, group) => {
      const replVal = replaceMatrix[mresult];

      return {
        isValid: replVal.includes(val.toLowerCase()),
        cellValue: val,
        type,
      };
    };
  }
  function replaceLookUp(type, replaceMatrix) {
    return (val) => {
      const replVal = replaceMatrix[(val || "").toLowerCase()];
      return {
        isValid: replVal !== undefined,
        cellValue: val,
        type,
      };
    };
  }

  function dynamicLookUpVerify(
    type,
    optional = false,
    valOverride = undefined
  ) {
    return (val, mresult) => {
      const validationVals = [...LTRGroupLookUps[mresult], ""].map((item) =>
        item.toLowerCase()
      );
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
  }

  function dynamicLookUpTableGroup(
    type,
    table,
    optional = false,
    valOverride = undefined
  ) {
    if (Array.isArray(table)) {
      return dynamicLookUpVerify(
        type,
        (optional = false),
        (valOverride = undefined)
      );
    } else {
      return replaceLookUp(type, table, optional, valOverride);
    }
  }

  function dynamicLookUpActivity(
    type,
    table,
    optional = false,
    valOverride = undefined
  ) {
    return (val, other, other2) => {
      const listData = table[other] || [];
      const exists = listData.includes(val.toLowerCase());
      //const replVal = table[(val || "").toLowerCase()];
      return {
        isValid: exists,
        cellValue: val,
        type,
      };
    };
  }

  function dynamicLookUpTableSubgroup(
    type,
    table = [],
    optional = false,
    valOverride = undefined
  ) {
    if (Array.isArray(table)) {
      return (val, mresult, group) => {
        const TypeGroup = LTRSubGroupLookUps[mresult];
        const SubTypeGroup = TypeGroup[group.toLowerCase()] || [];
        const validationVals = [...SubTypeGroup, ""].map((item) =>
          item.toLowerCase()
        );
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

  function dynamicLookUpTableSTRSubgroup(
    type,
    table,
    optional = false,
    valOverride = undefined
  ) {
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
  teamLookup[""] = OwnerId;
  //teamLookup[OwnerName.toLowerCase()] = OwnerId;
  const spouseList = Object.keys(SpouseTeamLookup).map(
    (item) => SpouseTeamLookup[item]
  );
  spouseList.push(OwnerId);
  SpouseTeamLookup[""] = OwnerId;
  SpouseTeamLookup[OwnerName.toLowerCase()] = OwnerId;

  const typesValidatorList = {
    Date: validateBaseType("Date", (val) => isValidDate(Date.parse(val))),
    Optional: validateBaseType("Optional", () => true),
    Number: validateBaseType("Number", (val) =>
      val === "" ? true : !isNaN(parseInt(val)) && val < 1000
    ),
    MinNumber: validateBaseType("Minutes", (val) =>
      val === "" ? true : !isNaN(parseInt(val)) && val >= 0 && val < 60
    ),
    PropertyLookUp: replaceLookUp("Property", propertyLookup),
    LTRMaterialPropertyLookUp: replaceLookUp("Property", STRPropertyLookUp),
    STRPropertyLookUp: replaceLookUp("Property", STRPropertyLookUp),
    TeamMemberLookUp: lookUpTable("Team Member", teamLookup, true),
    LTRTeamMemberLookUp: lookUpTable("Team Member", SpouseTeamLookup, true),
    MaterialLookUp: lookUpTable("Material", YesNoLookup),
    LTRMaterialLookUp: lookUpTable("Material", LTRMaterialYesNoLookup),
    CategoryLookUp: lookUpTable("Category", CategorySTRLookUp),
    LTRCategoryLookUp: lookUpTable("Category", LTRCategoryLookup),
    LtrActivityGroupLookUp: dynamicLookUpTableGroup("Activity Group", [""]),
    LtrActivitySubgroupLookUp: dynamicLookUpTableSubgroup("Activity Subgroup", [
      "",
    ]),
    StrActivitySubgroupLookUp: dynamicLookUpTableSTRSubgroup(
      "Activity Subgroup",
      [""]
    ),
    StrActivityGroupLookUp: lookUpTable("Activity Group", STR_Activity_Groups),
    TypeLookUp: lookUpTable("Type", Object.keys(typeLookUp), true),
    StrActivityLookUp: dynamicLookUpActivity(
      "Activity",
      strActivityValidations
    ),
    LtrActivityLookUp: dynamicLookUpActivity("Activity", activityValidations),
  };

  logOut("typesValidatorList", "typesValidatorList", typesValidatorList);

  logOut("LOOKUPS1", "strActivityValidations", strActivityValidations);
  logOut("LOOKUPS1", "activityValidations", activityValidations);
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
    activity: "LtrActivityLookUp",
  };

  logOut("typesValidatorList2", "typesValidatorList2", typesValidatorList);

  for (let i = 0; i < Object.keys(propertyLookup).length; i++) {
    if (i != 0) {
      LTRTypes["property " + i] = "PropertyLookUp";
    }
  }
  logOut("typesValidatorList3", "typesValidatorList3", typesValidatorList);

  const SubgroupColumns = [
    "activity subgroup",
    "subgroup",
    "activity subcategory",
    "subcategory",
  ];
  logOut("typesValidatorList4", "typesValidatorList4", typesValidatorList);

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
    activity: "StrActivityLookUp",
  };


  for (let i = 0; i < Object.keys(STRPropertyLookUp).length; i++) {
    if (i != 0) STRTypes["property " + (i + 1)] = "PropertyLookUp";
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
  function orderDuplicateCheck(originalObj) {
    const allKeys = Object.keys(originalObj);
    const propertyKeys = allKeys.filter((item) => item.startsWith("property"));
    const propertyVals = propertyKeys.map((item) => originalObj[item]).sort();
    const otherKeys = allKeys.filter((item) => !propertyKeys.includes(item));
    const outObj = {};
    otherKeys.map((item) => {
      outObj[item] = originalObj[item];
    });
    propertyKeys.map((item, index) => {
      outObj[item] = propertyVals[index];
    });

    return outObj;
  }
  function findDuplicateRows(arrayOfObjects) {
    const duplicates = {};
    const result = [];
    arrayOfObjects.forEach((obj, index) => {
      const lowerCaseObj = convertKeysToLowercase(obj);
      const objWithRowId = { ...lowerCaseObj, rowId: index };
      const orderObj = orderDuplicateCheck(lowerCaseObj);
      const key = JSON.stringify(orderObj, Object.keys(orderObj).sort());
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

      let processedItems = {};

      for (let x = 0; x < copiesArray.length; x++) {
        let item = copiesArray[x];
        let array = idArray.filter((index) => index !== item.rowId);

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

  const catFields = ["category", "material"];
  const fullCatReplace = {
    ...YesNoLookupObj,
    ...CategoryReplace,
  };

  function processLTRItem(obj, id, invalidCol = [], originalKeys) {
    const invalidColumns = invalidCol.map((item) => item.toLowerCase());
    let keys = Object.keys(obj);
    let keysLow = keys.map((item) => item.toLowerCase().replace("?", ""));
    let errors = "";

    let categoryField = "";
    if (!keysLow.includes("category") && !keysLow.includes("material"))
      errors = addError("Category is a required field for LTR", errors);
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
    for (let i = 0; i < keysLow.length; i++) {
      if (
        (keysLow[i] === "group" || keysLow[i] === "activity group") &&
        groupField === ""
      ) {
        groupField = keys[i];
      }
    }

    for (let i = 0; i < keys.length; i++) {
      const originalKey = originalKeys[i];
      let key = keys[i].toLowerCase().replace("?", "");
      const materialCheck = obj[categoryField]
        ? fullCatReplace[obj[categoryField].toString().toLowerCase()]
        : 0;

      const mresult = materialCheck === 1;

      const groupVal = obj[groupField] || "";
      if (key === "property") {
        if (mresult) key = "m" + key;
      }

      if (!invalidColumns.includes(key)) {
        const isCatField = catFields.includes(key);
        const res = typesValidatorList[LTRTypes[key]](
          obj[keys[i]],
          mresult ? MaterialValues : NonMaterialValues,
          groupVal
        );
        if (
          !res.isValid &&
          (!isCatField || (isCatField && key === categoryField))
        ) {
          let errMessage = `"${res.cellValue
            }" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined ? `in group of ´${res.category}´ ` : ""
            }for ${NonMaterialValuesShort} Long Term Rental`;
          if (res.cellValue === "")
            errMessage = `"${originalKey}" cannot be empty for ${NonMaterialValuesShort} Long Term Rental`;
          if (materialCheck === "") {
            if (res.cellValue !== "")
              errMessage = `"${res.cellValue
                }" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined
                  ? `in group of ´${res.category}´ `
                  : ""
                }for Long Term Rental`;
            else
              errMessage = `"${originalKey}" cannot be empty for Long Term Rental`;
          }
          if (mresult) {
            if (res.cellValue !== "")
              errMessage = `"${res.cellValue
                }" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined
                  ? `in group of ´${res.category}´ `
                  : ""
                }for ${MaterialValuesShort} Long Term Rental`;
            else
              errMessage = `"${originalKey}" cannot be empty for ${MaterialValuesShort} Long Term Rental`;
          }
          errors = addError(errMessage, errors);
        }

        if (key === "team member") {
          const keyVal = obj[key] || "";
          const teamVal = teamLookup[keyVal.toLowerCase()] || "";

          if (keyVal !== "" && !mresult && spouseList.includes(teamVal)) {
            errors = addError(
              `"${res.cellValue}" in column ´${originalKey}´ is not valid. Spouse hours must be Material`,
              errors
            );
          }
        }
      }
    }
    if (!isValidNumber(obj["minutes"]) && !isValidNumber(obj["hours"]))
      errors = addError("Hours and Minutes cannot be empty values.", errors);
    return { id, errors };
  }

  function processSTRItem(obj, id, invalidCol = [], originalKeys = []) {

    const invalidColumns = invalidCol.map((item) => item.toLowerCase());
    let Fullkeys = Object.keys(obj);
    let keys = Fullkeys.map((item) => item);
    let keysLow = keys.map((item) => item.toLowerCase().replace("?", ""));
    let errors = "";

    let groupField = "";
    let categoryField = "";
    for (let i = 0; i < keysLow.length; i++) {
      if (
        (keysLow[i] === "group" ||
          keysLow[i] === "activity group" ||
          keysLow[i] === "activity") &&
        groupField === ""
      ) {
        groupField = keys[i];
      }
      if (
        (keysLow[i] === "category" || keysLow[i] === "material") &&
        categoryField === ""
      ) {
        categoryField = keys[i];
      }
    }

    for (let i = 0; i < keys.length; i++) {
      const originalKey = originalKeys[i];
      const key = keys[i].toLowerCase().replace("?", "");
      const groupVal = obj[groupField] || "";
      const materialCheck = obj[categoryField]
        ? fullCatReplace[obj[categoryField].toString().toLowerCase()]
        : 0;
      const localCheck = [...MaterialCheck, ""];
      const lookUpFilter = STRTypes[key];

      const mresult = materialCheck === 1;

      if (key === "team member") {
        const keyVal = obj[key] || "";
        const teamVal = teamLookup[keyVal.toLowerCase()] || "";

        logOut("STR:TEAM", "obj", obj);

        logOut("STR:TEAM", "teamVal", teamVal);
        logOut("STR:TEAM", "spouseList", spouseList);
        logOut("STR:TEAM", "materialCheck", materialCheck);
        logOut("STR:TEAM", "mresult", mresult);
        logOut("STR:TEAM", "localCheck", localCheck);
        logOut("STR:TEAM", "MaterialCheck", MaterialCheck);
        logOut("STR:TEAM", "keyVal", keyVal);
        logOut("STR:TEAM", "groupVal", groupVal);
        logOut("STR:TEAM", "spouseCheck", !spouseList.includes(teamVal));
        logOut(
          "STR:TEAM",
          "groupCheck",
          groupVal !== "" && (mresult || materialCheck === "")
        );
        if (keyVal !== "" && !spouseList.includes(teamVal)) {
          if (groupVal !== "" && !mresult) {
            errors = addError(
              "Group must be empty for STR unless Team Member is a spouse or owner",
              errors
            );
          } else if (groupVal === "" && mresult) {
            errors = addError(
              "STR entries for non-spouse team members do not count towards your REPS hours, and thus are not Material Participation",
              errors
            );
          }
        }
      }
      if (!invalidColumns.includes(key)) {
        logOut("Material", "filter", lookUpFilter);
        if (lookUpFilter === "CategoryLookUp" && obj[keys[i]] === 0) {
          errMessage = `STR entries do not support ${NonMaterialValuesShort} as a Category value.  Only empty or ${MaterialValuesShort} values are supported`;
          errors = addError(errMessage, errors);
        } else {
          const res = typesValidatorList[STRTypes[key]](
            obj[keys[i]],
            MaterialValues,
            groupVal || ""
          );


          if (!res.isValid) {
            let errMessage = `"${res.cellValue
              }" in column ´${originalKey}´ is not a valid ${res.type} type ${res.category !== undefined ? `in group of ´${res.category}´ ` : ""
              }for Short Term Rental`;
            if (res.cellValue === "")
              errMessage = `"${originalKey}" cannot be empty for Short Term Rental`;

            if (SubgroupColumns.includes(key))
              errMessage = `Short Term Rental entries do not use the "${originalKey}" column`;
            errors = addError(errMessage, errors);
          }
        }
      }
    }
    if (!isValidNumber(obj["minutes"]) && !isValidNumber(obj["hours"]))
      errors = addError("Hours and Minutes cannot be empty values.", errors);


    return { id, errors };
  }

  function createErrorData(objResults) {
    const errorObjs = objResults.filter((item) => item.errors !== "");

    let errCount = 0;
    errorObjs.map((item) => (errCount += item.errors.split("|").length));

    return { data: errorObjs, count: errCount };
  }

  function processData(rowObj, str, originalKeys) {
    const firstItem = rowObj[0] || {};
    const headerKeys = Object.keys(firstItem || {}).map((item) =>
      item.toLowerCase()
    );
    const isActivity = headerKeys.includes("activity");
    typeLookUp[""] = str;
    logOut("rows", rowObj);

    let objResults = [];
    const dupeStyle = convertToDuplicatesStructure(rowObj, isActivity);
    const duplicates = findDuplicateRows(dupeStyle);
    const currentColumns = Object.keys(rowObj[0]);
    const availableColumns = Object.keys(LTRTypes).filter(
      (item) => item !== "mproperty"
    );
    const invalidColumns = currentColumns.filter(
      (item) =>
        !availableColumns
          .map((item) => item.toLowerCase())
          .includes(item.replace("?", "").toLowerCase())
    );

    for (let i = 0; i < rowObj.length; i++) {
      let typeVal = str;
      if (rowObj[i].type && rowObj[i].type !== "") {
        typeVal = typeLookUp[rowObj[i].type.toLowerCase()];
      }

      if (typeVal === undefined) {
        objResults = [
          ...objResults,
          {
            id: i,
            errors: `Unable to process row due to invalid type \`${rowObj[i].type} \` specified. Please enter "LTR", "STR", or leave blank`,
          },
        ];
      } else {
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

    const errors = createErrorData(objResults);

    return {
      errors: errors.data,
      errorCount: errors.count,
      csv: rowObj,
      duplicates: createDuplicatesObject(duplicates),
      columnWarnings: invalidColumns,
      validColumns: availableColumns.map((item) => CapitalizeWord(item)),
    };
  }

  function normalizeKeys(objects) {
    return objects.map((obj) => {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Convert key to lowercase and remove punctuation
          let newKey = key.toLowerCase().replace(/[?!.]/g, "");
          //Activity Group
          if (newKey === "group") newKey = "activity group";
          //Activity Subcategory
          if (newKey === "subcategory" || newKey === "subgroup")
            newKey = "activity subcategory";
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

  async function parseCSVForValidation(csv_text) {
    let { data: csv_content } = Papa.parse(csv_text, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: "greedy",
    });
    //let csv_content = res.data;

    const originalKeys = Object.keys(csv_content[0]);
    logOut("CSV", "rows", normalizeKeys(csv_content));
    const res = processData(
      normalizeKeys(csv_content),
      investorType,
      originalKeys
    );
    return res;
  }

  function incrementItemsInArray(array) {
    const newArr = [];
    array.map((item) => newArr.push(item + 1));
    return newArr;
  }

  function convertDataToLowerAndTrim(obj, excludeKeys) {
    const STRColumns = [...Object.keys(STRTypes), ...SubgroupColumns];
    const LTRColumns = [...Object.keys(LTRTypes), ...SubgroupColumns];

    // Merge the two arrays and remove duplicates
    const mergedColumns = [...new Set([...STRColumns, ...LTRColumns])];

    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && mergedColumns.includes(key)) {
        if (excludeKeys.includes(key)) {
          // Keep the original value for excluded keys
          result[key] = obj[key];
        } else {
          const value = obj[key];
          if (typeof value === "string") {
            // Lowercase the value if it's a string
            result[key] = value.toLowerCase();
          } else {
            // Keep the original value if it's not a string
            result[key] = value;
          }
        }
      }
    }
    return result;
  }
  function convertDataToLowerAndTrimList(objs, excludeKeys) {
    const outData = objs.map((item) =>
      convertDataToLowerAndTrim(item, excludeKeys)
    );
    return outData;
  }
  function isValidDateType(dateString) {
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
  }

  function convertDuplicate(item, isActivity = false) {
    let keys = Object.keys(item);
    item["isActivity"] = isActivity;

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

    const rowType = typeLookUp[(item["type"] || investorType).toLowerCase()];

    const dateTest = isValidDateType(item["date"])
      ? new Date(item["date"])
      : new Date(Date.now());
    item["date"] = dateTest.getTime();
    item["team member"] = teamLookup[(item["team member"] || "").toLowerCase()];
    item["type"] = rowType;

    if (item["minutes"] === "") item["minutes"] = "0";
    if (item["hours"] === "") item["hours"] = "0";

    let replaceObj =
      categoryField === "category" ? CategoryReplace : YesNoLookupObj;
    logOut("Duplicates", "CategoryReplace", CategoryReplace);
    logOut("Duplicates", "YesNoLookupObj", YesNoLookupObj);
    if (rowType === "LTR")
      item["category"] =
        rowType === "LTR"
          ? replaceObj[(item[categoryField] || "").toLowerCase()]
          : 1;
    else item["category"] = 404;

    const idArray = Object.keys(item).filter((item) =>
      item.startsWith("property")
    );
    const properties = [];
    for (let x = 0; x < idArray.length; x++) {
      properties.push(propertyLookup[(item[idArray[x]] || "").toLowerCase()]);
      item[idArray[x]] = propertyLookup[item[idArray[x]]];
      delete item[idArray[x]];
    }
    item["properties"] = properties.filter((item) => item !== "").sort();
  }

  function convertToDuplicatesStructure(duplicates, isActivity = false) {
    let duplicatesArray = convertDataToLowerAndTrimList(
      duplicates.map((item) => JSON.parse(JSON.stringify(item))),
      ["description", "date", "type"]
    ); // Deep copy each object
    for (let i = 0; i < duplicatesArray.length; i++) {
      convertDuplicate(duplicatesArray[i], isActivity);
    }
    return duplicatesArray;
  }

  function convertToDuplicates(duplicatesArray) {
    return duplicatesArray
      .filter((item) => item.duplicates[0] < item.rowId)
      .map((item) => {
        logOut("DUPLICATES", "original", item.duplicates);
        logOut("DUPLICATES", "new", incrementItemsInArray(item.duplicates));
        return {
          ...item,
          duplicates: incrementItemsInArray(item.duplicates),
          original: item.duplicates.sort()[0],
        };
      });
  }

  parseCSVForValidation(instance.data.csv_text).then((result) => {
    logOut("Final", result);
    logOut("LOOKUP", "property lookup", propertyLookup);
    logOut("LOOKUP", "Primary Account Holder", OwnerName);
    logOut("LOOKUP", "Primary Account Holder", OwnerId);

    logOut("LOOKUP", "result", result);
    logOut("LOOKUP", "result.csv", result.csv);

    const firstItem = result.csv[0];
    logOut("LOOKUP", "result.csv[0]", firstItem);
    logOut("LOOKUP", "keys", Object.keys(firstItem));
    const headerKeys = Object.keys(result.csv[0] || {}).map((item) =>
      item.toLowerCase()
    );
    logOut("LOOKUP", "headerKeys", headerKeys);
    logOut("LOOKUP", "isActivity", headerKeys.includes("activity"));
    instance.publishState("isActivity", headerKeys.includes("activity"));

    logOut("LOOKUP", "teamLookup", teamLookup);
    logOut("LOOKUP", "LTRTeamLookup", SpouseTeamLookup);
    logOut("LOOKUP", "spouse list", spouseList);

    logOut("LOOKUP", "LTR grouplookups", LTRGroupLookUps);
    logOut("LOOKUP", "LTR sublookups", LTRSubGroupLookUps);
    logOut("LOOKUP", "STRgrouplookups", STR_Activity_Groups);

    logOut("LOOKUP", "testVal", isTest);

    if (result.errors.length > 0) {
      logOut("NO UPLOADING!");
    } else {
      logOut("VALID YOU MAY UPLOAD");
    }

    logOut("DUPLICATES", "duplicates", result.duplicates);
    const dupeResult = convertToDuplicates(
      result.duplicates,
      headerKeys.includes("activity")
    );
    logOut("DUPLICATES", "dupeResult", dupeResult);
    const defaultDupeSkips = dupeResult.map((item) => item.rowId).sort();

    let dupCount = defaultDupeSkips.length;
    let errCount = result.errors.length;

    logOut("DUPLICATES", "new dupe result", defaultDupeSkips);
    instance.publishState("defaultDuplicateSkipIds", defaultDupeSkips);
    instance.publishState(
      "defaultDuplicateSkips",
      incrementItemsInArray(defaultDupeSkips)
    );
    instance.publishState("errorCount", errCount);
    instance.publishState("duplicateCount", dupCount);
    instance.publishState("rowCount", result.csv.length);

    function sortByOriginal(arr) {
      return arr.sort((a, b) => {
        if (a.original < b.original) return -1;
        if (a.original > b.original) return 1;
        return 0;
      });
    }

    instance.publishState(
      "duplicates",
      errCount === 0 ? updateListWithPrefix(sortByOriginal(dupeResult)) : []
    );

    instance.publishState("newerrortype", updateListWithPrefix(result.errors));

    instance.publishState("errors", updateListWithPrefix(result.errors));

    if (errCount === 0) {
      instance.triggerEvent("fileisvalidated");
    }

    return 1;
  });
}
