import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import UserCardStats from "./UserCardStats";

class LeaderBoard extends Component {
  render() {
    const { usersIds } = this.props;
    return (
      <div>
        <ul className="questions-list">
          {usersIds.map((id) => (
            <li key={id}>
              <UserCardStats userId={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usersIds = Object.keys(users).sort((a, b) => {
    const questionsA = users[a].questions.length;
    const questionsB = users[b].questions.length;
    const answersA = Object.keys(users[a].answers).length;
    const answersB = Object.keys(users[b].answers).length;
    const score = questionsB + answersB - questionsA - answersA;
    return score;
  });
  return {
    usersIds,
    users,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
