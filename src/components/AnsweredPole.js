import { connect } from "react-redux";
import React, { Component } from "react";
import { Avatar, Button, Card } from "antd";
import { Link, withRouter } from "react-router-dom";

class AnsweredPole extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { user, question, id } = this.props;
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
          <p>Results:</p>
          <p></p>
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
    questions,
    user,
    authedUser,
    answer,
  };
}

export default connect(mapStateToProps)(AnsweredPole);
