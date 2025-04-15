import { useDispatch, useSelector } from "react-redux";
import {
  changeGameStatus,
  clearElements,
  pushClickedElements,
  setElemenet,
  setWinnerName,
  switchPlayer,
} from "../../lib/slice/playerConfigSlice";
import { roadToWin } from "../../lib/tactiks/roadsToWin";
import { useEffect } from "react";

const TictacSquare = ({
  element,
  index,
}: {
  element: string;
  index: number;
}) => {
  // component configs

  const dispatch = useDispatch();
  const { currentPlayer, gameStatus, tictactoeElements, clickedElements } =
    useSelector((state: any) => state.playerConfigSlice);
  // user click config
  const handleClick = () => {
    if (element === "" && clickedElements.length < 9 && currentPlayer === "X") {
      dispatch(pushClickedElements());
      dispatch(setElemenet({ index, value: currentPlayer }));
      dispatch(switchPlayer());
    }

    if (clickedElements.length === 9) {
      dispatch(clearElements());
    }
  };

  // end game when win

  const checkWin = (tictactoeElements: string[]) => {
    for (const [a, b, c] of roadToWin) {
      if (
        tictactoeElements[a] &&
        tictactoeElements[a] === tictactoeElements[b] &&
        tictactoeElements[b] === tictactoeElements[c]
      ) {
        return tictactoeElements[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = checkWin(tictactoeElements);
    if (winner) {
      dispatch(setWinnerName(winner));
      dispatch(changeGameStatus());
    }
  }, [tictactoeElements]);

  const handleRestart = () => {
    dispatch(clearElements());
    dispatch(changeGameStatus());
  };
  return (
    <>
      <div
        onClick={gameStatus ? handleClick : handleRestart}
        className=" border flex items-center justify-center text-[140px]/[0%] font-bold cursor-pointer"
      >
        {element}
      </div>
    </>
  );
};

export default TictacSquare;
