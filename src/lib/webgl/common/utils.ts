import { Euler, Group, Mesh, Object3D, Texture, TextureLoader, Vector2, Vector3 } from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
/**
 * GLTF(.glb)モデルのローディング
 * @param path
 * @returns
 */
export const loadGLTF = async (path: string): Promise<Group> => {

	return new Promise((res, rej) => {
		const loader: GLTFLoader = new GLTFLoader();
		loader.load(
			path,
			(gltf: GLTF): void => {
				res(gltf.scene);
			},
			(xhr): void => {
				// progress
				console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
			},
			(err): void => {
				rej(err);
			}
		);
	});

};


export const exportGLTF = async (target: Object3D): Promise<void> => {
	await new Promise((res, rej) => {

		const exporter = new GLTFExporter();

		exporter.parse(target, (gltf): void => {
			if (gltf instanceof ArrayBuffer) {

				saveArrayBuffer(gltf, 'scene.glb');

			} else {

				const output = JSON.stringify(gltf, null, 2);
				console.log(output);

				confirm("save gltf?") && saveString(output, 'scene.gltf');
			}
			res("hoge");
		}, {});
	});
};

export const exportJSON = async (json: JSON): Promise<void> => {
	await new Promise((res, rej) => {

		const output = JSON.stringify(json, null, 2);
		console.log(output);

		const name = prompt("name ?");
		confirm("save json?") && saveString(output, name + '.json');
	});
};


/**
 * Textureローディング
 * @param path
 * @returns
 */
export const loadTexture = async (path: string): Promise<Texture> => {

	return new Promise((res, rej) => {
		const loader: TextureLoader = new TextureLoader;
		loader.load(
			path,
			(tex: Texture) => {
				res(tex);
			},
			(err): void => {
				rej(err);
			}
		);
	});


};
const save = (blob: Blob, filename: string) => {

	const link = document.createElement('a');
	link.style.display = 'none';
	document.body.appendChild(link); // Firefox workaround, see #6594

	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();

	// URL.revokeObjectURL( url ); breaks Firefox...

};

const saveString = (text: string, filename: string) => {

	save(new Blob([text], { type: 'text/plain' }), filename);

};


const saveArrayBuffer = (buffer: ArrayBuffer, filename: string) => {

	save(new Blob([buffer], { type: 'application/octet-stream' }), filename);

};