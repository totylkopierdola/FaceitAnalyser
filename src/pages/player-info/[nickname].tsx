import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePlayerData } from "../hooks/PlayerDataContext";

const PlayerInfo = () => {
  const router = useRouter();
  const { nickname } = router.query;
  const { playerData, getPlayerData } = usePlayerData();

  useEffect(() => {
    if (nickname !== undefined) {
      getPlayerData(nickname);
    }
  }, [nickname]);

  return (
    <div className="w-full border flex flex-col container items-center">
      <div className="flex items-center flex-col border-2 w-2/3 border-green-600 ">
        <h1>GENERAL</h1>
        <h2>{playerData.info.nickname}</h2>
        <h4>player stats </h4>
        <button className="btn-primary primary button border bg-green-400 rounded px-4">
          staty
        </button>

        <div className="flex justify-between w-1/2">
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
      {/* <div className="flex justfy-center flex -col w-2/3">
        <h2>MATCHES</h2>
        {playerStats.items &&
          playerStats.items.map((match, index) => (
            <div key={index} className="flex flex-col  my-4 rounded-full">
              {Object.entries(match.stats).map(([statName, statValue]) => (
                <div key={statName} className="flex w-full ">
                  <p className="font-bold w-40 px-4 bg-gray-400 ">
                    {statName}:
                  </p>{" "}
                  <div className="px-2 w-full whitespace-nowrap bg-green-50">
                    {statValue}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default PlayerInfo;
