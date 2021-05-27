import { SET_AUTHED_USER, LOGOUT } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      console.log(action);
      return action.id;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
