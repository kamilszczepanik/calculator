import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { WindowActions } from "./WindowActions";
import { Yallist } from "yallist";

function App() {
  const [calculations, setCalculations] = useState<string>("0");

  const handleOnClick = (item: string) => {
    if (calculations === "0") {
      if (item !== "0") setCalculations(item);
    } else {
      setCalculations(calculations.concat(item));
    }
  };

  const handleCalculate = () => {
    const calculationsArray = calculations.match(/\d+|\+|-|\/|\*/g) || [];

    if (calculationsArray.length < 3) return;

    const history = new Yallist<string>(calculationsArray);

    let temp = 0;
    let operator: null | "-" | "+" = null;

    while (history.length) {
      const firstItem = history.head;
      if (!firstItem) return;

      switch (firstItem.value) {
        case "-":
          operator = "-";
          break;
        case "+":
          operator = "+";
          break;
        default:
          if (operator) {
            if (operator === "+") {
              temp += Number(firstItem.value);
              operator = null;
            } else if (operator === "-") {
              temp -= Number(firstItem.value);
              operator = null;
            }
          } else {
            temp = Number(firstItem.value);
          }
          break;
      }

      history.shift();
    }

    setCalculations(temp.toString());
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-700 rounded-lg p-2 w-fit">
      <WindowActions />
      <p className="text-right text-gray-400">{JSON.stringify(history)}</p>
      <p className="text-right text-white">{calculations}</p>
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-1 flex flex-col gap-1 pt-9">
          <Button onClick={() => handleOnClick("7")} variant="number">
            7
          </Button>
          <Button onClick={() => handleOnClick("4")} variant="number">
            4
          </Button>
          <Button onClick={() => handleOnClick("1")} variant="number">
            1
          </Button>
        </div>
        <div className="col-span-1 flex flex-col gap-1 pt-9">
          <Button onClick={() => handleOnClick("8")} variant="number">
            8
          </Button>
          <Button onClick={() => handleOnClick("5")} variant="number">
            5
          </Button>
          <Button onClick={() => handleOnClick("2")} variant="number">
            2
          </Button>
          <Button onClick={() => handleOnClick("0")} variant="number">
            0
          </Button>
        </div>
        <div className="col-span-1 flex flex-col gap-1 pt-9">
          <Button onClick={() => handleOnClick("9")} variant="number">
            9
          </Button>
          <Button onClick={() => handleOnClick("6")} variant="number">
            6
          </Button>
          <Button onClick={() => handleOnClick("3")} variant="number">
            3
          </Button>
        </div>
        <div className="col-span-1 flex flex-col gap-1">
          <Button onClick={() => handleOnClick("/")} variant="action">
            ÷
          </Button>
          <Button onClick={() => handleOnClick("*")} variant="action">
            ×
          </Button>
          <Button onClick={() => handleOnClick("-")} variant="action">
            -
          </Button>
          <Button onClick={() => handleOnClick("+")} variant="action">
            +
          </Button>
          <Button onClick={() => handleCalculate()} variant="action">
            =
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
