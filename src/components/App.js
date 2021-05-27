import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import QuestionsList from "./QuestionsList";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true ? (
            <Login />
          ) : (
            <Fragment>
              <div className="container">
                <Nav />
                <Switch>
                  <Route path="/" exact component={QuestionsList} />
                  <Route path="/questions/:id" exact component={QuestionPage} />
                  <Route path="/add" exact component={NewQuestion} />
                  <Route path="/leaderboard" exact component={LeaderBoard} />
                  <Route path="/login" exact component={Login} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </Fragment>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
