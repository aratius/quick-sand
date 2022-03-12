#!/usr/bin/env node
/**
 * zxが呼び出したShellコマンドの標準出力を表示しないようにする。
 * @see https://github.com/google/zx/blob/main/README.md#verbose
 */
$.verbose = false;

// message -----
import { COL_SUCCEED, COL_HAPPY, COL_NORMAL, COL_WARNING, getRandomColor, COMPONENT_JS, COMPONENT_TS, PAGE_JS, PAGE_TS, STYLE } from "./config.mjs"
import { makeDirectory } from "./makeDirectory.mjs"
import { updateInfo } from "./updateInfo.mjs"
import "zx/globals"
const arg = process.argv
// check argv
const d = new Date()
let appName = `app_${d.getFullYear()}${d.getMonth()}${d.getDay()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
let ts = false
for(let i = 0; i < arg.length; i++) {
	const a = arg[i]
	const hasNext = i+1 <= arg.length-1
	if(a.match(/(--n|-name)/) != null) {
		if (hasNext) appName = arg[i+1]
	}
	if(a.match(/(--t|-typescript)/) != null) ts = true
}

const crrDir = process.cwd()
const pageJS = ts ? PAGE_TS : PAGE_JS
const componentJS = ts ? COMPONENT_TS : COMPONENT_JS
const style = STYLE
const project = appName
// 最後の要素（ファイル名）を覗いたディレクトリ
const dir = project.split("/")
const projectName = dir.pop()

const pageJSReplaced = pageJS.replace(/\[PROJECT\]/g, project).replace(/\[PROJECT_NAME\]/g, projectName)
const componentJSReplaced = componentJS.replace(/\[PROJECT\]/g, project).replace(/\[PROJECT_NAME\]/g, projectName)

/**
 *
 * @returns {boolean} isSucceeded
 */
const create = async () => {
	console.log(COL_NORMAL("creating ..."));

	// create next page ------
	cd(`${crrDir}/src/pages/projects`)
	if(dir.length > 0) await makeDirectory(dir.join("/"))
	if(!fs.existsSync(`${crrDir}/src/pages/projects/${project}.${ts ? "tsx" : "jsx"}`)) {
		await $`echo ${pageJSReplaced} > ${project}.${ts ? "tsx" : "jsx"}`
	} else return false

	// create webgl component -----
	cd(`${crrDir}/src/lib/webgl/projects`)
	await makeDirectory(project)
	await $`ls`
	if(!fs.existsSync(`${crrDir}/src/lib/webgl/projects/${project}/main.${ts ? "ts" : "js"}`)) {
		await $`echo ${componentJSReplaced} >${project}/main.${ts ? "ts" : "js"}`
	} else return false

	// create style -----
	cd(`${crrDir}/src/styles/projects`)
	if(dir.length > 0) await makeDirectory(dir.join("/"))
	if(!fs.existsSync(`${crrDir}/src/styles/projects/${project}.module.scss`)) {
		await $`echo ${style} > ${project}.module.scss`
	} else return false

	cd(crrDir)

	return true
}
const res = await create()
// result message
if(res) {
	await updateInfo()
	console.log(COL_SUCCEED("\n--- PROJECT SUCCESSFULLY CREATED ---"))
	const aa = await $`asciify "${projectName}" -f nancyj-fancy`
	console.log(getRandomColor()("\n"+aa.stdout))
	console.log(COL_NORMAL("created - ") + `src/pages/projects/${project}.${ts ? "tsx" : "jsx"}`)
	console.log(COL_NORMAL("created - ") + `src/lib/webgl/projects/${project}/main.${ts ? "ts" : "js"}`)
	console.log(COL_NORMAL("created - ") + `src/styles/projects/${project}.module.scss`)
} else {
	console.log(COL_WARNING(" --- ERROR ---"))
	console.log(COL_WARNING("err - ") + "same project has already been created.")
}

console.log(COL_HAPPY("ready - ") + `http://localhost:3000/projects/${project}`)
$`npm run dev -p -3000`
setTimeout(() => {
	$`opener http://localhost:3000/projects/${project}`
}, 1000)
