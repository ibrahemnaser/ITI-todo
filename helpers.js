const fs = require("fs");

// check if the file exist or not and if not create one
async function createIfNotExist(path) {
	try {
		const ch = await asyncExists(path);
		if (!ch) {
			await asyncWrite(path, JSON.stringify([]));
		}
	} catch {
		console.log("error");
	}
}

// /********** */

function asyncExists(path) {
	return new Promise((resolve, reject) => {
		fs.exists(path, (exists) => {
			if (exists) {
				return resolve(true);
			}
		});
	});
}

function asyncWrite(path, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, data, (err) => {
			if (!err) return resolve(true);
			reject(err);
		});
	});
}

function asyncRead(path, encode) {
	return new Promise((res, rej) => {
		fs.readFile(path, encode, (err, data) => {
			if (err) reject(err);
			return res(data);
		});
	});
}

// convert the passed arguments into object
function parseOptions(opt) {
	const parsedOpt = opt.reduce((cumm, curr) => {
		const [optKey, optVal] = curr.split("=");
		cumm[optKey] = optVal;
		return cumm;
	}, {});

	return parsedOpt;
}

/******* */
async function add(obj, path) {
	const { title, body } = obj;

	// read json data from file
	// const data = fs.readFileSync(path, "utf8");
	const data = await asyncRead(path, "utf8");

	// parse json data into object
	const parsedData = JSON.parse(data);

	// set new id value
	const prevId =
		parsedData.length === 0 ? 0 : parsedData[parsedData.length - 1].id;

	// construct new todo from obj
	const newTodo = {
		id: prevId + 1,
		body: body,
		title: title,
		isChecked: false,
	};

	// push new todo into parsed json data object
	parsedData.push(newTodo);

	// stringfiy parsed json data object
	// write stringfied parsed json data object into the same file path
	await asyncWrite(path, JSON.stringify(parsedData));
	// fs.writeFileSync(path, JSON.stringify(parsedData));
}

/******* */
async function edit(obj, path) {
	const { id, title, body } = obj;
	// read json data from file
	// const data = fs.readFileSync(path, "utf8");
	const data = await asyncRead(path, "utf8");

	// parse json data into object
	const parsedData = JSON.parse(data);

	parsedData.map((ele) => {
		if (ele.id == id) {
			ele.body = body;
			ele.title = title;
		}
	});

	// stringfiy parsed json data object
	// write stringfied parsed json data object into the same file path
	await asyncWrite(path, JSON.stringify(parsedData));
	// fs.writeFileSync(path, JSON.stringify(parsedData));
}

/******* */
async function del(id, path) {
	// read json data from file
	// const data = fs.readFileSync(path, "utf8");
	const data = await asyncRead(path, "utf8");

	// parse json data into object
	const parsedData = JSON.parse(data);

	// find the objects other than the deleted one
	const newDataAfterDelete = parsedData.filter((ele) => ele.id != id);

	// stringfiy parsed json data object
	// write stringfied parsed json data object into the same file path
	await asyncWrite(path, JSON.stringify(newDataAfterDelete));
	// fs.writeFileSync(path, JSON.stringify(newDataAfterDelete));
}

/************** */
async function list(view, path) {
	// read json data from file
	// const data = fs.readFileSync(path, "utf8");
	const data = await asyncRead(path, "utf8");

	// parse json data into object
	const parsedData = JSON.parse(data);

	switch (view) {
		case "all":
			console.log(parsedData);
			break;
		case "checked":
			const checked = parsedData.filter((ele) => ele.isChecked);
			console.log(checked);
			break;
		case "unchecked":
			const unchecked = parsedData.filter((ele) => !ele.isChecked);
			console.log(unchecked);
			break;
		default:
			console.log("error");
			break;
	}
}

/****************** */
async function check(id, path) {
	// read json data from file
	// const data = fs.readFileSync(path, "utf8");
	const data = await asyncRead(path, "utf8");

	// parse json data into object
	const parsedData = JSON.parse(data);

	parsedData.map((ele) => {
		if (ele.id == id) {
			ele.isChecked = true;
		}
	});

	// stringfiy parsed json data object
	// write stringfied parsed json data object into the same file path
	await asyncWrite(path, JSON.stringify(parsedData));
	// fs.writeFileSync(path, JSON.stringify(parsedData));
}
/****************** */
async function unCheck(id, path) {
	// read json data from file
	// const data = fs.readFileSync(path, "utf8");
	const data = await asyncRead(path, "utf8");

	// parse json data into object
	const parsedData = JSON.parse(data);

	parsedData.map((ele) => {
		if (ele.id == id) {
			ele.isChecked = false;
		}
	});

	// stringfiy parsed json data object
	// write stringfied parsed json data object into the same file path
	await asyncWrite(path, JSON.stringify(parsedData));
	// fs.writeFileSync(path, JSON.stringify(parsedData));
}

module.exports = {
	add,
	edit,
	del,
	parseOptions,
	createIfNotExist,
	list,
	check,
	unCheck,
};
