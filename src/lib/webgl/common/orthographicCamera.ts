import { OrthographicCamera } from "three";
import Camera from "./camera"

export interface OrthographicCameraOptions {
	left?: number,
	right?: number,
	top?: number,
	bottom?: number,
	near?: number,
	far?: number
}

export default class _OrthographicCamera extends OrthographicCamera implements Camera {

	public static get defaultOptions(): OrthographicCameraOptions {
		return {
			left: -innerWidth / 2,
			right: innerWidth / 2,
			top: innerHeight / 2,
			bottom: -innerHeight / 2,
			near: 1,
			far: 1000
		}
	}

	private _userOptions: OrthographicCameraOptions = {}

	constructor(options: OrthographicCameraOptions) {
		super(
			options?.left || _OrthographicCamera.defaultOptions.left,
			options?.right || _OrthographicCamera.defaultOptions.right,
			options?.top || _OrthographicCamera.defaultOptions.top,
			options?.bottom || _OrthographicCamera.defaultOptions.bottom,
			options?.near || _OrthographicCamera.defaultOptions.near,
			options?.far || _OrthographicCamera.defaultOptions.far
		)
		this._userOptions = options
	}

	public fillScreen(): void {
		this.left = -innerWidth / 2
		this.right = innerWidth / 2
		this.top = innerHeight / 2
		this.bottom = -innerHeight / 2
		this.updateProjectionMatrix()
	}

}