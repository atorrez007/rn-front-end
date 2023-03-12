import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import hospitalReducer from "./hospitalReducer";

const reducer = combineReducers({
  hospitals: hospitalReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
