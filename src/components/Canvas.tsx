"use client";
import { useCart } from "@/context/CartContext";
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useState, type RefObject } from "react";

export interface DroppedItem {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CanvasProps {
  droppedItems: DroppedItem[];
  canvasRef: RefObject<HTMLDivElement | null>;
}

export default function Canvas({ droppedItems, canvasRef }: CanvasProps) {
  const { setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div className="flex-1 bg-gray-200 h-[90vh] p-4">
      <div
        ref={(node) => {
          setNodeRef(node);
          if (node) canvasRef.current = node;
        }}
        className="w-full h-full border-gray-400 bg-white rounded-lg relative overflow-hidden"
      >
        {droppedItems.map((item) => (
          <div
            key={item.id}
            className="absolute bg-white rounded shadow"
            style={{
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height,
            }}
          >
            <Image
              src={item.src}
              alt={item.id}
              width={item.width}
              height={item.height}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
