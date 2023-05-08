type SquareType = {
  value: string,
  onClick: () => void
}
const Square = ({ value, onClick }: SquareType) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square