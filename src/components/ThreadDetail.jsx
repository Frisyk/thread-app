import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';
import CommentItem from './CommentItem';
import AddComment from './AddComment';

function ThreadDetail({
  thread: {
    id, title, body, category, createdAt, owner, upVotesBy = [], downVotesBy = [], comments,
  },
  authUser,
  upvote,
  downvote,
  neutralizedvote,
  upvoteComment,
  downvoteComment,
  neutralizedvoteComment,
  addComment,
}) {
  const isUpvoted = upVotesBy.includes(authUser);
  const isDownvoted = downVotesBy.includes(authUser);

  const handleUpvote = (event) => {
    event.stopPropagation();
    upvote(id);
  };

  const handleDownvote = (event) => {
    event.stopPropagation();
    downvote(id);
  };

  const handleNeutralizedvote = (event) => {
    event.stopPropagation();
    neutralizedvote(id);
  };

  return (
    <main className="md:w-4/5 mx-auto p-6">
      <section className="flex flex-col gap-5">
        <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
        <div className="mb-6" dangerouslySetInnerHTML={{ __html: body }} />
      </section>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src={owner.avatar} alt={owner.name} className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col leading-tight">
              <p className="text-xs font-medium text-gray-800">{owner.name}</p>
            </div>
          </div>

          <p className="text-xs rounded-full bg-slate-200 py-1 px-4 transition duration-150 ease-in-out hover:bg-slate-700 hover:text-white w-fit">
            {category}
          </p>
        </div>

        <p className="text-xs text-gray-400">
          {postedAt(createdAt)}
        </p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          onClick={!isUpvoted ? handleUpvote : handleNeutralizedvote}
          aria-label="Upvote thread"
          className={`flex items-center space-x-1 ${isUpvoted ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500`}
        >
          <span>👍</span>
          <span>{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          onClick={!isDownvoted ? handleDownvote : handleNeutralizedvote}
          aria-label="Downvote thread"
          className={`flex items-center space-x-1 ${isDownvoted ? 'text-red-600' : 'text-gray-600'} hover:text-red-500`}
        >
          <span>👎</span>
          <span>{downVotesBy.length}</span>
        </button>
      </div>

      <div>
        <AddComment id={id} addComment={addComment} />
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Komentar(
          {comments.length}
          )
        </h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              id={comment.id}
              threadId={id}
              authUser={authUser}
              avatar={comment.owner?.avatar}
              upvote={upvoteComment}
              downvote={downvoteComment}
              neutralizedvote={neutralizedvoteComment}
              content={comment.content}
              createdAt={comment.createdAt}
              downVotesBy={comment.downVotesBy}
              upVotesBy={comment.upVotesBy}
              name={comment.owner?.name}
              key={comment.id}
            />
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </main>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        owner: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizedvote: PropTypes.func.isRequired,
  upvoteComment: PropTypes.func.isRequired,
  downvoteComment: PropTypes.func.isRequired,
  neutralizedvoteComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default ThreadDetail;
