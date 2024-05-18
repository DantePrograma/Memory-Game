export const Card = ({ card, handleCardClick }) => {
  return (
    <div
      className={`drop-shadow-md flex items-center ${
        card.flipped
          ? "[transform: rotateY(10deg)]"
          : "bg-blue-400 hover:bg-blue-700"
      } justify-center cursor-pointer h-20 w-20 md:h-28 md:w-28 hover:scale-105 rounded-xl transition-all duration-500`}
      onClick={() => handleCardClick(card.id)}
    >
      <div>
        <img
          src={card.img}
          alt={card.alt}
          className={`h-20 md:h-28  ${
            !card.flipped
              ? "[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000"
              : ""
          }`}
        />
      </div>
    </div>
  );
};
