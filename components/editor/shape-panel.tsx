"use client";

import {
  Circle,
  Cylinder,
  Diamond,
  Hexagon,
  Pill,
  RectangleHorizontal,
  type LucideIcon,
} from "lucide-react";
import { Panel } from "@xyflow/react";
import type { CanvasNodeShape, CanvasShapeDragPayload } from "@/types/canvas";

export const CANVAS_SHAPE_DRAG_TYPE = "application/x-dev-ai-canvas-shape";

interface ShapeDefinition extends CanvasShapeDragPayload {
  label: string;
  icon: LucideIcon;
}

const SHAPES: ShapeDefinition[] = [
  { shape: "rectangle", label: "Rectangle", icon: RectangleHorizontal, width: 180, height: 90 },
  { shape: "diamond", label: "Diamond", icon: Diamond, width: 160, height: 160 },
  { shape: "circle", label: "Circle", icon: Circle, width: 120, height: 120 },
  { shape: "pill", label: "Pill", icon: Pill, width: 180, height: 80 },
  { shape: "cylinder", label: "Cylinder", icon: Cylinder, width: 160, height: 100 },
  { shape: "hexagon", label: "Hexagon", icon: Hexagon, width: 160, height: 120 },
];

interface ShapeButtonProps {
  shape: ShapeDefinition;
}

function ShapeButton({ shape }: ShapeButtonProps) {
  const Icon = shape.icon;

  function handleDragStart(event: React.DragEvent<HTMLButtonElement>) {
    const payload: CanvasShapeDragPayload = {
      shape: shape.shape as CanvasNodeShape,
      width: shape.width,
      height: shape.height,
    };

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(CANVAS_SHAPE_DRAG_TYPE, JSON.stringify(payload));
  }

  return (
    <button
      type="button"
      draggable
      onDragStart={handleDragStart}
      className="flex h-10 w-10 cursor-grab items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-slate-700 hover:text-white active:cursor-grabbing"
      aria-label={`Drag ${shape.label} onto canvas`}
      title={shape.label}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export function ShapePanel() {
  return (
    <Panel
      position="bottom-center"
      className="mb-5 flex items-center gap-1 rounded-2xl border border-slate-700 bg-slate-900/95 p-2 shadow-lg"
    >
      {SHAPES.map((shape) => (
        <ShapeButton key={shape.shape} shape={shape} />
      ))}
    </Panel>
  );
}
