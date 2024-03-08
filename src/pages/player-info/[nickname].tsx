import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePlayerData } from "../hooks/PlayerDataContext";
import Image from "next/image";
import BackgroundShapes from "../../components/BackgroundShapes";
import { formatDate } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayerInfo = () => {
  const router = useRouter();
  const { nickname } = router.query;
  const {
    playerData,
    fetchPlayerData,
    fetchPlayerLatestMatches,
    fetchPlayerFulltimeStats,
  } = usePlayerData();

  useEffect(() => {
    const fetchData = async () => {
      if (nickname !== undefined) {
        await fetchPlayerData(nickname);
        await fetchPlayerLatestMatches(playerData.id, 20);
        await fetchPlayerFulltimeStats(playerData.id);
      }
    };

    fetchData();

    console.log("zxc", playerData);
  }, [nickname, playerData.id]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 pt-10">
      <BackgroundShapes color="bg-red-500" opacity="opacity-20" />
      <div className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Statistics
          </h2>
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <ul
            role="list"
            className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {/* player-details */}
            <li className="player-details rounded-2xl bg-gray-800 px-8 py-10 opacity-80 transition-opacity duration-300  hover:opacity-100">
              <Image
                className="mx-auto rounded-full "
                width={100}
                height={100}
                priority={true}
                src={
                  playerData.info.avatar
                    ? playerData?.info.avatar
                    : "/images/noavatar.png"
                }
                alt=""
              />
              <h3 className="mt-6 text-4xl font-semibold leading-7 tracking-tight text-white">
                {playerData.info.nickname}
              </h3>
              <span className="text-center text-sm font-light leading-7 tracking-tight text-white">
                {playerData.info.steam_nickname}
              </span>
              <p className="text-xs leading-6 text-gray-400 mb-2">
                {formatDate(playerData.info.activated_at)}
              </p>
              <p className="text-sm text-left pl-5 leading-6 text-gray-400">
                <span className="font-bold">ELO: </span>{" "}
                {playerData?.info.games?.cs2?.faceit_elo}
              </p>
              <p className="flex text-sm text-left pl-5 leading-6 text-gray-400">
                <span className="font-bold mr-1">Skill Level: </span>
                {playerData?.info.games?.cs2.skill_level ? (
                  <Image
                    className="w-5 h-auto"
                    src={`/images/levels/level${playerData?.info.games?.cs2.skill_level}.svg`}
                    alt={`level${playerData?.info.games?.cs2.skill_level}`}
                    width={0}
                    height={0}
                  />
                ) : (
                  "N/A"
                )}
              </p>
              <p className="text-sm text-left pl-5 leading-6 text-gray-400">
                <span className="font-bold">Region: </span>{" "}
                {playerData?.info.games?.cs2.region}
              </p>
              <p className="text-sm text-left pl-5 leading-6 text-gray-400">
                <span className="font-bold">Game Player ID: </span>{" "}
                {playerData?.info.games?.cs2.game_player_id}
              </p>

              <ul role="list" className="mt-6 flex justify-center gap-x-6">
                <li>
                  <Link
                    href={`https://www.faceit.com/en/players/${playerData.info.nickname}`}
                    className="text-gray-400 hover:text-gray-300"
                    target="_blank"
                  >
                    <span>faceit</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`https://steamcommunity.com/profiles/${playerData.info.steam_id_64}`}
                    className="text-gray-400 hover:text-gray-300"
                    target="_blank"
                  >
                    <span>steam</span>
                  </Link>
                </li>
              </ul>
            </li>
            {/* player-details-EXTENDED */}
            <li className="player-details-extended rounded-2xl bg-gray-800 px-8 py-4 col-span-2 opacity-80 transition-opacity duration-300  hover:opacity-100 grid grid-cols-5 grid-rows-4 justify-items-center items-center text-sm text-left pl-5 leading-6 text-gray-400">
              <div className="w-full h-full flex flex-col justify-center items-center text-center font-bold col-span-5">
                <p className="font-bold text-lg">Main Statistics</p>
              </div>
              {playerData.fullTimeStats?.lifetime ? (
                <>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Matches:{" "}
                    <span className="font-light">
                      {playerData.fullTimeStats.lifetime.Matches}
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Recent Results:
                    <span className="font-light">
                      {playerData.fullTimeStats.lifetime["Recent Results"]?.map(
                        (result, index) => (
                          <span
                            key={index}
                            className={classNames(
                              result === "1"
                                ? "text-green-400"
                                : "text-red-400",
                              "ml-1"
                            )}
                          >
                            {result === "1" ? "W" : "L"}
                          </span>
                        )
                      )}
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Win Rate:{" "}
                    <span className="font-light">
                      {playerData.fullTimeStats.lifetime["Win Rate %"]}%
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Avg K/D Ratio:{" "}
                    <span className="font-light">
                      {playerData.fullTimeStats.lifetime["Average K/D Ratio"]}
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Avarage HS %:{" "}
                    <span className="font-light">
                      {playerData.fullTimeStats.lifetime["Average Headshots %"]}
                    </span>
                  </div>
                  <div className="w-full h-full flex flex-col justify-center items-center text-center font-bold col-span-5">
                    <p className="font-bold text-lg">Last 20 matches: </p>
                  </div>

                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Avg Kills :{" "}
                    <span className="font-light">
                      {playerData.latestMatches.items.reduce(
                        (acc, match) => acc + parseInt(match.stats.Kills),
                        0
                      ) / playerData.latestMatches.items.length}
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Win Rate :{" "}
                    <span className="font-light">
                      {(playerData.latestMatches.items.filter(
                        (match) => match.stats.Result === "1"
                      ).length /
                        playerData.latestMatches.items.length) *
                        100}
                      %
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    Avarage K/D:{" "}
                    <span className="font-light">
                      {(
                        playerData.latestMatches.items.reduce(
                          (acc, match) =>
                            acc + Number(match.stats["K/D Ratio"]),
                          0
                        ) / playerData.latestMatches.items.length
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    WinStreak:{" "}
                    <span className="font-light">
                      {playerData.latestMatches.items.reduce(
                        (acc, match, index, array) =>
                          match.stats.Result === "1" &&
                          array[index - 1]?.stats.Result === "1"
                            ? acc + 1
                            : acc,
                        0
                      )}
                    </span>
                  </div>
                  <div className="border h-min w-full flex flex-col justify-center items-center text-center font-bold">
                    HS %
                    <span className="font-light">
                      {playerData.latestMatches.items.reduce(
                        (acc, match) =>
                          acc + Number(match.stats["Headshots %"]),
                        0
                      ) / playerData.latestMatches.items.length}
                    </span>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
              <div className="py-2 w-full h-[250px] flex flex-col justify-center items-center text-center font-bold col-span-5 relative">
                <div className="mt-10 border-5 border-red-500 absolute h-full w-[336px] no-scrollbar no-scrollbar::-webkit-scrollbar">
                  <iframe
                    className="h-full w-full"
                    src={`https://gamer2810.github.io/steam-miniprofile/?accountId=${playerData.info.steam_id_64}`}
                  ></iframe>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative isolate overflow-hidden  py-10 px-80">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Matches
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Details of the last 20 matches
          </p>
        </div>

        {playerData.latestMatches?.items && (
          <div className="w-full mt-12">
            <div className="overflow-auto">
              <table className="w-full whitespace-nowrap text-left bg-gray-900 py-10 opacity-50 rounded-md transition-opacity duration-300  hover:opacity-80">
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
                            <div className="ml-[-22px]  relative mr-2 text-green-400 bg-green-400/10 flex-none rounded-full p-1 w-3.5 h-3.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                            </div>
                          ) : (
                            <div className="ml-[-22px]  relative mr-2 text-red-400 bg-green-400/10 flex-none rounded-full p-1 w-3.5 h-3.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
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
