export default function CellFall() {
  return (
    <style>{`
        .last_move {
            animation: fall 0.5s cubic-bezier(.67,.24,.42,1.13) forwards;
        }
        @keyframes fall {
            0% {
                transform: translateY(-500px);
            }
            100% {
                transform: translateY(0);
            }
        }
        `}</style>
  );
}
