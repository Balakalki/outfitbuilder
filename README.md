# Outfit Builder - Next.js Drag & Drop Assignment

This is a **web-based outfit design tool** built with **Next.js** and **@dnd-kit/core**, where users can drag clothing icons onto a canvas and visually create outfit combinations. Users can then **add selected items to a cart**, view the cart in a toggleable sidebar, and remove items if needed.

---

##  Features

- **Drag-and-Drop Clothing Items**
  - Drag icons from the sidebar and drop them on the canvas.
  - Precise drop placement using pointer tracking and offset correction.

- **Visual Canvas for Outfits**
  - Items retain their position, size, and style.
  - Layered display of items with absolute positioning.

- **Add to Cart Button**
  - Clicking "Add to Cart" stores all items currently in the canvas.
  - Cart items are displayed in a right-side floating panel.

- **Floating Cart Toggle**
  - Floating 🛒 icon toggles the cart sidebar.
  - When open, shows cart items with remove options.

- **Remove Items from Cart**
  - Each item in the cart can be removed individually.

- **UUID-based Unique Items**
  - Uses `crypto.randomUUID()` to generate unique keys for dropped/cart items.

- **Responsive UI**
  - Works well on desktop and mobile screens.
  - Built with Tailwind CSS for utility-first responsive styling.

---

## Folder Structure

```
.
├── app/
│   ├── page.tsx               # Home component with drag/drop logic
│   └── layout.tsx             # App layout wrapper
├── components/
│   ├── Sidebar.tsx            # Clothing category icons (drag sources)
│   ├── Canvas.tsx             # Drop zone for building outfits
│   ├── ClothingItem.tsx       # Draggable item logic
│   └── CartSidebar.tsx        # Right sidebar with cart
├── context/
│   └── CartContext.tsx        # Global cart state using React Context
├── public/
│   └── [category]/*.png       # Clothing icons
├── utils/
│   └── ClothingItems.ts       # Defines clothing categories and images
├── styles/
│   └── globals.css            # Tailwind CSS entry
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+)

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Screenshots

![alt text](<Screenshot 2025-07-12 163853.png>) ![alt text](<Screenshot 2025-07-12 163826.png>) ![alt text](<Screenshot 2025-07-12 163606.png>)

---

## Technologies Used

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@dnd-kit/core](https://docs.dndkit.com/) for drag & drop logic

---