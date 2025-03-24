async function(properties, context) {
    // Use the node-fetch module to make an HTTP request
    const moment = require('moment-timezone');
    const currentUserId = await properties.OwnerId//context.currentUser.get('_id')
    const timeCategoryData = await properties.TimeCategoryData
    const generalCategoryValues = await properties.GeneralCategoryValues;
    const materialCategoryValues = await properties.MaterialCategoryValues;
  
    async function iterOverArray(option, out) {
      console.log(out)
      console.log("ITS ARRAY")
      console.log(Object.keys(option))
      const timeEntryCatLength = await option.length();
      const timeEntryCatValues = await option.get(0,timeEntryCatLength)
      return iterOverObject(timeEntryCatValues);
    }
  
    async function iterOverFields(option, out) {
      console.log(Object.keys(option))
  
      const outPut = {}
      const timeEntryCatProps = await option.listProperties();
      for(let i = 0; i < timeEntryCatProps.length;i++)
      {
        const fieldName = timeEntryCatProps[i];
        console.log("fieldName", fieldName);
        const timeEntryValue = await option.get(fieldName);
        console.log("timeEntryValue", timeEntryValue)
        const objData = await iterOverObject(timeEntryValue, out)
        outPut[fieldName] = objData;
  
      }
      console.log(outPut);
      return outPut;
    }
  
    let isString = value => typeof value === 'string' || value instanceof String;
  
    async function iterOverObject(option, out) {
      out
      if(option.listProperties) {
        console.log("Object Keys", Object.keys(option))
        console.log("fields")
        return await iterOverFields(option, out);
      }
      else if (Array.isArray(option)){
        const outArry = [];
        console.log("Array",option)
        for (const item of option) {
          outArry.push(await iterOverObject(item, out));
      }
        return outArry;
  
      } else if(isString(option)) {
        return option;
      } else if(option.length && option.get) {
        console.log("Object Keys", Object.keys(option))
        console.log("option",option)
        console.log("length true")
        return await iterOverArray(option, out);
      } else {
        console.log(option);
        return option;
      }
    }
  
    function convertTimeCategoryList(list) {
      return list.map(item => {
  
        console.log("item", item)
        return ({
        short: item.short0,
        shorter: item.short,
        shortest: item.shorter,
        values: item.system_values,
        id: item.system_identifier0,
      })
    })
    }
  
    function convertTimeCategoryListToKeys(list) {
      const keySet = {};
  
      list.map(obj => {
        obj.values.map(item => keySet[(item || "").toLowerCase()] = obj.id)
      })
      return keySet;
    }
    /*console.log("Time Entry Category",timeCategoryData);
    const timeEntryCategory = await iterOverObject(timeCategoryData);
    console.log("timeEntryCategory",timeEntryCategory);
    const timeEntryCategories = convertTimeCategoryList(timeEntryCategory)
    console.log("timeEntryCategories", timeEntryCategories)
  
    const timeEntryCategoriesKeys = convertTimeCategoryListToKeys(timeEntryCategories)
    console.log("timeEntryCategoriesKeys", timeEntryCategoriesKeys)*/
  
    console.log("timeCategoryData", timeCategoryData)
  
    function addOneDay(date) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
  }

  function removeOneDay(date) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
  }
  
    function getTimeZoneOffset(timeZone, date = new Date()) {
      const offsetMinutes = moment.tz(date, timeZone).utcOffset();
      const offsetHours = offsetMinutes / 60; // Convert minutes to hours
      return offsetHours;
    }
  
    async function createReplaceObject(objSet, keyProp, valProp = "") {
      let objProps = await objSet.listProperties();
      //console.log(objProps);
      let totalProps = objProps.length;
      let resObj = {};
  
      for (let i = 0; i < totalProps; i++) {
        let propName = objProps[i];
        resObj[propName] = await objSet.get(propName);
      }
  
      //console.log("res", resObj);
      //console.log("keyVal", resObj[keyProp]);
      //console.log("valProp", resObj[valProp]);
  
      let outObj = {};


      const keyPropData = resObj[keyProp];
      const valPropData = resObj[valProp];

      if (keyPropData !== undefined && keyPropData !== null) {
        outObj[(keyPropData || "").toLowerCase()] = resObj["_id"];
      }

      if (valPropData !== "" && valPropData !== null && valPropData !== undefined) {
        outObj[(valPropData || "").toLowerCase()] = resObj["_id"];
      } 
  
      //console.error("out", outObj);
  
      return outObj;
    }
  
    async function createTeamReplaceObject(objSet, keyProp, valProp = "") {
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
  
      const keyPropData = resObj[keyProp];
      const valPropData = resObj[valProp];
      if (valPropData !== "" && valPropData !== null && valPropData !== undefined) {
        outObj[(keyPropData || "").toLowerCase() + (" " + valPropData || "").toLowerCase()] = resObj["_id"];
      } else {
        if (keyPropData !== undefined && keyPropData !== null) {
          outObj[(keyPropData || "").toLowerCase()] = resObj["_id"];
        }
      }
  
      //console.error("out", outObj);
  
      return outObj;
    }
  
    async function createFinalObject(item, keyProp, valProp) {
      const replObj = await createReplaceObject(item, keyProp, valProp);
      //console.error('repl', replObj)
      return replObj;
    }
  
    async function createTeamFinalObject(item, keyProp, valProp) {
      const replObj = await createTeamReplaceObject(item, keyProp, valProp);
      //console.error('repl', replObj)
      return replObj;
    }
  
    function removeSecondOccurrence(data) {
      return data.map(item => {
        const keys = Object.keys(item);
        const lowerKeys = keys.map(item => item.toLowerCase().replace(/[?!.]/g, ''))
          let materialIndex = lowerKeys.indexOf('material');
          let categoryIndex = lowerKeys.indexOf('category');
          // If both columns exist
          if (materialIndex !== -1 && categoryIndex !== -1) {
             if (materialIndex > categoryIndex) {
                  delete item[keys[materialIndex]]
              } else {
                  delete item[keys[categoryIndex]]
              }
          }
          return item;
      });
  }
  
    function normalizeKeys(objects) {
      const renamedObjects = removeSecondOccurrence(objects);
      return renamedObjects.map(obj => {
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
            if (newKey === "material") newKey = "category";
            newObj[newKey] = obj[key];
          }
        }
        return newObj;
      });
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
  
    async function createTeamLookupCollection(objSet, keyProp, valProp = "") {
      let outObject = {};
      let collectionLen = await objSet.length();
  
      //console.error('length', collectionLen);
      let collectionObjs = await objSet.get(0, collectionLen);
      //console.error("collection", collectionObjs);
      //testing again
      //let test = await Promise.all(collectionObjs.map(createFinalObject(keyProp, valProp)));
      for (const item of collectionObjs) {
        const replObj = await createTeamFinalObject(item, keyProp, valProp);
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
    const teamLookup = await createTeamLookupCollection(teamObjList, teamName, "last_name_text");
  
    teamLookup[""] = currentUserId;
  
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
    const generalOutputValue = "General Real Estate Activity";
    const MaterialReplace = {
      yes: "Material Participation",
      no: generalOutputValue,
      true: "Material Participation",
      false: generalOutputValue,
      undefined: generalOutputValue,
      "": generalOutputValue,
      material: "Material Participation",
      general: generalOutputValue,
      "general real estate": generalOutputValue,
      "general real estate activity": generalOutputValue,
      "general real estate": generalOutputValue,
      "material participation": "Material Participation",
      "material participation activity": "Material Participation",
      g: generalOutputValue,
      m: "Material Participation",
      other: generalOutputValue,
      "qualifying non-material hours": generalOutputValue,
      "non-material hours": generalOutputValue,
      "non-material": generalOutputValue,
      "nm": generalOutputValue,
    };
  
    const typeLookUp = {
      "str": "STR", "ltr": "LTR", "lt": "LTR", "st": "STR", "l": "LTR", "s": "STR"
    }
  
    const generalCategoryValues2 = await iterOverObject(generalCategoryValues);
    const materialCategoryValues2 = await iterOverObject(materialCategoryValues);
    const catOptions = {};
    generalCategoryValues2.push("no")
    generalCategoryValues2.push("false")
    generalCategoryValues2.push("n")
    generalCategoryValues2.push("")
    materialCategoryValues2.push("yes")
    materialCategoryValues2.push("true")
    materialCategoryValues2.push("y")
    generalCategoryValues2.map(item => catOptions[item.toLowerCase()] = 0);
    materialCategoryValues2.map(item => catOptions[item.toLowerCase()] = 1);
  
    const catOptionsSTR = {...catOptions}
    catOptionsSTR[""] = 1
    //console.log("CSVToData");
    function createTimeEntry(
      group,
      subcategory,
      activity,
      date,
      desc,
      hours,
      minutes,
      property,
      member,
      material,
      type
    ) {
      const isSTR = type === "STR";
      return {
        Date: date,
        Description: desc,
        //Description: JSON.stringify(catOptions),
        Hours: hours,
        Minutes: minutes,
        "Property Address": property,
        "Team Member": member,
        Material: isSTR ? catOptionsSTR[material.toLowerCase()] || 1 : catOptions[material.toLowerCase()] || 0 ,
        "Activity Group": group,
        "Activity": activity,
        "Activity Subcategory": subcategory,
        Type: type,
        Converted: (parseInt(hours) * 60) + parseInt(minutes),
      };
    }

    function convertToNoon(dateInput) {
      // Ensure dateInput is a Date object
      if (!(dateInput instanceof Date)) {
        dateInput = new Date(dateInput);
      }
  
      // Set hours and minutes to noon (12:00 PM)
      /* dateInput.setHours(12);
       dateInput.setMinutes(0);
       dateInput.setSeconds(0);
       dateInput.setMilliseconds(0);*/
      //const dateNoon = convertToTimeZoneNoon(dateInput, context.userTimezone);

      const options = {
        timeZone: context.userTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
  
      const formatter = new Intl.DateTimeFormat([], options);
      const parts = formatter.formatToParts(dateInput);
  
      const year = parts.find(part => part.type === 'year').value;
      const month = parts.find(part => part.type === 'month').value;
      const day = parts.find(part => part.type === 'day').value;
      const offset = getTimeZoneOffset(context.userTimezone, dateInput);
  
      // Construct a new Date object with the converted date and set the time to noon
      let dateString = "";
      if(offset > 12) {
        const dayVal = 24 - (offset - 12);
        dateString = `${year}-${month}-${day}T${dayVal >= 10 || dayVal <= -10 ? dayVal : "0" + dayVal}:00:00`
      } else {
        const dayVal = 12 - offset;
        dateString = `${year}-${month}-${day}T${dayVal >= 10 || dayVal <= -10 ? dayVal : "0" + dayVal}:00:00`
      }

      //dateString = offset > 12 ? `${year}-${month}-${day}T${24 - (offset - 12)}:00:00` : `${year}-${month}-${day}T${12 - offset}:00:00`;
     
      let dateNoon = new Date(dateString);

      if(offset < 0) dateNoon = addOneDay(new Date(dateNoon))
      if(offset > 12) dateNoon = removeOneDay(new Date(dateNoon))
      //if(offset === -12) dateNoon = new Date(dateNoon.setDate(dateNoon.getDate() + 1)) 
      // return {date: dateNoon, message: JSON.stringify({
      //   timezone: context.userTimezone,
      //   offset,
      //   dateNoon,
      //   dateString,
      //   offsetCalc: offset > 12,
      //   convertedDateString: new Date(dateString)
      // })};

      return dateNoon;
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
  
    const val = res.data;
    res.data = normalizeKeys(res.data);
    
  
    let headerArray = res.data[0]; // This gets the column headers from the CSV and sets them as an array of texts
    let csv_rows = Object.keys(res.data).length - 1;

    console.error('csv_rows', csv_rows)
    console.log('csv_rows', csv_rows)
  
    //console.log("csv keys", Object.keys(res.data));
    const entryArray = [];
    for (let i = 0; i <= csv_rows; i += 1) {
      //console.error(res.data)
      const objKeys = Object.keys(res.data[i]).filter((item) =>
        item.startsWith("property")
      );
  
      const descObj = JSON.stringify(res.data[i]);
      //console.log("item keys", objKeys);
      //console.log("keyItems", Object.keys(res.data[i]));
  
      //console.error('add', res.data[i]["Property Address"])
      //console.error('valRes', propertyVal)
      console.error("TESTING", JSON.stringify(res.data[i]))
      const category = (res.data[i].category || "").toLowerCase()
      const hasType = res.data[i].type !== undefined;
      const typeVal = hasType ? typeLookUp[res.data[i].type.toLowerCase()] : investorType
      //   console.log("testing", res.data[i].Material);
      //   console.log("testing2", res.data[i].Category);
      const propertyArray = objKeys
        .map((item) => propertyLookup[(res.data[i][item] || "").toLowerCase()]);
  
      const uniquePropertyArray = propertyArray.filter((item, index, arr) =>
        arr.indexOf(item) === index
      );
      //const descArray = await context.currentUser.get('_id')
      //console.log("property", propertyArray);
      console.error("Item", res.data[i])
      console.log("Item", res.data[i])
      const slice = createTimeEntry(
        res.data[i]["activity group"],
        res.data[i]["activity subcategory"],
        res.data[i]["activity"],
        convertToNoon(res.data[i].date),
        res.data[i].description,
        res.data[i].hours || 0,
        res.data[i].minutes || 0,
        uniquePropertyArray.join("|"),
        teamLookup[(res.data[i]["team member"] || "").toLowerCase()],
        typeVal === "STR" ? MaterialReplace["yes"] : MaterialReplace[category] || category ,
        typeVal
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
  
    console.error("Date", JSON.stringify(getKey("Date", entryArray)));
    console.log("Date", getKey("Date", entryArray));
  
    return {
      Date: getKey("Date", entryArray),
      Description: getKey("Description", entryArray),
      //Description: [dateOutput],
      Hours: getKey("Hours", entryArray),
      Minutes: getKey("Minutes", entryArray),
      "Property Address": getKey("Property Address", entryArray),
      "Team Member": getKey("Team Member", entryArray),
      Material: getKey("Material", entryArray),
      "Activity Group": getKey("Activity Group", entryArray),
      "Activity Subcategory": getKey("Activity Subcategory", entryArray),
      "Activity": getKey("Activity", entryArray),
      "Investor Type": getKey("Type", entryArray),
      "Converted Time to Minutes": getKey("Converted", entryArray),
	  "timezone": context.userTimezone
      //"Converted Time to Minutes": "string",
    };
  }
  