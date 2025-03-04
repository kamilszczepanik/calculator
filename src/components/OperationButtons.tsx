import { OPERATIONS } from "../helpers/constants";
import { Operator } from "../helpers/types";
import { Button } from "./ui/button";

interface Props {
  handleOperationClick: (operator: Operator) => void;
  handleCalculate: () => void;
}

export const OperationButtons = ({
  handleOperationClick,
  handleCalculate,
}: Props) => {
  return (
    <div className="col-span-1 flex flex-col gap-1">
      {OPERATIONS.map(({ label, operator }) => (
        <Button
          key={operator}
          onClick={() => handleOperationClick(operator)}
          variant="action"
        >
          {label}
        </Button>
      ))}
      <Button onClick={() => handleCalculate()} variant="action">
        =
      </Button>
    </div>
  );
};
