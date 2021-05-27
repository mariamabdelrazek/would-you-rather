import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import UserCardStats from "./UserCardStats";

class LeaderBoard extends Component {
  render() {
    console.log(this.props);
    const { usersIds } = this.props;
    return (
      <div>
        <ul className="questions-list">
          {usersIds.map((id) => (
            <li>
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
    const score = questionsA + questionsB + answersA + answersB;
    return score;
  });
  return {
    usersIds,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
