export type Operator = "+" | "-" | "*" | "/";

export type Operation = {
  operator: Operator;
  label: Operator;
  operation: (a: number, b: number) => number;
};
