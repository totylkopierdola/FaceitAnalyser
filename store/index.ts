import { createStore } from "redux";
import { API_TOKEN } from "../src/pages/utils/config";
import axios from "axios";

const initialState = {
  playerName: "",
  playerData: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PLAYER_DATA":
      return {
        ...state,
        playerData: action.payload,
      };
    case "SET_PLAYER_NAME":
      return {
        ...state,
        playerName: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
