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
import { useCart } from "@/context/CartContext";

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
  const { addMultipleToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("savedOutfit");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setDroppedItems(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved outfit:", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) =>
      setPointerPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const handleAddToCart = () => {
    addMultipleToCart(droppedItems);
    setShowPopup(true);
    setPopupMessage("Items added to cart")
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleResetCanvas = () => {
    setDroppedItems([]);
    localStorage.removeItem("savedOutfit");
  };

  const handleSaveOutfit = () => {
    localStorage.setItem("savedOutfit", JSON.stringify(droppedItems));
    setShowPopup(true);
    setPopupMessage("outfit saved successfully")
    setTimeout(() => setShowPopup(false), 2000);
  };

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
    setActiveDragItem({
      id: active.id as string,
      src: data.src,
      width: data.width,
      height: data.height,
    });
  };

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
      const newItem: DroppedItem = {
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
    <div className="h-screen">
      <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-center p-2">
        <h2 className="text-3xl text-black font-semibold">Outfit Canvas</h2>
      </div>
      <div className="flex flex-col sm:flex-row h-[91vh]">
        <div className="flex flex-col gap-5 h-full">
          <Sidebar activeId={activeDragItem?.id || null} />
          <div className="w-full p-2 border-t flex justify-center">
            <button
              onClick={handleResetCanvas}
              className="bg-gray-50 w-full text-black px-4 py-2 rounded shadow"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Canvas + Action Buttons */}
        <div className="w-full flex gap-5 flex-col">
          <Canvas droppedItems={droppedItems} canvasRef={canvasRef} />
          <div className="w-full p-2 border-t flex justify-around">
            <button
              onClick={handleSaveOutfit}
              className="bg-gray-50 text-black px-4 py-2 rounded shadow"
            >
              Save Outfit
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-gray-50 text-black px-4 py-2 rounded shadow"
            >
              Add Canvas to Cart
            </button>
          </div>
        </div>

        {/* Cart */}
        <CartSidebar />

        {/* Popup */}
        {showPopup && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
            {popupMessage}
          </div>
        )}
      </div>

      {/* Drag Preview Overlay */}
      <DragOverlay>
        {activeDragItem && (
          <div
            style={{
              width: activeDragItem.width,
              height: activeDragItem.height,
            }}
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
    </div>
  );
}
