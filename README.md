# Caissa Apollo client

* Base

$ npm install babel-polyfill react react-dom
$ npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader copy-webpack-plugin css-loader file-loader html-webpack-plugin mini-css-extract-plugin node-sass optimize-css-assets-webpack-plugin sass-loader uglifyjs-webpack-plugin url-loader webpack webpack-cli webpack-dev-server webpack-manifest-plugin

* Apollo

$ npm install apollo-boost @apollo/react-hooks graphql

* Migrate from apollo boost

$ npm install apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link graphql-tag




# React/Webpack Starter Kit
Mai 2020

## Installation

$ mkdir starter_kit
$ cd starter_kit/

$ mkdir -p src/css dist
$ touch src/index.js
$ touch src/index.html
$ touch src/css/app.scss

$ npm init -y


$ git init .
$ vim .gitignore

```
/dist
/node_modules
npm-debug.log
.DS_Store
```

$ git add .
$ git commit -m "Initial commit"

### Packages

$ npm install -D webpack webpack-cli

$ npm install -D webpack-dev-server html-webpack-plugin

$ npm install -D css-loader file-loader mini-css-extract-plugin node-sass optimize-css-assets-webpack-plugin sass-loader terser-webpack-plugin url-loader
$ npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader

### Optional packages

$ npm install -D webpack-manifest-plugin
$ npm install -D copy-webpack-plugin

## Configuration

These are the files to configure...

* package.json
* webpack.config.js
* babel.config.js

For webpack, these are sample arguments...

```
ENV { dev: true }
OPTIONS:  { _: [],
  cache: null,
  bail: null,
  profile: null,
  color: { level: 2, hasBasic: true, has256: true, has16m: false },
  colors: { level: 2, hasBasic: true, has256: true, has16m: false },
  liveReload: true,
  'live-reload': true,
  serveIndex: true,
  'serve-index': true,
  inline: true,
  info: true,
  env: { dev: true },
  mode: 'development',
  'info-verbosity': 'info',
  infoVerbosity: 'info',
  'client-log-level': 'info',
  clientLogLevel: 'info',
  host: 'localhost',
  '$0':
   '/Users/sqrt/DATA_2020/code/_REACT/starter_kit/node_modules/.bin/webpack-dev-server' }
```

## Add hookrouter

Use it with lazy loading multiple pages.

## Update for copy webpack plugin

Update webpack.config.js

      // Obsolete 5.1.1 syntax
      // new CopyWebpackPlugin([{ from: "static/", to: "./" }]),
      // New 6.0.1 syntax
      // https://webpack.js.org/plugins/copy-webpack-plugin/
      new CopyWebpackPlugin({
        patterns: [{ from: "./static", to: "./dist" }]
      }),

// https://github.com/dvallin/agora/issues/1
It seems to make it work, You need to add this file

$ touch static/.gitkeep