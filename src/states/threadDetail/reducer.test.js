/** skenario test
 *
 * - detailThreadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return detail thread when given by RECEIVE_DETAIL_THREAD action
 * */

import { detailThreadReducer } from './reducer';

describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return detail thread when given by RECEIVE_DETAIL_THREAD action', () => {
    const initialState = null;
    const action = {
      type: 'RECEIVE_DETAIL_THREAD',
      payload: {
        detailThread: {
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
        },
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.detailThread);
  });
});