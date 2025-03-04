import { Operation } from "./types";

export const OPERATIONS: Operation[] = [
  { operator: "+", label: "+", operation: (a: number, b: number) => a + b },
  { operator: "-", label: "-", operation: (a: number, b: number) => a - b },
  { operator: "*", label: "*", operation: (a: number, b: number) => a * b },
  { operator: "/", label: "/", operation: (a: number, b: number) => a / b },
];
