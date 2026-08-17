"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CanvasNodeColor } from "@/types/canvas";

interface CanvasNodeEditingContextValue {
  updateLabel: (nodeId: string, label: string) => void;
  updateColor: (nodeId: string, color: CanvasNodeColor) => void;
  updateEdgeLabel: (edgeId: string, label: string) => void;
}

const CanvasNodeEditingContext = createContext<CanvasNodeEditingContextValue | null>(null);

interface CanvasNodeEditingProviderProps extends CanvasNodeEditingContextValue {
  children: ReactNode;
}

export function CanvasNodeEditingProvider({
  children,
  updateLabel,
  updateColor,
  updateEdgeLabel,
}: CanvasNodeEditingProviderProps) {
  return (
    <CanvasNodeEditingContext.Provider value={{ updateLabel, updateColor, updateEdgeLabel }}>
      {children}
    </CanvasNodeEditingContext.Provider>
  );
}

export function useCanvasNodeEditing() {
  const context = useContext(CanvasNodeEditingContext);

  if (!context) {
    throw new Error("Canvas editing components must be rendered within CanvasNodeEditingProvider.");
  }

  return context;
}
