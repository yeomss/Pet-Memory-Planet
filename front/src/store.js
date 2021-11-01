const { createStore, compose, applyMiddleware } = require("redux");
const reducer = require("./reducers");
const { composeWithDevTools } = require("redux-devtools-extension");

// state 초기값
const initialState = {};

// 미들웨어
const logginMiddleware = (store) => (dispatch) => (action) => {
  console.log("## 로깅: ", action);
  dispatch(action);
  console.log("액션 끝!");
};
const thunkMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return dispatch(action);
};

// 미들웨어 연결
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(logginMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(logginMiddleware, thunkMiddleware));

// store
const store = createStore(reducer, initialState, enhancer);

module.exports = store;
