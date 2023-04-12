import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api.js';
import { receiveUsersActionCreator } from '../user/action.js';
import { receiveThreadsActionCreator } from '../threads/action.js';
import { receiveDetailThreadActionCreator } from '../threadDetail/action.js';

function asyncPopulateUserAndThread() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncPopulateThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { threadDetail } = getState();

    try {
      const thread = await api.getDetailThread(threadDetail.id);
      dispatch(receiveDetailThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUserAndThread, asyncPopulateThreadDetail };