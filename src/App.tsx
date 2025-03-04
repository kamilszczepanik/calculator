import { useState } from "react";
import "./App.css";
import { WindowControlButtons } from "./components/WindowControlButtons";
import { Yallist } from "yallist";
import { DigitButtons } from "./components/DigitButtons";
import { OperationButtons } from "./components/OperationButtons";
import { OPERATIONS } from "./helpers/constants";
import { Operator } from "./helpers/types";

function App() {
  const [calculations, setCalculations] = useState<string>("0");
  const [previousCalculations, setPreviousCalculations] = useState<string>("");

  const isOperator = (item: string) =>
    OPERATIONS.some((action) => action.operator === item);

  const handleDigitClick = (item: string) => {
    if (calculations === "0") {
      if (item !== "0") setCalculations(item);
    } else {
      if (previousCalculations && calculations && !isOperator(item)) {
        setCalculations(item);
      } else {
        setCalculations(calculations.concat(item));
      }
      setPreviousCalculations("");
    }
  };

  const handleOperationClick = () => {
    
  }

  const handleCalculate = () => {
    const calculationsArray = calculations.match(/\d+|\+|-|\/|\*/g) || [];

    if (calculationsArray.length < 3) return;

    const calculationsLinkedList = new Yallist<string>(calculationsArray);

    let currentTotal = 0;
    let operator: Operator | null = null;

    while (calculationsLinkedList.length) {
      const currentNode = calculationsLinkedList.head;

      if (!currentNode) return;

      const action = OPERATIONS.find((a) => a.operator === currentNode.value);

      if (action) {
        operator = action.operator as Operator;
      } else {
        if (operator) {
          const operation = OPERATIONS.find(
            (a) => a.operator === operator
          )?.operation;
          if (operation) {
            currentTotal = operation(currentTotal, Number(currentNode.value));
            operator = null;
          }
        } else {
          currentTotal = Number(currentNode.value);
        }
      }

      calculationsLinkedList.shift();
    }

    setPreviousCalculations(calculations);
    setCalculations(currentTotal.toString());
  };

  const handleClearCalculations = () => {
    setCalculations("0");
    setPreviousCalculations("");
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-700 rounded-lg p-2 w-fit border-gray-400 border shadow-2xl">
      <WindowControlButtons />
      <p className="text-right text-gray-400 h-4">{previousCalculations}</p>
      <p className="text-right text-white text-xl over">{calculations}</p>
      <div className="grid grid-cols-4 gap-1">
        <DigitButtons
          handleDigitClick={handleDigitClick}
          handleClearCalculationsClick={handleClearCalculations}
        />
        <OperationButtons handleCalculate={handleCalculate} handleOperationClick={handleOperationClick} />
      </div>
    </div>
  );
}

export default App;
