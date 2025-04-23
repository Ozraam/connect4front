export default function EndGameModal({
  winner,
  onRestart,
}: {
  winner: string | null;
  onRestart: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {winner ? `${winner} wins!` : "It's a draw!"}
      </h2>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
      >
        Restart Game
      </button>
    </div>
  );
}
