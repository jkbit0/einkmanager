import { DragControls } from "framer-motion";
import { IoMdReorder } from "react-icons/io";

interface Props {
  dragControls: DragControls;
}

export function ReorderIcon({ dragControls }: Props) {
  return (
    <IoMdReorder
      style={{ userSelect: "none", width: "32px", height: "32px" }}
      onPointerDown={(event) => {
        dragControls.start(event);
        event.preventDefault();
      }}
    />
  );
}
