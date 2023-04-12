/** skenario test
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return leaderboards when given by RECEIVE_LEADERBOARDS action
 * */

import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    const initialState = null;
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
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
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});