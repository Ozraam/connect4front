export default function CellSpin() {
    return (
      <style>{`
          .last_move {
              animation: spin 2s cubic-bezier(.67,.24,.42,1.13) forwards;
          }
          @keyframes spin {
              0% {
                  transform: rotateY(90deg);
              }
              100% {
                  transform: rotateY(540deg);
              }
          }
          `}</style>
    );
  }
  