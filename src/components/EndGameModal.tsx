import { Cherry_Bomb_One } from "next/font/google";

const cherry = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function EndGameModal({
  winner,
  onRestart,
}: {
  winner: string | null;
  onRestart: () => void;
}) {
  return (
    <div className="rotate-12">
      <h2
        className={`text-2xl font-bold mb-4 ${cherry.className} text-white text-8xl text-shadow-lg`}
      >
        {winner ? `${winner} wins!` : "It's a draw!"}
      </h2>
      <button
        onClick={onRestart}
        className={
          "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        }
      >
        Restart Game
      </button>

      <style>{
        `
        body {
            transform: rotate(-12deg) translateZ(500px) translateY(300px);
        }
        `
        
        }</style>
    </div>
  );
}
