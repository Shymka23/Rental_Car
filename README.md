## RentalCar – Car Rental Frontend

RentalCar is a frontend application for a car rental service.  
The app consumes a ready‑made backend API: [`https://car-rental-api.goit.global`](https://car-rental-api.goit.global/api-docs/).

## Features

- **Home (`/`)**
  - Hero section with main call-to-action and a button to open the catalog.
- **Catalog (`/catalog`)**
  - Loading car cards from the backend (Axios, server-side pagination via “Load more”).
  - Filtering by brand, hourly price, and mileage (API requests with query params).
  - Persisted favorites list using Zustand + `localStorage`.
- **Car Details (`/catalog/[id]`)**
  - Detailed car information: specifications, description, formatted mileage (`5 000 km`), rental price.
  - Booking form with validation (React Hook Form + Zod) and a success toast notification.
- **Favorites (`/favorites`)**
  - List of favorited cars that stays in sync after page reloads.

## Tech Stack

- **Next.js 15 (App Router) + TypeScript**
- **Zustand** – global state (cars list, filters, pagination, favorites)
- **Axios** – HTTP client for backend API
- **Tailwind CSS + shadcn/ui** – styling and UI components

## Getting Started

### Prerequisites

- Node.js 18+  
- npm (bundled with Node.js)

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open `http://localhost:9002` in your browser (the port is configured in `package.json`).

### Production Build

```bash
npm run build
npm start
```

The app is ready to be deployed to platforms like Vercel or Netlify.

## Project Structure (High-Level)

- `src/app` – application routes (home, catalog, car details, favorites) and layout.
- `src/app/components` – feature components (car card, filters, booking form, header, loader, etc.).
- `src/components/ui` – reusable UI primitives from shadcn/ui.
- `src/store` – Zustand store for cars and filters.
- `src/hooks` – custom hooks (favorites, toast, responsive helpers).
- `src/lib` – API layer, shared types and utilities.

## Author

This project was implemented as a test task for a car rental service.  
Author: Yevhen Shymka.

