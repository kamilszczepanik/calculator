import "./App.css";
import { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { Calculator } from "./components/Calculator/Calculator";
import { Position } from "./utils/types";

function App() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const calculatorWidth = 160;
    const calculatorHeight = 300;

    setPosition({
      x: (windowWidth - calculatorWidth) / 2,
      y: (windowHeight - calculatorHeight) / 2,
    });
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;

    setPosition((prevPosition) => ({
      x: prevPosition.x + delta.x,
      y: prevPosition.y + delta.y,
    }));
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Calculator position={position} />
      </DndContext>
    </div>
  );
}

export default App;
