import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { API_TOKEN } from "../utils/config";

const PlayerDataContext = createContext();

export const usePlayerData = () => useContext(PlayerDataContext);

export const PlayerDataProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({
    searchPlayerList: [],
    info: [],
    latestMatches: [],
    stats: [],
    fullTimeStats: [],
    id: "",
    error: null,
  });

  const fetchSearchForPlayers = async (nickname) => {
    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/search/players?nickname=${nickname}&offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

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
        searchPlayerList: response.data,
        info: response.data,
        stats: statsResponse.data,
        id: playerId,
        error: null,
      });
    } catch (error) {
      setPlayerData((prevData) => ({ ...prevData, error: error.message }));
    }
  };

  const fetchPlayerData = async (nickname) => {
    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/players?nickname=${nickname}&game=cs2`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      setPlayerData((prevData) => ({
        ...prevData,
        info: response.data,
        id: response.data.player_id,
      }));
    } catch (error) {
      console.error("fetchPlayerData error", error);
    }
  };

  const fetchPlayerLatestMatches = async (playerId, limit) => {
    try {
      if (!playerId) return null;
      const response = await axios.get(
        `https://open.faceit.com/data/v4/players/${playerId}/games/cs2/stats?offset=0&limit=${limit}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      setPlayerData((prevData) => ({
        ...prevData,
        latestMatches: response.data,
      }));
    } catch (error) {
      setPlayerData((prevData) => ({ ...prevData, error: error.message }));
    }
  };

  const fetchPlayerFulltimeStats = async (playerId) => {
    try {
      if (!playerId) return null;
      const response = await axios.get(
        `https://open.faceit.com/data/v4/players/${playerId}/stats/cs2`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      setPlayerData((prevData) => ({
        ...prevData,
        fullTimeStats: response.data,
      }));
    } catch (error) {
      setPlayerData((prevData) => ({ ...prevData, error: error.message }));
    }
  };

  return (
    <PlayerDataContext.Provider
      value={{
        playerData,
        fetchSearchForPlayers,
        fetchPlayerData,
        fetchPlayerLatestMatches,
        fetchPlayerFulltimeStats,
      }}
    >
      {children}
    </PlayerDataContext.Provider>
  );
};
