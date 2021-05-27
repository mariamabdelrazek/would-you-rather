import { connect } from "react-redux";
import React, { Component } from "react";
import { Avatar, Button, Card } from "antd";
import { Link, withRouter } from "react-router-dom";

class QuestionCard extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { user, question, id } = this.props;
    return (
      <Card
        hoverable
        style={{ width: 800 }}
        title={`${user.name} asks:`}
        className="question-card"
      >
        <div className="avatar-container">
          <Avatar size={150} src={user.avatarURL} />
        </div>
        <div className="question-container">
          <p>Would you rather</p>
          <Link to={`/question/${id}`}>
            <Button type="primary" ghost className="question-card__button">
              View Poll
            </Button>
          </Link>
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

export default withRouter(connect(mapStateToProps)(QuestionCard));
