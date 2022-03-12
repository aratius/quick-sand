import { Component } from "react";
import WebGLMain from "src/lib/webgl/projects/template/main";
import styles from "src/styles/projects/template.module.scss"
import Head from "src/components/common/head";
import Info from "src/components/common/info";

export default class Index extends Component {

    state = {}
	_webgl = null
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

	componentWillUnmount() {
		this._webgl.deInit()
		this._webgl = null
	}

	_onRefCanvas = (node) => {
		if(!node) return
		this._webgl = new WebGLMain(node)
		this._webgl.init()
	}

    render() {
        return (
            <div className={styles.container}>
				<Info
					title="[PROJECT_NAME]"
					shareText=""
					shareUrl=""
					twitterId=""
					cc={`© ${new Date().getFullYear()} | quick-sand`}
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