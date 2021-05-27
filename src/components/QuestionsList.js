import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { Tabs } from "antd";
import QuestionCard from "./QuestionCard";
const { TabPane } = Tabs;

class QuestionList extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { answeredIds } = this.props;
    const { unansweredIds } = this.props;
    return (
      <Tabs centered={true}>
        <TabPane centered={true} tab="Unanswered Questions" key="1">
          <ul className="questions-list">
            {unansweredIds.map((id) => (
              <li key={id}>
                <QuestionCard id={id} />
              </li>
            ))}
          </ul>
        </TabPane>
        <TabPane tab="Answered Questioned" key="2">
          <ul className="questions-list">
            {answeredIds.map((id) => (
              <li key={id}>
                <QuestionCard id={id} />
              </li>
            ))}
          </ul>
        </TabPane>
      </Tabs>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const allQuestions = questions ? Object.keys(questions) : [];
  const answeredQuestions = user ? Object.keys(user.answers) : [];
  const unansweredQuestions = allQuestions.filter(
    (val) => !answeredQuestions.includes(val)
  );
  return {
    answeredIds: answeredQuestions.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    unansweredIds: unansweredQuestions.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(QuestionList);
