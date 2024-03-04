import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_TOKEN } from "../utils/config";

const PlayerInfo = ({ playerData }) => {
  console.log(`PlayerInfo: playerData: ${playerData}`);
  const router = useRouter();
  const { nickname } = router.query;

  const [playerInfo, setPlayerInfo] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);

  const url = `https://open.faceit.com/data/v4/players`;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  };
  const params = {
    nickname: nickname,
    game: null,
    game_player_id: null,
  };
  useEffect(() => {
    getPlayerInfo();
  }, [nickname]);

  useEffect(() => {
    getPlayerStats();
  }, []);

  const getPlayerInfo = async () => {
    try {
      const response = await axios.get(url, { params, headers });
      setPlayerInfo(response.data);
      console.log("xdddd", response.data);
      console.log("playerInfo.player_id", playerInfo.player_id);
    } catch (error) {
      console.error("Error fetching player stats:", error);
    }
  };

  const getPlayerStats = async () => {
    try {
      // expected url:"https://open.faceit.com/data/v4/players/38024357-cdd4-460e-bb03-b3fcfa6575ed"

      const response = await axios.get(`${url}/${playerInfo?.player_id}`, {
        headers,
      });
      setPlayerStats(response.data); // Set playerStats state with response data
      console.log("playerStats:::", playerStats);
    } catch (error) {
      console.error("Error fetching player stats:", error);
    }
  };

  return (
    <div className="flex items-center flex-col w-full  border-2 border-green-600 ">
      <button onClick={() => getPlayerStats()}>xd</button>
      <h2>{playerInfo.nickname}</h2>
      <h4>player stats</h4>
      <button
        className="btn-primary primary button border bg-green-400 rounded px-4"
        onClick={() => console.log("playerInfo", playerInfo)}
      >
        staty
      </button>

      <div className="flex justify-between w-1/2">
        <div className="profile-left ">
          <div className="flex">
            <Image
              className="rounded-full border-none"
              width={100}
              height={100}
              src={playerInfo.avatar}
              alt=""
            />
            <div className="flex flex-col justify-center items-start ml-4">
              <h2 className="text-2xl">{playerInfo.nickname}</h2>
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
              {playerInfo.games?.cs2.faceit_elo}
            </span>
          </p>
          <p className="font-bold">
            Skill Level:{" "}
            <span className="font-light">
              {playerInfo.games?.cs2.skill_level}
            </span>
          </p>
          <p className="font-bold">
            Region:{" "}
            <span className="font-light">{playerInfo.games?.cs2.region}</span>
          </p>
          <p className="font-bold">
            Game Player ID:{" "}
            <span className="font-light">
              {playerInfo.games?.cs2.game_player_id}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;

{
  /* {
    "player_id": "38024357-cdd4-460e-bb03-b3fcfa6575ed",
    "nickname": "shorstky",
    "avatar": "https://distribution.faceit-cdn.net/images/fc3c903b-7955-46f1-80d3-e9ba011756b2.jpeg",
    "country": "pl",
    "cover_image": "https://distribution.faceit-cdn.net/images/f6055fb8-728b-4758-ae2c-9370a08e1952.jpeg",
    "platforms": {
        "steam": "STEAM_0:1:55245492"
    },
    "games": {
        "csco": {
            "region": "EU",
            "game_player_id": "76561198070756713",
            "skill_level": 3,
            "faceit_elo": 1000,
            "game_player_name": "=shorstky",
            "skill_level_label": "",
            "regions": {},
            "game_profile_id": ""
        },
        "csdz": {
            "region": "EU",
            "game_player_id": "76561198070756713",
            "skill_level": 3,
            "faceit_elo": 0,
            "game_player_name": "=shorstky",
            "skill_level_label": "",
            "regions": {},
            "game_profile_id": ""
        },
        "csgo": {
            "region": "EU",
            "game_player_id": "76561198070756713",
            "skill_level": 10,
            "faceit_elo": 2571,
            "game_player_name": "shorstky 🦘",
            "skill_level_label": "",
            "regions": {},
            "game_profile_id": ""
        },
        "valorant": {
            "region": "EU",
            "game_player_id": "shorstky #ESSA",
            "skill_level": 5,
            "faceit_elo": 1257,
            "game_player_name": "shorstky #ESSA",
            "skill_level_label": "",
            "regions": {},
            "game_profile_id": ""
        },
        "cs2": {
            "region": "EU",
            "game_player_id": "76561198070756713",
            "skill_level": 10,
            "faceit_elo": 2343,
            "game_player_name": "shorstky 🦘",
            "skill_level_label": "",
            "regions": {},
            "game_profile_id": ""
        }
    },
    "settings": {
        "language": "en"
    },
    "friends_ids": [
        "30ad7067-0bc5-487e-87a1-426c2e823dda",
        "9ff650bd-05b7-4ce3-9404-b41f66402c25",
        "2a9e47d6-c1ea-4d64-9bfe-7e39b2024b2c",
        "c17ce8e2-31c7-4fa2-abbe-5fd52abc3be5",
        "8af910e3-4fa5-4eea-b4e5-e169372500ec",
        "2b3d4374-7451-4397-889b-7abf2ad9e91c",
        "1bd754cb-d297-46ad-9bf7-8bddd3693113",
        "6d987bf8-d32b-41ad-b26b-b20f55d7d8f8",
        "914ef136-dacb-4319-a7e2-d2287db8bdb7",
        "29fac4d0-1662-41f7-a1a7-3af2e255c7dd",
        "5f56c8a9-8614-4b2b-9d76-a504dcabb1ab",
        "4e93c207-7855-4ad2-92a3-548fcd8019b4",
        "740e9be8-fa3e-486b-b41c-bd0b568c599c",
        "b75dca73-ab63-4a9f-817e-763f57a2b357",
        "397c78ea-194b-490d-8237-3c196195fa32",
        "7bba1605-c333-4de8-ac6f-a618098526be",
        "c24af934-4f9d-4f1c-a718-4525d1ee88e1",
        "99c2c4a6-e7b2-4a29-8dac-451111bd7f74",
        "b0672ed3-92b6-4d59-be90-3c2ff615b1ce",
        "0f04573d-1f9d-4b85-b05c-6f5e49770747",
        "7331b290-528e-4c95-be99-cd05cecb33c9",
        "a76a10be-be86-405e-8c8d-d6754142c8d0",
        "2082c6c6-be92-4a56-97c4-eec4c20a54e9",
        "6eb0127b-02f1-4fc4-a226-0050a2692ee6",
        "ade8ece7-5845-40e6-bf6d-9abd29f6921f",
        "2f50c949-40cd-4f0c-8f58-066aabb51f3d",
        "3705630d-cae4-43bf-b3f5-143af6f3b8c8",
        "917966d8-a52a-4215-b392-73e1a88231ff",
        "547caf93-3429-44ee-adff-8cc6d0410462",
        "31564db5-94a5-414a-a76f-af97efc60442",
        "488c100e-5aac-4129-97a4-482eac09ccc6",
        "c4f2f58c-f54e-418f-8cce-5d29c86815f9",
        "0c228fec-e041-4210-81b8-9c640b73202b",
        "39dd787c-fb4c-410a-9722-1256cb9e54b1",
        "9d08d097-798f-49a4-931a-0c6c6f5c4c15",
        "a075988f-389a-4a9a-966b-adfc8415e1fd",
        "c7cd4e8a-629c-4db3-9e3b-63139acad0f8",
        "f5caff1b-1c41-480d-bafb-6e7ab1788622",
        "112489e0-4e7d-4806-9f88-99a5856d65fc",
        "87514c0c-7eb1-4ce8-ad1c-9efb56422998",
        "daac2fa4-bf1b-4013-a224-e0c48d4120db",
        "52c4ff0f-90de-4a18-b4df-b635c605b918",
        "38e0f0a1-66a7-4f56-abf8-49088f5dcc37",
        "2c2b3fcb-54f1-4b3d-9a1e-d4d6958955e1",
        "503e9d59-b71a-4b01-90e9-2ea1c35e9f66",
        "d7a3f161-6528-43e9-9c40-a5446bb8ee73",
        "407950bf-1184-41aa-b2a7-9c8c5863e3cd",
        "90dad85e-50ec-4e3b-aa1c-ed930887b28a",
        "a6b28527-b0df-4e5b-afca-cb19e2787b0a",
        "19b0198d-62c9-4239-bd8a-2c19a59881aa",
        "d713cc30-a8c5-490d-a1a9-35bfbe1400e8",
        "438a0a68-1963-4965-8cbe-3e75676076a4",
        "26c34a57-6263-4336-89f9-f5f7774374a9",
        "28eb8f0c-d8cd-43e3-ae70-2547ba5199cc",
        "89e70da6-57de-4f5a-b596-f525da552e22",
        "f379a004-2474-4585-98cd-7a35e13d82fb",
        "91326482-f75b-4cd3-a461-39f89c9d31cd",
        "53511bd9-a9a6-4975-9231-87ca41591f3b",
        "cbc58293-4405-44b2-9f96-3f8aee578807",
        "47a026c2-893b-4b1a-a5be-71c1299ee8f8",
        "d4a46d08-f90b-431a-a1e2-4bfddea9a0ba",
        "aef0e25f-fd01-4dc7-960d-f3012ecf5573",
        "9808c39d-ba07-4a74-a5ab-35b000133097",
        "aadda18d-a2c2-48d5-bd14-fc2855bd2ca9",
        "a99fea2e-148b-4c06-aa70-18793f3f6ce7",
        "360b3a73-6bef-4848-a83e-b1824692c446",
        "42715765-4d39-46fb-9e6c-f6aeb7b20e81",
        "53753223-5a10-4fa4-882f-221c7e2fdf35",
        "e2f5c992-40aa-47fe-aaf8-ccb95ff9dd22",
        "0ae24923-2f75-43a2-81dc-40b37ba57569",
        "554e6766-69be-41c2-abfd-c104ce549231",
        "695788f3-87ad-4b7d-9f2a-aaf39ee08e07",
        "fa2eeac0-9cbb-482f-bd7a-712be0373f70",
        "406cca62-8290-429f-8811-7f1c5dcf46be",
        "7ea6e862-24d7-4970-b38c-d7b3ea4231f4",
        "56c073ee-057e-44d5-a3ce-f4cbe12abb70",
        "3b5fce31-5c72-4b01-b031-588b4e8d0a2f",
        "d4241a7e-40ed-428c-824b-186191cc1186",
        "b15905fd-fa26-4c6d-bbda-e6ac190bb8f7",
        "b195c931-14f8-40e9-b8be-d8d135f0600f",
        "a7b9b465-0a46-4b0e-989d-8a806909fd2a",
        "666bf0f3-18fa-4618-b9d4-ee4f5195084a",
        "ce2e727d-f82e-49ee-ba2c-206f88c876a1",
        "d8d4d752-efba-47da-9c29-18bc66a655e6",
        "9cd18497-d0b4-42dc-9bf9-7875a8978c6e",
        "37eb636f-8a24-4125-93fd-eca63ac4f8c2",
        "7759334d-76ff-40ad-a500-4ecd286663d1",
        "83c73a42-ef4c-44d2-b2a4-2a22a6d73dda",
        "c2f6a0da-c61e-494e-927d-f847d65d483c",
        "9f18c344-8e6c-424b-85e0-95fb06ca04d7",
        "bcd09651-9d42-49f9-8d07-54bb00a922ab",
        "f52c760e-a513-46fa-bbc0-0043782ccbf4",
        "7da4976f-a934-4484-9cc8-120fa6631553",
        "dcaa16c5-7f89-411d-9fe0-653dcf9669bc",
        "f520aa03-b521-445e-9816-a5252c08de6e",
        "8cb8a9d9-1b0b-4a12-bd3f-1a0eee43ca55",
        "c6f1ea5b-3a47-46f4-aa42-2fea81f69339",
        "f40611ba-3f5c-480c-8c95-49a7ee4aa966"
    ],
    "new_steam_id": "[U:1:110490985]",
    "steam_id_64": "76561198070756713",
    "steam_nickname": "shorstky 🦘",
    "memberships": [
        "free"
    ],
    "faceit_url": "https://www.faceit.com/{lang}/players/shorstky",
    "membership_type": "",
    "cover_featured_image": "",
    "infractions": {},
    "verified": false,
    "activated_at": "2014-06-05T19:27:40Z"
} */
}
