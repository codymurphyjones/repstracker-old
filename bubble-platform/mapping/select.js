//Gather Important Data
//SelectedItem
//selectedIndex
//isDelete
//cols/data.availableColumns
//currentlySelected/selectedcolumns

//if delete, remove item from currentlySelected
//if not, add/update the item based on currentlySelected

function test(instance, properties, context) {
  console.log("Instance", instance);
  console.log("Properties", properties);
  console.log("context", context);
  const selectedItem = properties.column;
  console.log("Selected Item:", selectedItem);

  const selectedIndex = properties.index - 1;
  console.log("Selected Index:", selectedIndex);

  //const userColumns =
  const currentlyAvailable = instance.data.availableColumns;
  console.log("Previously Available Columns:", currentlyAvailable);

  const objKeys = Object.keys(instance.data.columnValues);
  console.log("Object Keys:", objKeys);
  console.log("alignedColumns", instance.data.alignedColumns);

  const currentlySelected = objKeys.map(
    (item) => instance.data.columnValues[item] || ""
  );
  console.log("Currently Selected Values:", currentlySelected);
  //instance.data.columnValues
  const currentSelection = instance.data.selectedcolumns || {};
  console.log("CurrentSelection", currentSelection);

  //const currentValue = instance.data.columnValues[selectedIndex];

  const isDelete = selectedIndex === null;
  console.log("Is Delete Mode:", isDelete);

  let cols = instance.data.columnValues;
  console.log("Column Values:", cols);

  const selectedVal = {
    ...cols,
    ...currentSelection,
  };

  if (isDelete) {
    selectedVal[selectedIndex] = "";
  } else {
    selectedVal[selectedIndex] = selectedItem;
  }

  console.log("selected object results", selectedVal);

  const valueList = Object.keys(selectedVal)
    .map((index) => selectedVal[index] || "")
    .filter((item) => item.length > 0);

  console.log("value", valueList);
  instance.publishState("selectedcolumns", valueList);
  instance.data.selectedcolumns = selectedVal;
  console.log("Selected Object:", selectedVal);

  console.log("col Vals", instance.data.columns);
  const available = instance.data.columns.filter(
    (item) => !valueList.includes(item)
  );

  console.log("remaining:", available);
  instance.publishState("availableColumns", available);
}
