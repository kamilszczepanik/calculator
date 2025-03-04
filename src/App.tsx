import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [output, setOutput] = useState(0);
  const numbers: string[] = [];
  const history: string[] = [];
  const [item, setItem] = useState();

  // const handleOnClick = (item: string) => {
  //   if (item) {
  //     setItem(item);
  //     history.push(item);
  //   }
  // };

  // useEffect(() => {
  //   if (item === "=") {
  //     for(let )
  //   }
  // }, [item]);

  return (
    <div className="flex flex-col gap-2 bg-gray-700 rounded-lg p-2 w-fit">
      <div className="flex gap-1">
        <button className="w-2 h-2 rounded-full bg-red-400" />
        <button className="w-2 h-2 rounded-full bg-yellow-400" />
        <button className="w-2 h-2 rounded-full bg-gray-500" />
      </div>
      <p className="text-right text-gray-400">{JSON.stringify(history)}</p>
      <p className="text-right text-white">{JSON.stringify(history)}</p>
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
          <Button onClick={() => handleOnClick("2")} variant="number">
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
