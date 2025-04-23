"use client";
import Connect4Board from "@/components/Connect4Board";
import EndGameModal from "@/components/EndGameModal";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [last_player_move, setLastPlayer] = useState<number | null>(null);


  const [game, setGame] = useState<{
    id: string;
    board: string[][];
    turn: string;
    winner: string | null;
    is_draw: boolean;
    last_move: number | null;
  } | null>(null);

  async function startNewGame() {
    const res = await fetch("http://localhost:8080/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setGame(data);
      setLastPlayer(null);
      localStorage.setItem("gameId", data.id);
    } else {
      console.error("Error starting new game");
    }
  }

  async function playMove(colIndex: number) {
    const gameId = localStorage.getItem("gameId");
    if (!gameId) {
      console.error("No game ID found");
      return;
    }
    const res = await fetch(`http://localhost:8080/games/${gameId}/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        column: colIndex,
        ai_difficulty: 8,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setLastPlayer(colIndex);
      setGame(data);
      setTimeout(() => {
        setLastPlayer(null);
      }, 1500);
    } else {
      console.error("Error playing move");
      if (res.status === 404) {
        console.error("Game not found");
        setGame(null);
        localStorage.removeItem("gameId");
      } else if (res.status === 400) {
        console.error("Invalid move");
      } else if (res.status === 500) {
        console.error("Server error");
      }
    }
  }

  async function getGameState() {
    const gameId = localStorage.getItem("gameId");
    if (!gameId) {
      console.error("No game ID found");
      return;
    }
    const res = await fetch(`http://localhost:8080/games/${gameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setGame(data);
    } else {
      console.error("Error getting game state");
    }
  }

  async function resetGame() {
    const gameId = localStorage.getItem("gameId");
    if (!gameId) {
      console.error("No game ID found");
      return;
    }
    setGame(null);
    localStorage.removeItem("gameId");
    const res = await fetch(`http://localhost:8080/games/${gameId}`, {
      method: "delete",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      startNewGame();
    } else {
      console.error("Error resetting game");
    }
  }

  useEffect(() => {
    const gameId = localStorage.getItem("gameId");
    if (gameId) {
      getGameState();
    } else {
      startNewGame();
    }
  }, []);

  let comp = null;
  if (game) {
    comp = (
      <Connect4Board board={game.board} onColumnClick={(i) => playMove(i)} last_ai_move={game.last_move} last_player_move={last_player_move} />
    );
  } else {
    comp = (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Connect 4</h1>
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-background animate-spin dark:text-gray-600 fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen ">
        {(game?.winner || game?.is_draw) && (
          <EndGameModal winner={game.winner} onRestart={resetGame} />
        )}
        {comp}
      </div>
    </main>
  );
}
