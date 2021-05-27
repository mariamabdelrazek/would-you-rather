import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { Card, Avatar } from "antd";

class UserCardStats extends Component {
  render() {
    const { user, answersNum, questionsNum, score } = this.props;
    return (
      <div>
        <Card className="question-card" title={user.name}>
          <div className="avatar-container">
            <Avatar size={150} src={user.avatarURL} />
          </div>
          <div>
            <p>{`Answered questions: ${answersNum}`}</p>
            <p>{`Created questions: ${questionsNum}`}</p>
          </div>
          <div className="score">
            <p>
              Score:<span>{score}</span>
            </p>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users }, { userId }) {
  const user = users[userId];
  const answersNum = Object.keys(user.answers).length;
  const questionsNum = user.questions.length;
  const score = answersNum + questionsNum;
  return {
    user,
    answersNum,
    questionsNum,
    score,
  };
}

export default connect(mapStateToProps)(UserCardStats);
