"use client";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useState } from "react";

export default function CartSidebar() {
  const { cartItems, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 right-4 z-50 bg-white border border-gray-300 shadow-lg rounded-full p-2 hover:bg-gray-100"
      >
        {isOpen ? (
          <span className="text-xl font-bold text-gray-700">&times;</span>
        ) : (
          <span className="text-xl">🛒</span>
        )}
      </button>

      <div
        className={`fixed top-0 right-0 h-full bg-gray-100 border-l border-gray-300 w-64 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 text-black">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">No items yet.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-3 p-2 border rounded bg-white"
              >
                <Image src={item.src} alt={item.id} width={40} height={40} />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
