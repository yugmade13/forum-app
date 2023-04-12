import { ActionTypes } from './action.js';

function threadsReducer(threads = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionTypes.ADD_THREAD:
      return [...threads, action.payload.thread];
    case ActionTypes.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat([action.payload.userId]),
          };
        }

        return thread;
      });
    case ActionTypes.TOGGLE_UNLIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.concat([action.payload.userId]),
          };
        }

        return thread;
      });
    case ActionTypes.TOGGLE_NEUTRALIZE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }

        return thread;
      });
    default:
      return threads;
  }
}

export { threadsReducer };