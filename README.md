A Project is based on [Next.js](https://nextjs.org/docs).

To know more about Next.js, see `README_NEXT.md`.

## Installation

```
$ npm install
```

## Create Project

```
$ npx quick-sand create -name [PROJECT_NAME]
```

```
$ npx quick-sand create -name Trail
```

Open [http://localhost:3000/projects/[PROJECT_NAME]](http://localhost:3000/projects/[PROJECT_NAME]) with your browser to see the result.

## Options

```
$ npx quick-sand create --n Trail --ts
```

| name | description                                         |
| ---- | --------------------------------------------------- |
|  -name \| --n \[PROJECT_NAME\] | A module name following the -name qualifier. |
|  -typescript \| --ts | A module which is created is written in TypeScript. |

## Edit Project

You can start editing the page by modifying

-   `src/pages/projects/[PROJECT_NAME].jsx`
-   `src/lib/webgl/projects/[PROJECT_NAME]/main.js`
-   `src/styles/projects/[PROJECT_NAME].module.scss`

The page auto-updates as you edit the file.

### Page Entry Point

`src/pages/projects/[PROJECT_NAME].jsx`

### WebGL Entry Point

`src/lib/webgl/projects/[PROJECT_NAME]/main.js`

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

`src/styles/projects/[PROJECT_NAME].module.scss`


## Next Source Directory Construction

|path|description|
|---|---|
|src/api| Any modules that sends some request to outer API. |
|src/components| React (.jsx, .tsx) components. |
|src/constants| Constants |
|src/pages| When a file is added to the this directory, it's automatically available as a route. See [here](https://nextjs.org/docs/routing/introduction) |
|src/styles| Stylesheets |
|src/types| Type declaration files. |
|src/utils| Utility functions etc. |
|src/lib| Any libraries that doesn't depend on components. |

## Index Page

- Creating the sitemap in index page automatically every creation.
- You can edit the styles(src/styles/index.module.scss) and customize its looks.

### Author

arata matsumoto ([@aualrxse](https://twitter.com/aualrxse))
