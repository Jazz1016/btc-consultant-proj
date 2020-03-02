import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  userReducer,
  cartReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
