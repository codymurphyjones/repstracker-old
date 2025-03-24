function(instance, properties, context) {
  console.log("colVal", instance.data.columnValues);
  console.log("properties");
  console.log("mappingTool:", properties.columnheaders);
  const len = properties.columnheaders.length();
  const col = properties.columnheaders.get(0, len);
  console.log('col', col);
const columns = col || [
  "testing",
  "testing2",
  "testing3",
];
  console.log(columns);
const LTRCols = [
  "Date",
  "Time",
  "Time in Minutes",
  "Properties",
  "General/Material",
  "Category",
  "Description",
  "Activity Group",
  "Activity Subcategory",
];
instance.publishState("importcolumns", LTRCols);
instance.data.availableColumns = LTRCols;
instance.data.alignedColumns = LTRCols;
instance.publishState("availableColumns", LTRCols);
instance.data.valid = true;
instance.publishState("valid", true);
instance.publishState("columns", columns);
instance.data.columns = columns;
instance.publishState("selectedcolumns", []);
instance.data.selectedcolumns = [];
instance.data.columnValues = instance.data.columnValues || {};

col.map((item, index) => instance.data.columnValues[index] = "");
  
console.log(instance.data.columnValues);
console.log(instance.data)
}
