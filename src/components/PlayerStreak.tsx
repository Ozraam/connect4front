export default function PlayerStreak({
  streak,
  name,
  color,
}: {
  streak: number;
  name: String;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`border-black border-4 p-5 py-8 text-xl h-fit rounded-xl bg-white flex flex-col items-center justify-center shadow-sharp relative`}
      >
        <div className={`absolute top-0 p-2 left-1/2 -translate-1/2 w-12 h-12 rounded-full ${color} border-4 border-black shadow-sharp-small`}>
            <div className="flex gap-2 justify-center w-full">
                <div className="w-2 h-2 bg-black rounded-full mb-1"></div>
                <div className="w-2 h-2 bg-black rounded-full mb-1"></div>
            </div>
            <div className="w-6 h-4 border-black border-b-4 rounded-full"></div>
        </div>
        <h2 className="font-semibold text-lg mb-2">{name}</h2>
        <p className="font-bold text-2xl">
          {streak} {streak === 1 ? "win" : "wins"}
        </p>
      </div>
    </div>
  );
}
