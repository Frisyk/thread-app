import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const { id, avatar, name } = authUser;

  return (
    <div className="navigation flex items-center justify-between bg-white shadow-sm p-4 md:px-10">
      <div className="flex items-center gap-5">
        <Link to="/" className="text-2xl font-bold text-gray-800">JAGONGAN.</Link>
        <nav className="flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition duration-200">
            Home
          </Link>
          <Link to="/leaderboards" className="text-gray-600 hover:text-gray-900 transition duration-200">
            Leader Board
          </Link>
        </nav>
      </div>
      <div className="items-center space-x-4 hidden md:flex">
        <p>
          Hi,
          {name}
          !
        </p>
        <img
          src={avatar}
          alt={id}
          title={name}
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
        />
        <button
          type="button"
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Sign out
        </button>
      </div>
    </div>

  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,

};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
