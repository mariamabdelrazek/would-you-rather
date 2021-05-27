import { connect } from "react-redux";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

class Nav extends Component {
  render() {
    const { name } = this.props;
    return (
      <nav className="nav">
        <Menu className="nav-container" theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/leaderboard" activeClassName="active">
              Leader Board
            </NavLink>
          </Menu.Item>
          <Menu.Item className="user-name" key="4">
            <p>{`Hello, ${name}`}</p>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/logout" activeClassName="active">
              Logout
            </NavLink>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return { name: users[authedUser].name };
}
export default connect(mapStateToProps)(Nav);
