"use client";

import BoardSpin from "@/animation/BoardSpin";
import CellFall from "@/animation/CellFall";
import CellSpin from "@/animation/CellSpin";
import SkewBoard from "@/animation/SkewBoard";
import { useEffect, useState } from "react";

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
  

  const [hoverColumn, setHoverColumn] = useState<number>(4);
  const handleMouseEnter = (colIndex: number) => {
    setHoverColumn(colIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <CellFall />

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
      <div className="board flex flex-col gap-2 bg-board p-4 rounded-4xl shadow-sharp border-2 border-black relative">
        <div className="arrow absolute -top-2 transform -translate-x-1/2 -translate-y-1/2 fill-red-player animate-bounce" style={{ left: 50 + 100/7.35 * (hoverColumn - 3) + "%"}}>
          <svg
            height="40px"
            width="40px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.002 512.002"
          >
            <g>
              <g>
                <path
                  d="M498.837,65.628c-7.957-3.328-17.152-1.472-23.253,4.629L256,289.841L36.416,70.257
			c-6.101-6.101-15.275-7.936-23.253-4.629C5.184,68.913,0,76.721,0,85.34v106.667c0,5.675,2.24,11.093,6.251,15.083
			l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251L505.751,207.09
			c4.011-3.989,6.251-9.408,6.251-15.083V85.34C512,76.721,506.816,68.913,498.837,65.628z"
                />
              </g>
            </g>
          </svg>
        </div>

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
                onMouseEnter={() => handleMouseEnter(colIndex)}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    cell === "red"
                      ? "bg-red-player shadow-hole-soft"
                      : cell === "yellow"
                      ? "bg-yellow-player shadow-hole-soft"
                      : "bg-transparent shadow-hole"
                  } ${
                    ((6 - rowIndex < 6 &&
                      board[6 - rowIndex][colIndex] == "empty") ||
                      rowIndex == 0) &&
                    cell != "empty" &&
                    colIndex == last_ai_move
                      ? "last_move"
                      : ""
                  }`}
                ></div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
