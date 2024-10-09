import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncAddComment,
  asyncDownvoteComment,
  asyncReceiveThreadDetail,
  asyncUpvoteComment,
} from '../states/threadDetail/action';

import ThreadDetail from '../components/ThreadDetail';
import { asyncDownvoteThread, asyncUpvoteThread } from '../states/threads/action';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const upVote = (threadId) => {
    dispatch(asyncUpvoteThread(threadId));
  };

  const downVote = (threadId) => {
    dispatch(asyncDownvoteThread(threadId));
  };

  const upvoteComment = (threadId, commentId) => {
    dispatch(asyncUpvoteComment(threadId, commentId));
  };

  const downVoteComment = (threadId, commentId) => {
    dispatch(asyncDownvoteComment(threadId, commentId));
  };

  const onAddComment = (threadId, content) => {
    dispatch(asyncAddComment(threadId, content));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <ThreadDetail
        key={id}
        thread={threadDetail}
        authUser={authUser.id}
        upvote={upVote}
        downvote={downVote}
        downvoteComment={downVoteComment}
        upvoteComment={upvoteComment}
        addComment={onAddComment}
      />
    </section>

  );
}

export default DetailPage;
