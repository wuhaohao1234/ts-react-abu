// ./src/index.tsx
import * as React from "react";
import * as ReactDom from "react-dom";

import CounterComponent from "./components/Counter";

// 用Provider包裹CounterComponent组件
// 并且把store传给Provider
// 这样Provider可以向它的子组件提供store
ReactDom.render((
  // <Provider store={store}>
  //   <CounterComponent name="poetries"/>
  // </Provider>
  <CounterComponent name="poetries"/>
), document.getElementById("app"))