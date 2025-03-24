async function(properties, context) {
  // Use the node-fetch module to make an HTTP request
  async function createReplaceObject(objSet, keyProp, valProp = "") {
    let objProps = await objSet.listProperties();
    //console.log(objProps);
    let totalProps = objProps.length;
    let resObj = {};

    for (let i = 0; i < totalProps; i++) {
      let propName = objProps[i];
      resObj[propName] = await objSet.get(propName);
    }
    //console.error("test", resObj)

    //console.log("res", resObj);
    //console.log("keyVal", resObj[keyProp]);
    //console.log("valProp", resObj[valProp]);

    let outObj = {};
    outObj[resObj[keyProp]] = resObj["_id"];
    if (valProp !== "") outObj[resObj[valProp]] = resObj["_id"];

    //console.error("out", outObj);

    return outObj;
  }

  async function createFinalObject(item, keyProp, valProp) {
    const replObj = await createReplaceObject(item, keyProp, valProp);
    //console.error('repl', replObj)
    return replObj;
  }

  async function createLookupCollection(objSet, keyProp, valProp = "") {
    let outObject = {};
    let collectionLen = await objSet.length();

    //console.error('length', collectionLen);
    let collectionObjs = await objSet.get(0, collectionLen);
    //console.error("collection", collectionObjs);
    //testing again
    //let test = await Promise.all(collectionObjs.map(createFinalObject(keyProp, valProp)));
    for (const item of collectionObjs) {
      const replObj = await createFinalObject(item, keyProp, valProp);
      //console.log("second", replObj)
      outObject = {
        ...outObject,
        ...replObj,
      };
    }

    //console.error('test', test);
    //console.error("final", outObject);
    return outObject;
  }

  //console.log("Collections");
  //console.log("init value", properties.Property);
  let isTest = properties.istest;
  let propertyObjList = properties.Properties;
  let teamObjList = properties.TeamMember;
  //console.log("test1", propertyObjList);
  //console.log(properties)

  let addressFieldName = isTest ? "address_text_text" : "address__text__text"; //"address__text__text"
  let addressNickname = "nickname_text";
  const propertyLookup = await createLookupCollection(
    propertyObjList,
    addressNickname,
    addressFieldName
  );
  //console.error("property lookup", propertyLookup);
  let teamName = "name_text";
  const teamLookup = await createLookupCollection(teamObjList, teamName);

  let test = properties.optiontest;
  let test2 = properties.optiondata;

  function getOptionsObject(optionObject) {
    let optionLength = optionObject.length();
    let optionsList = optionObject.get(0, optionLength);
    //console.log(optionsList);
    let fullOptions = [];

    for (const item of collectionObjs) {
      const properties = item.listProperties();

      let createdObj = {};
      for (const prop in properties) {
        const val = item.get(prop);
        createdObj[prop] = val;
      }
      //console.log(createdObj);
    }
  }

  async function getOptionsObjects(optionObject) {
    let optionLength = await optionObject.length();
  }
  //console.error("teamLookup", teamLookup);

  const MaterialReplace = {
    yes: "Material Participation",
    no: "General Real Estate Activity",
    YES: "Material Participation",
    NO: "General Real Estate Activity",
    Yes: "Material Participation",
    No: "General Real Estate Activity",
    true: "Material Participation",
    false: "General Real Estate Activity",
    undefined: "General Real Estate Activity",
    "": "General Real Estate Activity",
    Material: "Material Participation",
    General: "General Real Estate Activity",
    material: "Material Participation",
    general: "General Real Estate Activity",
    MATERIAL: "Material Participation",
    GENERAL: "General Real Estate Activity",
    "General Real Estate": "General Real Estate Activity",
    "Material Participation": "Material Participation",
    "general real estate": "General Real Estate Activity",
    "material participation": "Material Participation",
    G: "General Real Estate Activity",
    M: "Material Participation",
    g: "General Real Estate Activity",
    m: "Material Participation",
  };

  //console.log("CSVToData");
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
      Type: type,
    };
  }

  const Papa = require("papaparse");

  Papa.parsePromise = function (file, options) {
    return new Promise(function (complete, error) {
      Papa.parse(file, { ...options, complete, error });
    });
  };
  const str = await properties.csv_data;

  const investorType = await properties.investortype;
  const res = await Papa.parsePromise(str, {
    download: false,
    header: true,
    dynamicTyping: false,
    skipEmptyLines: "greedy",
  });

  let headerArray = res.data[0]; // This gets the column headers from the CSV and sets them as an array of texts
  let csv_rows = Object.keys(res.data).length - 1;

  console.log("csv keys", Object.keys(res.data));
  const entryArray = [];
  for (let i = 0; i <= csv_rows; i += 1) {
    //console.error(res.data)
    const objKeys = Object.keys(res.data[i]).filter((item) =>
      item.startsWith("Property")
    );
    console.log("item keys", objKeys);

    //console.error('add', res.data[i]["Property Address"])
    const propertyVal = propertyLookup[res.data[i]["Property Address"]];
    //console.error('valRes', propertyVal)
    const hasType = res.data[i].Type !== undefined;
    //   console.log("testing", res.data[i].Material);
    //   console.log("testing2", res.data[i].Category);
    const propertyArray = objKeys
      .map((item) => propertyLookup[res.data[i][item]])
      .filter((item) => item);
    const descArray = objKeys
      .map((item) => res.data[i][item])
      .filter((item) => item);
    console.log("property", propertyArray);
    const slice = createTimeEntry(
      res.data[i]["Activity Group"] ? res.data[i]["Activity Group"] : res.data[i]["Group"],
      res.data[i]["Activity Subcategory"] ? res.data[i]["Activity Subcategory"] : res.data[i]["Activity Subgroup"],
      res.data[i].Date,
      res.data[i].Description,
      res.data[i].Hours,
      res.data[i].Minutes,
      propertyArray.join("|"),
      teamLookup[res.data[i]["Team Member"]],
      MaterialReplace[res.data[i].Category],
      hasType ? res.data[i].Type : investorType
    );

    //console.log(slice);

    entryArray.push(slice);
  }

  function arrayToList(array) {
    const list = [];

    array.map((item) => list.push(item));
    return list;
  }

  function getKey(key, entryArray) {
    return arrayToList(entryArray.map((item) => item[key]));
  }

  return {
    Date: getKey("Date", entryArray),
    Description: getKey("Description", entryArray),
    Hours: getKey("Hours", entryArray),
    Minutes: getKey("Minutes", entryArray),
    "Property Address": getKey("Property Address", entryArray),
    "Team Member": getKey("Team Member", entryArray),
    Material: getKey("Material", entryArray),
    "Activity Group": getKey("Activity Group", entryArray),
    "Activity Subcategory": getKey("Activity Subcategory", entryArray),
    "Investor Type": getKey("Type", entryArray),
  };
}
