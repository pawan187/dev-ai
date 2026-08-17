import type { NodeProps } from "@xyflow/react";
import { NODE_COLORS, type CanvasNode } from "@/types/canvas";

export function CanvasNode({ data }: NodeProps<CanvasNode>) {
  const colors = NODE_COLORS[data.color];

  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-xl border border-slate-600 px-3 text-center text-sm font-medium shadow-sm"
      style={{ backgroundColor: colors.fill, color: colors.text }}
    >
      {data.label}
    </div>
  );
}
