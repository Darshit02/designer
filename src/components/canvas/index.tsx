"use client";
import { useInfiniteCanvas } from "@/hooks/use-canvas";
import React from "react";
import TextSidebar from "./text-sidebar";
import { cn } from "@/lib/utils";
import ShapeRenderer from "./shapes";
import { RectanglePreview } from "./shapes/rectangle/preview";
import { FramePreview } from "./shapes/frame/preview";
import { ElipsePreview } from "./shapes/elipse/preview";
import { ArrowPreview } from "./shapes/arrow/preview";
import { LinePreview } from "./shapes/line/preview";
import { FreeDrawStrokePreview } from "./shapes/stroke/preview";
import { SelectionOverlay } from "./shapes/selection";
import { CanvasContextMenu } from "./context-menu";
import { ClipboardStatus } from "../clipboard-status";

type Props = {};

const InfinityCanvas = (props: Props) => {
  const {
    viewport,
    attachCanvasRef,
    currentTool,
    getDraftShape,
    getFreeDrawPoints,
    hasSelectedText,
    isSidebarOpen,
    onPointerCancle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    selectTool,
    selectedShapes,
    setIsSidebarOpen,
    shapes,
  } = useInfiniteCanvas();

  const draftShape = getDraftShape();
  const freeDrawPoints = getFreeDrawPoints();

  return (
    <>
      <TextSidebar isOpen={isSidebarOpen && hasSelectedText} />
      <ClipboardStatus />
      {/* TODO : insperation */}
      {/* TODO : chat window*/}
      <CanvasContextMenu>
        <div
          ref={attachCanvasRef}
          role="application"
          aria-label="Infinite drawing canvas"
          tabIndex={0}
          className={cn(
            "relative w-full h-full overflow-hidden select-none z-0 focus:outline-none bg-[radial-gradient(circle,theme(colors.gray.300)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,theme(colors.gray.800)_1px,transparent_1px)] [background-size:40px_40px]",
            {
              "cursor-grabbing": viewport.mode === "panning",
              "cursor-grab": viewport.mode === "shiftPanning",
              "cursor-crosshair":
                currentTool !== "select" && viewport.mode === "idle",
              "cursor-default":
                currentTool === "select" && viewport.mode === "idle",
            }
          )}
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancle}
          draggable={false}
        >
        <div
          className="absolute origin-top-left pointer-events-none z-10"
          style={{
            transform: `translate3d(${viewport.translate.x}px , ${viewport.translate.y}px,0) scale(${viewport.scale})`,
            transformOrigin: "0 0",
            willChange: "transform",
          }}
        >
          {shapes.map((shape) => (
            <ShapeRenderer
              key={shape.id}
              shape={shape}
              // toggleInspiration={toggleInspiration}
              // toggleChat={toggleChat}
              // generateWorkflow={generateWorkflow}
              // exportDesign={exportDesign}
            />
          ))}

          {shapes.map((shape) => (
            <SelectionOverlay 
            key={`selection-${shape.id}`}
            shape={shape}
            isSelected={!!selectedShapes[shape.id]}
            />
          ))}

          {draftShape && draftShape.type === "frame" && (
            <FramePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}

          {draftShape && draftShape.type === "rect" && (
            <RectanglePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {draftShape && draftShape.type === "ellipse" && (
            <ElipsePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {draftShape && draftShape.type === "arrow" && (
            <ArrowPreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}

          {draftShape && draftShape.type === "line" && (
            <LinePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {currentTool === "freedraw" && freeDrawPoints.length > 1 && (
            <FreeDrawStrokePreview points={freeDrawPoints} />
          )}
        </div>
        </div>
      </CanvasContextMenu>
    </>
  );
};

export default InfinityCanvas;
