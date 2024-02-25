import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const ProductCounter: FC<Props> = (props) => {
  const { value, onDecrement, onIncrement } = props;

  return (
    <div className="col-span-1 flex justify-center space-x-4 rounded-lg">
      <button
        className="rounded-full bg-red-100 text-red-500 w-9 h-9 flex items-center justify-center"
        onClick={onDecrement}
      >
        <span className="text-3xl">-</span>
      </button>
      <span className="text-2xl font-semibold px-2">{value}</span>
      <button
        className="rounded-full bg-green-100 text-green-500 w-9 h-9 flex items-center justify-center"
        onClick={onIncrement}
      >
        <span className="text-3xl">+</span>
      </button>
    </div>
  );
};

export default ProductCounter;
