/**
 * skenario test
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncReceiveDetailThread, receiveDetailThreadActionCreator, clearThreadDetailActionCreator } from './action';

const fakeDetailThreadResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    api.getDetailThread = api._getDetailThread;

    delete api._getDetailThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getDetailThread = () => Promise.resolve(fakeDetailThreadResponse);

    const dispatch = jest.fn();

    await asyncReceiveDetailThread(fakeDetailThreadResponse)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      clearThreadDetailActionCreator(),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveDetailThreadActionCreator(fakeDetailThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getDetailThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncReceiveDetailThread(fakeDetailThreadResponse)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      clearThreadDetailActionCreator(),
    );
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});