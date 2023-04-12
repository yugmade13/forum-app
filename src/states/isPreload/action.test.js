/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when isPreload success
 *  - should dispatch action and call alert correctly when isPReload failed
 * */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeGetOwnProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something whent wrong');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when isPreload success', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeGetOwnProfileResponse);

    const dispatch = jest.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when isPReload failed', async () => {
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});