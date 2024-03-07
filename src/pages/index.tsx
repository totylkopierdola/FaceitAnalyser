import { useState } from "react";
import { useRouter } from "next/router";
import { usePlayerData } from "./hooks/PlayerDataContext";

const Home = () => {
  const router = useRouter();
  const { getSearchForPlayers, playerData } = usePlayerData();
  const [inputNickname, setInputNickname] = useState("shorstky");

  const handleInputChange = (event) => {
    setInputNickname(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getSearchForPlayers(inputNickname);
  };

  return (
    <div>
      <button
        className="button border-red-500 border"
        onClick={() => {
          console.log(
            "playerData.allPlayersDetails",
            playerData.allPlayersDetails
          );
          // console.log("playerData.info", playerData.info);
          // console.log("playerData.info.items", playerData.info.items);
          // console.log("playerData.info.length", playerData.info.length);
        }}
      >
        playerData
      </button>
      {/* <h1 onClick={() => console.log("playerName", playerName)}>
        {playerName}
      </h1> */}
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
            {playerData.info.items &&
              playerData.info.items.map((player, index) => (
                <div
                  className="bg-red-500 flex align-center items-center border border-black rounded-md px-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300 mt-2"
                  key={index}
                  onClick={() => {
                    router.push(`/player-info/${player.nickname}`);
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
};

export default Home;
