import "./App.css";
import { WindowControlButtons } from "./components/WindowControlButtons";
import { DigitButtons } from "./components/DigitButtons";
import { OperationButtons } from "./components/OperationButtons";
import { CalculationsOutput } from "./components/CalculationsOutput";
import { useCalculator } from "./hooks/useCalculator";

function App() {
  const {
    calculations,
    previousCalculations,
    handleDigitClick,
    handleClearCalculations,
    handleCalculate,
    handleOperationClick,
  } = useCalculator();

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
