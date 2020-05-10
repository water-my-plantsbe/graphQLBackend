import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGN_IN_USER } from "../queries";
const initialState = {
  username: "",
  password: "",
};

class Login extends Component {
  state = {
    ...initialState,
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e, signInUser) => {
    console.log("heelo");
    e.preventDefault();
    signInUser().then(async (data) => {
      console.log(data);
    });
  };
  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };
  clearState = () => {
    this.setState({ ...initialState });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Sign In</h1>
        <Mutation mutation={SIGN_IN_USER} variables={{ username, password }}>
          {(signInUser, { data, loading, error }) => {
            return (
              <form onSubmit={(e) => this.handleSubmit(e, signInUser)}>
                <input
                  name="username"
                  value={username}
                  type="text"
                  onChange={this.handleChange}
                  placeholder="username"
                />
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="password"
                />
                <button disabled={loading || this.validateForm()} type="submit">
                  Sign In
                </button>
                {error && <p>{error}</p>}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Login;
