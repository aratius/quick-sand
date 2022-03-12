A Project is based on [Next.js](https://nextjs.org/docs).

To know more about Next.js, see `README_NEXT.md`.

## Installation

```
$ npm install
```

## Create Project

```
$ npm run create [PROJECT_NAME] [...options]
```

```
$ npm run create Trail ts
```

Open [http://localhost:3000/projects/[PROJECT_NAME]](http://localhost:3000/projects/[PROJECT_NAME]) with your browser to see the result.

## Options

```
$ npm run create Trail ts
```

| name | description                                         |
| ---- | --------------------------------------------------- |
| ts   | A Module which is created is written in TypeScript. |

## Edit Project

You can start editing the page by modifying

-   `src/pages/projects/[PROJECT_NAME].jsx`
-   `src/components/[PROJECT_NAME]/main.js`
-   `src/styles/[PROJECT_NAME].module.scss`

The page auto-updates as you edit the file.

### Page Entry Point

`src/pages/projects/[PROJECT_NAME].jsx`

### WebGL Entry Point

`src/components/[PROJECT_NAME]/main.js`

-   This class extends from `WebGLBase`.
-   You can access all the public or protected `WebGLBase` api.

**WebGLBase**

| name         | access    | type                                         | description |
| ------------ | --------- | -------------------------------------------- | ----------- |
| init()       | public    | method                                       |             |
| deInit()     | public    | method                                       |             |
| render()     | public    | method                                       |             |
| \_onInit()   | protected | method                                       |             |
| \_onDeInit() | protected | method                                       |             |
| \_onResize() | protected | method                                       |             |
| \_onUpdate() | protected | method                                       |             |
| \_scene      | protected | Scene                                        |             |
| \_renderer   | protected | WebGLRenderer                                |             |
| \_camera     | protected | \_PerspectiveCameara \| \_OrthographicCamera |             |
| \_canvas     | protected | HTMLCanvasElement                            |             |
| \_settings   | protected | WebGLOptions                                 |             |

### Style Entry Point

`src/styles/[PROJECT_NAME].module.scss`

### Author

arata matsumoto ([@aualrxse](https://twitter.com/aualrxse))
