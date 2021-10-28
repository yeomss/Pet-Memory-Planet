const LOGIN_MODAL_OPEN = "LOGIN_MODAL_OPEN";
const LOGIN_MODAL_CLOSE = "LOGIN_MODAL_CLOSE";

// 로그인
const loginModalOpen = (data) => {
  return {
    type: LOGIN_MODAL_OPEN,
    data,
  };
};
const loginModalClose = (data) => {
  return {
    type: LOGIN_MODAL_CLOSE,
    data,
  };
};

module.exports = {
  loginModalOpen,
  loginModalClose,
};
