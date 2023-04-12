import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem.jsx';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboard-list">
      {leaderboards.map((leader) => (
        <LeaderboardItem key={leader.user.id} {...leader} />
      ))}
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};

export default LeaderboardList;