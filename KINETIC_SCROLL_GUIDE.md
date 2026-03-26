# Ocean Depths - Awwwards-Style Kinetic Scroll Interactions

## Overview
The Ocean Depths project now includes sophisticated Awwwards-style kinetic scroll animations that create an immersive, high-end interactive experience as users navigate through the Sunlight and Midnight zones.

## Key Features Implemented

### 1. Horizontal Text Parallax (Magnetic Text Slide)
- **Component**: `KineticScrollSection.tsx`
- **Effect**: Large background titles (e.g., "SUNLIT WATERS", "THE ABYSS") move horizontally from right to left as the user scrolls
- **Parallax Speed**: Background title moves at 3x the foreground speed, creating depth
- **Range**: Title slides 300px horizontally during section scroll
- **Visual**: Text remains centered with semi-transparent styling (opacity 0.1) to layer behind foreground content

### 2. Text Reveal Animation with Word-Level Stagger
- **Component**: `KineticScrollSection.tsx`
- **Effect**: Description text reveals word-by-word with smooth entrance animation
- **Animation Details**:
  - Each word starts 40px below and invisible
  - Words slide up into position with a fade-in effect
  - Stagger delay: 0.05s between each word (50ms per word)
  - Easing: Custom cubic-bezier [0.25, 0.46, 0.45, 0.94] for smooth motion
  - Duration: 0.6s per word with overlapping timing

### 3. Sticky Container with Position Lock
- **Component**: `KineticScrollSection.tsx`
- **Behavior**: Section maintains viewport presence during scroll
- **Implementation**:
  - Sticky positioning for visual containment
  - Scroll progress calculation relative to section bounds
  - Progress ranges from 0 (top of section) to 1 (bottom of section)
  - Enables all parallax and transform effects to respond to scroll position

### 4. Scroll-Velocity-Based Skew
- **Component**: Custom hook `useScrollVelocity.ts`
- **Effect**: Text and images apply subtle skew transformation based on scroll speed
- **Calculation**:
  - Velocity measured in pixels per millisecond
  - Skew range: 0° to 8° based on scroll velocity
  - Formula: `skew = min(8, velocity * 100)`
  - Creates momentum and fluid motion impression
  - Resets to 0° when scroll stops (150ms debounce)

### 5. Smooth Scroll Behavior
- **CSS**: `globals.css` - `scroll-behavior: smooth`
- **Effect**: All navigation links and anchor scrolls use smooth interpolation
- **Browser**: Native CSS smooth scroll for all navigation interactions
- **UX**: Eliminates jerkiness and creates premium feel

### 6. Visual Polish & Typography
- **Large Bold Text**: Background titles use 9xl font size with 700 weight
- **Letter Spacing**: -0.02em negative letter-spacing for tighter, premium look
- **Glass Effect**: Semi-transparent containers with backdrop blur for depth
- **Accent Circles**: Subtle colored blur orbs (cyan and blue) for atmospheric depth
- **Responsive**: Text scales appropriately from desktop to mobile

## Component Architecture

### New Files Created:
1. **`hooks/useScrollVelocity.ts`**
   - Custom hook detecting scroll velocity and position
   - Returns: velocity, direction, position, isScrolling
   - Passive event listeners for performance

2. **`components/KineticScrollSection.tsx`**
   - Main reusable component for kinetic scroll sections
   - Props: backgroundTitle, description, children, backgroundColor, id
   - Handles all parallax, skew, and text reveal logic
   - Uses Framer Motion for animations

3. **`components/StickyScroll.tsx`**
   - Optional wrapper for section pinning
   - Provides IntersectionObserver-based scroll tracking

### Modified Files:
1. **`package.json`**: Added `framer-motion` dependency
2. **`app/globals.css`**: Added scroll-behavior, skew keyframes, text effects
3. **`components/SunlightSection.tsx`**: Now uses KineticScrollSection
4. **`components/MidnightSection.tsx`**: Now uses KineticScrollSection

## Animation Timing

### Text Reveal Stagger:
- First word appears at scroll entry + 0s
- Second word: + 50ms
- Third word: + 100ms
- And so on...
- Total reveal time for 20-word description: ~1 second of staggered entrance

### Parallax Offset:
- Calculated per scroll frame
- Smooth easing curve prevents jank
- GPU-accelerated with `will-change: transform`

### Skew Effect:
- Applied in real-time based on velocity
- Dampens after scroll stops (150ms delay)
- Max skew 8° prevents extreme distortion

## Performance Optimizations

1. **Passive Event Listeners**: Scroll events don't block rendering
2. **GPU Acceleration**: `transform` and `willChange` CSS properties
3. **Debounced Calculations**: Scroll velocity throttled via timeout
4. **IntersectionObserver**: Efficient viewport detection
5. **Framer Motion**: Optimized rendering with layout effects

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires CSS transforms, backdrop-filter, and smooth scroll support

## Future Enhancements

- Optional Lenis smooth scrolling library for ultra-smooth feel
- Horizontal snap sections with wheel/trackpad hijacking
- Custom scroll progress timeline
- 3D perspective effects on deeper zones
- Mobile-specific reduced motion preferences
