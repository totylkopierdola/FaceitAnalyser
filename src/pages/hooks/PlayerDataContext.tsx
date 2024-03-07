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

  const getPlayerData = async (nickname) => {
    // 'https://open.faceit.com/data/v4/players?nickname=shorstky&game=cs2'

    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/players?nickname=${nickname}&game=cs2`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      setPlayerData(
        (prevData) => ({
          ...prevData,
          info: response.data,
          id: response.data.player_id,
        }),
        console.log("getPlayerData response", response.data)
      );
    } catch (error) {
      console.error("getPlayerData error", error);
    }
  };

  // Retrieve statistics of a player for a given amount of matches
  //   'https://open.faceit.com/data/v4/players/38024357-cdd4-460e-bb03-b3fcfa6575ed/games/cs2/stats?offset=0&limit=20' \
  const getPlayerLatestMatches = async (playerId, limit) => {
    try {
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

  return (
    <PlayerDataContext.Provider
      value={{
        playerData,
        getSearchForPlayers,
        getPlayerData,
        getPlayerLatestMatches,
      }}
    >
      {children}
    </PlayerDataContext.Provider>
  );
};
