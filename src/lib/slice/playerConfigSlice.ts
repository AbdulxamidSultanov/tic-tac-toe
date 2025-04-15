import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerConfigState {
  tictactoeElements: string[];
  currentPlayer: string;
  gameStatus: boolean;
  clickedElements: string[];
  winnerName: null | string;
}

const initialState: PlayerConfigState = {
  tictactoeElements: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameStatus: true,
  clickedElements: [],
  winnerName: null,
};

const PlayerConfigSlice = createSlice({
  name: "playerConfigSlice",
  initialState,
  reducers: {
    setWinnerName: (state, action) => {
      state.winnerName = action.payload;
    },
    pushClickedElements: (state) => {
      state.clickedElements.push("");
    },
    switchPlayer: (state) => {
      state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
    },
    clearElements: (state) => {
      state.tictactoeElements = state.tictactoeElements.map(
        (element: string) => {
          return (element = "");
        }
      );
      state.clickedElements = [];
      state.currentPlayer = "X";
      state.winnerName = null
    },
    setElemenet: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>
    ) => {
      const { index, value } = action.payload;
      state.tictactoeElements[index] = value;
    },
    changeGameStatus: (state) => {
      state.gameStatus = state.gameStatus === true ? false : true;
    },
  },
});
export const {
  setElemenet,
  switchPlayer,
  changeGameStatus,
  clearElements,
  pushClickedElements,
  setWinnerName,
} = PlayerConfigSlice.actions;
export default PlayerConfigSlice.reducer;
