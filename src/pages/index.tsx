// pages/index.js

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import PlayerInfo from "./player-info/[nickname]";

import { API_TOKEN } from "../pages/utils/config";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerdata] = useState(null);
  const router = useRouter();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setPlayerName(inputValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for player:", playerName);
    fetchPlayer();
  };

  const url = `https://open.faceit.com/data/v4/search/players?nickname=${playerName}&game=cs2&offset=0&limit=20`;

  // Define the headers, including the authorization token
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  };

  const fetchPlayer = async () => {
    if (playerName.length === 0) {
      return;
    }
    const params = {
      nickname: playerName,
      game: "cs2",
      offset: 0,
      limit: 20,
    };

    try {
      const response = await axios.get(url, { params, headers });
      setPlayerdata(response.data);
      console.log("response.data", response.data);
      // router.push(`/player-info/${playerName}`);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  return (
    <div>
      {/* NAVIGATION */}
      <nav className="px-8 flex bg-gray-800 p-4 text-white mb-4">
        <h1 className="text-3xl font-semibold w-1/4">
          <a href="/">Faceit Analyser</a>
        </h1>
        <ul className="flex justify-end w-full items-center space-x-4 flex-column ml-4">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Players</li>
          <li className="cursor-pointer">Teams</li>
        </ul>
      </nav>

      {/* SEARCH FORM */}
      <form onSubmit={handleSearch} name="search-form">
        <div className="flex items-start border-2 flex-col">
          <div>
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
          <div className="results mt-2">
            {playerData &&
              playerData.items.map((player, index) => (
                <div
                  className=" flex align-center items-center border border-black rounded-md px-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300 mt-2"
                  key={index}
                >
                  <img
                    className="rounded-full p-2"
                    width="50"
                    src={
                      player.avatar
                        ? player.avatar
                        : "https://static.thenounproject.com/png/55393-200.png"
                    }
                    alt={player.nickname}
                  />
                  <span>{player.nickname}</span>
                  <span className="ml-1">[{player.country}]</span>
                  <span>
                    {player.status === "AVAILABLE" ? (
                      <div className="bg-green-500 rounded-full w-2 h-2 mx-1"></div>
                    ) : (
                      <div className="bg-red-500 rounded-full w-2 h-2 mx-1"></div>
                    )}
                  </span>
                  <span>{player.verified}</span>
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
}
