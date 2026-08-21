"use client";

import { useState } from "react";
import { NodeToolbar, Position } from "@xyflow/react";
import { CANVAS_NODE_COLORS, NODE_COLORS, type CanvasNodeColor } from "@/types/canvas";

interface NodeColorToolbarProps {
  color: CanvasNodeColor;
  isVisible: boolean;
  onColorChange: (color: CanvasNodeColor) => void;
}

export function NodeColorToolbar({ color, isVisible, onColorChange }: NodeColorToolbarProps) {
  const [hoveredColor, setHoveredColor] = useState<CanvasNodeColor | null>(null);

  return (
    <NodeToolbar
      isVisible={isVisible}
      position={Position.Top}
      offset={12}
      className="nodrag nopan flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900/95 p-1.5 shadow-lg"
    >
      {CANVAS_NODE_COLORS.map((colorOption) => {
        const colors = NODE_COLORS[colorOption];
        const isActive = colorOption === color;
        const isHovered = colorOption === hoveredColor;

        return (
          <button
            key={colorOption}
            type="button"
            className="nodrag nopan h-5 w-5 rounded-full border transition-transform hover:scale-110"
            style={{
              backgroundColor: colors.fill,
              borderColor: isActive ? colors.text : "transparent",
              boxShadow: isActive
                ? `0 0 0 2px ${colors.text}`
                : isHovered
                  ? `0 0 7px ${colors.text}`
                  : undefined,
            }}
            onMouseEnter={() => setHoveredColor(colorOption)}
            onMouseLeave={() => setHoveredColor(null)}
            onClick={(event) => {
              event.stopPropagation();
              onColorChange(colorOption);
            }}
            aria-label={`Set node color to ${colorOption}`}
            aria-pressed={isActive}
          />
        );
      })}
    </NodeToolbar>
  );
}
