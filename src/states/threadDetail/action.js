import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api.js';

const ActionTypes = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  TOGGLE_LIKE_DETAIL_THREAD: 'TOGGLE_LIKE_DETAIL_THREAD',
  TOGGLE_UNLIKE_DETAIL_THREAD: 'TOGGLE_UNLIKE_DETAIL_THREAD',
  TOGGLE_NEUTRALIZE_DETAIL_THREAD: 'TOGGLE_NEUTRALIZE_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_UNLIKE_COMMENT: 'TOGGLE_UNLIKE_COMMENT',
  TOGGLE_NEUTRALIZE_COMMENT: 'TOGGLE_NEUTRALIZE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionTypes.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionTypes.CLEAR_DETAIL_THREAD,
  };
}

function toggleLikeThreadDetailActionCreator(userId) {
  return {
    type: ActionTypes.TOGGLE_LIKE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleUnlikeThreadDetailActionCreator(userId) {
  return {
    type: ActionTypes.TOGGLE_UNLIKE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleNeutralizeThreadDetailActionCreator(userId) {
  return {
    type: ActionTypes.TOGGLE_NEUTRALIZE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleLikeCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionTypes.TOGGLE_LIKE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function toggleUnlikeCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionTypes.TOGGLE_UNLIKE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function toggleNeutralizeCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionTypes.TOGGLE_NEUTRALIZE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeThreadDetailActionCreator(authUser.id));
    dispatch(toggleLikeThreadDetailActionCreator(authUser.id));
    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleUnlikeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeThreadDetailActionCreator(authUser.id));
    dispatch(toggleUnlikeThreadDetailActionCreator(authUser.id));
    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUnlikeThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleNeutralizeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeThreadDetailActionCreator(authUser.id));
    try {
      await api.neutralVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncAddComment(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { threadDetail } = getState();
    try {
      const comment = await api.createComment({ threadId: threadDetail.id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeCommentActionCreator({ userId: authUser.id, commentId }));
    dispatch(toggleLikeCommentActionCreator({ userId: authUser.id, commentId }));
    try {
      await api.upVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeCommentActionCreator({ userId: authUser.id, commentId }));
    }
  };
}

function asyncToggleUnlikeComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeCommentActionCreator({ userId: authUser.id, commentId }));
    dispatch(toggleUnlikeCommentActionCreator({ userId: authUser.id, commentId }));
    try {
      await api.downVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUnlikeCommentActionCreator({ userId: authUser.id, commentId }));
    }
  };
}

function asyncToggleNeutralizeComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeCommentActionCreator({ userId: authUser.id, commentId }));
    try {
      await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeCommentActionCreator({ userId: authUser.id, commentId }));
    }
  };
}

export {
  ActionTypes,
  receiveDetailThreadActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveDetailThread,
  asyncToggleLikeThreadDetail,
  asyncToggleUnlikeThreadDetail,
  asyncToggleNeutralizeThreadDetail,
  toggleLikeCommentActionCreator,
  toggleUnlikeCommentActionCreator,
  toggleNeutralizeCommentActionCreator,
  asyncAddComment,
  asyncToggleLikeComment,
  asyncToggleUnlikeComment,
  asyncToggleNeutralizeComment,
};