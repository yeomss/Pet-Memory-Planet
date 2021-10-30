const { produce } = require("immer");

const LOGIN_MODAL_OPEN = "LOGIN_MODAL_OPEN";
const LOGIN_MODAL_CLOSE = "LOGIN_MODAL_CLOSE";

const initialState = {
  isLoginModalOpen: false,
};

const modalReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case LOGIN_MODAL_OPEN:
        draft.isLoginModalOpen = true;
        break;

      case LOGIN_MODAL_CLOSE:
        draft.isLoginModalOpen = false;
        break;

      default:
        break;
    }
  });
};

module.exports = modalReducer;
