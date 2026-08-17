"use client";

import { useState } from "react";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider, useErrorListener } from "@liveblocks/react/suspense";
import { useLiveblocksFlow } from "@liveblocks/react-flow";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  MiniMap,
  ReactFlow,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CanvasNode } from "@/components/editor/canvas-node";
import { CANVAS_SHAPE_DRAG_TYPE, ShapePanel } from "@/components/editor/shape-panel";
import {
  isCanvasShapeDragPayload,
  type CanvasEdge,
  type CanvasNode as CanvasNodeType,
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

function CanvasFlow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useLiveblocksFlow<CanvasNodeType, CanvasEdge>({
      nodes: { initial: [] },
      edges: { initial: [] },
      suspense: true,
    });
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance<CanvasNodeType, CanvasEdge> | null>(null);

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      connectionMode={ConnectionMode.Loose}
      fitView
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} />
      <ShapePanel />
    </ReactFlow>
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
