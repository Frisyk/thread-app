import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncAddComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
  asyncNeutralizeThreadVote,
  asyncReceiveThreadDetail,
  asyncUpvoteComment,
} from '../states/threadDetail/action';

import ThreadDetail from '../components/ThreadDetail';
import { asyncDownvoteThread, asyncUpvoteThread } from '../states/threads/action';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail, authUser } = useSelector((state) => ({
    threadDetail: state.threadDetail || null,
    authUser: state.authUser,
  }));
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

  const neutralizedVote = (threadId) => {
    dispatch(asyncNeutralizeThreadVote(threadId));
  };

  const upvoteComment = (threadId, commentId) => {
    dispatch(asyncUpvoteComment(threadId, commentId));
  };

  const downVoteComment = (threadId, commentId) => {
    dispatch(asyncDownvoteComment(threadId, commentId));
  };

  const neutralizedVoteComment = (threadId, commentId) => {
    dispatch(asyncNeutralizeCommentVote(threadId, commentId));
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
        neutralizedvote={neutralizedVote}
        downvoteComment={downVoteComment}
        upvoteComment={upvoteComment}
        neutralizedvoteComment={neutralizedVoteComment}
        addComment={onAddComment}
      />
    </section>

  );
}

export default DetailPage;
