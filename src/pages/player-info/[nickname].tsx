import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePlayerData } from "../hooks/PlayerDataContext";

const PlayerInfo = () => {
  const router = useRouter();
  const { nickname } = router.query;
  const { playerData, fetchPlayerData, fetchPlayerLatestMatches } =
    usePlayerData();

  useEffect(() => {
    if (nickname !== undefined) {
      fetchPlayerData(nickname);
      fetchPlayerLatestMatches(playerData.id, 20);
    }
  }, [nickname, playerData.id]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
        ></p>

        {playerData.latestMatches?.items && (
          <div className="w-full mt-12">
            <div className="overflow-auto">
              <table className="w-full whitespace-nowrap text-left bg-gray-900 py-10">
                <colgroup>
                  <col className="w-full sm:w-4/12" />
                  <col className="lg:w-4/12" />
                  <col className="lg:w-2/12" />
                  <col className="lg:w-1/12" />
                  <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-white/10 text-sm leading-6 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                    >
                      TEAM 👑
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                    >
                      Score 📝
                    </th>
                    <th
                      scope="col"
                      className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                    >
                      Kills 🎯
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                    >
                      Assists ❇️
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                    >
                      Deaths ☠️
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {playerData.latestMatches.items.map((match, matchIndex) => (
                    <tr key={matchIndex}>
                      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div className="flex items-center ">
                          {match.stats.Result === "1" ? (
                            <div class="ml-[-22px]  relative mr-2 text-green-400 bg-green-400/10 flex-none rounded-full p-1 w-3.5 h-3.5">
                              <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                            </div>
                          ) : (
                            <div class="ml-[-22px]  relative mr-2 text-red-400 bg-green-400/10 flex-none rounded-full p-1 w-3.5 h-3.5">
                              <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                            </div>
                          )}
                          <div className="truncate text-sm leading-6 text-white font-extrabold">
                            {match.stats.Team}
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                        <div className="flex">
                          <div
                            className={`${
                              match.stats.Result === "1"
                                ? "bg-green-500/70"
                                : "bg-red-500"
                            } rounded-md min-w-[55px] text-center  px-2 py-1 text-xs text-black font-medium ring-1 ring-inset ring-white/10`}
                          >
                            {match.stats.Score}
                          </div>
                        </div>
                      </td>
                      <td className="relative hidden py-4 pl-0 pr-8 text-sm leading-6 text-green-400 md:table-cell lg:pr-20">
                        {match.stats.Kills}
                      </td>
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-yellow-400 md:table-cell lg:pr-20">
                        {match.stats.Assists}
                      </td>
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-red-400 md:table-cell lg:pr-20">
                        {match.stats.Deaths}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
