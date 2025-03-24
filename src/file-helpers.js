import fs from "fs"

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