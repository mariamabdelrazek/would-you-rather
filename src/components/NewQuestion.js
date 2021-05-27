import { connect } from "react-redux";
import React, { Component } from "react";
import { Card } from "antd";
import { handleNewQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: "",
      optionTwoText: "",
      submitted: false,
    };
  }
  handleChangeOption1 = (ev) => {
    const optionOneText = ev.target.value;
    this.setState(() => ({
      optionOneText,
    }));
  };
  handleChangeOption2 = (ev) => {
    const optionTwoText = ev.target.value;
    this.setState(() => ({
      optionTwoText,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, author } = this.props;

    dispatch(handleNewQuestion({ optionOneText, optionTwoText, author })).then(
      () => {
        this.setState(() => ({
          submitted: true,
          optionOneText: "",
          optionTwoText: "",
        }));
      }
    );
  };

  render() {
    const { optionOneText, optionTwoText, submitted } = this.state;
    if (submitted) {
      return <Redirect to="/" />;
    }
    return (
      <Card
        hoverable
        style={{ width: 800 }}
        title="Create New Question"
        className="question-card"
      >
        <div className="new-question-container">
          <p className="light">Complete the question:</p>
          <p className="new-question-title">Would you rather ...</p>
          <form className="new-question" onSubmit={this.handleSubmit}>
            <textarea
              placeholder="Enter Option One Text Here"
              value={optionOneText}
              onChange={this.handleChangeOption1}
              name={optionOneText}
              maxLength={280}
            />
            <p>OR</p>
            <textarea
              placeholder="Enter Option Two Text Here"
              value={optionTwoText}
              onChange={this.handleChangeOption2}
              name={optionTwoText}
              maxLength={280}
            />
            <button
              className="button"
              type="submit"
              disabled={optionOneText === "" || optionTwoText === ""}
            >
              submit
            </button>
          </form>
        </div>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { author: authedUser };
}
export default connect(mapStateToProps)(NewQuestion);
