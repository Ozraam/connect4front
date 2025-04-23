export default function SkewBoard() {
  return (
    <style>{`
          .board {
              animation: bskew 2s cubic-bezier(.67,.24,.42,1) forwards;
          }
          @keyframes bskew {
              0% {
                  transform: skewX(0deg);
              }
              50% {
                  transform: skewX(50deg);
              }
                100% {
                    transform: skewX(0deg);
                }
          }
                .last_move {
                    animation: appear 1s cubic-bezier(.67,.24,.42,1) forwards;
                }
                @keyframes appear {
                    0% {
                        opacity: 0;
                    }
                    90% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
          `}</style>
  );
}
