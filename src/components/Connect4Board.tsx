'use client'
export default function Connect4Board({board, onColumnClick} : {board: string[][], onColumnClick: (colIndex: number) => void}) {  
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Connect 4</h1>
            <div className="gap-2">
                {board.toReversed().map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((cell, colIndex) => (
                            <button
                                key={colIndex}
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border cursor-pointer border-black ${
                                    cell === "red" ? "bg-red-500" : (cell === "yellow" ? "bg-yellow-500" : "bg-gray-300")
                                }`}
                                onClick={() => onColumnClick(colIndex)}
                            >
                                
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
