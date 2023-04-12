import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api.js';

const ActionTypes = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionTypes.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser(
  {
    name,
    email,
    password,
    successCallback = () => {},
  },
) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.registerUser({ name, email, password });
      successCallback('/login');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionTypes,
  asyncRegisterUser,
  receiveUsersActionCreator,
};