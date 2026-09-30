"use client";

import { useState } from "react";

interface Reorderable {
  _id: string;
}

const EMPTY: never[] = [];

function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const copy = array.slice();
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
}

export function useReorder<T extends Reorderable>(items: T[] | undefined, onReorder: (items: T[]) => void) {
  const safeItems = items ?? EMPTY;
  const [localItems, setLocalItems] = useState<T[]>(safeItems);
  const [syncedFrom, setSyncedFrom] = useState<T[]>(safeItems);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  if (safeItems !== syncedFrom) {
    setSyncedFrom(safeItems);
    setLocalItems(safeItems);
  }

  function onDragStart(id: string) {
    setDraggedId(id);
  }

  function onDragOverRow(id: string) {
    if (id !== overId) setOverId(id);
  }

  function onDrop(targetId: string) {
    const sourceId = draggedId;
    setDraggedId(null);
    setOverId(null);
    if (!sourceId || sourceId === targetId) return;

    const from = localItems.findIndex((i) => i._id === sourceId);
    const to = localItems.findIndex((i) => i._id === targetId);
    if (from === -1 || to === -1) return;

    const reordered = arrayMove(localItems, from, to);
    setLocalItems(reordered);
    onReorder(reordered);
  }

  function onDragEnd() {
    setDraggedId(null);
    setOverId(null);
  }

  return { items: localItems, draggedId, overId, onDragStart, onDragOverRow, onDrop, onDragEnd };
}
