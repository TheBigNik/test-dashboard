# 📄 Project Architecture & Design Decisions

## 🏗️ System Overview
This dashboard is built using **Next.js 15 (App Router)** and **TypeScript**. The project follows a **Layered Architecture** inspired by Domain-Driven Design (DDD) and SOLID principles. By decoupling the data fetching, business logic, and UI rendering, the application remains maintainable and ready for enterprise-scale growth.



---

## 층 1. Technical Stack
* **Framework:** Next.js 15 (utilizing Server Components for performance).
* **State Management:** Redux Toolkit (for client-side persistence) and URL SearchParams (for filter state).
* **Styling:** Tailwind CSS v4 (variable-first design system).
* **Charts:** Recharts (SVG-based responsive analytics).
* **Theming:** next-themes (with system preference detection).

---

## ⚙️ 2. Architectural Layers

### **A. Presentation Layer (`/app` & `/features`)**
We utilize **React Server Components (RSC)** by default to fetch data on the server. This reduces the JavaScript execution time on the client and improves SEO.
* **Client Components:** Only used where interactivity is required (e.g., `ProductChart`, `ThemeToggle`, and `ProductFilters`).
* **Composition Pattern:** We pass server-fetched data into client components to maintain a "Server-First" architecture.

### **B. Orchestration Layer (`/repositories`)**
The **Repository Pattern** acts as a mediator between the raw data services and the UI.
* **Business Logic:** Since the DummyJSON API has limited server-side sorting for search results, the `ProductRepository` handles manual client-side sorting and data transformation.
* **Abstraction:** The UI never talks directly to the API, ensuring that if the data source changes (e.g., switching to GraphQL or a database), the UI components remain untouched.

### **C. Data Provider Layer (`/services`)**
The **Service Layer** handles raw HTTP communication. It is a thin wrapper around the native `fetch` API, localized for the DummyJSON endpoint. It handles error status codes and provides clean, typed responses.



---

## 💾 3. State Management Strategy

### **Global State (Redux Toolkit)**
We use Redux to manage data that needs to persist across route changes but doesn't belong in the URL:
* **Recently Viewed Products:** Every time a user visits a product detail page, a `ProductViewTracker` (Client Component) dispatches an action to store that product in the Redux store.
* **Persistence:** This allows us to show a "History" or "Recently Viewed" section anywhere in the app instantly.

### **URL-Driven State (Filters & Pagination)**
Filters, sorting, and pagination are stored in the **URL query string**.
* **Why?** This ensures that the user's state is shareable, bookmarkable, and compatible with the browser's back/forward buttons.

---

## 🌓 4. Theming & Accessibility
The UI is built with **Tailwind CSS v4** using a semantic variable approach:
* **Semantic Tokens:** Instead of hardcoding `bg-white`, we use `bg-background` and `bg-card`.
* **Dark Mode:** Variables are redefined in the `.dark` CSS class.
* **Contrast:** High-contrast ratios (Slate 700+ in light mode) were prioritized to meet WCAG accessibility standards.
* **Hydration Safety:** Every theme-dependent component implements a `mounted` check to prevent React hydration mismatches.

---

## 🧪 5. Testing Strategy
* **Unit Testing:** Powered by **Vitest**.
* **Coverage:** We focus on testing the `ProductRepository` logic, specifically the sorting algorithms and pagination math, as these represent the core business logic of the application.

---

## 📂 6. Folder Structure
```text
src/
├── app/              # Next.js Routes, Layouts, and Theme Providers
├── components/       # Shared UI atoms (Buttons, Inputs, Toggles)
├── features/         # Domain-specific logic (Charts, Filter Bars)
├── repositories/     # Data orchestration and business logic
├── services/         # Raw API communication
├── store/            # Redux Slices, Hooks, and Store Config
└── models/           # TypeScript interfaces and Domain types