import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './ui/Buttoncomp.tsx';

function AddComment({ id, addComment }) {
  const [content, setContent] = useState('');

  const AddCommentClick = (event) => {
    event.preventDefault();
    if (content.trim() === '') {
      alert('Comment cannot be empty!');
      return;
    }
    addComment(id, content);
    setContent('');
  };

  return (
    <div className="w-full mx-auto my-5 bg-white rounded-md">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tambahkan komentar mu..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
      />
      <Button
        type="submit"
        onClick={AddCommentClick}
        context="Tambahkan"
        className="mt-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      />
    </div>
  );
}

AddComment.propTypes = {
  id: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default AddComment;
