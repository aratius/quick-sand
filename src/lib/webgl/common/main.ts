import { Scene, WebGLRenderer } from "three";
import _OrthographicCamera, { OrthographicCameraOptions } from "./orthographicCamera";
import _PerspectiveCamera, { PerspectiveCameraOptions } from "./perspectiveCamera";
import Stats from "stats.js";

export interface WebGLOptions {
	camera?: "orthographic" | "perspective",
	fillScreen?: boolean,
	shouldUpdate?: boolean,
	cameraSettings?: PerspectiveCameraOptions | OrthographicCameraOptions,
	stats?: boolean
}

export default class WebGLBase {

	private static _defaultOptions: WebGLOptions = {
		camera: "perspective",
		fillScreen: true,
		shouldUpdate: true,
		stats: false
	}

	protected _scene: Scene | null = null
	protected _renderer: WebGLRenderer | null = null
	protected _camera: _PerspectiveCamera | _OrthographicCamera | null = null
	protected _canvas: HTMLCanvasElement | null = null
	protected _settings: WebGLOptions = {}
	private _startTime: number = 0
	private _stats: Stats | null = null

	/**
	 *
	 * @param canvas
	 */
	constructor(canvas: HTMLCanvasElement, options: WebGLOptions = {}) {
		this._canvas = canvas
		this._settings = {
			...WebGLBase._defaultOptions,
			...options
		}
		if (this._settings.stats) {
			this._stats = new Stats()
			document.body.appendChild(this._stats.dom)
		}
	}

	protected get _elapsedTime(): number {
		return Date.now() / 1000 - this._startTime
	}

	/**
	 * render
	 */
	public render(): void {
		if (this._scene != null && this._camera != null) this._renderer?.render(this._scene, this._camera)
	}

	/**
	 * initialize
	 */
	public init(): void {
		this._scene = new Scene()
		this._renderer = new WebGLRenderer({ canvas: this._canvas!, antialias: true })
		if (this._settings.fillScreen) this._renderer.setSize(innerWidth, innerHeight)
		if (this._settings.camera == "orthographic") {
			this._camera = new _PerspectiveCamera(this._settings.cameraSettings as PerspectiveCameraOptions)
		} else {
			this._camera = new _OrthographicCamera(this._settings.cameraSettings as OrthographicCameraOptions)
		}
		this._camera.updateProjectionMatrix()
		this._startTime = Date.now() / 1000

		this._initChild()

		window.addEventListener("resize", this._resize)
		if (this._settings.shouldUpdate) this._update()
	}

	public _deInit(): void {
		this._deInitChild()
	}

	private _update = (): void => {
		this._updateChild()
		this.render()
		this._stats?.update()
		requestAnimationFrame(this._update)
	}

	private _resize = (): void => {
		if (this._settings.fillScreen) {
			// TODO: fill screen
			this._camera?.fillScreen()
			this._renderer?.setSize(innerWidth, innerHeight)
		}

		this._resizeChild()
	}

	// override in sub class
	protected _initChild(): void { }
	protected _deInitChild(): void { }
	protected _resizeChild(): void { }
	protected _updateChild(): void { }

}