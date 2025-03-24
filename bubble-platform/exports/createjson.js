async function(properties, context) {
    const listDelim = await properties.listDelimiter;
    let errLog = "";

    function logError(err) {
        errLog += err + "\n";
    }

    function sanitizeValueOrKey(val) {
        let value = (val || "").trim();
        // if (value.endsWith('":')) value = value.slice(0, -2).trim();
        return value
    }

    function sanitizeValue(val) {
        let retVal = sanitizeValueOrKey(val)
        //if (retVal.startsWith(`"`) && retVal.startsWith(`"`) === "") retVal = "";
        return retVal;
    }


    function sanitizeKey(val) {
        let retVal = sanitizeValueOrKey(val)
        //if (retVal.startsWith(`"`) && retVal.startsWith(`"`) !== "") retVal = retVal.replace(`"`, '');
        return retVal;
    }

    function sanitizeUserData(data) {
        logError("DataSet: " + data);
        const newData = data.split("|split_item|")
        const objRes = newData.map((item, ItemIndex) => {
            logError("\n");
            logError(`-Item ${ItemIndex}: ` + item);
            const obj = (item || "").trim().replaceAll('|split|\n', '|split|').split('|split|');
            const outObj = {};
            obj.map((item) => {
                item = sanitizeValueOrKey(item).trim();
                const objData = item.split('|value|');
                let key = sanitizeKey(objData[0] || "");
                let value = sanitizeValue(objData[1] || "");
                logError("--key: " + key);
                logError("--value: " + value);
                logError("\n");
                if (key !== "") outObj[key] = (value || "")
                return outObj;
            });
            logError("\n");
            return outObj;
        });
        return objRes;
    }


    function normalizeExport(items) {
        if (!Array.isArray(items)) {
            return; // Ensure items is an array before processing
        }
        const normalizedItems = []

        items.forEach(item => {
            const newItem = {};
            for (let key in item) {
                const itemValue = item[key];
                if (item.hasOwnProperty(key) && itemValue === "") {
                    //delete item[key];
                } else if (itemValue.includes(listDelim)) {

                    const values = itemValue.split(listDelim);
                    values.forEach((value, index) => {
                        if (index > 0) {
                            let columnLabel = key + " " + (index + 1)
                            newItem[columnLabel] = value;

                        } else {
                            newItem[key] = value;
                        }
                    });
                } else {
                    newItem[key] = itemValue;
                }
            }
            normalizedItems.push(newItem)
        });

        return normalizedItems;
    }

    let items = undefined;
    //const items = JSON.parse(output);
    let err = false;
    let itemOne = ""
    let tVal = "";
    try {
        /*const output = escapeJsonString(properties.items);
        tVal = output;*/
        const parsedJSON = sanitizeUserData(properties.items || "");
        items = normalizeExport(parsedJSON);
        itemOne = JSON.stringify(items[0] || {})
    } catch (error) {
        err = error.message;

        logError("\n\nError: " + error.message);
    }

    return {
        json_output: JSON.stringify(items),
        error: errLog ? errLog : "",
        original: properties.items,
    }
}