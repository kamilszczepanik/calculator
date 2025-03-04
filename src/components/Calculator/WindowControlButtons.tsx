import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface Props {
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}

export const WindowControlButtons = ({ listeners, attributes }: Props) => {
  return (
    <div
      className="flex gap-1.5 select-none cursor-grab"
      {...listeners}
      {...attributes}
    >
      <button className="w-2.5 h-2.5 rounded-full bg-red-400" />
      <button className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <button className="w-2.5 h-2.5 rounded-full bg-gray-500" />
    </div>
  );
};
