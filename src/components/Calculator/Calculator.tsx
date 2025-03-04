import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CalculationsOutput } from "./CalculationsOutput";
import { DigitButtons } from "./DigitButtons";
import { OperationButtons } from "./OperationButtons";
import { useCalculator } from "../../hooks/useCalculator";
import { Position } from "../../utils/types";
import { WindowControlButtons } from "./WindowControlButtons";

export const Calculator = ({ position }: { position: Position }) => {
  const {
    calculations,
    previousCalculations,
    handleDigitClick,
    handleClearCalculations,
    handleCalculate,
    handleOperationClick,
  } = useCalculator();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: "calculator",
    });

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 10 : 1,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-2 bg-gray-700 rounded-lg p-2 w-40 border-gray-400 border shadow-2xl text-sm absolute ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={style}
    >
      <WindowControlButtons attributes={attributes} listeners={listeners} />
      <CalculationsOutput
        calculations={calculations}
        previousCalculations={previousCalculations}
      />
      <div className="grid grid-cols-4 gap-1">
        <DigitButtons
          handleDigitClick={handleDigitClick}
          handleClearCalculationsClick={handleClearCalculations}
        />
        <OperationButtons
          handleCalculate={handleCalculate}
          handleOperationClick={handleOperationClick}
        />
      </div>
    </div>
  );
};
