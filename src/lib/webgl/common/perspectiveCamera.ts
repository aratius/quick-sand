import { PerspectiveCamera } from "three";
import Camera from "./camera";

export interface PerspectiveCameraOptions {
	fov?: number,
	aspect?: number,
	near?: number,
	far?: number
}

export default class _PerspectiveCamera extends PerspectiveCamera implements Camera {

	public static perspective: number = 1000
	public static get defaultOptions(): PerspectiveCameraOptions {
		return {
			fov: (180 * (2 * Math.atan(innerHeight / 2 / _PerspectiveCamera.perspective))) / Math.PI,
			aspect: innerWidth / innerHeight,
			near: 0.001,
			far: 2000,
		}
	}

	private _userOptions: PerspectiveCameraOptions = {}

	constructor(options: PerspectiveCameraOptions) {
		super(
			options?.fov || _PerspectiveCamera.defaultOptions.fov,
			options?.aspect || _PerspectiveCamera.defaultOptions.aspect,
			options?.near || _PerspectiveCamera.defaultOptions.near,
			options?.far || _PerspectiveCamera.defaultOptions.far
		)
		this._userOptions = options

	}

	public fillScreen(): void {
		this.fov = _PerspectiveCamera.defaultOptions.fov!
		this.aspect = _PerspectiveCamera.defaultOptions.aspect!
		this.updateProjectionMatrix()
	}

}