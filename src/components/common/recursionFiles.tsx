import { Component, ReactElement } from "react";
import styles from "src/styles/index.module.scss"

interface Props {
	name: string;
	dir: string;
	pages: (string|Props)[]
}

export default class RecursionFiles extends Component<Props> {

	public render(): ReactElement {
		return (
			<ol>
				<p>{this.props.name}</p>
				{
					this.props.pages.map((page: (string|Props)) => {
						if(typeof page == "string") {
							return (
								<li>
									<a href={`/projects/${this.props.dir}/${page}`}>{page}</a>
								</li>
							)
						} else {
							return (
								<li className={styles.dir}>
									<RecursionFiles
										name={page.name}
										dir={`${this.props.name}/${page.name}`}
										pages={page.pages}
									/>
								</li>
							)
						}
					})
				}
			</ol>
		)
	}

}