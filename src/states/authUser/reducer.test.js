/**
 * authUserReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the auth user when given the SET_AUTH_USER action
 *  - should return null when given the UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the auth user when given SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-1',
          name: 'John Doe',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      id: 'user-1',
      name: 'John Doe',
    });
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
    };
    const action = { type: ActionType.UNSET_AUTH_USER };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
