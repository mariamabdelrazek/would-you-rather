import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import QuestionsList from "./QuestionsList";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true ? null : (
            <Fragment>
              <Nav />
              <div className="container">
                <div>
                  <Route path="/" exact component={QuestionsList} />
                  <Route path="/question/:id" exact component={QuestionPage} />
                  <Route path="/add" exact component={NewQuestion} />
                </div>
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
