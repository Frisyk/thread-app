import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ThreadReplyInput({ replythread }) {
  const [text, setText] = useState('');
  const navigate = useNavigate('/');

  function replythreadHandler() {
    if (text.trim()) {
      replythread(text);
      setText('');
      navigate('/');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setText(target.value);
    }
  }

  return (
    <div className="thread-reply-input">
      <textarea type="text" placeholder="thread your reply" value={text} onChange={handleTextChange} />
      <p className="thread-reply-input__char-left">
        <strong>{text.length}</strong>
        /320
      </p>
      <button type="submit" onClick={replythreadHandler}>Reply</button>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replythread: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
