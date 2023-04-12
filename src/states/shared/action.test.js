/**
 * skenario test
 *
 * - asyncPopulateUserAndThread thunk and asyncPopulateThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUserAndThread, asyncPopulateThreadDetail } from './action';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveDetailThreadActionCreator } from '../threadDetail/action';

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUserAndThread thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = jest.fn();

    await asyncPopulateUserAndThread()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncPopulateUserAndThread()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

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

describe('asyncPopulateThreadDetail thunk', () => {
  beforeEach(() => {
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    api.getDetailThread = api._getDetailThread;

    delete api._getDetailThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getDetailThread = () => Promise.resolve(fakeDetailThreadResponse);

    const mockThreadDetail = {
      threadDetail: fakeDetailThreadResponse,
    };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(mockThreadDetail);

    await asyncPopulateThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveDetailThreadActionCreator(fakeDetailThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('hould dispatch action and call alert correctly when data fetching failed', async () => {
    api.getDetailThread = () => Promise.reject(fakeErrorResponse);

    const mockThreadDetail = {
      threadDetail: fakeDetailThreadResponse,
    };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(mockThreadDetail);
    window.alert = jest.fn();

    await asyncPopulateThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});