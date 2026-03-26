# 🌊 Ocean Depths: A Vertical Odyssey

[![Live Demo](https://img.shields.io/badge/Live-Demo-cyan?style=for-the-badge&logo=vercel)](https://ocean-depths-rho.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![GSAP](https://img.shields.io/badge/Animations-GSAP%20%26%20Framer-green?style=for-the-badge)](https://gsap.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Ocean Depths** is an immersive, high-fidelity scrollytelling experience that takes users on a cinematic journey from the ocean's sunlit surface to the hauntingly beautiful darkness of the **Hadal Zone** (11,000 meters). 

Built for the **Frontend Odyssey Hackathon**, this project explores the intersection of creative frontend engineering, fluid physics-based animations, and environmental storytelling.

---

## 🚀 Key Features

* **Dynamic HUD:** A real-time, high-precision **GSAP Depth Meter** that tracks your descent to the millimeter using scroll-progress mapping.
* **Atmospheric Transitions:** 5 distinct oceanic zones (Sunlight, Twilight, Midnight, Abyss, Hadal) with adaptive lighting, color shifts, and species-specific data.
* **Sonar Interface:** A functional Sonar HUD with scan-lines and radar grids that provide a technical "research vessel" atmosphere.
* **Inertial Navigation:** Integrated **Lenis Smooth Scroll** to simulate the "weight" and viscosity of water, providing a premium UX feel.
* **Bioluminescent Visuals:** Custom-coded ambient particles, "God Rays," and reactive deep-sea creatures powered by **Framer Motion**.

---

## 🛠️ Tech Stack

| Category | Tools |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS (Glassmorphism & Dynamic Gradients) |
| **Animation** | GSAP (ScrollTrigger) & Framer Motion |
| **Design** | Figma |
| **Deployment** | Vercel |

---

## 🧪 Technical Highlights

### 1. Synchronized Depth Tracking
The most challenging aspect was synchronizing the **Vertical Progress** with the **UI State**. By leveraging `gsap.ticker` and `ScrollTrigger.onUpdate`, I ensured the depth meter remains frame-perfectly aligned with the visual transitions, even on high-refresh-rate monitors.

### 2. Performance Optimization
To maintain 60FPS during the descent, I utilized **React's `useRef`** for animation-heavy objects to prevent unnecessary re-renders. Component-level conditional rendering ensures that heavy assets only load as the user approaches those specific zones.

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Blessy7-eng/ocean-depths.git

   
2. Install dependencies:
  ```bash
  npm install
   
3. Run the development server:
   Bash
   npm run dev
   
4.Build for production:
  Bash
  npm run build
  
💡 Design Philosophy
"The ocean is a world of isolation and wonder."
The UI was designed to feel like a high-tech research vessel—minimal, data-driven, and visually breathtaking.

Developed by Blessy Waydande for the Frontend Odyssey Challenge 2026.
