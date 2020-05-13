import React, { Component } from "react";
import { ADD_PLANT } from "../queries/index";
import { Mutation } from "react-apollo";
import { ToastContainer, toast } from "react-toastify";
import "./AddPlant.style.scss";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  name: "",
  description: "",
  url: "",
  description: "",
  water_per_week: "",
  sunlight: "",
  temperature: "",
  difficulty: "",
  size: "",
  last_water: "",
};

class AddPlant extends Component {
  state = {
    ...initialState,
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e, signUpUser) => {
    e.preventDefault();
    addPlant().then(async (data) => {
      //   this.setState({ response: data.data.signUpUser });
      //   this.notify();
      //   await this.props.refetch();
      this.clearState();
    });
  };
  validateForm = () => {
    const { name, description } = this.state;
    const isInvalid = !name || !description;
    return isInvalid;
  };
  clearState = () => {
    this.setState({ state: { ...initialState } });
  };
  notify = () => {
    toast.info(this.state.response.message);
    if (this.state.response.success) {
      setTimeout(() => this.props.history.push("/"), 800);
    }
  };
  render() {
    const {
      name,
      description,
      url,
      water_per_week,
      sunlight,
      temperature,
      difficulty,
      size,
      last_water,
    } = this.state;
    return (
      <div className="add-plant-container">
        <h1 className="add-plant-title">Add Plant</h1>
        <Mutation
          mutation={ADD_PLANT}
          variables={{
            name,
            description,
            url,
            water_per_week,
            sunlight,
            temperature,
            difficulty,
            size,
            last_water,
          }}
        >
          {(addPlant, { data, loading, error }) => {
            return (
              <form
                className="form-container"
                onSubmit={(e) => this.handleSubmit(e, addPlant)}
              >
                <input
                  name="name"
                  value={name}
                  type="text"
                  onChange={this.handleChange}
                  placeholder="name"
                  className="input-item"
                />
                <input
                  name="description"
                  type="text"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="description"
                  className="input-item"
                />
                <input
                  name="url"
                  type="text"
                  value={url}
                  onChange={this.handleChange}
                  placeholder="url"
                  className="input-item"
                />
                <input
                  name="water_per_week"
                  type="text"
                  value={water_per_week}
                  onChange={this.handleChange}
                  placeholder="water per week"
                  className="input-item"
                />
                <input
                  name="sunlight"
                  type="text"
                  value={sunlight}
                  onChange={this.handleChange}
                  placeholder="Sunlight"
                  className="input-item"
                />
                <input
                  name="temperature"
                  type="text"
                  value={temperature}
                  onChange={this.handleChange}
                  placeholder="temperature"
                  className="input-item"
                />
                <input
                  name="difficulty"
                  type="text"
                  value={difficulty}
                  onChange={this.handleChange}
                  placeholder="difficulty"
                  className="input-item"
                />
                <input
                  name="size"
                  type="text"
                  value={size}
                  onChange={this.handleChange}
                  placeholder="size"
                  className="input-item"
                />
                <input
                  name="last_water"
                  type="text"
                  value={last_water}
                  onChange={this.handleChange}
                  placeholder="last water"
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

export default AddPlant;
