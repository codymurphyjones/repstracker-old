import fs from "fs"
import {createDirIfNotExists, clearDir, writeToFile, cap, low} from "./file-helpers.js"

const managedDir = "./research"

const baseURL = 'https://repstracker.com/version-2226k/api/1.1/meta'



async function testing() {
	try {
		const response = await fetch(baseURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ecd4e275fea0293ecf55e676a8fec45f',
			},
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error('API Error:', response.status, response.statusText);
			return {};
		}
	} catch (error) {
		console.error('Fetch Error:', error);
	}
	return {};
}

function customType(str) {
	const newStr = str.replace(/__(\w+)_/, (match, p1) => {
		return p1.toUpperCase()
	  });
	const splits = newStr.split("_")
	const out = splits.map(item => cap(item)).join("");
	
	return out
}  

const finished = ["user", "timeentry", "importhistory", "survey", "exporthistory", "teammember"]

const typesList = ["string", "boolean", "number", "date"]
const leadingVal = '```'
// Fetch data from the API
async function test(outputJSON = false) {
	const response = await testing();
	const { types } = response;

	const optionSets = {};
	const obj = {};
	clearDir(managedDir)
	createDirIfNotExists(managedDir)
	Object.keys(types).map((key) => {
		let currentDir = `${managedDir}`
		if(finished.includes(key)) {
			currentDir += '/complete'
			createDirIfNotExists(currentDir)
		} else {
			currentDir += '/incomplete'
			createDirIfNotExists(currentDir)
		}
		const item = types[key];
		const fields = item.fields;
		fields.map((field) => {
			if (field.type.startsWith('option.')) optionSets[field.type] = field;
		});
		obj[key] = fields;
		
		let logVal = `${leadingVal}mermaid\n${cap(key)} {\n`;
		let classVal = `${leadingVal}mermaid\nclassDiagram\nclass ${cap(key)} {\n`;
		fields.map(item => {
			if(item.display.startsWith("x") | item.display.startsWith("z")) return;
			let isArray = false;
			if(item.type.startsWith("list")) isArray = true;
			let type = item.type.replace("option.", "").replace("custom.", "").replace("list.", "").replace("text", "string")
			let display = item.display.replace("?", "").replaceAll(" ", "").replace("(text)", "")

			display = display.replace(/\((\w+)\)/, (match, p1) => {
				return p1.charAt(0).toUpperCase() + p1.slice(1);
			  });

			logVal += `\t${typesList.includes(type) ? type : customType(type)}${isArray ? "[]" : ""} ${low(display)}\n`
			classVal += `\t${typesList.includes(type) ? type : customType(type)}${isArray ? "[]" : ""} ${low(display)}\n`
	})
		logVal += "}```"
		classVal += "}```"
	
		let fileDir= `${currentDir}/${key}/`;
		createDirIfNotExists(fileDir)
		writeToFile(fileDir + "shape.md", logVal);
		writeToFile(fileDir + "class.md", classVal);
	});
	obj.options = optionSets;
	if(process.argv[2] && process.argv[2] == "true") {
		createDirIfNotExists('./data/')
		writeToFile(`./data/options.json`, JSON.stringify(optionSets, null, 2));
		writeToFile('./data/data.json', JSON.stringify(obj, null, 2));
	}
}
test();
