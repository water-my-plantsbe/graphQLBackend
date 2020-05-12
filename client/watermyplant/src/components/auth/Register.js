import React, { Component } from "react";
import { SIGN_UP_USER } from "../queries/index";
import { Mutation } from "react-apollo";
import { ToastContainer, toast } from "react-toastify";
import "./Login.style.scss";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  username: "",
  password: "",
  email: "",
  phone: "",
  response: null,
};

class Register extends Component {
  state = {
    ...initialState,
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e, signUpUser) => {
    e.preventDefault();
    signUpUser().then(async (data) => {
      this.setState({ response: data.data.signUpUser });
      this.notify();
      await this.props.refetch();
    });
  };
  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };
  notify = () => {
    toast.info(this.state.response.message);
    if (this.state.response.success) {
      setTimeout(() => this.props.history.push("/login"), 800);
    }
  };
  render() {
    const { username, password, email, phone, response } = this.state;
    return (
      <div className="login-container">
        <h1 className="signIn-title">Sign Up</h1>
        <Mutation
          mutation={SIGN_UP_USER}
          variables={{ username, password, email, phone }}
        >
          {(signUpUser, { data, loading, error }) => {
            return (
              <form
                className="form-container"
                onSubmit={(e) => this.handleSubmit(e, signUpUser)}
              >
                <input
                  name="username"
                  value={username}
                  type="text"
                  onChange={this.handleChange}
                  placeholder="username"
                  className="input-item"
                />
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="password"
                  className="input-item"
                />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="email"
                  className="input-item"
                />
                <input
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={this.handleChange}
                  placeholder="phone"
                  className="input-item"
                />
                <button
                  className="btn btn-submit"
                  disabled={loading || this.validateForm()}
                  type="submit"
                >
                  Sign Up
                </button>
                {response ? <ToastContainer /> : null}
                {error && <p className="error-message">{error}</p>}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Register;
