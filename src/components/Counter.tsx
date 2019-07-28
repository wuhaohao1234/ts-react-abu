// ./src/components/Counter.tsx
// import React from "react"; // 之前的写法
// 在ts中引入的写法
import * as React from "react";

// 写一个接口对name进行类型校验
// 如果我们不写校验的话，在外部传name进来会报错的
interface IProps {
  name: string
}

// 我们还可以用接口约束state的状态
interface IState {
  number: number
}

export default class CounterComponent extends React.Component<IProps, IState>{
  // 状态state
  public state: IState = {
    number: 0
  }
  public render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <p>{this.props.name}</p>
        <button onClick={() => this.setState({ number: this.state.number + 1 })}>+</button>
      </div>
    )
  }
}