import "zx/globals"

export const COL_SUCCEED = chalk.hex("#0BE081")
export const COL_HAPPY = chalk.hex("#0BC9E0")
export const COL_NORMAL = chalk.hex("#A49BCC")
export const COL_WARNING = chalk.hex("#E24756")
const COLORS = [
	"#9EF8EE",
	"#F24405",
	"#FFEC5C",
	"#FF5F5D",
	"#BDA523",
	"#8C1F28"
]
export const getRandomColor = () => {
	return chalk.hex(COLORS[Math.floor(Math.random()*COLORS.length)])
}

export const COMPONENT_JS = `
import { AmbientLight, DirectionalLight, Mesh, MeshStandardMaterial, PlaneBufferGeometry } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import WebGLBase from "src/lib/webgl/common/main";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import gsap from "gsap";

export default class Main extends WebGLBase {

	_projectName = "[PROJECT_NAME]"

	constructor(canvas) {
		super(canvas, {
			camera: "orthographic"
		})
	}

	_initChild() {
		this._initPlaceHolderStage()
	}

	_deInitChild() {

	}

	_resizeChild() {

	}

	_updateChild() {
	}

	async _initPlaceHolderStage() {

		this._renderer.shadowMap.enabled = true
		this._camera.position.set(0, 5, 100)
		this._camera.lookAt(0 ,0, 0)

		const light = new DirectionalLight(0xffffff, 0.6)
		light.castShadow = true
		light.position.set(10, 10, 20)
		light.lookAt(0, 0, 0)
		light.shadow.mapSize.width = 2048
		light.shadow.mapSize.height = 2048
		light.shadow.camera.left = -128
		light.shadow.camera.right = 128
		light.shadow.camera.top = 128
		light.shadow.camera.bottom = -128
		light.shadow.blurSamples = 4
		light.shadow.radius = 2
		this._scene?.add(light)
		const ambLight = new AmbientLight(0xffffff, 0.5)
		this._scene?.add(ambLight)

		const font = await new FontLoader().loadAsync("/fonts/hue.json")
		const textGeometry = new TextGeometry(this._projectName, { font, size: 5, height: 3 })
		const textMaterial = new MeshStandardMaterial({color: 0xffffff, metalness: 0.2, roughness: 0.1})
		const textMesh =  new Mesh(textGeometry, textMaterial)
		textMesh.castShadow = true
		textMesh.receiveShadow = true
		textGeometry.computeBoundingBox();
		const xOffset = ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x )
		textMesh.position.set(-xOffset/2, 0, 1)
		this._scene?.add(textMesh)

		const floorGeometry = new PlaneBufferGeometry(100, 100, 1, 1)
		const floorMaterial = new MeshStandardMaterial({color: 0x777777, metalness: 0.7, roughness: 0.1})
		const floorMesh = new Mesh(floorGeometry, floorMaterial)
		floorMesh.receiveShadow = true
		floorMesh.castShadow = true
		this._scene?.add(floorMesh)

		gsap.to(this, {duration: 1, ease: "linear", repeat: -1, onUpdate: () => {
			const time = Date.now() / 5000
			const x = Math.sin(time) * 10
			const y = Math.cos(time) * 10
			light.position.setX(x)
			light.position.setY(y)
		}})
	}

}
`

export const COMPONENT_TS = `
import { AmbientLight, DirectionalLight, Mesh, MeshStandardMaterial, PlaneBufferGeometry } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import WebGLBase from "src/lib/webgl/common/main";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import gsap from "gsap";

export default class Main extends WebGLBase {

	public _projectName: string = "[PROJECT_NAME]"

	constructor(canvas: HTMLCanvasElement) {
		super(canvas, {
			camera: "orthographic"
		})
	}

	protected _initChild(): void {
		this._initPlaceHolderStage()
	}

	protected _deInitChild(): void {

	}

	protected _resizeChild(): void {

	}

	protected _updateChild(): void {
	}

	private async _initPlaceHolderStage(): Promise<void> {

		this._renderer!.shadowMap.enabled = true
		this._camera!.position.set(0, 5, 100)
		this._camera!.lookAt(0, 0, 0)

		const light = new DirectionalLight(0xffffff, 0.6)
		light.castShadow = true
		light.position.set(10, 10, 20)
		light.lookAt(0, 0, 0)
		light.shadow.mapSize.width = 2048
		light.shadow.mapSize.height = 2048
		light.shadow.camera.left = -128
		light.shadow.camera.right = 128
		light.shadow.camera.top = 128
		light.shadow.camera.bottom = -128
		light.shadow.blurSamples = 4
		light.shadow.radius = 2
		this._scene?.add(light)
		const ambLight = new AmbientLight(0xffffff, 0.5)
		this._scene?.add(ambLight)

		const font = await new FontLoader().loadAsync("/fonts/hue.json")
		const textGeometry = new TextGeometry(this._projectName, { font, size: 5, height: 3 })
		const textMaterial = new MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.1 })
		const textMesh = new Mesh(textGeometry, textMaterial)
		textMesh.castShadow = true
		textMesh.receiveShadow = true
		textGeometry.computeBoundingBox();
		const xOffset = (textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x);
		textMesh.position.set(-xOffset / 2, 0, 1)
		this._scene?.add(textMesh)

		const floorGeometry = new PlaneBufferGeometry(100, 100, 1, 1)
		const floorMaterial = new MeshStandardMaterial({ color: 0x777777, metalness: 0.7, roughness: 0.1 })
		const floorMesh = new Mesh(floorGeometry, floorMaterial)
		floorMesh.receiveShadow = true
		floorMesh.castShadow = true
		this._scene?.add(floorMesh)

		gsap.to(this, {
			duration: 1, ease: "linear", repeat: -1, onUpdate: () => {
				const time = Date.now() / 5000
				const x = Math.sin(time) * 10
				const y = Math.cos(time) * 10
				light.position.setX(x)
				light.position.setY(y)
			}
		})
	}

}
`

export const PAGE_JS = `
import { Component } from "react";
import WebGLMain from "src/lib/webgl/projects/[PROJECT]/main";
import styles from "src/styles/projects/[PROJECT].module.scss"
import Head from "src/components/common/head";
import Info from "src/components/common/info";

export default class Index extends Component {

    state = {}
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

	_onRefCanvas(node) {
		if(!node) return
		const webgl = new WebGLMain(node)
		webgl.init()
	}

    render() {
        return (
            <div className={styles.container}>
				<Info
					title="[PROJECT_NAME]"
					shareText=""
					shareUrl=""
					twitterId=""
					cc={\`© ${new Date().getFullYear()} | quick-sand\`}
					details={[
						[
							{
								type: "text",
								text: "template engine: "
							},
							{
								type: "link",
								text: "quick-sand",
								link: "https://github.com/aratius/quick-sand"
							}
						]
					]}
				/>
				<Head
					title="[PROJECT_NAME]"
					ogImgPath=""
					ogUrl=""
					description=""
					twitterId=""
				/>
                <canvas ref={this._onRefCanvas}></canvas>
            </div>
        )
    }
}
`

export const PAGE_TS = `
import { Component, ReactElement } from "react";
import WebGLMain from "src/lib/webgl/projects/[PROJECT]/main";
import styles from "src/styles/projects/[PROJECT].module.scss"
import Head from "src/components/common/head";
import Info from "src/components/common/info";

interface Props {}
interface State {}

export default class Index extends Component {

    public state: State = {}
    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    public componentDidMount(): void {
    }

	private _onRefCanvas(node: HTMLCanvasElement): void {
		if(!node) return
		const webgl = new WebGLMain(node)
		webgl.init()
	}

    public render(): ReactElement {
        return (
            <div className={styles.container}>
				<Info
					title="[PROJECT_NAME]"
					shareText=""
					shareUrl=""
					twitterId=""
					cc={\`© ${new Date().getFullYear()} | quick-sand\`}
					details={[
						[
							{
								type: "text",
								text: "template engine: "
							},
							{
								type: "link",
								text: "quick-sand",
								link: "https://github.com/aratius/quick-sand"
							}
						]
					]}
				/>
				<Head
					title="[PROJECT_NAME]"
					ogImgPath=""
					ogUrl=""
					description=""
					twitterId=""
				/>
                <canvas ref={this._onRefCanvas}></canvas>
            </div>
        )
    }
}
`

export const STYLE = `
.container {
	width: 100vw;
	height: 100vh;
	margin: 0;

	canvas {
		width: 100%;
		height: 100%;
	}
}
`