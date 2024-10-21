/* eslint-disable import/no-extraneous-dependencies */
/**
 * threadDetailsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the thread details when given by RECEIVE_THREAD_DETAILS action
 *  - should clear the thread detail when given by CLEAR_THREAD_DETAIL action/
 *  - should return the upvoted thread details when given by UPVOTE_THREAD action
 *  - should return the downvoted thread details when given by DOWNVOTE_THREAD action
 *  - should return the neutralized vote thread details when given by NEUTRALIZE_VOTE_THREAD action
 *  - should add a comment when given by ADD_COMMENT action
 *  - should return the upvoted comment when given by UPVOTE_COMMENT action
 *  - should return the downvoted comment when given by DOWNVOTE_COMMENT action
 *  - should return the neutralized vote comment when given by NEUTRALIZE_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
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
          comments: [],
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should clear the thread detail when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
      comments: [],
    };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(null);
  });

  it('should return the upvoted thread when given by UPVOTE_THREAD action', () => {
    // arrange
    const initialState = {
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
      comments: [],
    };
    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.upVotesBy).toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('should return the downvoted thread when given by DOWNVOTE_THREAD action', () => {
    // arrange
    const initialState = {
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
      comments: [],
    };
    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.downVotesBy).toContain('user-1');
    expect(nextState.upVotesBy).not.toContain('user-1');
  });

  it('should neutralize votes when given by NEUTRALIZE_VOTE_THREAD action', () => {
    // arrange
    const initialState = {
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
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.upVotesBy).not.toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('should add a comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
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
      comments: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'This is a comment',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.comments).toHaveLength(1);
    expect(nextState.comments[0]).toEqual(action.payload.comment);
  });

  it('should return the upvoted comment when given by UPVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [{
        id: 'comment-1',
        content: 'This is a comment',
        upVotesBy: [],
        downVotesBy: [],
      }],
    };
    const action = {
      type: ActionType.UPVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.comments[0].upVotesBy).toContain('user-1');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
  });

  it('should return the downvoted comment when given by DOWNVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [{
        id: 'comment-1',
        content: 'This is a comment',
        upVotesBy: [],
        downVotesBy: [],
      }],
    };
    const action = {
      type: ActionType.DOWNVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.comments[0].downVotesBy).toContain('user-1');
    expect(nextState.comments[0].upVotesBy).not.toContain('user-1');
  });

  it('should return the neutralized vote comment when given by NEUTRALIZE_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [{
        id: 'comment-1',
        content: 'This is a comment',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      }],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.comments[0].upVotesBy).not.toContain('user-1');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
  });
});
