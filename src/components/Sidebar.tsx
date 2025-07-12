"use client"
import ClothingItem from "./ClothingItem";
import { clothingItems } from "../utils/ClothingItems";

export default function Sidebar({ activeId }: { activeId: string | null }) {
  return (
    <div className="h-full w-full sm:w-80 bg-gray-50 text-black p-4 overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Clothing Icons</h1>

      {Object.entries(clothingItems).map(([category, files]) => (
        <div key={category} className="mb-6">
          <h2 className="text-lg capitalize font-semibold mb-2">{category}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-3">
            {files.map((filename) => {
              const id = `${category}-${filename}`;
              const src = `/${category}/${filename}`;
              return (
                <ClothingItem
                  key={id}
                  id={id}
                  src={src}
                  activeId={activeId}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
