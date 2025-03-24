/*const urlObj = "https://repstracker.com/version-5nib/api/1.1/obj/"
window.do_not_minify_plugin=true
const objData = {}
function valuesToURL(cursor, count) {
	//? "?" : ""}${cursor !== "" ? `cursor=${cursor}` : ""}${count !== "" ? `count=${count}
	return `${(cursor !== "" || count !== "") ? "?" : ""}${cursor !== "" ? `cursor=${cursor}` : ""}${(cursor !== "") ? "&" : ""}${count !== "" ? `count=${count}` : ""}`
}

function responseToObject(type, cursor = "", count = "", remaining = "") {
	fetch(urlObj + type + valuesToURL(cursor, count), {
  headers: {Authorization: 'Bearer 28d39310810c85af59d6fed6a6abbaed'}
})
}

function responseToObjects(type, cursor = "", count = "", remaining) {
	const url = urlObj + type + valuesToURL(cursor, count)
	console.log(url);
	fetch(url, {
  headers: {Authorization: 'Bearer 28d39310810c85af59d6fed6a6abbaed'}
})
   .then(resp => resp.json())
   .then(json => {
	   const {count,remaining, results, cursor} = json.response
	   console.log({cursor,count,remaining});
	   if(!objData[type]) objData[type] = {}
	   const properties = results.filter(item => item.Properties?.length > 0)
	   //console.log(properties)
   })
}


responseToObjects("Time Entry", 100)*/
/*
const regexVal = /"([^"]+)":\s*"([^"]*)"/g


function escapeJsonString(str) {
	return str.replace(/[\u0000-\u001F\\"]/g, function (match) {
		switch (match) {
			case "\b": return "\\b";
			case "\f": return "\\f";
			case "\n": return "\\n";
			case "\r": return "\\r";
			case "\t": return "\\t";
			case "\"": return "\\";
			case "\\": return "\\\\";
			default: return "\\u" + ("0000" + match.charCodeAt(0).toString(16)).slice(-4);
		}
	});
}

const desc = `\`1234567890 -= ~!@#$ %^&* ()_ +
	qwertyuiop[]\QWERTYUIOP{ }|
		asdfghjkl; 'ASDFGHJKL:"
zxcvb\nm,./ ZXCVBNM <>?
€Š•¿
	✀🤠`


const data = `[{
   "Date": "6/01/24",
	"Description": "Lorem Ipsum Dolor\tTest",
	"Hours": "2",
	"Minutes": "30",
	"Property": "Home",
	"Team Member": "Kristina Kringle",
	"Type": "STR",
	"Converted Type": "LTR",
	"Category": "",
	"Activity": "Other"
},{
   "Date": "7/01/24",
	"Description": "${desc}",
	"Hours": "0",
	"Minutes": "27",
	"Property": "Mad Max",
	"Team Member": "Kris Kringle",
	"Type": "STR",
	"Converted Type": "LTR",
	"Category": "",
	"Activity": "property acquisitions"
},{
   "Date": "8/01/24",
	"Description": "This is a test\n\nThsi is a test\nThis is a test",
	"Hours": "5",
	"Minutes": "0",
	"Property": "Home",
	"Team Member": "Kris Kringle",
	"Type": "STR",
	"Converted Type": "LTR",
	"Category": "",
	"Activity": "Other"
}]`;
/*
try {
	const res = escapeJsonString(data);
	console.log(res); // See the escaped string
	const parsed = JSON.parse(res);
	console.log(parsed); // Parsed JSON object
} catch (e) {
	console.log(e);
}

const logError = (...args) => console.log(...args);

function sanitizeValueOrKey(val) {
	let value = (val || "").trim();
	if (value.startsWith('"')) value = value.slice(1).trim();
	if (value.endsWith('"')) value = value.slice(0, -1).trim();
	if (value.endsWith('":')) value = value.slice(0, -2).trim();
	return value
}

function sanitizeUserData(data) {
	logError("DataSet: " + data);
	const newData = data.replaceAll("[{", "").replaceAll("}]", "").split("},{\n")
	const objRes = newData.map((item, ItemIndex) => {
		logError("\n");
		logError(`-Item ${ItemIndex}: ` + item);
		const obj = (item || "").trim().split('",');
		const outObj = {};
		obj.map((item) => {
			item = sanitizeValueOrKey(item).trim();
			const objData = item.split('": "');
			let key = sanitizeValueOrKey(objData[0] || "");
			let value = sanitizeValueOrKey(objData[1] || "");
			logError("--key: " + key);
			logError("--value: " + value);
			logError("\n");
			if (key !== "") outObj[key] = (value || "").replace(/"/, '""')
			return outObj;
		});
		logError("\n");
		return outObj;
	});
	return objRes;
}


const example = `[{
   "Date": "6/01/24",
	"Description": "Lorem Ipsum Dolor	Test",
	"Hours": "2",
	"Minutes": "30",
	"Property": "Home",
	"Team Member": "Kristina Kringle",
	"Type": "STR",
	"Converted Type": "LTR",
	"Category": "",
	"Activity": "Other"
},{
   "Date": "7/01/24",
	"Description": "Test 💛❤️‍🔥❤️",
	"Hours": "0",
	"Minutes": "27",
	"Property": "Mad Max",
	"Team Member": "Kris Kringle",
	"Type": "STR",
	"Converted Type": "LTR",
	"Category": "",
	"Activity": "property acquisitions"
},{
   "Date": "8/01/24",
	"Description": "This is a test

Thsi is a test
This is a test",
	"Hours": "5",
	"Minutes": "0",
	"Property": "Home",
	"Team Member": "Kris Kringle",
	"Type": "STR",
	"Converted Type": "LTR",
	"Category": "",
	"Activity": "Other"
},{
   "Date": "12/04/24",
	"Description": "\`1234567890 -= ~!@#$ %^&* ()_ +
	qwertyuiop[]\QWERTYUIOP{ }|
		asdfghjkl; 'ASDFGHJKL:"
zxcvb\nm,./ ZXCVBNM <>?
€Š•¿
	✀🤠",
"Hours": "3",
	"Minutes": "3",
		"Property": "Mad Max",
			"Team Member": "Kris Kringle",
				"Type": "LTR",
					"Converted Type": "LTR",
						"Category": "Material Participation",
							"Activity Group": "",
								"Activity Subcategory": ""
}]`;

const example2 = `[{{
   "Date": "12/04/24",
							"Activity Group": "",
}]`;


console.log(sanitizeUserData(example)); */

function buildURL(baseURL, params, additionalConstraints = [], real = true) {
	// Default constraints
	const defaultConstraints = [
		{
			key: "ImportHistory",
			constraint_type: "equals",
			value: params?.importHistory || "importHistory"
		},
		{
			key: "createdBy",
			constraint_type: "equals",
			value: params?.createdBy || "CreatedBy"
		}
	];

	// Merge default constraints with additional constraints
	const allConstraints = [...defaultConstraints, ...additionalConstraints];

	console.log(allConstraints.map(item => item.key));
	// Encode the constraints array
	const constraintsEncoded = encodeURIComponent(JSON.stringify(allConstraints));

	// Construct the URL with the constraints
	let finalURL = `${baseURL}?limit=1&constraints=${constraintsEncoded}`;

	if (!real) allConstraints.map(item => finalURL = finalURL.replace(item.value, `[${item.value}]`));

	return finalURL;
}

// Example usage:
const baseURL = "https://repstracker.com/version-test/api/1.1/obj/TimeEntry";

// Add more constraints
const additionalConstraints = [
	{
		key: "contentstatus",
		constraint_type: "equals",
		value: "ContentStatus"
	}/*,
	{
		key: "date",
		constraint_type: "greater_than",
		value: "2023-01-01"
	}*/
];
/*
{
		key: "ContentStatus",
		constraint_type: "equals",
		value: "contentstatus"
	}

	*/
// Generate the final URL
const params = {
	importHistory: "1733721472994x981418389062287400",
	createdBy: "1692040829807x224452886135348540"
};

const fparams = {
	importHistory: "importHistory",
	createdBy: "CreatedBy"
};
const finalURL = buildURL(baseURL, fparams, additionalConstraints, false);

console.log(finalURL);


async function fetchFromBubbleAPI(baseURL, params, additionalConstraints = []) {
	const finalURL = buildURL(baseURL, params, additionalConstraints);
	// Construct the final URL
	console.log('bubble fetch:', finalURL)
	try {
		// Make the API request
		const response = await fetch(finalURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// Add any required authentication header here
				"Authorization": "Bearer 28d39310810c85af59d6fed6a6abbaed"
			}
		});

		// Parse the JSON response
		if (response.ok) {
			const data = await response.json();
			console.log("API Response:", data);
		} else {
			console.error("API Error:", response.status, response.statusText);
		}
	} catch (error) {
		console.error("Fetch Error:", error);
	}
}

// Fetch data from the API
fetchFromBubbleAPI(baseURL, params, additionalConstraints);


// test

const newURL = `https://repstracker.com/version-test/api/1.1/obj/TimeEntry?limit=1&constraints=%5B%7B%22key%22%3A%22ImportHistory%22%2C%22constraint_type%22%3A%22equals%22%2C%22value%22%3A%22${params.importHistory}%22%7D%2C%7B%22key%22%3A%22createdby%22%2C%22constraint_type%22%3A%22equals%22%2C%22value%22%3A%22${params.createdBy}%22%7D%5D`

console.log('newURL', newURL);
async function getIt() {
	try {
		// Make the API request
		const response = await fetch(newURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// Add any required authentication header here
				"Authorization": "Bearer 28d39310810c85af59d6fed6a6abbaed"
			}
		});

		// Parse the JSON response
		if (response.ok) {
			const data = await response.json();
			console.log("API Response:", data);
		} else {
			console.error("API Error:", response.status, response.statusText);
		}
	} catch (error) {
		console.error("Fetch Error:", error);
	}
}

getIt();