/* eslint-disable @next/next/no-img-element */
// pages/index.js

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_TOKEN } from "../pages/utils/config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputNickname, setInputNickname] = useState("");

  const playerData = useSelector((state) => state.playerData);

  const playerName = useSelector((state) => state.playerName);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputNickname(inputValue);
    fetchPlayerDetails();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPlayerDetails();
  };

  // RETRIEVE PLAYER DETAILS
  const fetchPlayerDetails = async () => {
    console.log("inputNickname", inputNickname);
    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/search/players?nickname=${inputNickname}&offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      console.log("Player details:", response.data);
      dispatch({
        type: "SET_PLAYER_DATA",
        payload: response.data,
      });
      dispatch({
        type: "SET_PLAYER_NAME",
        payload: response.data.nickname,
      });
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
  };

  return (
    <div>
      <h1 onClick={() => console.log("playerName", playerName)}>
        {playerName}
      </h1>
      {/* SEARCH FORM */}
      <form onSubmit={handleSearch} name="search-form">
        <div className="flex items-start border-2 flex-col">
          <div>
            <input
              type="text"
              placeholder="Enter player name"
              value={inputNickname}
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
          {/* RESULTS */}
          <div className="results mt-2">
            {playerData.items &&
              playerData.items.map((player, index) => (
                <div
                  className="flex align-center items-center border border-black rounded-md px-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300 mt-2"
                  key={index}
                  onClick={() => {
                    router.push(`/players/${player.nickname}`);
                  }}
                >
                  <img
                    className="rounded-full p-2"
                    width="50"
                    height="50"
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
