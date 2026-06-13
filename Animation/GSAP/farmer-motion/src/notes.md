# Motion for React Documentation

> Modern animation library for React.

---

# Table of Contents

1. Introduction
2. Installation
3. Motion Components
4. Basic Animations
5. Transitions
6. Gestures
7. Scroll Animations
8. Variants
9. AnimatePresence
10. Layout Animations
11. Best Practices
12. Common Patterns
13. Interview Questions
14. Cheat Sheet

---

# Introduction

Motion is a production-ready animation library for React.

It provides:

* Declarative animations
* Gesture animations
* Scroll animations
* Layout animations
* Enter/Exit animations
* Shared element transitions

---

# Installation

## Install

```bash
npm install motion
```

## Import

```jsx
import { motion } from "motion/react";
```

For exit animations:

```jsx
import { motion, AnimatePresence } from "motion/react";
```

---

# Motion Components

Every HTML element can become animated.

## Div

```jsx
<motion.div />
```

## Button

```jsx
<motion.button />
```

## Image

```jsx
<motion.img />
```

## Span

```jsx
<motion.span />
```

---

# Basic Animations

## animate

Animates an element to a target state.

```jsx
<motion.div
  animate={{
    x: 300
  }}
/>
```

---

## Multiple Properties

```jsx
<motion.div
  animate={{
    x: 300,
    rotate: 360,
    scale: 1.5,
    opacity: 1
  }}
/>
```

---

# Initial State

Define where animation starts.

```jsx
<motion.div
  initial={{
    opacity: 0,
    x: -100
  }}
  animate={{
    opacity: 1,
    x: 0
  }}
/>
```

---

# Transition

Controls timing.

```jsx
<motion.div
  animate={{
    x: 300
  }}
  transition={{
    duration: 1
  }}
/>
```

---

## Delay

```jsx
transition={{
  delay: 1
}}
```

---

## Repeat

```jsx
transition={{
  repeat: Infinity
}}
```

---

## Repeat Type

```jsx
transition={{
  repeat: Infinity,
  repeatType: "reverse"
}}
```

---

# Easing

```jsx
transition={{
  ease: "easeIn"
}}
```

Available:

```text
easeIn
easeOut
easeInOut
linear
circIn
circOut
backIn
backOut
```

---

# Spring Animations

Most common animation type.

```jsx
<motion.div
  animate={{
    x: 300
  }}
  transition={{
    type: "spring"
  }}
/>
```

---

## Stiffness

```jsx
transition={{
  type: "spring",
  stiffness: 200
}}
```

---

## Damping

```jsx
transition={{
  type: "spring",
  damping: 20
}}
```

---

# Gestures

## Hover

```jsx
<motion.div
  whileHover={{
    scale: 1.2
  }}
/>
```

---

## Tap

```jsx
<motion.div
  whileTap={{
    scale: 0.8
  }}
/>
```

---

## Focus

```jsx
<motion.input
  whileFocus={{
    scale: 1.1
  }}
/>
```

---

## Drag

```jsx
<motion.div drag />
```

---

## Drag X

```jsx
<motion.div drag="x" />
```

---

## Drag Y

```jsx
<motion.div drag="y" />
```

---

# Drag Constraints

```jsx
<motion.div
  drag
  dragConstraints={{
    top: -100,
    left: -100,
    right: 100,
    bottom: 100
  }}
/>
```

---

# Scroll Animations

## whileInView

Animates when visible.

```jsx
<motion.div
  initial={{
    opacity: 0
  }}
  whileInView={{
    opacity: 1
  }}
/>
```

---

## viewport

### Animate Once

```jsx
viewport={{
  once: true
}}
```

### Animate Every Time

```jsx
viewport={{
  once: false
}}
```

---

## amount

```jsx
viewport={{
  amount: 0.5
}}
```

Animation starts when 50% visible.

---

# Variants

Variants help manage complex animations.

---

## Create Variant

```jsx
const boxVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}
```

---

## Use Variant

```jsx
<motion.div
  variants={boxVariants}
  initial="hidden"
  animate="visible"
/>
```

---

# Parent Child Variants

## Parent

```jsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}
```

---

## Child

```jsx
const childVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0
  }
}
```

---

# Stagger Animation

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={childVariants}/>
  <motion.div variants={childVariants}/>
  <motion.div variants={childVariants}/>
</motion.div>
```

---

# AnimatePresence

Used for exit animations.

---

## Import

```jsx
import {
  motion,
  AnimatePresence
} from "motion/react";
```

---

## Example

```jsx
<AnimatePresence>
  {show && (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
    />
  )}
</AnimatePresence>
```

---

# Layout Animations

Automatically animate layout changes.

```jsx
<motion.div layout />
```

---

## Shared Layout

```jsx
<motion.div
  layoutId="card"
/>
```

Useful for:

* Modal transitions
* Gallery transitions
* Shared element animations

---

# Keyframe Animations

```jsx
<motion.div
  animate={{
    x: [0, 100, 0],
    rotate: [0, 180, 360]
  }}
/>
```

---

# Common UI Patterns

## Button Hover

```jsx
<motion.button
  whileHover={{
    scale: 1.05
  }}
  whileTap={{
    scale: 0.95
  }}
>
  Button
</motion.button>
```

---

## Modal

```jsx
<motion.div
  initial={{
    opacity: 0,
    scale: 0.8
  }}
  animate={{
    opacity: 1,
    scale: 1
  }}
  exit={{
    opacity: 0,
    scale: 0.8
  }}
/>
```

---

## Sidebar

```jsx
initial={{ x: "-100%" }}
animate={{ x: 0 }}
exit={{ x: "-100%" }}
```

---

# Best Practices

## Use Variants

Good:

```jsx
variants={cardVariants}
```

Avoid:

```jsx
animate={{}}
animate={{}}
animate={{}}
```

Repeated everywhere.

---

## Use Spring

For UI interactions.

```jsx
transition={{
  type: "spring"
}}
```

---

## Use AnimatePresence

For:

* Modals
* Menus
* Drawers
* Notifications

---

# Common Mistakes

❌ Forgetting AnimatePresence

❌ Typo in variants

```jsx
varients
```

Correct:

```jsx
variants
```

❌ Using

```jsx
initial={{ hidden }}
```

Correct:

```jsx
initial="hidden"
```

---

# Interview Questions

## What is Motion?

React animation library.

---

## Difference Between animate and whileHover?

animate → Runs automatically

whileHover → Runs on hover

---

## What are Variants?

Reusable animation states.

---

## Why AnimatePresence?

To animate components when they leave the DOM.

---

## What is layout?

Automatic layout animation.

---

# Cheat Sheet

```jsx
animate={{}}
initial={{}}
transition={{}}
whileHover={{}}
whileTap={{}}
whileInView={{}}

variants={{}}

AnimatePresence

layout

layoutId

drag

dragConstraints

viewport
```
