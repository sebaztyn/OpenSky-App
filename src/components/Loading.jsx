import React, { Component } from "react";

class Loading extends Component {
  state = { text: "Loading." };
  componentDidMount() {
    this.interval = setInterval(() => {
      const text = "Loading.";
      if (this.state.text === "Loading....") {
        return this.setState({ text });
      }
      return this.setState(prevState => ({ text: `${prevState.text}.` }));
    }, 300);
  }

  componentWillUnmount() {
    return clearInterval(this.interval);
  }

  render() {
    return <div>{this.state.text}</div>;
  }
}

export default Loading;
