import "zx/globals"

export const makeDirectory = async (directory) => {

	const directories = directory.split("/")
	let name = ""

	for(let i = 0; i < directories.length; i++) {
		const dir = directories[i]
		name += dir

		try {
			await $`mkdir ${name}`
		} catch(e) {
			if(i == directories.length-1) return false
		}
		name += "/"
	}
	return true
}
