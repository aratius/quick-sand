
import { Component } from "react";
import WebGLMain from "src/lib/webgl/projects/test/t1/main";
import styles from "src/styles/projects/test/t1.module.scss"
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
					title="t1"
					shareText=""
					shareUrl=""
					twitterId=""
					cc={`© 2022 | QuickSand`}
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
					title="t1"
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

