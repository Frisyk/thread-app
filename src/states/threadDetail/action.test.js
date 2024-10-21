/* eslint-disable import/no-extraneous-dependencies */
/**
 * skenario test
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncAddComment thunk
 *   - should dispatch actions correctly when comment addition is successful
 *   - should dispatch actions and call alert correctly when comment addition fails
 *
 * - asyncUpvoteComment thunk
 *   - should dispatch actions correctly when upvoting a comment is successful
 *   - should dispatch actions and call alert correctly when upvoting a comment fails
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreadDetail,
  receiveThreadDetailActionCreator,
  asyncAddComment,
  addCommentActionCreator,
  upvoteCommentActionCreator,
  asyncUpvoteComment,
} from './action';

const fakethreadsResponse = [
  {
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
];

const fakeCommentResponse = {
  id: 'comment-1',
  content: 'This is a comment',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
};

const fakeAuthUser = { id: 'users-1', name: 'John Doe' };

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadsDetail = api.getThreadsDetail;
  });

  afterEach(() => {
    api.getThreadsDetail = api._getThreadsDetail;

    // delete backup data
    delete api._getThreadsDetail;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getThreadsDetail = () => Promise.resolve(fakethreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakethreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getThreadsDetail = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
  });

  afterEach(() => {
    api.createComment = api._createComment;
    delete api._createComment;
  });

  it('should dispatch actions correctly when comment addition is successful', async () => {
    // arrange
    api.createComment = () => Promise.resolve({ comment: fakeCommentResponse });
    const dispatch = vi.fn();
    const threadId = 'thread-1';
    const content = 'This is a comment';

    // action
    await asyncAddComment(threadId, content)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeCommentResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when comment addition fails', async () => {
    // arrange
    api.createComment = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const threadId = 'thread-1';
    const content = 'This is a comment';

    // action
    await asyncAddComment(threadId, content)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUpvoteComment thunk', () => {
  beforeEach(() => {
    api._upvoteComment = api.upvoteComment;
  });

  afterEach(() => {
    api.upvoteComment = api._upvoteComment;
    delete api._upvoteComment;
  });

  it('should dispatch actions correctly when upvoting a comment is successful', async () => {
    // arrange
    api.upvoteComment = () => Promise.resolve();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: fakeAuthUser });
    const threadId = 'thread-1';
    const commentId = 'comment-1';

    // action
    await asyncUpvoteComment(threadId, commentId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upvoteCommentActionCreator({
      commentId, userId: fakeAuthUser.id,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when upvoting a comment fails', async () => {
    // arrange
    api.upvoteComment = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => ({ authUser: fakeAuthUser });
    const threadId = 'thread-1';
    const commentId = 'comment-1';

    // action
    await asyncUpvoteComment(threadId, commentId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upvoteCommentActionCreator({
      commentId, userId: fakeAuthUser.id,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
