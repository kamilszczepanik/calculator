import { useState } from "react";
import { Yallist } from "yallist";
import { OPERATIONS } from "../utils/constants";
import { isOperator } from "../utils/helpers";
import { Operator } from "../utils/types";

export const useCalculator = () => {
  const [calculations, setCalculations] = useState<string>("0");
  const [previousCalculations, setPreviousCalculations] = useState<string>("");

  const handleDigitClick = (digit: string) => {
    if (calculations === "0") {
      if (digit !== "0") setCalculations(digit);
    } else {
      if (previousCalculations && calculations) {
        setCalculations(digit);
      } else {
        setCalculations(calculations.concat(digit));
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

  const handleClearCalculations = () => {
    setCalculations("0");
    setPreviousCalculations("");
  };

  const handleCalculate = () => {
    const elements =
      calculations
        .replace(/([+\-*/])(-?\d+)/g, "$1 $2")
        .match(/(-?\d+)|([+*/])|(-(?!\d))/g) || [];

    if (elements.length < 3)
      throw new Error("Invalid calculation: requires at least 3 elements");

    const orderedElements = processHigherOrderOperations(elements);
    const calculationsLinkedList = createLinkedList(orderedElements);
    const result = calculateResult(calculationsLinkedList);

    setPreviousCalculations(calculations);
    setCalculations(result.toString());
  };

  const processHigherOrderOperations = (elements: string[]): string[] => {
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

  const calculateResult = (calculationsLinkedList: Yallist<string>): number => {
    let result = 0;
    let currentOperator: Operator | null = null;

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

  const evaluateOperation = (
    currentValue: number,
    operand: number,
    operator: Operator
  ): number => {
    const operation = OPERATIONS.find(
      (op) => op.operator === operator
    )?.operation;

    if (!operation) throw new Error(`Unknown operator: ${operator}`);

    return operation(currentValue, operand);
  };

  return {
    calculations,
    previousCalculations,
    handleCalculate,
    handleDigitClick,
    handleOperationClick,
    handleClearCalculations,
  };
};
