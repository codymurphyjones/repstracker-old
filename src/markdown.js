import fs from "fs"

const readmeFile = "./README.md"
const diagramFile = "./db-diagram.md"
const managedDir = "./docs/view"
const sourceDir = "./docs/src/"
const docsName = "Repstracker Migration Details "

export function createDirIfNotExists(dirname) {
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname);
	}
}

export function clearDir(dirname) {
	if (fs.existsSync(dirname)) {
		try {
			fs.rmSync(dirname, { recursive: true, force: true });
			
		} catch (err) {
			console.error(`Error deleting directory: ${err.message}`);
		}
	} else {
		console.log(`Directory does not exist at ${dirname}`);
	}
}

export function getDirectories(dirPath) {
	try {
		// Read the contents of the directory
		const files = fs.readdirSync(dirPath, { withFileTypes: true });

		// Filter and return only directories
		const directories = files.filter(file => file.isDirectory()).map(file => file.name);

		return directories;
	} catch (err) {
		console.error('Error reading the directory:', err.message);
	}
}

export function getFilesInDirectory(dirPath) {
	try {
		// Read the contents of the directory
		const files = fs.readdirSync(dirPath, { withFileTypes: true });

		// Filter and return only directories
		const directories = files.filter(file => !file.isDirectory()).map(file => file.name);
		return directories;
	} catch (err) {
		console.error('Error reading the directory:', err.message);
	}
}

export function writeToFile(filename, data) {
	console.log("Writing to file: ", filename)
	fs.writeFileSync(filename, data);
}

export function readFile(filename) {
	return fs.readFileSync(filename, 'utf-8');
}

export function cap(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function low(str) {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

function createHeader(str) {
	return str.split("-").map(item => cap(item)).join(" ")
}
function generateTableOfContents(objList) {
	let TOCHeader = "## Table Of Contents\n"
	return TOCHeader + objList.map(item => `- [${createHeader(item)} Details](#${item})`).join("\n") + "\n\n"
}

function generateConcern(item, fileData) {
	let output = ``
	const concerns = fileData['concerns'];
	output += concerns[item] || ""
	if (output !== "") output += "\n"
	return output;
}

function generateConcerns(fileData) {
	let output = `## Notable Questions\n\n`
	const concerns = fileData['concerns'];
	Object.keys(concerns).forEach(item => {
		output += generateConcern(item, fileData)
	})
	return output + "\n\n";
}

function getNotes(item, fileData, headerReplace = undefined) {
	let output = ""
	const notesObj = fileData["notes"];
	const notes = notesObj[item] || ""
	if(!headerReplace) {
		output += "### " + createHeader(item) + "\n"
		output += notes + "\n"
	} else if (notes !== "") {
		output += "### " + headerReplace + "\n"
		output += notes + "\n"
	}

	return output;
}

function getMermaid(item, fileData) {
	let output = ""
	if (fileData["index"])
		output += fileData["index"][item] || ""
	if (output !== "") output += "\n"
	return output;
}

function getDiff(item, fileData) {
	let output = ""
	if (fileData["diff"])
		output += fileData["diff"][item] || ""
	if (output !== "") output += "\n"
	return output;
}

function getAdditional(item, fileData) {
	let output = ""
	if (fileData["additional"])
		output += fileData["additional"][item] || ""
	if (output !== "") output += "\n"
	return output;
}

function objToNotes(item, fileData) {
	let output = ""
	output += getNotes(item, fileData) || ""
	output += getMermaid(item, fileData) || ""
	return output;
}

function generateNotes(fileData, dirs) {
	let output = ""
	dirs.forEach(item => {
		output += objToNotes(item, fileData) || ""
		output += `[Additional ${createHeader(item)} Details](${managedDir}/${item}.md)` + "\n\n"
	})
	return output;
}

function genTOCLink(item = "") {
	return item.replace(" ", "-").toLowerCase()
}

function generateMarkdownTOC(concerns, notes, mermaid, diff, additional) {
	let TOCHeader = `## Table Of Contents\n`
	let arr = []
	if (concerns) arr.push("Notable Questions")
	if (notes) arr.push("Notes")
	if (mermaid) arr.push("Diagram Details")
	if (diff) arr.push("Bubble Diff")
	if (additional) arr.push("Additional Details")
	return TOCHeader + arr.map(title => `- [${title}](#${genTOCLink(title)})`).join("\n") + "\n\n"
}


function writeToMarkdown(dirs, fileData) {
	dirs.forEach(item => {
		const concerns = generateConcern(item, fileData)
		let concernHeader = `## Notable Questions\n\n`
		const notes = getNotes(item, fileData, "Notes")
		const mermaid = getMermaid(item, fileData)
		const diff = getDiff(item, fileData)
		const additonal = getAdditional(item, fileData)
		let readMe = `# ${createHeader(item)} Migration Details \n\n`
		const genConcerns = concerns !== "";
		const genNotes = notes !== "";
		const genMermaid = mermaid !== "";
		const genDiff = diff !== ""
		const genAdd = additonal !== "";
		const TOC = generateMarkdownTOC(genConcerns, genNotes, genMermaid, genDiff, genAdd)
		if (TOC !== "") {
			readMe += TOC + "\n"
		}
		if (genConcerns) {
			readMe += concernHeader
			readMe += concerns + "\n"
		}
		if (genNotes) {
			readMe += notes + "\n"
		}
		if (genMermaid) {
			readMe += "### Diagram Details\n\n"
			readMe += mermaid + "\n"
		}
		if (genDiff) {
			readMe += "### Bubble Diff\n\n"
			readMe += diff + "\n"
		}

		if (genAdd) {
			readMe += "### Additional Details\n\n"
			readMe += additonal
		}
		createDirIfNotExists(managedDir)
		writeToFile(managedDir + `/${item}.md`, readMe)
	})

}
const codeoutput = "```"
function generateFullERD(fileData) {
	const erdData = fileData["index"]
	let out = "";
	Object.keys(erdData).map(item => out += erdData[item] + "\n")
	out = out.replaceAll("```", "\n").replaceAll("mermaid", "").replaceAll("erDiagram", "");
	return `# Full ERD Diagram
${codeoutput}mermaid
erDiagram
RepsTracker ||--o{ User : owns
RepsTracker ||--o{ Organization : owns
RepsTracker ||--o{ CognitoAccount : owns
CognitoAccount ||--|| User : owns

RepsTracker {}

CognitoAccount {
    string cognitoId
}

${out}
${codeoutput}
`
}


// Fetch data from the API
function docGen() {

	const dirs = getDirectories(sourceDir)
	const outputObject = {};
	dirs.forEach(dir => {
		const files = getFilesInDirectory(sourceDir + dir)
		files.forEach(file => {
			const label = file.replace(".md", "")
			const fileData = readFile(sourceDir + dir + "/" + file)
			if (!outputObject[label]) outputObject[label] = {};
			outputObject[label][dir] = fileData
		})
	})

	const dirWithNotes = Object.keys(outputObject["notes"])

	const organizedDirs = [...dirWithNotes, ...dirs.filter(item => !dirWithNotes.includes(item))];

	console.log(organizedDirs)
	const tableOfContents = generateTableOfContents(organizedDirs)
	const concerns = generateConcerns(outputObject)
	const notes = generateNotes(outputObject, organizedDirs)
	let readMe = `# ${docsName}\n\n`
	readMe += tableOfContents
	readMe += `#### Full ERD Diagram

[Click here to view full ERD Diagram](${managedDir + diagramFile.slice(1)})

`
	readMe += concerns
	readMe += notes
	writeToFile(readmeFile, readMe)
	writeToMarkdown(dirs, outputObject)
	
	writeToFile(managedDir + diagramFile.slice(1), generateFullERD(outputObject))

}
docGen();
