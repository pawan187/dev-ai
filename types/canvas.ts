import type { Edge, Node } from "@xyflow/react";

export const NODE_COLORS = {
  neutral: { fill: "#111827", text: "#EAF2FF" },
  blue: { fill: "#15314D", text: "#DCEEFF" },
  purple: { fill: "#2A2345", text: "#F0E8FF" },
  orange: { fill: "#3A2A1A", text: "#FFE7C2" },
  red: { fill: "#3B1F2A", text: "#FFD9DE" },
  pink: { fill: "#3A2438", text: "#FFD9F2" },
  green: { fill: "#1C2E2A", text: "#DDFEEB" },
  teal: { fill: "#102F2F", text: "#D9FFFB" },
} as const;

export type CanvasNodeColor = keyof typeof NODE_COLORS;
export const CANVAS_NODE_COLORS = Object.keys(NODE_COLORS) as CanvasNodeColor[];
export const CANVAS_NODE_SHAPES = [
  "rectangle",
  "diamond",
  "circle",
  "pill",
  "cylinder",
  "hexagon",
] as const;

export type CanvasNodeShape = (typeof CANVAS_NODE_SHAPES)[number];

export interface CanvasShapeDragPayload {
  shape: CanvasNodeShape;
  width: number;
  height: number;
}

export function isCanvasShapeDragPayload(
  value: unknown
): value is CanvasShapeDragPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.shape === "string" &&
    CANVAS_NODE_SHAPES.includes(payload.shape as CanvasNodeShape) &&
    typeof payload.width === "number" &&
    typeof payload.height === "number"
  );
}

export interface CanvasNodeData extends Record<string, unknown> {
  label: string;
  color: CanvasNodeColor;
  shape: CanvasNodeShape;
}

export type CanvasNode = Node<CanvasNodeData, "canvasNode">;

export interface CanvasEdgeData extends Record<string, unknown> {
  label: string;
}

export type CanvasEdge = Edge<CanvasEdgeData, "canvasEdge">;
