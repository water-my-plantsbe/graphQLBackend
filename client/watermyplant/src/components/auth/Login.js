import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGN_IN_USER } from "../queries";
import Response from "../utils/Response";
import { withRouter } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  response: null,
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
    e.preventDefault();
    signInUser().then(async (data) => {
      this.setState({ response: data.data.signInUser });
      let token = data.data.signInUser.token;
      if (token) {
        localStorage.setItem("token", token);
        this.props.history.push("/");
      }
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
                {this.state.response ? (
                  <Response response={this.state.response} />
                ) : null}
                {error && <p>{error}</p>}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Login);
