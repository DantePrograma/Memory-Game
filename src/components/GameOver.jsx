export const GameOver = ({ moves, resetGame, time }) => {
  return (
    <div className="absolute text-blue-700 flex items-center justify-center bg-white h-[300px] w-full p-8 rounded-xl">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-7xl">Game Over</h1>
        <h1 className="text-4xl">Moves: {moves} </h1>
        <h1 className="text-4xl">Time: {time}</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetGame}
        >
          ResetGame
        </button>
      </div>
    </div>
  );
};
