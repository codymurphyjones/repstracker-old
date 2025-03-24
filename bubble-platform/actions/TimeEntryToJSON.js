async function(properties, context) {
    const listDelim = await properties.listDelimiter;

    function escapeJSON(str) {

        return str.replaceAll('\n', '\n');
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
                        if(index > 0) {
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

    const output = escapeJSON(properties.items);
    let items = undefined;
    //const items = JSON.parse(output);
    let err = false;
    let itemOne = ""
    try {
        const parsedJSON = JSON.parse(output);
        items = normalizeExport(parsedJSON);
        itemOne = JSON.stringify(items[0] || {})
    } catch (error) {
        err = error.message;
    }

    return {
        json_output: JSON.stringify(items),
        error: err ? err : "",
        original: properties.items,
    }
}