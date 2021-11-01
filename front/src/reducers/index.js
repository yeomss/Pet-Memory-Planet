const { combineReducers } = require("redux");
const userReducer = require("./user");
const modalReducer = require("./modal");
const planetReducer = require("./planet");
const boardReducer = require("./board");
const itemReducer = require("./item");

module.exports = combineReducers({
  user: userReducer,
  modal: modalReducer,
  planet: planetReducer,
  board: boardReducer,
  item: itemReducer,
});
