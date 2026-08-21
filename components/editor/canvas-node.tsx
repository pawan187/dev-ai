import { useEffect, useState } from "react";
import { Handle, NodeResizer, Position, type NodeProps } from "@xyflow/react";
import { useCanvasNodeEditing } from "@/components/editor/canvas-node-editing-context";
import { CanvasNodeShape } from "@/components/editor/canvas-node-shape";
import { NodeColorToolbar } from "@/components/editor/node-color-toolbar";
import type { CanvasNode } from "@/types/canvas";

export function CanvasNode({ data, id, selected }: NodeProps<CanvasNode>) {
  const { updateLabel, updateColor } = useCanvasNodeEditing();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const handleClassName =
    "canvas-node-handle !h-2.5 !w-2.5 !border-[var(--border-default)] !bg-white !opacity-0 transition-opacity duration-150";

  useEffect(() => {
    if (!isEditing) {
      setLabel(data.label);
    }
  }, [data.label, isEditing]);

  function handleLabelChange(nextLabel: string) {
    setLabel(nextLabel);
    updateLabel(id, nextLabel);
  }

  return (
    <>
      <NodeColorToolbar
        color={data.color}
        isVisible={selected}
        onColorChange={(color) => updateColor(id, color)}
      />
      <NodeResizer
        isVisible={selected}
        minWidth={80}
        minHeight={50}
        color="var(--accent-primary)"
        handleClassName="!z-10 !h-2.5 !w-2.5 !rounded-sm !border !border-slate-300 !bg-slate-700"
        lineClassName="!z-10 !border-slate-500"
      />
      <CanvasNodeShape shape={data.shape} color={data.color} selected={selected}>
        {isEditing ? (
          <textarea
            autoFocus
            value={label}
            rows={1}
            onChange={(event) => handleLabelChange(event.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                event.currentTarget.blur();
              }
            }}
            placeholder="Label"
            aria-label="Node label"
            className="nodrag nowheel w-full resize-none overflow-hidden bg-transparent text-center text-sm font-medium outline-none placeholder:text-current/60"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            onDoubleClick={(event) => {
              event.stopPropagation();
              setIsEditing(true);
            }}
          >
            {label || <span className="text-current/60">Label</span>}
          </div>
        )}
      </CanvasNodeShape>
      <Handle id="top" type="source" position={Position.Top} className={handleClassName} />
      <Handle id="right" type="source" position={Position.Right} className={handleClassName} />
      <Handle id="bottom" type="source" position={Position.Bottom} className={handleClassName} />
      <Handle id="left" type="source" position={Position.Left} className={handleClassName} />
    </>
  );
}
