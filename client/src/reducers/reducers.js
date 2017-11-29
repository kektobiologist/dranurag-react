import { changeLoginState } from "../actions/actions";

export var loginReducer = (state = false, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN_STATE":
      return action.value;
    default:
      return state;
  }
};
