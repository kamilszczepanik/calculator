import { Button } from "./ui/button";

interface Props {
  handleDigitClick: (digit: string) => void;
  handleClearCalculationsClick: () => void;
}

export const DigitButtons = ({
  handleDigitClick,
  handleClearCalculationsClick,
}: Props) => {
  const digits = ["7", "4", "1", "8", "5", "2", "0", "9", "6", "3"];

  return (
    <>
      <div className="col-span-1 flex flex-col gap-1">
        <Button onClick={() => handleClearCalculationsClick()} variant="number">
          AC
        </Button>
        {digits.slice(0, 3).map((digit) => (
          <Button
            key={digit}
            onClick={() => handleDigitClick(digit)}
            variant="number"
          >
            {digit}
          </Button>
        ))}
      </div>
      <div className="col-span-1 flex flex-col gap-1 pt-9">
        {digits.slice(3, 7).map((digit) => (
          <Button
            key={digit}
            onClick={() => handleDigitClick(digit)}
            variant="number"
          >
            {digit}
          </Button>
        ))}
      </div>
      <div className="col-span-1 flex flex-col gap-1 pt-9">
        {digits.slice(7, 10).map((digit) => (
          <Button
            key={digit}
            onClick={() => handleDigitClick(digit)}
            variant="number"
          >
            {digit}
          </Button>
        ))}
      </div>
    </>
  );
};
