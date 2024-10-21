import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  createdAt,
  user, upVotesBy = [], downVotesBy = [], totalComments, category, authUser,
  upvote, downvote, neutralizevote,
}) {
  const navigate = useNavigate();

  const truncatedBody = body.length > 100 ? `${body.substring(0, 100)}...` : body;

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  const upVoteClick = (event) => {
    event.stopPropagation();
    upvote(id);
  };

  const downVoteClick = (event) => {
    event.stopPropagation();
    downvote(id);
  };

  const neutralizeVoteClick = (event) => {
    event.stopPropagation();
    neutralizevote(id);
  };

  const isThreadUpvoted = upVotesBy.includes(authUser);
  const isThreadDownvoted = downVotesBy.includes(authUser);

  return (
    <section
      className="p-6 my-2 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out"
    >
      <div className="flex items-start space-x-4">
        <div className="thread-item__detail w-full">
          <div
            tabIndex={0}
            role="button"
            onClick={onThreadClick}
            onKeyDown={onThreadPress}
            className="mb-2"
          >
            <h3 className="text-4xl font-semibold text-gray-800 hover:underline">
              {title}
            </h3>
            <div
              className="mt-2 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: truncatedBody }}
            />
          </div>
          <header className="flex justify-between items-center mb-3">
            <div className="flex gap-5 items-center">
              <div className="flex gap-2 items-center mt-3">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <p className="thread-item__category text-xs rounded-full transition duration-150 ease-in-out hover:bg-slate-700 hover:text-white w-fit py-1 px-4 bg-slate-200">
                {category}
              </p>
            </div>

            <p className="thread-item__created-at text-xs text-gray-400">
              {postedAt(createdAt)}
            </p>
          </header>
          <footer className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                type="button"
                aria-label="upvote"
                onClick={!isThreadUpvoted ? upVoteClick : neutralizeVoteClick}
                className={`flex items-center space-x-1 ${isThreadUpvoted ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors duration-150 ease-in-out`}
              >
                <span>👍</span>
                <span>{upVotesBy.length}</span>
              </button>
              <button
                type="button"
                aria-label="downvote"
                onClick={!isThreadDownvoted ? downVoteClick : neutralizeVoteClick}
                className={`flex items-center space-x-1 ${isThreadDownvoted ? 'text-red-600' : 'text-gray-600'} hover:text-red-500 transition-colors duration-150 ease-in-out`}
              >
                <span>👎</span>
                <span>{downVotesBy.length}</span>
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              {totalComments}
              {' '}
              comments
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
const ownerShape = {
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ThreadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  user: PropTypes.shape(ownerShape).isRequired,
  authUser: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralizevote: PropTypes.func.isRequired,
};

ThreadItem.propTypes = {
  ...ThreadItemShape,
};

export { ThreadItemShape };

export default ThreadItem;
