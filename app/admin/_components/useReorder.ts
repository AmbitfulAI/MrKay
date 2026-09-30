"use client";

import { useState } from "react";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";

interface Reorderable {
  _id: string;
}

function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const copy = array.slice();
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
}

export function useReorder<T extends Reorderable>(items: T[], reorderEndpoint: string, queryKey: QueryKey) {
  const queryClient = useQueryClient();
  const [localItems, setLocalItems] = useState<T[]>(items);
  const [syncedFrom, setSyncedFrom] = useState<T[]>(items);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  if (items !== syncedFrom) {
    setSyncedFrom(items);
    setLocalItems(items);
  }

  async function commitOrder(reordered: T[]) {
    setLocalItems(reordered);
    await fetch(reorderEndpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: reordered.map((item, index) => ({ id: item._id, order: index + 1 })) }),
    });
    queryClient.invalidateQueries({ queryKey });
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

    commitOrder(arrayMove(localItems, from, to));
  }

  function onDragEnd() {
    setDraggedId(null);
    setOverId(null);
  }

  return { items: localItems, draggedId, overId, onDragStart, onDragOverRow, onDrop, onDragEnd };
}
