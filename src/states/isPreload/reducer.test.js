/** skenario test
*
* - isPreloadReducer function
*  - should return the initial state when given by unknown action
*  - should return false when given by SET_AUTH_USER action
* */

import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return false when given by SET_AUTH_USER action', () => {
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: false,
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBeFalsy();
  });
});