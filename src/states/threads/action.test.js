/**
 * Test scenario
 *
 * - asyncAddThread
 *   - should dispatch actions correctly when creating a thread is successful
 *   - should dispatch actions and call alert correctly when creating a thread fails
 *
 * - asyncUpvoteThread
 *   - should dispatch actions correctly when upvoting is successful
 *   - should dispatch actions and call alert correctly when upvoting fails
 *
 * - asyncDownvoteThread
 *   - should dispatch actions correctly when downvoting is successful
 *   - should dispatch actions and call alert correctly when downvoting fails
 *
 * - asyncNeutralizeThreadVote
 *   - should dispatch actions correctly when neutralizing vote is successful
 *   - should dispatch actions and call alert correctly when neutralizing vote fails
 */
import {
  describe, it, vi, expect,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncAddThread,
  addThreadActionCreator,
  asyncUpvoteThread,
  upvoteThreadActionCreator,
  asyncDownvoteThread,
  downvoteThreadActionCreator,
  asyncNeutralizeThreadVote,
  neutralizeThreadVoteActionCreator,
} from './action';

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'New Thread',
  body: 'This is a new thread',
  category: 'General',
};

const fakeErrorResponse = new Error('Failed to create thread');

describe('asyncAddThread thunk', () => {
  it('should dispatch actions correctly when creating a thread is successful', async () => {
    // arrange
    api.createThreads = () => Promise.resolve(fakeThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncAddThread('New Thread', 'This is a new thread', 'General')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when creating a thread fails', async () => {
    // arrange
    api.createThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncAddThread('New Thread', 'This is a new thread', 'General')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUpvoteThread thunk', () => {
  it('should dispatch actions correctly when upvoting is successful', async () => {
    // arrange
    api.upvoteThread = () => Promise.resolve();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    // action
    await asyncUpvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upvoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when upvoting fails', async () => {
    // arrange
    api.upvoteThread = () => Promise.reject(new Error('Failed to upvote'));
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    // action
    await asyncUpvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upvoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(window.alert).toHaveBeenCalledWith('Failed to upvote');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncDownvoteThread thunk', () => {
  it('should dispatch actions correctly when downvoting is successful', async () => {
    // arrange
    api.downvoteThread = () => Promise.resolve();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    // action
    await asyncDownvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(downvoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when downvoting fails', async () => {
    // arrange
    api.downvoteThread = () => Promise.reject(new Error('Failed to downvote'));
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    // action
    await asyncDownvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(downvoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(window.alert).toHaveBeenCalledWith('Failed to downvote');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncNeutralizeThreadVote thunk', () => {
  it('should dispatch actions correctly when neutralizing vote is successful', async () => {
    // arrange
    api.neutralizeThreadVote = () => Promise.resolve();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    // action
    await asyncNeutralizeThreadVote('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(neutralizeThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when neutralizing vote fails', async () => {
    // arrange
    api.neutralizeThreadVote = () => Promise.reject(new Error('Failed to neutralize vote'));
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    // action
    await asyncNeutralizeThreadVote('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(neutralizeThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(window.alert).toHaveBeenCalledWith('Failed to neutralize vote');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
