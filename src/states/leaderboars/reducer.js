import { ActionTypes } from './action.js';

function leaderboardsReducer(leaderboards = null, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;