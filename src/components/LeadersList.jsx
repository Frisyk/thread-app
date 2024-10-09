import React from 'react';
import PropTypes from 'prop-types';
import LeaderItem, { LeaderItemShape } from './LeaderItem';

function LeadersList({ leaders }) {
  return (
    <div className="md:w-4/5 mx-auto p-5 flex flex-col gap-3 pb-10">
      {leaders.map((leader) => (
        <LeaderItem
          key={leader.id}
          avatar={leader.user.avatar}
          email={leader.user.email}
          name={leader.user.name}
          score={leader.score}
        />
      ))}
    </div>
  );
}

LeadersList.propTypes = {
  leaders: PropTypes.arrayOf(PropTypes.shape(LeaderItemShape)).isRequired,
};

export default LeadersList;
