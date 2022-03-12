import { Component, ReactElement } from "react";
import pagesJson from "public/pages.json"
import styles from "src/styles/index.module.scss"
import RecursionFiles from "src/components/common/recursionFiles";

interface Props {}
interface State {}

export default class Index extends Component {

    public state: State = {}
    constructor(props: Props) {
        super(props)
        this.state = {}
    }



    public render(): ReactElement {
        return (
            <div className={styles.container}>
				<header>
					<h1>QuickSand</h1>
				</header>
				<section>
					<nav>
						<RecursionFiles
							name={pagesJson.name}
							pages={pagesJson.pages as any}
							dir={pagesJson.name}
						/>
					</nav>
				</section>
				<footer>
					<p>© 2022 | QuickSand</p>
				</footer>
            </div>
        )
    }
}