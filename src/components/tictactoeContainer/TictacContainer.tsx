import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pushClickedElements,
  setElemenet,
  switchPlayer
} from "../../lib/slice/playerConfigSlice";
import { roadToWin } from "../../lib/tactiks/roadsToWin";
import TictacSquare from "./TictacSquare";

const TictacContainer = () => {
  const dispatch = useDispatch();
  const {
    tictactoeElements,
    currentPlayer,
    clickedElements,
    gameStatus,
    winnerName,
  } = useSelector((state: any) => state.playerConfigSlice);

  // start moving AI

  useEffect(() => {
    if (currentPlayer === "O" && clickedElements.length < 9 && gameStatus) {
      let emptySlotIndex: number | null = null;
      
      // attacking

      for (const [a, b, c] of roadToWin) {
        const values = [
          tictactoeElements[a],
          tictactoeElements[b],
          tictactoeElements[c],
        ];
        const xCount = values.filter((x) => x === "O").length;
        const emptyCount = values.filter((v) => v === "").length;
        if (xCount === 2 && emptyCount === 1) {
          emptySlotIndex = [a, b, c].find((i) => tictactoeElements[i] === "")!;
          break;
        }
      }
      if (emptySlotIndex !== null) {
        dispatch(pushClickedElements());
        dispatch(setElemenet({ index: emptySlotIndex, value: currentPlayer }));
        dispatch(switchPlayer());
        return;
      }

      // defense

      for (const [a, b, c] of roadToWin) {
        const values = [
          tictactoeElements[a],
          tictactoeElements[b],
          tictactoeElements[c],
        ];
        const xCount = values.filter((x) => x === "X").length;
        const emptyCount = values.filter((v) => v === "").length;
        if (xCount === 2 && emptyCount === 1) {
          emptySlotIndex = [a, b, c].find((i) => tictactoeElements[i] === "")!;
          break;
        }
      }

      if (emptySlotIndex !== null) {
        dispatch(pushClickedElements());
        dispatch(setElemenet({ index: emptySlotIndex, value: currentPlayer }));
        dispatch(switchPlayer());
        return;
      }

      // if nothing defense

      const movies: number[] = [4, 0, 2, 6, 8];
      for (const i of movies) {
        if (tictactoeElements[i] === "") {
          dispatch(pushClickedElements());
          dispatch(setElemenet({ index: i, value: currentPlayer }));
          dispatch(switchPlayer());
          return;
        }
      }
    }
  }, [currentPlayer, gameStatus]);

  return (
    <div className="flex flex-col items-center m-4 gap-5 rounded-2xl shadow-[0px_0px_35px_rgba(0,0,0,0.5)] p-10">
      <h1 className="text-[64px]/[40%] tracking-widest font-bold text-blue-800 drop-shadow-sm">
        {`${winnerName === null ? "Tic - Tac - Toe" : `Winner ${winnerName}`}`}
      </h1>

      <div className="w-[72dvw] h-[72dvh] grid grid-cols-3 gap-[4px] p-[4px] rounded-xl shadow-inner">
        {tictactoeElements.map((el: string, index: number) => (
          <TictacSquare key={index} element={el} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TictacContainer;
