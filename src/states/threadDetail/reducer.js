import { ActionTypes } from './action.js';

function detailThreadReducer(detailThread = null, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionTypes.CLEAR_DETAIL_THREAD:
      return null;
    case ActionTypes.TOGGLE_LIKE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy.concat([action.payload.userId]),
      };
    case ActionTypes.TOGGLE_UNLIKE_DETAIL_THREAD:
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.downVotesBy.concat([action.payload.userId]),
      };
    case ActionTypes.TOGGLE_NEUTRALIZE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId),
      };
    case ActionTypes.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [...detailThread.comments, action.payload.comment],
      };
    case ActionTypes.TOGGLE_LIKE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat([action.payload.userId]),
            };
          }

          return comment;
        }),
      };
    case ActionTypes.TOGGLE_UNLIKE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                : comment.downVotesBy.concat([action.payload.userId]),
            };
          }

          return comment;
        }),
      };
    case ActionTypes.TOGGLE_NEUTRALIZE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }

          return comment;
        }),
      };
    default:
      return detailThread;
  }
}

export { detailThreadReducer };