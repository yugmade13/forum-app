import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import usersReducer from './user/reducer.js';
import authUserReducer from './authUser/reducer.js';
import { threadsReducer } from './threads/reducer.js';
import { detailThreadReducer } from './threadDetail/reducer.js';
import leaderboardsReducer from './leaderboars/reducer.js';
import isPreloadReducer from './isPreload/reducer.js';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    threadDetail: detailThreadReducer,
    threads: threadsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;