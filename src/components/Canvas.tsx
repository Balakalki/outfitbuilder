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
  const { addMultipleToCart } = useCart();

  const [showPopup, setShowPopup] = useState(false);

const handleAddToCart = () => {
  addMultipleToCart(droppedItems);
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 2000);
};


  return (
    <div className="flex-1 bg-gray-200 min-h-screen p-4">
      <h2 className="text-xl text-black font-semibold mb-4">Outfit Canvas</h2>
      <div
        ref={(node) => {
          setNodeRef(node);
          if (node) canvasRef.current = node;
        }}
        className="w-full h-[80vh] border-gray-400 bg-white relative overflow-hidden"
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
      <div className="w-full p-2 border-t bg-gray-50 flex justify-center">
    <button
      onClick={handleAddToCart}
      className="bg-green-600 text-white px-4 py-2 rounded shadow cursor-pointer"
    >
      Add Canvas to Cart
    </button>
    {showPopup && (
  <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
    Items added to cart!
  </div>
)}

  </div>
    </div>
  );
}
