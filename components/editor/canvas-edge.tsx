import { useEffect, useRef, useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { useCanvasNodeEditing } from "@/components/editor/canvas-node-editing-context";
import type { CanvasEdge } from "@/types/canvas";

export function CanvasEdge({
  id,
  data,
  markerEnd,
  selected,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}: EdgeProps<CanvasEdge>) {
  const { updateEdgeLabel } = useCanvasNodeEditing();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const label = data?.label ?? "";
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 10,
  });
  const isActive = selected || isHovered;

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        interactionWidth={20}
        style={{
          stroke: isActive ? "var(--accent-primary)" : "var(--text-faint)",
          strokeLinecap: "round",
          strokeWidth: 1.5,
          transition: "stroke 150ms ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={(event) => {
          event.stopPropagation();
          setIsEditing(true);
        }}
      />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan absolute pointer-events-all"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          onDoubleClick={(event) => {
            event.stopPropagation();
            setIsEditing(true);
          }}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              value={label}
              onChange={(event) => updateEdgeLabel(id, event.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(event) => {
                if (event.key === "Escape" || event.key === "Enter") {
                  event.preventDefault();
                  event.currentTarget.blur();
                }
              }}
              aria-label="Edge label"
              className="min-w-8 rounded-xl border border-surface-border bg-surface px-2 py-1 text-center text-xs text-copy-primary outline-none focus:border-[var(--accent-primary)]"
              style={{ width: `${Math.max(label.length, 4)}ch` }}
            />
          ) : label ? (
            <button
              type="button"
              className="rounded-xl bg-surface px-2 py-1 text-xs text-copy-secondary shadow-sm"
              onClick={(event) => event.stopPropagation()}
            >
              {label}
            </button>
          ) : null}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
