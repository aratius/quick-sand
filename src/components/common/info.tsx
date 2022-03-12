import { Component, ReactElement, SyntheticEvent } from "react";
import styles from "src/styles/common/info.module.scss"

interface Detail {
	type: "link" | "text",
	text: string,
	link?: string
}

interface Props {
	title: string,
	details: Detail[][],
	shareText: string,
	shareUrl: string,
	buttonColor?: string,
	twitterId?: string,
	cc?: string
}

interface State {
	isVisible: boolean
}

export default class Info extends Component<Props> {

	public static defaultProps: Props = {
		title: "",
		details: [],
		shareText: "",
		shareUrl: "",
		buttonColor: "#ffffff",
		twitterId: "",
		cc: `©  ${new Date().getFullYear()} | QuickSand`
	}

	private _bg: HTMLElement | null = null
	public state: State = {
		isVisible: false
	}

	public appear(): void {
		this.setState({isVisible: true})
	}

	public disappear(): void {
		this.setState({isVisible: false})
	}

	private _onReadyBG = (node: HTMLElement): void => {
		if(!node) return
		this._bg = node
		this._bg.classList.add(styles.invisible)
	}

	/**
	 * ボタンクリックでappear
	 * @param e
	 */
	private _onClickButton = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		this.appear()
	}

	/**
	 * 背景クリックでdisappear
	 * @param e
	 */
	private _onClickBG = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		this.disappear()
	}

	/**
	 * コンテンツのイベントが伝播してBGのクリックイベントが発生するのを禁止
	 * @param e
	 */
	private _onClickContents = (e: SyntheticEvent): void => {
		if(e) e.stopPropagation()
	}

	render(): ReactElement {

		return (
			<>
				<section
					className={`${styles.container} ${this.state.isVisible ? styles.visible : ""}`}
					ref={this._onReadyBG}
					onClick={this._onClickBG}
				>
					<article
						className={styles.info}
						onClick={this._onClickContents}
					>
						<h2 className={styles.info__title}>{this.props.title}</h2>
						<div className={styles.info__author}>
							{this.props.details.map((data: Detail[], i: number) => {
								return(
									<p className={styles.info__author__detail} key={i}>
										{data.map((d: Detail, _i: number) => {
											if(d.type == "text")
												return <span key={_i}>{d.text}&nbsp;</span>
											else if (d.type == "link")
												return <a key={_i} href={d.link} target="_blank" rel="noreferrer">{d.text}&nbsp;</a>
										})}
									</p>
								)
							})}
						</div>
						<div className={styles.info__twitter}>
							<a className={styles.info__twitter__follow} href={`https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5E${this.props.twitterId}&screen_name=${this.props.twitterId}`} target="_blank" rel="noreferrer">
								<img src="/images/ico-tw-wh.svg" alt="twitter" />
							</a>
							<a className={styles.info__twitter__share} href={`https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5E${this.props.twitterId}&screen_name=${this.props.twitterId}`} target="_blank" rel="noreferrer">follow</a>
							<a className={styles.info__twitter__share} href={"https://twitter.com/intent/tweet?text=\n"+this.props.shareText+"&url="+this.props.shareUrl} target="_blank" rel="noreferrer">share</a>
						</div>
						<footer className={styles.info__footer}>
							<p>{this.props.cc}</p>
						</footer>
					</article>
				</section>
				<a
					onClick={this._onClickButton}
					className={styles.button} href="#"
					style={{color: this.props.buttonColor, borderColor: this.props.buttonColor}}
				>i</a>
			</>
		)

	}

}