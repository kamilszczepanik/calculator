import { ReactNode } from "react";

interface Props {
  variant: "number" | "action";
  className?: string;
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ variant, className, children, onClick }: Props) => {
  return (
    <button
      className={`rounded-full w-8 h-8 text-white ${
        variant === "action" ? "bg-orange-400" : "bg-gray-500"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
