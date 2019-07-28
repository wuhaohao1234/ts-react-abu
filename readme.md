# react-ts

> react-ts入门教程

## 开始之前

* 配置.gitignore

    ```
    # git忽略文件

    node_modules
    dist
    ```

* 初始化环境

    `npm init -y`

* npm换为淘宝源,添加.npmrc文件

    `registry=http://registry.npm.taobao.org`

## 安装依赖

### react部分

> react // react的核心文件
> @types/react // 声明文件
> react-dom // react dom的操作包
> @types/react-dom 
> react-router-dom // react路由包
> @types/react-router-dom
> react-redux //数据管理
> @types/react-redux
> redux-thunk  // 中间件
> @types/redux-logger
> redux-logger // 中间件
> connected-react-router

`npm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom react-redux @types/react-redux redux-thunk redux-logger @types/redux-logger connected-react-router -S`

### webpack部分

* webpack // webpack的核心包
* webpack-cli // webapck的工具包
* webpack-dev-server // webpack的开发服务
* html-webpack-plugin // webpack的插件，可以生成index.html文件

`npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D`

### ts部分

* typescript // ts的核心包
* ts-loader // 把ts编译成指定语法比如es5 es6等的工具，有了它，基本不需要babel了，因为它会把我们的代码编译成es5
* source-map-loader // 用于开发环境中调试ts代码
* tslint //用于开发环境下的代码格式校验

`npm i typescript ts-loader source-map-loader tslint -D`

## 开始配置

### 编写tsconfig.json

> 首先我们要生成一个tsconfig.json来告诉ts-loader怎样去编译这个ts代码

`npx tsc --init`

```
// tsconfig.json
{
  // 编译选项
  "compilerOptions": {
    "target": "es5", // 编译成es5语法
    "module": "commonjs", // 模块的类型
    "outDir": "./dist", // 编译后的文件目录
    "sourceMap": true, // 生成sourceMap方便我们在开发过程中调试
    "noImplicitAny": true, // 每个变量都要标明类型
    "jsx": "react", // jsx的版本,使用这个就不需要额外使用babel了，会编译成React.createElement
  },
  // 为了加快整个编译过程，我们指定相应的路径
  "include": [
    "./src/**/*"
  ]
}
```

### 编写tslint.json

> 实现代码规范

`npx tslint --init`

```
{
    "defaultSeverity": "error",
    "extends": "tslint:recommended",
    "jsRules": {},
    "rules": {
        "interface-name": false,
        "trailing-comma": false,
        "max-classes-per-file": false,
        "ordered-imports": false,
        "variable-name": false,
        "prefer-const": false,
        "member-ordering": false,
        "no-bitwise": false,
        "forin": false,
        "object-literal-sort-keys": false,
        "one-line": [
            false
        ],
        "object-literal-key-quotes": [
            false
        ],
        "no-string-literal": false,
        "no-angle-bracket-type-assertion": false,
        "only-arrow-functions": false,
        "no-namespace": false,
        "no-internal-module": false,
        "unified-signatures": false,
        "ban-types": false,
        "no-conditional-assignment": false,
        "radix": false,
        "no-console": false,
        "no-reference": false,
        "semicolon": false,
        "eofline": false,
        "quotemark": false,
        "no-unused-variable": false,
        "no-trailing-whitespace": false,
        "no-unused-expression": false,
        "no-empty": false
    },
    "rulesDirectory": []
}
```

### webpack.config.js文件配置

```
// ./webpack.config.js
// 引入webpack
const webpack = require("webpack");
// 引入webpack插件 生成index.html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")

// 把模块导出
module.exports = {
    // 以前是jsx，因为我们用typescript写，所以这里后缀是tsx
    entry: "./src/index.tsx",
    // 指定模式为开发模式
    mode: "development",
    // 输出配置
    output: {
        // 输出目录为当前目录下的dist目录
        path: path.resolve(__dirname, 'dist'),
        // 输出文件名
        filename: "index.js"
    },
    // 为了方便调试，还要配置一下调试工具
    devtool: "source-map",
    // 解析路径，查找模块的时候使用
    resolve: {
        // 一般写模块不会写后缀，在这里配置好相应的后缀，那么当我们不写后缀时，会按照这个后缀优先查找
        extensions: [".ts", '.tsx', '.js', '.json']
    },
    // 解析处理模块的转化
    module: {
        // 遵循的规则
        rules: [
            {
                // 如果这个模块是.ts或者.tsx，则会使用ts-loader把代码转成es5
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                // 使用sourcemap调试
                // enforce:pre表示这个loader要在别的loader执行前执行
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    // 插件的配置
    plugins: [
        // 这个插件是生成index.html
        new HtmlWebpackPlugin({
            // 以哪个文件为模板，模板路径
            template: "./src/index.html",
            // 编译后的文件名
            filename: "index.html"
        }),
        // 开启热重载
        new webpack.HotModuleReplacementPlugin()
    ],
    // 开发环境服务配置
    devServer: {
        // 启动热更新,当模块、组件有变化，不会刷新整个页面，而是局部刷新
        // 需要和插件webpack.HotModuleReplacementPlugin配合使用
        hot: true,
        // 静态资源目录
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000
    }
}
```

## react组件

> 写一个计数器

src/components/Counter.tsx

```
// ./src/components/Counter.tsx
// import React from "react"; // 之前的写法
// 在ts中引入的写法
import * as React from "react";

export default class CounterComponent extends React.Component{
  // 状态state
  public state = {
    number: 0
  }
  public render(){
    return(
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => this.setState({number: this.state.number + 1})}>+</button>
      </div>
    )
  }
}
```

src/index.tsx

```
// ./src/index.tsx
import * as React from "react";
import * as ReactDom from "react-dom";
import CounterComponent from "./components/Counter";
// 把我们的CounterComponent组件渲染到id为app的标签内
ReactDom.render(<CounterComponent />, document.getElementById("app"))
```

