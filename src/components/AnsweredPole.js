import { connect } from "react-redux";
import React, { Component } from "react";
import { Avatar, Button, Card } from "antd";
import { Progress } from "antd";

class AnsweredPole extends Component {
  render() {
    const { user, question, id, answer } = this.props;
    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }
    const optionOne = question.optionOne.text;
    const optionTwo = question.optionTwo.text;
    const op1Votes = question.optionOne.votes.length;
    const op2Votes = question.optionTwo.votes.length;
    const totalVotes = op1Votes + op2Votes;
    const op1Percentage = Math.round((op1Votes / totalVotes) * 100);
    const op2Percentage = Math.round((op2Votes / totalVotes) * 100);
    return (
      <Card
        hoverable
        style={{ width: 800 }}
        title={`Asked by ${user.name}`}
        className="question-card"
      >
        <div className="avatar-container">
          <Avatar size={150} src={user.avatarURL} />
        </div>
        <div className="question-container">
          <p className="question-container__title">Results:</p>
          <div className="option-wrapper">
            <Card
              className={`option-wrapper__card ${
                answer === "optionOne" ? "active" : null
              }`}
            >
              <p className="option-text">{optionOne}</p>
              <Progress percent={op1Percentage} />
              <p className="votes-text">{`${op1Votes} out of ${totalVotes} votes`}</p>
            </Card>
          </div>
          <div className="option-wrapper">
            <Card
              className={`option-wrapper__card ${
                answer === "optionTwo" ? "active" : null
              }`}
            >
              <p className="option-text">{optionTwo}</p>
              <Progress percent={op2Percentage} />
              <p className="votes-text">{`${op2Votes} out of ${totalVotes} votes`}</p>
            </Card>
          </div>
        </div>
      </Card>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  const answer = users[authedUser].answers[id];

  return {
    question,
    user,
    authedUser,
    answer,
  };
}

export default connect(mapStateToProps)(AnsweredPole);
