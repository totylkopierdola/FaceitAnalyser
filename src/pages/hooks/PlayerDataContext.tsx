import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { API_TOKEN } from "../utils/config";

const PlayerDataContext = createContext();

export const usePlayerData = () => useContext(PlayerDataContext);

export const PlayerDataProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({
    searchPlayerList: [],
    info: [],
    stats: [],
    id: "",
    error: null,
  });

  const getSearchForPlayers = async (nickname) => {
    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/search/players?nickname=${nickname}&offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setPlayerData((prevData) => ({
        ...prevData,
        searchPlayerList: response.data,
      }));
      console.log("searchPlayerList", response.data);

      const playerId = response.data.player_id;
      const statsResponse = await axios.get(
        `https://open.faceit.com/data/v4/players/${playerId}/games/cs2/stats?offset=0&limit=20`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      setPlayerData({
        info: response.data,
        stats: statsResponse.data,
        id: playerId,
        error: null,
      });
    } catch (error) {
      setPlayerData((prevData) => ({ ...prevData, error: error.message }));
    }
  };

  return (
    <PlayerDataContext.Provider value={{ playerData, getSearchForPlayers }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
