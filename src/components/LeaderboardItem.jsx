import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ score, user }) {
  const { name, avatar } = user;

  return (
    <div className="leaderboard-item">
      <img src={avatar} alt="AV" />
      <div>
        <h3>{name}</h3>
        <p>
          Skor :
          <span>{` ${score}`}</span>
        </p>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  score: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default LeaderboardItem;