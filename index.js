// const todo = {
// 	id: 1,
// 	title: "hello",
// 	body: "visit",
// 	isChecked: false,
// };

// node index.js add title="todoOne" body="buy the website"
// node index.js edit id=1 title="todoOne" body="buy the website"
// node index.js del id=1
// node index.js check id=1
// node index.js unCheck id=1
// node index.js list (all||check||uncheck)

const helpers = require("./helpers")
const PATH = process.env.FILE_PATH || "./db.json"

function myProcess(cmdArg) {
	helpers.createIfNotExist(PATH)
	const [, , operation, ...rest] = cmdArg
	const obj = helpers.parseOptions(rest)
	switch (operation) {
		case "add":
			helpers.add(obj, PATH)
			break
		case "edit":
			helpers.edit(obj, PATH)
			break
		case "del":
			helpers.del(obj.id, PATH)
			break
		case "check":
			helpers.check(obj.id, PATH)
			break
		case "uncheck":
			helpers.unCheck(obj.id, PATH)
			break
		case "list":
			helpers.list(obj.view, PATH)
			break
		default:
			console.log("error")
			break
	}
}

myProcess(process.argv)
