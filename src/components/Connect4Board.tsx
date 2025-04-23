"use client";

import BoardSpin from "@/animation/BoardSpin";
import CellFall from "@/animation/CellFall";
import CellSpin from "@/animation/CellSpin";
import SkewBoard from "@/animation/SkewBoard";

export default function Connect4Board({
  board,
  last_player_move,
  last_ai_move,
  onColumnClick,
}: {
  board: string[][];
  onColumnClick: (colIndex: number) => void;
  last_player_move: number | null;
  last_ai_move: number | null;
}) {
    let cellAnimation = [<CellFall />, <CellSpin />, <BoardSpin />, <SkewBoard />];



  return (
    <div className="flex flex-col items-center justify-center">
      {cellAnimation[Math.floor(Math.random() * cellAnimation.length)]}

      <style>{`
        .click {
            animation: click 0.5s ease-in-out forwards;
        }

        @keyframes click {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
    `}</style>

      <h1 className="text-4xl font-bold mb-4 text-white">Connect 4</h1>
      <div className="board flex flex-col gap-2 bg-board p-4 rounded-4xl shadow-sharp border-2 border-black">
        {board.toReversed().map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border cursor-pointer border-black bg-background ${
                    colIndex == last_player_move ? "click" : ""
                }`}
                style={{
                    animationDelay: `${(6 - rowIndex) * 0.05}s`,
                }}
                onClick={() => onColumnClick(colIndex)}
              >
                <div className={`h-full w-full rounded-full ${
                  cell === "red"
                    ? "bg-red-player shadow-hole-soft"
                    : cell === "yellow"
                    ? "bg-yellow-player shadow-hole-soft"
                    : "bg-transparent shadow-hole"
                } ${
                  (6 - rowIndex < 6 &&
                  board[6 - rowIndex][colIndex] == "empty" || rowIndex == 0) &&
                  cell != "empty" &&
                  colIndex == last_ai_move
                    ? "last_move"
                    : ""
                }`}></div>
              </button>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
