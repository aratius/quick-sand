import "zx/globals"

const getFiles = async (dir) => {
	return await(await $`ls ${dir}`).stdout.split("\n")
}

const searchFile = async (dir, arr) => {
	const files = await getFiles(dir)
	for(let i = 0; i < files.length; i++) {
		const file = files[i]
		if(file == "") continue
		if(file.match(/.jsx|.tsx/) != null) {
			arr.push(file.replace(/.jsx|.tsx/, ""))
		} else {
			const emp = { name: file, pages: [] }
			if(arr.filter(e => e.name == file).length == 0) arr.push(emp)
			await searchFile(`${dir}/${file}`, emp.pages)
		}
		arr = arr.sort((a, b) => {
			const isStr = (str) => typeof str == "string";
			if(isStr(a) && !isStr(b)) return -1;
			else if(!isStr(a) && isStr(b)) return 1;
			return 0
		})
	}
}

export const updateInfo = async () => {
	const crrDir = process.cwd()
	const filesJson = { name: "/",pages: [] }
	await searchFile(`${crrDir}/src/pages/projects`, filesJson.pages)

	await $`echo ${JSON.stringify(filesJson, null, "\t")} > ${crrDir}/public/pages.json`
}