import React, { Component } from "react";
import db from "../db/dummyData.js";
import classes from "../scss/login.module.scss"

export class Login extends Component {
  state = {
    user: "",
    password: "",
    errorMessage: "",
    isFetchSuccessful: false
  };
  handleInput = e => {
    const { name, value } = e.target;
    return this.setState({
      [name]: value,
      errorMessage: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { user, password } = this.state;
    const check = db.filter(data => {
      const value = user === data.user && password === data.password;
      return value;
    });
    if (check.length) {
      this.setState({ isFetchSuccessful: true });
      return this.props.history.replace("/homepage");
    }
    return this.setState({
      errorMessage: "Invalid user or password. Try again",
      isFetchSuccessful: false
    });
  };
  render() {
    const { user, password, errorMessage, isFetchSuccessful } = this.state;
    return (
      <div className={classes.loginContainer}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            pattern="[demo]{4}"
            title="Username must match the text 'demo'"
            value={user}
            onChange={this.handleInput}
            required
            className={classes.loginInput}
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            pattern="[demo]{4}"
            title="Password must match the text 'demo'"
            value={password}
            onChange={this.handleInput}
            required
            className={classes.loginInput}
            placeholder="password"
          />
          <button type="submit" onClick={this.handleSubmit} className={classes.loginButton}>
            LOGIN
          </button>
        </form>
        <div>{!isFetchSuccessful ? errorMessage : ""}</div>
      </div>
    );
  }
}

export default Login;
