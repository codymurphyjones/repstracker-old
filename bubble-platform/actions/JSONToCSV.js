function(properties, context) {
    let mainFields = ["Date","Hours", "Minutes",  "Description", "Team Member", "Property", "Type"];
         const defaultCSV = mainFields.join(",")

    function findNonEmptyFields(data) {
         // Start with the keys from the first object to maintain order
         if(data.length < 1) return []
         let orderedFields = Object.keys(data[0]);
 
         // Iterate over the rest of the objects in the dataset
         data.forEach(item => {
             // Iterate over each key-value pair in the object
             for (let key in item) {
                 // If the key is non-empty and not yet in the orderedFields
                 if (!orderedFields.includes(key) && item[key] !== null && item[key] !== undefined && item[key] !== "") {
                     // Find the position where the key should be inserted
                     const insertIndex = orderedFields.findIndex(field => field === key);
                     // Insert the key at the correct position or at the end
                     if (insertIndex === -1) {
                         //orderedFields.push(key);
                         orderedFields = [...orderedFields, key]
                     } else {
                         orderedFields.splice(insertIndex, 0, key);
                     }
                 }
             }
         });
 
         // Filter out fields that are entirely empty
         const nonEmptyFields = orderedFields.filter(field =>
             data.some(item => item[field] !== null && item[field] !== undefined && item[field] !== "")
         );
         
         
         let mainFields = ["Date","Hours", "Minutes",  "Description", "Team Member"];
         let secondaryCols = ["Type", "Category", "Activity", "Activity Group", "Activity Subcategory"];
         let propertyFields = nonEmptyFields.filter(field => field.startsWith("Property"));
         propertyFields = propertyFields.length > 0 ? propertyFields : ["Property"]
         let secFields = secondaryCols.filter(field => nonEmptyFields.includes(field));
         let extraFields = nonEmptyFields.filter(field => !mainFields.includes(field) && !secondaryCols.includes(field) && !propertyFields.includes(field));
 
         return [...mainFields, ...propertyFields, ...secFields, ...extraFields];
     }
     
     const Papa = require('papaparse');
 
     const { delimiter: rawDelimiter, source_JSON: sourceJSON, scan_for_csv_injection, quotes } = properties;
 
     const delimiter = rawDelimiter === 'tab' ? '\t' : rawDelimiter;
     try {
         // Clean the input JSON by removing leading [ or trailing ]
         let cleanedSourceJSON = sourceJSON.trim();
         if (cleanedSourceJSON.startsWith("[")) {
             cleanedSourceJSON = cleanedSourceJSON.substring(1);
         }
         if (cleanedSourceJSON.endsWith("]")) {
             cleanedSourceJSON = cleanedSourceJSON.slice(0, -1);
         }
         // Parse the cleaned JSON input
         const parsedContent = JSON.parse(`[${cleanedSourceJSON.replace(/(\r\n|\n|\r)/gm, "")}]`);
 
         // Clean possible CSV Injections if required
         const cleanedContent = scan_for_csv_injection ? injectionCleaner(parsedContent) : parsedContent;
         const columnList = findNonEmptyFields(cleanedContent);
         // Use PapaParse to unparse the JSON to CSV
         let csv = "\uFEFF";

         if(sourceJSON !== "[]") {
            csv += Papa.unparse(cleanedContent, {
                delimiter: delimiter,
                quotes: quotes,
                columns: columnList
            });
         } else {
            csv += defaultCSV;
         }

         
         // Convert CSV string to Buffer and encode in base64
         const csvFile = Buffer.from(csv, 'utf8');
         const base64Text = csvFile.toString('base64');
 
         return {
             base64_text: base64Text,
             returned_an_error: false,
             columns: columnList,
         };
     } catch (err) {
        const defaultBase64 = "\uFEFF" + defaultCSV;
        const base64Text = defaultBase64.toString('base64');
         return {
             //error_message: err.message,
             error_message: (sourceJSON.length).toString(),
             returned_an_error: true,
             base65_text: base64Text
         };
     }
 
     function injectionCleaner(array) {
 
         const badTokens = ["=", "+", "-", "@", "0x09", "0x0D"];
         const regexPattern = /(?<=^|;|,)./g;
 

         let newArray = array.map((newValue) => {
             Object.entries(newValue).forEach(([key, value]) => {
                 // Check if the first character or any character placed
                 // after a comma or semicolon is an injection token
                 if (!Array.isArray(value) && value.match(regexPattern) !== null) {
                    
                     value = value.replace(regexPattern, (x) => badTokens.includes(x) ? `\'${x}` : x)
                 } else if (Array.isArray(value) && value.length > 0) {
                     value = value.map(y => y.replace(regexPattern, (x) => badTokens.includes(x) ? `\'${x}` : x))
                 }
                 return (newValue[key] = value);
             });
             return newValue;
         });
         return newArray;
 
     }
 
 }