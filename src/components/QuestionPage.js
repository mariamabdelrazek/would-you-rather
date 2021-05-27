import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { Avatar, Button, Card } from "antd";
import { Link, withRouter } from "react-router-dom";
import UnansweredPole from "./UnansweredPole";
import AnsweredPole from "./AnsweredPole";
import { handleAnswerQuestion } from "../actions/shared";

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "optionOne",
    };
  }

  handleChange = (ev) => {
    const answer = ev.target.value;
    this.setState(() => ({
      answer,
    }));
  };
  handleSubmitAnswer = (ev) => {
    ev.preventDefault();
    const { authedUser, question, qid, dispatch } = this.props;
    const answer = this.state.answer;
    dispatch(handleAnswerQuestion({ authedUser, qid, answer }));
  };
  render() {
    const { user, question, qid, answered } = this.props;
    return (
      <Fragment>
        {!question ? (
          <p>Page Couldn't be Found, This Question doesn't exist</p>
        ) : answered ? (
          <AnsweredPole id={qid} />
        ) : (
          <UnansweredPole
            id={qid}
            handleChange={this.handleChange}
            handleSubmitAnswer={this.handleSubmitAnswer}
          />
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const user = question ? users[question.author] : null;
  const answeredQuestions = Object.keys(users[authedUser].answers);
  const questionStatus = answeredQuestions.includes(id);

  return {
    question,
    user,
    authedUser,
    qid: id,
    answered: questionStatus,
  };
}

export default connect(mapStateToProps)(QuestionPage);
