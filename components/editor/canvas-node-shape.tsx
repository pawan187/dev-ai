import type { ReactNode } from "react";
import { NODE_COLORS, type CanvasNodeColor, type CanvasNodeShape } from "@/types/canvas";

interface CanvasNodeShapeProps {
  shape: CanvasNodeShape;
  color: CanvasNodeColor;
  selected: boolean;
  children?: ReactNode;
}

interface SvgShapeProps {
  shape: Extract<CanvasNodeShape, "diamond" | "hexagon" | "cylinder">;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

function SvgShape({ shape, fill, stroke, strokeWidth }: SvgShapeProps) {
  if (shape === "diamond") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,1 99,50 50,99 1,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
      </svg>
    );
  }

  if (shape === "hexagon") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="25,1 75,1 99,50 75,99 25,99 1,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
      </svg>
    );
  }

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M1 16C1 7 23 1 50 1S99 7 99 16V84C99 93 77 99 50 99S1 93 1 84V16Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
      <path d="M1 16C1 25 23 31 50 31S99 25 99 16" fill="none" stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function CanvasNodeShape({ shape, color, selected, children }: CanvasNodeShapeProps) {
  const colors = NODE_COLORS[color];
  const borderColor = selected ? "var(--accent-primary)" : "transparent";
  const isSvgShape = shape === "diamond" || shape === "hexagon" || shape === "cylinder";
  const cssShapeClass = shape === "pill" ? "rounded-full" : shape === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <div className="relative h-full w-full" style={{ color: colors.text }}>
      {isSvgShape ? (
        <SvgShape
          shape={shape}
          fill={colors.fill}
          stroke={borderColor}
          strokeWidth={selected ? 2.25 : 1.25}
        />
      ) : (
        <div
          className={`absolute inset-0 border ${cssShapeClass}`}
          style={{ backgroundColor: colors.fill, borderColor }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center px-3 text-center text-sm font-medium">
        {children}
      </div>
    </div>
  );
}
