# 🚀 Advanced Product Analytics Dashboard

A professional-grade, high-performance dashboard built with **Next.js 15**, **Redux Toolkit**, and **Tailwind CSS v4**. This project demonstrates a scalable architecture, sophisticated data orchestration, and a premium user experience with full Dark Mode support.



## 🌟 Key Features

- **Next.js 15 App Router:** Leveraging Server Components for optimal performance and SEO.
- **Advanced Data Orchestration:** Custom Repository pattern to handle client-side sorting and data transformation.
- **Real-time Analytics:** Interactive data visualization using Recharts.
- **Redux State Management:** Global state for tracking "Recently Viewed" products across sessions.
- **Tailwind v4 Design System:** Modern, variable-based styling with high-contrast accessibility.
- **Fluid Theming:** Seamless Dark/Light mode toggle with system preference detection.
- **Robust Filtering:** URL-driven search, category filtering, and multi-field sorting.

---

## 🏗️ Architecture at a Glance

The project follows a **Layered Architecture** to ensure clean separation of concerns:

1.  **Presentation Layer:** React Server Components (fetching) + Client Components (interactivity).
2.  **Repository Layer:** Business logic, manual sorting, and data mapping.
3.  **Service Layer:** Raw API communication with DummyJSON.

> **Note:** For a deep dive into the design patterns and technical decisions, please refer to the [ARCHITECTURE.md](./ARCHITECTURE.md) file.

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js:** 18.x or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/test-dashboard.git](https://github.com/your-username/test-dashboard.git)
   cd test-dashboard