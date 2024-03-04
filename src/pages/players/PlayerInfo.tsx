import React from "react";

const PlayerInfo = ({ playerData }) => {
  console.log(`PlayerInfo: playerData: ${playerData}`);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center bg-[#3F4E4F] rounded-lg mt-6 md:mt-0 p-4 md:p-0 drop-shadow-boxes text-white">
        <h3>CS2</h3>
        <p>Region: {playerData.games?.cs2.region}</p>
        <p>Game Player ID: {playerData.games?.cs2.game_player_id}</p>
        <p>Skill Level: {playerData.games?.cs2.skill_level}</p>
        <p>Faceit ELO: {playerData.games?.cs2.faceit_elo}</p>
      </div>

      <hr />

      <div>
        <h1>{playerData.nickname}'s Statistics</h1>
        <img src={playerData.avatar} alt={playerData.nickname} />
        <p>Country: {playerData.country}</p>
        <p>Steam ID: {playerData.platforms?.steam}</p>
        <h2>Games</h2>
        <ul>
          {playerData.games &&
            Object.keys(playerData.games).map((game, index) => (
              <li key={index}>
                <h3>{game}</h3>
                <p>Region: {playerData.games[game].region}</p>
                <p>Game Player ID: {playerData.games[game].game_player_id}</p>
                <p>Skill Level: {playerData.games[game].skill_level}</p>
                <p>Faceit ELO: {playerData.games[game].faceit_elo}</p>
              </li>
            ))}
        </ul>
        <h2>Friends</h2>
        <ul>
          {playerData.friends_ids &&
            playerData.friends_ids.map((friendId, index) => (
              <li key={index}>{friendId}</li>
            ))}
        </ul>
        <p>New Steam ID: {playerData.new_steam_id}</p>
        <p>Steam ID 64: {playerData.steam_id_64}</p>
        <p>Steam Nickname: {playerData.steam_nickname}</p>
        <h2>Memberships</h2>
        <ul>
          {playerData.memberships &&
            playerData.memberships.map((membership, index) => (
              <li key={index}>{membership}</li>
            ))}
        </ul>
        <p>
          Faceit URL: <a href={playerData.faceit_url}>Link</a>
        </p>
        <p>Activated at: {playerData.activated_at}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
