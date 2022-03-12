import { Component, ReactElement } from "react";
import WebGLMain from "src/lib/webgl/projects/template/main";
import styles from "src/styles/projects/template.module.scss"
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
					cc={`© ${new Date().getFullYear()} | QuickSand`}
					details={[
						[
							{
								type: "text",
								text: "template engine: "
							},
							{
								type: "link",
								text: "https://github.com/aratius/QuickSand",
								link: "https://github.com/aratius/QuickSand"
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