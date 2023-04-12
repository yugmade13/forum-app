import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api.js';

const ActionTypes = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_UNLIKE_THREAD: 'TOGGLE_UNLIKE_THREAD',
  TOGGLE_NEUTRALIZE_THREAD: 'TOGGLE_NEUTRALIZE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionTypes.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionTypes.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionTypes.TOGGLE_LIKE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function toggleUnlikeThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionTypes.TOGGLE_UNLIKE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function toggleNeutralizeThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionTypes.TOGGLE_NEUTRALIZE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function asyncAddThread(
  {
    title,
    body,
    category,
    successCallback = () => {},
  },
) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      successCallback('/');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralizeThreadActionCreator({ userId: authUser.id, threadId }));
    dispatch(toggleLikeThreadActionCreator({ userId: authUser.id, threadId }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadActionCreator({ userId: authUser.id, threadId }));
    }
  };
}

function asyncToggleUnlikeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralizeThreadActionCreator({ userId: authUser.id, threadId }));
    dispatch(toggleUnlikeThreadActionCreator({ userId: authUser.id, threadId }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUnlikeThreadActionCreator({ userId: authUser.id, threadId }));
    }
  };
}

function asyncToggleNeutralizeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralizeThreadActionCreator({ userId: authUser.id, threadId }));
    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeThreadActionCreator({ userId: authUser.id, threadId }));
    }
  };
}

export {
  ActionTypes,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleLikeThread,
  asyncToggleUnlikeThread,
  asyncToggleNeutralizeThread,
};