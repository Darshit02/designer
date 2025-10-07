import { Shape } from "@/redux/slice/shapes";
import React from "react";
import { Rectangle } from "./rectangle";
import { Elipse } from "./elipse";
import { Arrow } from "./arrow";
import { Text } from "./text";
import { Line } from "./line";
import { Stroke } from "./stroke";
import { Frame } from "./frame";

const ShapeRenderer = ({
  shape,
  toggleInspiration,
  toggleChat,
  generateWorkflow,
  exportDesign,
}: {
  shape: Shape;
  toggleInspiration: () => void;
  toggleChat?: (generateUIId: string) => void;
  generateWorkflow?: (generateUIId: string) => void;
  exportDesign?: (generateUIId: string) => void;
  //ADD FRAME BUTTON
  //ADD GENERATED UI
}) => {
  switch (shape.type) {
     case "frame":
       return (
       <Frame 
       shape={shape} 
       toggleInspiration={toggleInspiration} />
      )
    case "rect":
      return <Rectangle shape={shape} />;
    case "ellipse":
      return <Elipse shape={shape} />;
    case "freedraw":
      return <Stroke shape={shape} />;
    case "arrow":
      return <Arrow shape={shape} />;
    case "line":
      return <Line shape={shape} />;
    case "text":
      return <Text shape={shape} />;
    default:
      break;
  }
};

export default ShapeRenderer;
