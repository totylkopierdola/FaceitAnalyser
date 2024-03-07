import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePlayerData } from "../hooks/PlayerDataContext";

const PlayerInfo = () => {
  const router = useRouter();
  const { nickname } = router.query;
  const { playerData, getPlayerData, getPlayerLatestMatches } = usePlayerData();

  useEffect(() => {
    if (nickname !== undefined) {
      getPlayerData(nickname);
      getPlayerLatestMatches(playerData.id, 2);
    }
  }, [nickname, playerData.id]);

  return (
    <div className="w-full border flex flex-col container items-center">
      <button
        onClick={() => console.log("playerData.id", playerData.id)}
        className="border border-red-500"
      >
        playerData.id
      </button>
      <button
        onClick={() =>
          console.log(
            "playerData.latestMatches.items",
            playerData.latestMatches.items
          )
        }
        className="border border-green-500"
      >
        playerData.latestMatches.items
      </button>
      <div className="flex items-center flex-col border-2 w-2/3 border-green-600 ">
        <h2>{playerData.info.nickname}</h2>
        <h4>player stats </h4>
        <button className="btn-primary primary button border bg-green-400 rounded px-4">
          staty
        </button>

        <div className="flex justify-between">
          <div className="profile-left ">
            <div className="flex">
              <img
                className="rounded-full border-none"
                width={100}
                height={100}
                src={playerData?.info.avatar}
                alt=""
              />
              <div className="flex flex-col justify-center items-start ml-4">
                <h2 className="text-2xl">{playerData?.info.nickname}</h2>
                <div className="flex justify-center gap-2 items-center mt-1">
                  <span className="text-sm">Member since 5 June 2014</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-right">
            <p className="font-bold">
              ELO:{" "}
              <span className="font-light">
                {playerData?.info.games?.cs2.faceit_elo}
              </span>
            </p>
            <p className="font-bold">
              Skill Level:{" "}
              <span className="font-light">
                {playerData?.info.games?.cs2.skill_level}
              </span>
            </p>
            <p className="font-bold">
              Region:{" "}
              <span className="font-light">
                {playerData?.info.games?.cs2.region}
              </span>
            </p>
            <p className="font-bold">
              Game Player ID:{" "}
              <span className="font-light">
                {playerData?.info.games?.cs2.game_player_id}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="container border-yellow-500 border flex flex-col">
        <p
          onClick={() =>
            console.log(
              "playerData.latestMatches.items",
              playerData.latestMatches.items
            )
          }
        >
          xD
        </p>
        {playerData.latestMatches?.items &&
          playerData.latestMatches.items.map((match, matchIndex) => (
            <div key={matchIndex} className="w-full mt-12">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Table Example
              </p>
              <div className="bg-white overflow-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      {/* Map through the keys of stats object to generate table headers */}
                      {Object.keys(match.stats).map((key, index) => (
                        <th
                          key={index}
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* Map through the values of stats object to generate table data */}
                      {Object.values(match.stats).map((value, index) => (
                        <td
                          key={index}
                          className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="pt-3 text-gray-600">
                Source:{" "}
                <Link
                  className="underline"
                  href="https://tailwindcomponents.com/component/table-responsive-with-filters"
                >
                  https://tailwindcomponents.com/component/table-responsive-with-filters
                </Link>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerInfo;
