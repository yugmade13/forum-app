import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api.js';

const ActionTypes = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionTypes.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionTypes.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser(
  {
    email,
    password,
    successCallback = () => {},
  },
) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.loginUser({ email, password });
      await api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      successCallback('/');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    await api.putAccessToken('');
    dispatch(hideLoading());
  };
}

export {
  ActionTypes,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};