import { OPERATIONS } from "./constants";

export const isOperator = (currentElement: string) =>
  OPERATIONS.some((a) => a.operator === currentElement);
