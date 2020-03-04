import axios from "axios";

const initialState = {
  user: {},
  loading: false,
  error: false,
  errorMessage: ""
};

const CHECK_USER = "CHECK_USER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const CLEAR_REDUCER = "CLEAR_REDUCER";

export function clearReducer() {
  let action = {
    type: CLEAR_REDUCER
  };

  return action;
}

export function checkUser() {
  let action = {
    type: CHECK_USER,
    payload: axios.get("/api/user")
  };

  return action;
}

export function register(email, password, first_name, last_name) {
  let action = {
    type: REGISTER,
    payload: axios.post(`/api/register`, {
      email,
      password,
      first_name,
      last_name
    })
  };
  console.log("hit");

  return action;
}

export function login(email, password) {
  let action = {
    type: LOGIN,
    payload: axios.post(`/api/login`, { email, password })
  };

  return action;
}

export function logout() {
  let action = {
    type: LOGOUT,
    payload: axios.post("/api/logout")
  };

  return action;
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_USER + "_PENDING":
      return { ...state, loading: true, error: false };
    case CHECK_USER + "_FULFILLED":
      return { ...state, loading: false, user: action.payload.data };
    case CHECK_USER + "_REJECTED":
      console.log("CHECK_USER REJECTED");
      return { ...state, loading: false };
    case LOGIN + "_PENDING":
      return { ...state, loading: true, error: false };
    case LOGIN + "_FULFILLED":
      return { ...state, loading: false, user: action.payload.data };
    case LOGIN + "_REJECTED":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.response.data
      };
    case LOGOUT + "_PENDING":
      return { ...state, loading: true, error: false };
    case LOGOUT + "_FULFILLED":
      return { ...state, ...initialState };
    case LOGOUT + "_REJECTED":
      return { ...state, loading: false, error: true };
    case REGISTER + "_PENDING":
      return { ...state, loading: true, error: false };
    case REGISTER + "_FULFILLED":
      console.log("hit");
      return { ...state, loading: false, user: action.payload.data };
    case REGISTER + "_REJECTED":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.response.data
      };
    case CLEAR_REDUCER:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
