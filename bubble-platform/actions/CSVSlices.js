async function(properties, context) {
  console.log("FileToSlicedCSV");
  // Use the node-fetch module to make an HTTP request
  const Papa = require("papaparse");
  const tokenKeys = await context.keys;
  const token = tokenKeys["bubble Admin API Token"];

  const dataSplit = properties.rowsperbatch;
  const finalBatch = properties.lastbatchsize || Math.ceil(dataSplit / 3) + dataSplit;
  Papa.parsePromise = function (file, options) {
    console.log(options);
    return new Promise(function (complete, error) {
      Papa.parse(file, { ...options, complete, error });
    });
  };

  const fileName = properties.filename;
  const skipRowsLen = await properties.skipRows.length() || 0
  const skipRows = await properties.skipRows.get(0, skipRowsLen) || []

  const file = fileName.startsWith("//") ? "http:" + fileName : fileName;
  let body = null;
  let errorMessage = "";
  console.log(file);

  try {
    const response = await fetch(file,{
      method: 'GET', // Specify the HTTP method if needed (GET, POST, etc.)
      headers: {
        'Authorization': `Bearer ${token}`, // Passing the Authorization header
      },
    });

    const data = await response.text(); // or response.text(), etc.
    errorMessage = JSON.stringify(data);
    body = data;
  } catch (error) {
    errorMessage = JSON.stringify(error);
  }
  console.log("Start:", body);

  console.log("Define Slice");

  function generateSlice(num, csv_rows, headerArray, results) {
    const remainingRows = csv_rows - num;

    if (remainingRows > finalBatch)
      return [headerArray, ...results.data.slice(num, num + dataSplit)];

    return [
      headerArray,
      ...results.data.slice(num, num + remainingRows + 1),
    ];
  }


  function processData(results) {
    let headerArray = results.data[0]; // This gets the column headers from the CSV and sets them as an array of texts
    let csv_rows = results.data.length;
    const newSkip = skipRows.map(item => item + 1)
    console.error("skipRows", skipRows)
    results.data = results.data.filter((item, index) => {
      console.error(index, item)
      return !newSkip.includes(index)
    })
    const slices = [];
    for (let i = 1; i < csv_rows; i += dataSplit) {
      console.log(i);
      const slice = generateSlice(i, csv_rows, headerArray, results);

      const csv = Papa.unparse(slice);
      //console.log(csv);
      //console.log(slice);
      slices.push(csv);
      if (slice.length > dataSplit + 2) i = csv_rows;
    }
    //console.log(slices);
    return { csv_slices: slices, itemCount: csv_rows - (skipRowsLen + 1), errormessage: errorMessage }

  }

  console.log("getBodyResult");

  const res = await Papa.parsePromise(body, {
    download: false,
    header: false,
    dynamicTyping: false,
    skipEmptyLines: "greedy",
  });

  console.log("Process For Return");
  return processData(res);
}
