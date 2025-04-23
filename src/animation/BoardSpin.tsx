export default function BoardSpin() {
    return (
      <style>{`
          .board {
              animation: bspin 2s cubic-bezier(.67,.24,.42,1) forwards;
          }
          @keyframes bspin {
              0% {
                  transform: rotateY(0);
              }
              100% {
                  transform: rotateY(360deg);
              }
          }
          `}</style>
    );
  }
  