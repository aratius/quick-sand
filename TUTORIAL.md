## まえがき
Three.jsを学習し始めた頃によく思っていたのが、Three.jsって、Hello worldまでが大変ですよね。
シーン、カメラ、レンダラー、ライト、メッシュなどをセットアップし、単純なボックスを画面に表示するだけでも50行ほどのプログラムを書く必要があります。

筆者が初学者の頃はこの工程で行なっていることがなかなか理解できず、毎回つまづいていました。
Three.jsの理解がある程度進んできた今はというと、工程の理解こそはしているものの、毎回書くのが面倒くさいことには変わりありません。

そこで今回は、これらの工程を自動化するCLIツールを作りました。
このツールはコマンド一つでThree.jsの雛形をセットアップしてくれる優れものです。
このツール使用することにより、Three.jsの実装をノンストレスで始められるので、学習のモチベーション維持において大きな役割を果たしてくれると思います。

また後述しますが、[Next.js](https://nextjs.org/)というフレームワークをラッピングする形で作っているので、[Vercel](https://vercel.com/dashboard)というサービスを利用することによりホスティングまでをサーバーレスかつ無料でスピーディーに行えます。この点も、初学者の方にはかなり優しい仕様になっているのではないかと思います。

今回このツールに`quick-sand`という名前をつけました。適当につけました。
この記事では、`quick-sand`のチュートリアルを書こうと思います。

### 想定利用者
- Three.js初学者
- デイリーコーディングをしたい方
- デイリーコーディングのモチベーションがThree.jsの煩雑さによりなかなか続かない方

### 注意点
記事内に出てくる構文や画面のキャプチャなどにおいて、筆者がMacを使用しているため、それらすべてはMacに適応したものになります。
Windowsをご利用の方はお手数ですが、適宜読み替えるなどしてご対応ください。

各種モジュールのバージョンは、作成時点（2022年3月）で選定しております。これらは常にアップデートされていくものですので、適宜選定していただくようにお願いします。

また、がっつり実務で使用するようなプロジェクトには、あまりこのツールは適していないと考えます。
あくまで、デイリーコーディングのような、ひとつひとつの規模が小さいプロジェクトの量産に適しているものとしてお考えください。

## ツール構成
ツールは、以下の二つのパッケージからなります。それぞれ順を追ってご説明します。

### **`quick-sand`**
[GitHub](https://github.com/aratius/quick-sand)
[npm](https://www.npmjs.com/package/@aualrxse/quick-sand)
プロジェクト本体です。
後述しますが、同梱の`quick-sand`コマンドによりThree.jsの雛形が自動で生成されます。実体はただのNext.jsプロジェクトです。
このプロジェクトは次の`create-quick-sand`コマンドで作成するか、GitHubから直接クローンする形をとっています。

### **`create-quick-sand`**
[GitHub](https://github.com/aratius/create-quick-sand)
[npm](https://www.npmjs.com/package/create-quick-sand)
上記`quick-sand`プロジェクトを作成するためのCLIツールです。
Reactにある程度造詣のある方は、`create-react-app`と同じものだと思っていただいて構いません。

## はじめよう

### プロジェクト作成
まずは、`quick-sand`プロジェクトを作成します。プロジェクトの作成には、`create-quick-sand`の使用を推奨します。
また、`quick-sand`の[GitHub](https://github.com/aratius/quick-sand)から直接クローンすることもできます。

**`create-quick-sand`を使用する場合**

まずは、デバイス上に空のディレクトリを作成し、ターミナルでそのディレクトリに移動してください。
```bash
$ mkdir quick-sand-app
$ cd quick-sand-app
```

そのディレクトリで、npxを使用して`create-quick-sand`コマンドを実行します。
その際に、`-name`または`--n`修飾子の後につづけてプロジェクト名を入力します。今回はプロジェクト名はappとします。
このブロックでappと出てきた場合は、適宜ご自分のつけた名前に読み替えて実行してください。
```bash
$ npx create-quick-sand@latest -name app
```

少し待つと、appディレクトリが作成されました。
こちらが、新しく作成された`quick-sand`プロジェクトになります。
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/970126/0b06d423-a134-bf73-e69d-9634718c98f2.png" />

**GitHubからクローンする場合**
[GitHub](https://github.com/aratius/quick-sand)からクローンするか、zipでダウンロードして、デバイス内の任意のディレクトリに配置してください。
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/970126/db2304ac-6a4a-457c-3e71-8beead28f957.png" />


`quick-sand`本体の説明に入る前に、プロジェクトに移動し、各種依存関係のインストールだけ済ませてしまいましょう。
プロジェクトへの移動方法がわからない方は、VSCodeでプロジェクトを開き、`shift + control + ^`、もしくはメニューバーから`Terminal > New Terminal`を選択することでプロジェクトのあるディレクトリでターミナルを開いてくれます。

```bash
$ cd app
$ npm install
```

### Three.js雛形プロジェクト作成
`quick-sand`本体のディレクトリに移動し、依存モジュールのインストールができたら、いよいよThree.jsのプロジェクトを作成していきます。
npxで`quick-sand`コマンドを実行します。このとき、以下のオプションが指定可能です。
プロジェクト名は、指定しないとapp_[日時]といったような名前で作成されます。
また、`hoge/hoge`のようなディレクトリ形式で指定することで、プロジェクトのグルーピングが可能です。
| オプション | ショートハンド | 説明                                         |
| ---- | --------- | ------------------------------------------ |
| -name \[PROJECT_NAME\] | --n | プロジェクト名を指定する。 |
| -typescript | --ts | プロジェクトをTypeScriptで作成する。 |

今回は例として、ThreeExampleというプロジェクト名で作成します。
```bash
$ npx quick-sand -name ThreeExample

// TypeScriptの場合
$ npx quick-sand -name ThreeExample -typescript
```

少し待つと、かわいいアスキーアートと共に、完了通知がされましたでしょうか。
また同時に、ブラウザが開き、プロジェクト名のメッシュがあるのが見えるかと思います。
正常に作成できなかった場合は、すでに同じ名前のプロジェクトを作成してる、依存モジュールのインストールができていない、などの理由が考えられます。
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/970126/b2032e10-86a6-529b-b5d5-43924f5cb5c1.png" />
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/970126/97c6d3d1-a829-2b8d-4336-7ce88e22c918.png" />

ここまででパッケージに関する説明は終わりです。これからは、実際に雛形から自分の実装を記述していくための方法を解説します。

## 実装
さきほどコマンドでThree.jsの雛形プロジェクトを作成したと思いますが、やってることは結局、あらかじめ用意していた雛形ファイルをオプションで指定された名前で配置しているだけです。
なので、実装を記述していくためには、生成されたそれぞれのファイルについて知っておく必要があります。ここからは主にNext.jsというReact.jsのフレームワークの話になりますが、React.jsを触ったことがない人でもわかるように説明していくつもりです。
Next.jsについては、`NEXT_README.md`に公式のREADMEを置いてありますので、詳しくはそちらをご覧ください。

### 生成されるファイル
雛形作成の完了メッセージにも記載されていると思いますが、以下の3つのファイルがコマンドにより生成されます。
筆者の環境では、VSCodeなら`command + click`で直接そのファイルまでジャンプしてくれました。
これらのファイルに編集を加えていくことで、自分のオリジナルプロジェクトを作っていくことができます。

```
created - src/pages/projects/[PROJECT_NAME].jsx
created - src/lib/webgl/projects/[PROJECT_NAME]/main.js
created - src/styles/projects/[PROJECT_NAME].module.scss
```

**`src/pages/projects/[PROJECT_NAME].jsx`**

作成したページのエントリーポイントです。

Next.jsでは、pagesディレクトリ以下のファイル構造がそのまま自動でルーティング化されるという便利機能（詳しくは[こちら](https://nextjs.org/docs/routing/introduction)）があり、たとえば、`/src/pages/projects/test.jsx`というようにファイルを作成した場合は、`/projects/test/`というルーティングになります。

また、ここのjsxという拡張子は、JavaScriptの拡張した[JSX](https://ja.reactjs.org/docs/introducing-jsx.html)という言語であることを表しています。イメージとしてはとJavaScriptと一緒にHTMLも記述できるようにした言語、といった感じです。
基本的には、JavaScriptを学習している人なら理解するまでにそう苦労しないと思いますが、今回このチュートリアルで扱うような、DOMを絡めない単純なThree.jsプロジェクトを作成する場合は、こちらのファイルは触らなくて大丈夫ですので、詳しい説明は割愛します。

**`src/styles/projects/[PROJECT_NAME].module.scss`**
作成した Three.jsページのスタイルシートです。

[SCSS](https://sass-lang.com/)という、CSSを便利に記述するための拡張言語で記述しています。
SCSSが書けない方は、このファイル内に生のCSSの記法で書いても同じようにレイアウトできるのでご安心ください。

また、こちらはmodule CSSになっており、ファイルごとにCSSの名前空間が作成されます。
module CSSのよいところは、プロジェクト全体でのCSSのクラス名衝突を気にしなくて良くなるので、BEMなどの記法に見られるような、冗長なクラス名を命名する必要がなくなるということです。

こちらも、単純な全画面canvasのThree.jsプロジェクトを作成する場合は特に触る必要はありません。あとからやりたいことに応じて、スタイルは修正するようにしてください。

**`src/lib/webgl/projects/[PROJECT_NAME]/main.js`**
作成したプロジェクトの、Three.jsのエントリーポイントです。

これ以降は主にこのファイルを編集していくことでThree.jsのプロジェクトをつくっていきます。

### Three.jsエントリーポイント
このブロックでは、Three.jsのエントリーファイル`src/lib/webgl/projects/[PROJECT_NAME]/main.js`を編集し、オリジナルのプロジェクトを実装するための情報を記述します。

まずは、デフォルトのプロジェクト名のメッシュを表示している行を削除しましょう。
`_initPlaceHolderStage`というメソッドがそれに当たりますので、そのメソッドを丸々削除し、メソッドを呼び出している行も削除します。
```js
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
//		this._initPlaceHolderStage()
	}

	_deInitChild() {

	}

	_resizeChild() {

	}

	_updateChild() {
	}

//	async _initPlaceHolderStage() {
//
//		this._renderer.shadowMap.enabled = true
//		this._camera.position.set(0, 5, 100)
//		this._camera.lookAt(0 ,0, 0)
//
//		const light = new DirectionalLight(0xffffff, 0.6)
//		light.castShadow = true
//		light.position.set(10, 10, 20)
//		light.lookAt(0, 0, 0)
//		light.shadow.mapSize.width = 2048
//		light.shadow.mapSize.height = 2048
//		light.shadow.camera.left = -128
//		light.shadow.camera.right = 128
//		light.shadow.camera.top = 128
//		light.shadow.camera.bottom = -128
//		light.shadow.blurSamples = 4
//		light.shadow.radius = 2
//		this._scene?.add(light)
//		const ambLight = new AmbientLight(0xffffff, 0.5)
//		this._scene?.add(ambLight)
//
//		const font = await new FontLoader().loadAsync("/fonts/hue.json")
//		const textGeometry = new TextGeometry(this._projectName, { font, size: 5, height: 3 })
//		const textMaterial = new MeshStandardMaterial({color: 0xffffff, metalness: 0.2, roughness: 0.1})
//		const textMesh =  new Mesh(textGeometry, textMaterial)
//		textMesh.castShadow = true
//		textMesh.receiveShadow = true
//		textGeometry.computeBoundingBox();
//		const xOffset = ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x )
//		textMesh.position.set(-xOffset/2, 0, 1)
//		this._scene?.add(textMesh)
//
//		const floorGeometry = new PlaneBufferGeometry(100, 100, 1, 1)
//		const floorMaterial = new MeshStandardMaterial({color: 0x777777, metalness: 0.7, roughness: 0.1})
//		const floorMesh = new Mesh(floorGeometry, floorMaterial)
//		floorMesh.receiveShadow = true
//		floorMesh.castShadow = true
//		this._scene?.add(floorMesh)
//
//		gsap.to(this, {duration: 1, ease: "linear", repeat: -1, onUpdate: () => {
//			const time = Date.now() / 5000
//			const x = Math.sin(time) * 10
//			const y = Math.cos(time) * 10
//			light.position.setX(x)
//			light.position.setY(y)
//		}})
//	}


}
```

**`Main`クラス**
ファイル内でdefault exportされている`Main`クラスは、`WebGLBase`というクラスを継承しています。

初学者向けに説明すると、クラスを継承することにより、子クラスから継承元親クラスのメソッドやプロパティにアクセスできるようになります。そのため、共通処理を親クラスに切り離すことで同じ処理を何度も書かなくてよくなるというメリットがあります。他にも継承のメリットはありますが、ここでは割愛します。

この親クラス`WebGLBase`には、いくつかのメソッド（メンバ関数）が定義されていると思いますが、これらはThree.js実装時に多用するライフサイクルメソッドになります。それぞれのタイミングでメソッドが発火されるので、各メソッドが発火されるタイミングで実行したい処理を記述しましょう。
各ライフサイクルメソッドが発火されるタイミングは以下になります。

**ライフサイクルメソッド**
| メソッド名 | 発火タイミング | 記述する処理 |
| --------- | ----------- | ---------- |
| _initChild | プロジェクト初期化時 | 最初に一回実行したい処理 |
| _deInitChild | プロジェクト破棄時 | メモリリークを避けるため、プロジェクトを安全に破棄する処理 |
| _resizeChild | リサイズ時 | リサイズ時に実行したい処理 |
| _updateChild | フレーム更新時 | 毎フレーム実行したい処理 |

それとは別に、親クラス`WebGLBase`には、任意のタイミングで実行すべきメソッドもいくつか用意されており、これらは外部、もしくは子クラスから実行することができます。
具体的なリストとその説明は以下になります。

**メソッド**
| メソッド名 | 説明 |
| --------- | ---------- |
| init | プロジェクトを初期化したいタイミング |
| deInit | プロジェクトを破棄したいタイミング |
| render | レンダリングを明示的に実行する（デフォルトでは更新処理ごとに呼ばれている） |

同じように、親クラス`WebGLBase`には、開発に必要なプロパティ（メンバ変数）が定義されており、子クラスから`this.[プロパティ名]`とすることで参照することができます。初期化済みのsceneやrendererにもアクセス可能です。
具体的なリストとその説明は以下になります。

**プロパティ**
| プロパティ名   | 型                                         | 説明 |
| ------------ | -------------------------------------------- | ----------- |
| _scene      |  Scene                                        | Three.jsのシーン（オブジェクトを配置するステージ） |
| _renderer   |  WebGLRenderer                                | Three.jsのレンダラー（実際にcanvasにレンダリングする役割を担う） |
| _camera     |  _PerspectiveCameara \| _OrthographicCamera | Three.jsのカメラ（3D空間内の視点を定義） |
| _canvas     |  HTMLCanvasElement                            | canvas要素 |
| _settings   |  WebGLOptions                                 | 各種設定項目（後述） |
| _elapsedTime   |  number                                 | init()が呼ばれてからの経過時間(s) |

また、継承先クラスのコンストラクタでは、はじめにsuper()で親クラスのコンストラクタを呼び出さないといけないというルールがありますが、その際にオブジェクトでThree.jsプロジェクトの設定を渡せるようになっています。
記述しなかったものは全てデフォルトに置き換わります。具体的なリストとその説明は以下になります。

**初期化時のオプション**
| オプション名   | 型 | デフォルト値                                         | 説明 |
| ------------ | -- | -------------------------------------------- | ----------- |
| camera | "perspective" \| "orhographic" | "perspective" | カメラの種類（orthographicは平行投影） |
| fillScreen | boolean | true | リサイズごとにcanvas, rendererの描画領域を画面いっぱいに広げるかどうか |
| shouldUpdate | boolean | true | update処理を親クラスで実行するかどうか |
| cameraSettings | PerspectiveCameraOptions \| OrthographicCameraOptions | なし | カメラの詳細設定（デフォルト値はそれぞれのカメラクラス側にある） |
| stats | boolean | false | statsを画面に表示するかどうか |

```js
	constructor(canvas) {
		super(canvas, {
			camera: "perspective",
            fillScreen: true,
            shouldUpdate: true,
            cameraSettings: {
                fov: 90,
                aspect: innerWidth / innerHeight,
                near: 0.1,
                far: 1000
            }
		})
	}
```

### 書いてみる
上記を踏まえた上で、まずはボックスを画面上に表示するだけのプログラムを書いてみましょう。
画面にオブジェクトを表示させるためにはメッシュを作成してシーンに追加する必要があり、そのメッシュを作るためにはジオメトリとマテリアル を用意する必要があります。コードに落とし込むと以下のようになります。

```js
_initChild() {
	const geometry = new BoxBufferGeometry(100, 100, 100)
	const material = new MeshBasicMaterial({color: 0xff0000})
	const mesh = new Mesh(geometry, material)
    // カメラの視野に入るように移動
	mesh.position.setZ(-300)
    // 適当に回転させる
	mesh.rotation.set(Math.PI/4, Math.PI/4, 0)
    // シーンに追加
	this._scene.add(mesh)!

    // レンダリング
	this.render()
}
```
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/970126/9eb37304-3720-1c77-5ec5-13081ce77496.png" />

ボックスのシルエットが現れましたね。
今は`MeshBasicMaterial`という、陰影処理を行わないマテリアルを使用しているため、シルエットしか表示されていません。
陰影処理をおこなうマテリアル（`MeshStandardMaterial`など）を適用し、かつシーンにライトを追加することで、陰影処理のかかったボックスを表示することができるようになりますが、ここでは割愛します。

次はこのボックスを、アニメーションさせてみましょう。
そのためにまず、先ほど作成したメッシュを、メンバ変数に保存します。メンバ変数に保存することで、インスタンス内の別のブロックからでもアクセスできるようになります。
先程のコードを少し修正して、
```js
_initChild() {
	const geometry = new BoxBufferGeometry(100, 100, 100)
	const material = new MeshBasicMaterial({color: 0xff0000})
	const mesh = new Mesh(geometry, material)
    // カメラの視野に入るように移動
	mesh.position.setZ(-300)
    // 適当に回転させる
	mesh.rotation.set(Math.PI/4, Math.PI/4, 0)
+   this._mesh = mesh
    // シーンに追加
	this._scene.add(mesh)!

    // レンダリング
	this.render()
}
```
とすることで、メッシュをメンバ変数に保存することができました。

ちなみに、メンバ変数はアンダースコア（_）から始まらないといけないという決まりはありません。
上記でアンダースコアを用いている理由はこの`this._mesh`という変数はこのクラス内でしか使用しませんよ、という区別のためです。一般の静的型付け言語では、`private`というアクセス修飾子にて識別されます。

先程メンバ変数に保存したメッシュを、今度は`_updateChild`メソッド内で回してみましょう。プログラムは以下のようになります。

```js
_updateChild() {
    this._mesh.rotation.x = this._elapsedTime
	this._mesh.rotation.z = this._elapsedTime
}
```

いかがでしょうか。いい感じにアニメーションしているのではないでしょうか。
以上でThree.jsの実装側の解説を終わります。ここからは思うままにコードを走らせ、ぜひ素晴らしい作品を制作してください。
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/970126/2505b889-0cef-d100-02c6-55ff096bc952.gif" />

## プロジェクトをホスティングする

ここまでで、`quick-sand`を使用したThree.jsプロジェクトの作成について学びました。
ここから、作った作品を友達に見てもらうために、Webサーバー上にアップロードしましょう。
とはいっても、自分でWebサーバーを用意する必要はありません。今回は、Vercelというホスティングサービスを利用した、サーバーレスでとても簡単な方法をご紹介します。
Next.jsとの親和性も高く、今日のWebフロントエンドに関わるにおいてこれを学んでおくメリットは大きいと筆者は感じます。

### プロジェクト・著作者情報を記載する

ホスティングするとなれば、きっとURLをシェアして見てもらうことになると思いますから、各種SNSへの導線や、OG画像などを登録しておきたいものです。また、外部のアセットに依存している場合は、それらの出典を明記しておく必要もあるかもしれません。

それらの設定は、先程軽く流した`src/pages/projects/[PROJECT_NAME].jsx`にて行えます。
ここには、`<Info />`と`<Head />`という二つのコンポーネント があり、それぞれ以下のような違いがあります。

それぞれ細かく設定項目がありますが、こちらは説明するより見ていただいたほうが早いと思うので、そのコード例と併せて以下に示します。

**`<Info />`**
画面右下の(i)ボタンを押した時に画面に広がる、プロジェクト情報を管理する。
`details`セクションには、テキストとリンクごとに情報を区切って、配列形式で記述する。オブジェクトの二次元配列と、少しややこしい構成になっているため、注意してください。
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/970126/c06e7e43-3c5a-8527-d1bb-300bd974b848.png" />
```jsx
<Info
	title="ThreeExample"
	shareText="Three.jsのExample Projectです。"
	shareUrl="https://[your-hosting-url]/projects/ThreeExample"
	twitterId="aualrxse"
	cc={`© 2022 | quick-sand`}
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
```

**`<Head />`**
htmlの\<head\>タグに入る情報を管理する。OGやTwitter cardなどはこちら。
OG画像は、プロジェクトルートの`public`ディレクトリ以下の任意の場所に配置し、画像パスはそのpublicディレクトリをルートとして指定する。たとえば、以下の`/og/og.jpg`というパスは、`/public/og/og.jpg`を見にいくことになる.

```jsx
<Head
	title="ThreeExample"
	ogImgPath="/og/og.jpg"
	ogUrl="https://[your-hosting-url]/projects/ThreeExample"
	description="Three.jsのExample Projectです。"
	twitterId="aualrxse"
/>
```

### Vercelにホスティング
Next.jsをVercelにホスティングする手順については、世の中に分かりやすい記事がたくさんあるので、そちらを見ていただくとわかりやすいかと思います。

[Next.js on Vercel](https://vercel.com/solutions/nextjs)
[VercelでNext.jsを簡単デプロイ](https://weseek.co.jp/tech/621/)
[初心者でもできるNext.jsのVercelへのデプロイ方法\(GitHub経由\)](https://reffect.co.jp/react/next-js-github-vercel)


## さいごに
ここまで読んでくださりありがとうございました。

そもそもこちらのツールは、自分のデイリーコーディングのモチベーション維持のために作ったことがきっかけでした。
作り終えてみたら、このツールの需要は結構あるんじゃないかと思い、改めて作り直してCLIツールとして公開した次第です。

ツール全体を通して、あくまで筆者の良いと思う構成をとっていますが、その構成に関しても、たくさんのご意見、アドバイスをいただけたら嬉しいなと思っております。

その他にも、内容問わず何かご用件がありましたら[Twitter](https://twitter.com/aualrxse)のDM、もしくは[Eメール](mailto:info@aualrxse.com)までご連絡ください。
ツールに対する質問、エラーにはまって抜け出せないなどといったご連絡に対しても、喜んでお答えさせていただきます。

また余談ですが、筆者は春からも引き続き大学生として学業に勤しんでおります。
その中で、学生のうちから個人案件の受注を考えておりますので、ご興味のある方は[ポートフォリオ](https://aualrxse.com)をご覧いただき、同じく[Twitter](https://twitter.com/aualrxse)のDM、もしくは[Eメール](mailto:info@aualrxse.com)などからご連絡お待ちしております。
