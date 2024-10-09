import React from 'react';
import PropTypes from 'prop-types';

export default function LeaderItem({
  avatar, name, email, score,
}) {
  return (
    <section className="leader-item p-4 border rounded-lg shadow-sm flex items-center space-x-4 hover:bg-gray-50 transition duration-300 ease-in-out">
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border border-gray-300"
      />
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <h1 className="text-xl font-bold text-blue-600">{score}</h1>
    </section>
  );
}

const LeaderItemShape = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

LeaderItem.propTypes = {
  ...LeaderItemShape,
};

export { LeaderItemShape };
