import { connect } from "react-redux";
import React, { Component } from "react";
import { Avatar, Button, Card } from "antd";
import { Link } from "react-router-dom";

class UnansweredPole extends Component {
  componentDidMount() {}
  render() {
    console.log(this.props);
    const { user, question, id, handleChange, handleSubmitAnswer } = this.props;
    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }
    const optionOne = question.optionOne.text;
    const optionTwo = question.optionTwo.text;
    return (
      <Card
        style={{ width: 800 }}
        title={`${user.name} asks:`}
        className="question-card"
      >
        <div className="avatar-container">
          <Avatar size={150} src={user.avatarURL} />
        </div>
        <div className="question-container">
          <p>Would you rather</p>
          <form onSubmit={handleSubmitAnswer}>
            <label>
              <input
                type="radio"
                name="answers"
                value="optionOne"
                onChange={handleChange}
                defaultChecked={true}
              />
              {optionOne}
            </label>
            <label>
              <input
                type="radio"
                name="answers"
                value="optionTwo"
                onChange={handleChange}
              />
              {optionTwo}
            </label>
            <div>
              <button className="button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Card>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const user = users[question.author];

  return {
    question,
    user,
    authedUser,
  };
}

export default connect(mapStateToProps)(UnansweredPole);
