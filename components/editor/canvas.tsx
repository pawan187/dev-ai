"use client";

import { useState } from "react";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider, useErrorListener } from "@liveblocks/react/suspense";
import { useLiveblocksFlow } from "@liveblocks/react-flow";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  MarkerType,
  MiniMap,
  ReactFlow,
  type Connection,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CanvasEdge as CanvasEdgeRenderer } from "@/components/editor/canvas-edge";
import { CanvasNode } from "@/components/editor/canvas-node";
import { CanvasNodeEditingProvider } from "@/components/editor/canvas-node-editing-context";
import { CanvasNodeShape } from "@/components/editor/canvas-node-shape";
import { CANVAS_SHAPE_DRAG_TYPE, ShapePanel } from "@/components/editor/shape-panel";
import {
  isCanvasShapeDragPayload,
  type CanvasEdge,
  type CanvasNode as CanvasNodeType,
  type CanvasNodeColor,
  type CanvasShapeDragPayload,
} from "@/types/canvas";

interface CanvasProps {
  roomId: string;
}

interface CanvasConnectionMonitorProps {
  onError: (message: string) => void;
}

function CanvasConnectionMonitor({ onError }: CanvasConnectionMonitorProps) {
  useErrorListener((error) => {
    onError(error.message || "Unable to connect to the collaborative canvas.");
  });

  return null;
}

let nodeCounter = 0;

const nodeTypes = { canvasNode: CanvasNode };
const edgeTypes = { canvasEdge: CanvasEdgeRenderer };
const defaultEdgeOptions = {
  type: "canvasEdge",
  data: { label: "" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "var(--text-faint)" },
  style: { stroke: "var(--text-faint)", strokeLinecap: "round", strokeWidth: 1.5 },
  interactionWidth: 20,
} as const;

interface ShapeDragPreviewProps {
  payload: CanvasShapeDragPayload;
  x: number;
  y: number;
}

function ShapeDragPreview({ payload, x, y }: ShapeDragPreviewProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 opacity-60"
      style={{ left: x + 16, top: y + 16, width: payload.width, height: payload.height }}
      aria-hidden="true"
    >
      <CanvasNodeShape shape={payload.shape} color="neutral" selected={false} />
    </div>
  );
}

function CanvasFlow() {
  const { nodes, edges, onNodesChange, onEdgesChange } =
    useLiveblocksFlow<CanvasNodeType, CanvasEdge>({
      nodes: { initial: [] },
      edges: { initial: [] },
      suspense: true,
    });
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance<CanvasNodeType, CanvasEdge> | null>(null);
  const [dragPreview, setDragPreview] = useState<ShapeDragPreviewProps | null>(null);

  function updateDragPreview(payload: CanvasShapeDragPayload, x: number, y: number) {
    setDragPreview({ payload, x, y });
  }

  function handleShapeDragStart(
    payload: CanvasShapeDragPayload,
    event: React.DragEvent<HTMLButtonElement>
  ) {
    updateDragPreview(payload, event.clientX, event.clientY);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    if (dragPreview) {
      updateDragPreview(dragPreview.payload, event.clientX, event.clientY);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragPreview(null);

    if (!reactFlowInstance) {
      return;
    }

    const rawPayload = event.dataTransfer.getData(CANVAS_SHAPE_DRAG_TYPE);

    if (!rawPayload) {
      return;
    }

    let payload: unknown;

    try {
      payload = JSON.parse(rawPayload);
    } catch {
      return;
    }

    if (!isCanvasShapeDragPayload(payload)) {
      return;
    }

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const id = `${payload.shape}-${Date.now()}-${nodeCounter++}`;

    onNodesChange([
      {
        type: "add",
        item: {
          id,
          type: "canvasNode",
          position,
          width: payload.width,
          height: payload.height,
          data: { label: "", color: "neutral", shape: payload.shape },
        },
      },
    ]);
  }

  function handleNodeLabelChange(nodeId: string, label: string) {
    const node = nodes.find((currentNode) => currentNode.id === nodeId);

    if (!node || node.data.label === label) {
      return;
    }

    onNodesChange([
      {
        type: "replace",
        id: nodeId,
        item: { ...node, data: { ...node.data, label } },
      },
    ]);
  }

  function handleNodeColorChange(nodeId: string, color: CanvasNodeColor) {
    const node = nodes.find((currentNode) => currentNode.id === nodeId);

    if (!node || node.data.color === color) {
      return;
    }

    onNodesChange([
      {
        type: "replace",
        id: nodeId,
        item: { ...node, data: { ...node.data, color } },
      },
    ]);
  }

  function handleEdgeLabelChange(edgeId: string, label: string) {
    const edge = edges.find((currentEdge) => currentEdge.id === edgeId);

    if (!edge || edge.data?.label === label) {
      return;
    }

    onEdgesChange([
      {
        type: "replace",
        id: edgeId,
        item: { ...edge, data: { ...edge.data, label } },
      },
    ]);
  }

  function handleConnect(connection: Connection) {
    onEdgesChange([
      {
        type: "add",
        item: {
          id: `edge-${Date.now()}-${nodeCounter++}`,
          ...connection,
          ...defaultEdgeOptions,
        },
      },
    ]);
  }

  return (
    <>
      <CanvasNodeEditingProvider
        updateLabel={handleNodeLabelChange}
        updateColor={handleNodeColorChange}
        updateEdgeLabel={handleEdgeLabelChange}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onInit={setReactFlowInstance}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          connectionMode={ConnectionMode.Loose}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} />
          <ShapePanel
            onShapeDragStart={handleShapeDragStart}
            onShapeDragEnd={() => setDragPreview(null)}
          />
        </ReactFlow>
      </CanvasNodeEditingProvider>
      {dragPreview && <ShapeDragPreview {...dragPreview} />}
    </>
  );
}

function CanvasLoading() {
  return (
    <div className="flex h-full items-center justify-center bg-slate-950 text-sm text-slate-400">
      Loading collaborative canvas...
    </div>
  );
}

function CanvasConnectionError({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-slate-950 px-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

export function Canvas({ roomId }: CanvasProps) {
  const [connectionError, setConnectionError] = useState<string | null>(null);

  if (connectionError) {
    return <CanvasConnectionError message={connectionError} />;
  }

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={roomId} initialPresence={{ cursor: null, isThinking: false }}>
        <CanvasConnectionMonitor onError={setConnectionError} />
        <ClientSideSuspense fallback={<CanvasLoading />}>
          <CanvasFlow />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
