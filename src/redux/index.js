import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import hospitalReducer from "./hospitalReducer";
import reviewReducer from "./reviewReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
  hospitals: hospitalReducer,
  reviews: reviewReducer,
  users: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
