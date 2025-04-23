"use client";
import Connect4Board from "@/components/Connect4Board";
import EndGameModal from "@/components/EndGameModal";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
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
        difficulty: 8,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setGame(data);
    } else {
      console.error("Error playing move");
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
    const res = await fetch(`http://localhost:8080/games/${gameId}`, {
      method: "delete",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setGame(null);
      localStorage.removeItem("gameId");
    } else {
      console.error("Error resetting game");
    }
  }

  useEffect(() => {
    const gameId = localStorage.getItem("gameId");
    if (gameId) {
      getGameState();
    }
  }, []);

  let comp = null;
  if (game) {
    comp = (
      <Connect4Board board={game.board} onColumnClick={(i) => playMove(i)} />
    );
  } else {
    comp = (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Connect 4</h1>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
          onClick={() => startNewGame()}
        >
          Play
        </button>
      </div>
    );
  }
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {(game?.winner || game?.is_draw) && (
          <EndGameModal winner={game.winner} onRestart={resetGame} />
        )}
        {comp}
      </div>
    </main>
  );
}
