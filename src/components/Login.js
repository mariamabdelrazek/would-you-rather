import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }
  handleSubmit = (ev) => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(this.state.user));
  };
  onChange = (ev) => {
    const user = ev.target.value;
    this.setState(() => ({
      user,
    }));
  };

  render() {
    const { UsersIds, users } = this.props;

    return (
      <div className="center">
        <h1>Please Choose a User</h1>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.onChange} defaultValue="selectUser">
            <option disabled value="selectUser">
              Select User
            </option>
            {UsersIds.map((id) => (
              <option key={id} value={id}>
                {users[id].name}
              </option>
            ))}
          </select>
          <button
            className="button"
            type="submit"
            disabled={this.state.user === ""}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const UsersIds = Object.keys(users);

  return {
    UsersIds,
    users,
  };
}

export default connect(mapStateToProps)(Login);
