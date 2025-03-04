import { useState } from "react";
import "./App.css";
import { WindowControlButtons } from "./components/WindowControlButtons";
import { Yallist } from "yallist";
import { DigitButtons } from "./components/DigitButtons";
import { OperationButtons } from "./components/OperationButtons";
import { OPERATIONS } from "./helpers/constants";
import { Operator } from "./helpers/types";
import { CalculationsOutput } from "./components/CalculationsOutput";

function App() {
  const [calculations, setCalculations] = useState<string>("0");
  const [previousCalculations, setPreviousCalculations] = useState<string>("");

  const handleDigitClick = (item: string) => {
    if (calculations === "0") {
      if (item !== "0") setCalculations(item);
    } else {
      if (previousCalculations && calculations) {
        setCalculations(item);
      } else {
        setCalculations(calculations.concat(item));
      }
      setPreviousCalculations("");
    }
  };

  const handleOperationClick = (operator: Operator) => {
    if (calculations === "0") {
      setCalculations(operator);
    } else {
      setCalculations(calculations.concat(operator));
      setPreviousCalculations("");
    }
  };

  const handleCalculate = () => {
    const calculationsLinkedList = new Yallist<string>(
      calculations.match(/\d+|\+|-|\/|\*/g) || []
    );

    if (calculationsLinkedList.length < 3)
      throw new Error("Invalid calculation: requires at least 3 elements");

    const result = calculate(calculationsLinkedList);

    setPreviousCalculations(calculations);
    setCalculations(result.toString());
  };

  const calculate = (calculationsLinkedList: Yallist<string>): number => {
    let result = 0;
    let currentOperator: Operator | null = null;

    while (calculationsLinkedList) {
      const currentElement = calculationsLinkedList.head?.value;

      if (!currentElement) break;

      const isOperator = OPERATIONS.some((a) => a.operator === currentElement);

      if (isOperator) {
        currentOperator = currentElement as Operator;
      } else {
        const operand = Number(currentElement);

        if (currentOperator) {
          result = evaluateOperation(result, operand, currentOperator);
          currentOperator = null;
        } else {
          result = operand;
        }
      }

      calculationsLinkedList.shift();
    }

    return result;
  };

  const evaluateOperation = (
    currentValue: number,
    operand: number,
    operator: Operator
  ): number => {
    const operation = OPERATIONS.find(
      (op) => op.operator === operator
    )?.operation;
    if (!operation) {
      throw new Error(`Unknown operator: ${operator}`);
    }
    return operation(currentValue, operand);
  };

  const handleClearCalculations = () => {
    setCalculations("0");
    setPreviousCalculations("");
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-700 rounded-lg p-2 w-40 border-gray-400 border shadow-2xl text-sm">
      <WindowControlButtons />
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
}

export default App;
