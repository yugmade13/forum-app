/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when login success
 *  - should dispatch action and call alert correctly when login failed
 * */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

const fakeLoginUserResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw',
};

const fakeGetOwnProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeLoginInput = {
  email: 'john@gmail.com',
  password: '123456',
};

const fakeErrorResponse = new Error('Ups, something whent wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._loginUser = api.loginUser;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.loginUser = api._loginUser;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    delete api._loginUser;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when login success', async () => {
    api.loginUser = () => Promise.resolve(fakeLoginUserResponse);
    api.getOwnProfile = () => Promise.resolve(fakeGetOwnProfileResponse);
    api.putAccessToken = () => Promise.resolve(fakeLoginUserResponse);

    const dispatch = jest.fn();

    await asyncSetAuthUser(fakeLoginInput)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when login failed', async () => {
    api.loginUser = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncSetAuthUser(fakeLoginInput)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});