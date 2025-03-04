import { useState } from "react";
import "./App.css";
import { WindowControlButtons } from "./components/WindowControlButtons";
import { Yallist } from "yallist";
import { DigitButtons } from "./components/DigitButtons";
import { OperationButtons } from "./components/OperationButtons";
import { OPERATIONS } from "./utils/constants";
import { Operator } from "./utils/types";
import { CalculationsOutput } from "./components/CalculationsOutput";
import { isOperator } from "./utils/helpers";

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
    const lastElement = calculations[calculations.length - 1];
    const secondToLastElement = calculations[calculations.length - 2];

    if (
      lastElement === "-" &&
      secondToLastElement &&
      isOperator(secondToLastElement)
    ) {
      setCalculations((prevCalculations) =>
        prevCalculations.slice(0, -2).concat(operator)
      );
      return;
    }

    if (
      operator === "-" &&
      lastElement &&
      isOperator(lastElement) &&
      lastElement !== "-"
    ) {
      setCalculations(calculations.concat(operator));
      setPreviousCalculations("");
      return;
    }

    if (isOperator(lastElement)) {
      setCalculations((prevCalculations) =>
        prevCalculations.slice(0, -1).concat(operator)
      );
    } else {
      if (calculations === "0") {
        setCalculations(operator);
      } else {
        setCalculations(calculations.concat(operator));
        setPreviousCalculations("");
      }
    }
  };

  const handleCalculate = () => {
    const elements =
      calculations
        .replace(/([+\-*/])(-?\d+)/g, "$1 $2")
        .match(/(-?\d+)|([+*/])|(-(?!\d))/g) || [];

    if (elements.length < 3)
      throw new Error("Invalid calculation: requires at least 3 elements");

    const result = calculate(elements);

    setPreviousCalculations(calculations);
    setCalculations(result.toString());
  };

  const calculate = (elements: string[]): number => {
    let result = 0;
    let currentOperator: Operator | null = null;

    const orderedElements = addHigherOrderOperationsToFront(elements);
    const calculationsLinkedList = createLinkedList(orderedElements);

    while (calculationsLinkedList) {
      const currentElement = calculationsLinkedList.head?.value;

      if (!currentElement) break;

      if (isOperator(currentElement)) {
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

  const addHigherOrderOperationsToFront = (elements: string[]): string[] => {
    let i = 1;

    while (i < elements.length) {
      if (elements[i] === "*" || elements[i] === "/") {
        const leftOperand = Number(elements[i - 1]);
        const rightOperand = Number(elements[i + 1]);
        let result: number;

        if (elements[i] === "*") {
          result = leftOperand * rightOperand;
        } else {
          if (rightOperand === 0) throw new Error("Division by zero");
          result = leftOperand / rightOperand;
        }

        elements.splice(i - 1, 3, result.toString());

        i = 1;
      } else {
        i += 2;
      }
    }

    return elements;
  };

  const createLinkedList = (elements: string[]): Yallist<string> => {
    const calculationsLinkedList = new Yallist<string>(elements);

    while (calculationsLinkedList.length > 0) {
      calculationsLinkedList.shift();
    }

    for (const element of elements) {
      calculationsLinkedList.push(element);
    }

    return calculationsLinkedList;
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
