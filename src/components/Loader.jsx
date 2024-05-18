import "./Loader.css";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="loader"></span>
      <h1 className="text-blue-700 text-3xl mt-10 ">Shuffling Cards</h1>
    </div>
  );
};
