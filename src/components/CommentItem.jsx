import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

export default function CommentItem({
  id,
  threadId,
  avatar,
  name,
  createdAt,
  content,
  upvote, downvote, neutralizedvote,
  upVotesBy, downVotesBy, authUser,
}) {
  const upVoteClick = (event) => {
    event.stopPropagation();
    upvote(threadId, id);
  };

  const downVoteClick = (event) => {
    event.stopPropagation();
    downvote(threadId, id);
  };

  const neutralizedVoteClick = (event) => {
    event.stopPropagation();
    neutralizedvote(threadId, id);
  };

  const isCommentUpvoted = upVotesBy.includes(authUser);
  const isCommentDownvoted = downVotesBy.includes(authUser);

  return (
    <section className="border p-4 rounded-lg mb-4">
      <div key={id} className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img
              src={avatar}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-gray-500">{postedAt(createdAt)}</p>
          </div>
        </div>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <footer className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            type="button"
            aria-label="upvote"
            onClick={!isCommentUpvoted ? upVoteClick : neutralizedVoteClick}
            className={`flex items-center space-x-1 ${isCommentUpvoted ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors duration-150 ease-in-out`}
          >
            <span>👍</span>
            <span>{upVotesBy.length}</span>
          </button>
          <button
            type="button"
            aria-label="downvote"
            onClick={!isCommentDownvoted ? downVoteClick : neutralizedVoteClick}
            className={`flex items-center space-x-1 ${isCommentDownvoted ? 'text-red-600' : 'text-gray-600'} hover:text-red-500 transition-colors duration-150 ease-in-out`}
          >
            <span>👎</span>
            <span>{downVotesBy.length}</span>
          </button>
        </div>
      </footer>
    </section>
  );
}

const CommentItemShape = {
  id: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizedvote: PropTypes.func.isRequired,
};

CommentItem.propTypes = {
  ...CommentItemShape,
};
