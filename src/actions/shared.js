import { getInitialData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import {
  receiveUsers,
  saveUserAnswer,
  saveUserQuestion,
} from "../actions/users";
import {
  receiveQuestions,
  saveAnswer,
  saveNewQuestion,
} from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      console.log(users, questions, AUTHED_ID);
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer(info)
      .then(() => {
        dispatch(saveUserAnswer(info));
        dispatch(saveAnswer(info));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleNewQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestion(question).then((question) => {
      console.log(question);
      dispatch(saveNewQuestion(question));
      dispatch(saveUserQuestion(question));
      dispatch(hideLoading());
    });
  };
}
