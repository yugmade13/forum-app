/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when fetching data success
 *  - should dispatch action and call alert correctly when fetching data failed
 * */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from './action';

const fakeLeaderboradsResponse = {
  leaderboards: [
    {
      user: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 10,
    },
    {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 5,
    },
  ],
};

const fakeErrorResponse = new Error('Ups, something whent wrong');

describe('asyncReceiveLeaderboards', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when fetching data success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboradsResponse);

    const dispatch = jest.fn();

    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboradsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when fetching data failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});