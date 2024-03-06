import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_TOKEN } from "../../pages/utils/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

type playerStats = {
  player_id: string;
  nickname: string;
  playerData: object;
};

interface PlayerData {
  player_id: string;
  nickname: string;
  avatar: string;
}

export const fetchPlayerData = createAsyncThunk(
  "playerData/fetchPlayerData",
  async (playerName: string, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://open.faceit.com/data/v4/players?nickname=shorstky&game=cs2",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: PlayerData = {
  player_id: "",
  nickname: "",
  avatar: "",
  country: "",
  platforms: {},
  games: {},
};

export const playerStatsSlice = createSlice({
  name: "playerData",
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
    setPlayerData: (state, action: PayloadAction<PlayerData>) => {
      const { player_id, nickname, avatar, country, platforms, games } =
        action.payload;
      state.player_id = player_id;
      state.nickname = nickname;
      state.avatar = avatar;
      state.country = country;
      state.platforms = platforms;
      state.games = games;
    },
  },
});

export const { setPlayerName, setPlayerData } = playerStatsSlice.actions;
export default playerStatsSlice.reducer;
