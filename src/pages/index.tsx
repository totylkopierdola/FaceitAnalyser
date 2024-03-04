// pages/index.js

import axios from "axios";
import { useState, useEffect } from "react";
import PlayerInfo from "../pages/players/PlayerInfo";

import { API_TOKEN } from "../pages/utils/config";

export default function Home() {
  const [playerName, setPlayerName] = useState("shorstky");
  const [playerData, setPlayerdata] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for player:", playerName);
    setIsButtonClicked(true);
    fetchPlayer();
  };

  const url = `https://open.faceit.com/data/v4/players`;

  // Define the headers, including the authorization token
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  };

  const fetchPlayer = async () => {
    const params = {
      nickname: "shorstky",
      game: "cs2",
    };

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    };

    try {
      const response = await axios.get(url, { params, headers });
      setPlayerdata(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-4">Find Player Statistics</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter player name"
            value={playerName}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded mr-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </div>
        <p>TOKEN: {API_TOKEN}</p>
      </form>
      {isButtonClicked && <PlayerInfo playerData={playerData} />}
    </div>
  );
}
