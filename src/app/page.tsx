"use client";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Canvas, { DroppedItem } from "../components/Canvas";
import Image from "next/image";
import CartSidebar from "@/components/CartSidebar";

export default function Home() {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<{
    id: string;
    src: string;
    width: number;
    height: number;
  } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => setPointerPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active, activatorEvent } = event;
    const data = active.data.current;
    if (!data || !(activatorEvent instanceof PointerEvent)) return;

    const rect = (activatorEvent.target as HTMLElement).getBoundingClientRect();
    const offsetX = activatorEvent.clientX - rect.left;
    const offsetY = activatorEvent.clientY - rect.top;

    const scaleX = data.width / rect.width;
    const scaleY = data.height / rect.height;

    setDragOffset({ x: offsetX * scaleX, y: offsetY * scaleY });
    setActiveDragItem({ id: active.id as string, src: data.src, width: data.width, height: data.height });
  };

  useEffect(() => {
  console.log("Updated dropped items:", droppedItems);
}, [droppedItems]);


  const handleDragEnd = (event: DragEndEvent) => {
  const data = event.active.data.current;

  if (!data || !canvasRef.current) {
    setActiveDragItem(null);
    return;
  }

  const rect = canvasRef.current.getBoundingClientRect();
  const x = pointerPosition.x - rect.left - dragOffset.x;
  const y = pointerPosition.y - rect.top - dragOffset.y;

  if (event.over?.id === "canvas") {
    const newItem = {
      id: crypto.randomUUID(),
      src: data.src,
      x,
      y,
      width: data.width,
      height: data.height,
    };

    setDroppedItems((prev) => [...prev, newItem]);
  }

  setActiveDragItem(null);
};


  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col shrink sm:flex-row min-h-screen">
        <Sidebar activeId={activeDragItem?.id || null} />
        <Canvas droppedItems={droppedItems} canvasRef={canvasRef} />
        <CartSidebar />
      </div>

      <DragOverlay>
        {activeDragItem && (
          <div
            style={{ width: activeDragItem.width, height: activeDragItem.height }}
            className="pointer-events-none bg-white rounded shadow"
          >
            <Image
              src={activeDragItem.src}
              alt={activeDragItem.id}
              width={activeDragItem.width}
              height={activeDragItem.height}
              className="object-contain"
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
