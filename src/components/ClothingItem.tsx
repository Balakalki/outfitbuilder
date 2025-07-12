"use client";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";

interface ClothingItemProps {
  id: string;
  src: string;
  activeId: string | null;
}

export default function ClothingItem({ id, src, activeId }: ClothingItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      src,
      width: 96,
      height: 96,
    },
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    width: 96,
    height: 96,
    opacity: id === activeId ? 0 : 1,
    pointerEvents: "auto",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-move bg-white p-1 rounded shadow flex items-center justify-center overflow-hidden"
    >
      <Image
        src={src}
        alt={id}
        width={96}
        height={96}
        className="object-contain"
      />
    </div>
  );
}
