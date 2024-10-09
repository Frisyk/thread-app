import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { ThreadItemShape } from './ThreadItem';

function ThreadsList({ threads, upvote, downvote }) {
  return (
    <div className="md:pb-10">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          downvote={downvote}
          upvote={upvote}
          {...thread}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(ThreadItemShape)).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default ThreadsList;
