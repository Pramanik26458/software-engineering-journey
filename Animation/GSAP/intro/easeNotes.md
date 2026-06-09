# GSAP Mastery Notes — Day 2

## The Core Physics & Event Engine 🚀

---

# Table of Contents

1. Motion & Duration
2. Easing Fundamentals
3. Understanding `.in`, `.out`, `.inOut`
4. Power Eases
5. Back Eases
6. Bounce Eases
7. Default GSAP Ease
8. Repeat & Yoyo
9. Callback Functions
10. Callback Execution Order
11. Performance Notes
12. Common Patterns
13. Day 2 Summary

---

# 1. Motion & Duration

## What is Motion?

Motion is not simply movement.

Motion is the emotional signature of an animation.

The way an object moves communicates meaning to users.

Examples:

### Fast Abrupt Motion

```text
Aggressive
Digital
Energetic
```

### Smooth Decelerating Motion

```text
Premium
Elegant
Natural
```

Modern UI design relies heavily on motion to communicate feedback and intent.

---

## What is Duration?

Duration controls how long an animation takes to complete.

In GSAP, duration is always expressed as a number representing seconds.

```js
gsap.to(".box", {
  x: 300,
  duration: 1.5
});
```

The animation completes in:

```text
1.5 seconds
```

### Important

Correct:

```js
duration: 2
```

Incorrect:

```js
duration: "2s"
duration: 2000
```

GSAP expects seconds.

---

# 2. Easing Fundamentals

## What is Easing?

Easing controls how speed changes throughout an animation.

Without easing:

```text
Constant Speed
```

With easing:

```text
Slow
↓
Fast
↓
Slow
```

Easing makes animations feel realistic because objects in the real world rarely move at a constant speed.

---

## Why Easing Exists

Real-world objects experience:

* Friction
* Gravity
* Momentum
* Resistance

Linear movement ignores all of these.

As a result:

```text
Linear Motion
=
Robotic Motion
```

---

# 3. Understanding .in, .out, and .inOut

Every easing family can be modified using:

```text
.in
.out
.inOut
```

---

## .out

### Behavior

```text
Fast Start
↓
Slow Stop
```

### Feeling

```text
Responsive
Smooth
Premium
```

### Best For

```text
UI Entrances
Navigation
Cards
Buttons
Menus
```

Example:

```js
ease: "power2.out"
```

Visual:

```text
🚀====================>🏃======>🚶
```

---

## .in

### Behavior

```text
Slow Start
↓
Fast Finish
```

### Feeling

```text
Heavy
Intentional
Dramatic
```

### Best For

```text
UI Exits
Dismissals
Transitions
```

Example:

```js
ease: "power2.in"
```

Visual:

```text
🚶======>🏃====================>🚀
```

---

## .inOut

### Behavior

```text
Slow Start
↓
Fast Middle
↓
Slow End
```

### Feeling

```text
Balanced
Mechanical
Natural
```

### Best For

```text
Loops
Background Motion
Continuous Movement
```

Example:

```js
ease: "power2.inOut"
```

Visual:

```text
🚶=====>🚀====================>🚶
```

---

# 4. Power Eases

Power eases determine how dramatic acceleration and deceleration become.

---

## power1

```js
ease: "power1.out"
```

### Characteristics

```text
Subtle
Near Linear
Gentle
```

---

## power2

```js
ease: "power2.out"
```

### Characteristics

```text
Professional
Responsive
Most Common
```

### Recommended Default

If unsure:

```js
ease: "power2.out"
```

---

## power3

```js
ease: "power3.out"
```

### Characteristics

```text
Dramatic
Strong Deceleration
Elegant
```

---

## power4

```js
ease: "power4.out"
```

### Characteristics

```text
Luxury Feel
Very Smooth Stop
Apple-Like Motion
```

Example:

```js
gsap.to(".box", {
  x: 300,
  duration: 1.2,
  ease: "power4.out"
});
```

---

# 5. Back Eases

Back easing introduces overshoot.

The animation intentionally passes its destination before returning.

---

## back.in

### Behavior

```text
Moves Backward
↓
Accelerates Forward
```

Example:

```js
ease: "back.in"
```

Visual:

```text
<---
    \
     ------------>
```

---

## back.out

### Behavior

```text
Move Forward
↓
Overshoot
↓
Return
```

Example:

```js
ease: "back.out"
```

Visual:

```text
----------->----->
              <---
```

---

## back.inOut

### Behavior

```text
Pull Back
↓
Move
↓
Overshoot
↓
Return
```

Example:

```js
ease: "back.inOut"
```

---

## Custom Overshoot

```js
ease: "back.out(1.7)"
```

Default:

```text
1.7
```

Higher values create larger overshoots.

---

# 6. Bounce Eases

Bounce simulates collision and gravity.

---

## bounce.in

Bounce occurs at the beginning.

```js
ease: "bounce.in"
```

---

## bounce.out

Bounce occurs at the end.

```js
ease: "bounce.out"
```

Example:

```js
gsap.to(".box", {
  x: 300,
  ease: "bounce.out"
});
```

Visual:

```text
Move
↓
Bounce
↓
Settle
```

---

## bounce.inOut

Bounce occurs at both ends.

```js
ease: "bounce.inOut"
```

Visual:

```text
Bounce
↓
Move
↓
Bounce
```

---

# 7. Default GSAP Ease

Many developers do not realize GSAP already applies easing.

This:

```js
gsap.to(".box", {
  x: 300
});
```

does not feel linear.

GSAP automatically applies a smooth ease by default.

For true linear motion:

```js
gsap.to(".box", {
  x: 300,
  ease: "none"
});
```

---

# 8. Repeat & Yoyo

## Repeat

Repeat determines how many additional cycles occur.

Formula:

```text
Total Runs = 1 + repeat
```

Example:

```js
repeat: 2
```

Results:

```text
Run 1
Run 2
Run 3
```

Total:

```text
3 Runs
```

---

## Infinite Repeat

```js
repeat: -1
```

Meaning:

```text
Infinite Loop
```

---

## Yoyo

Yoyo reverses direction after every cycle.

```js
gsap.to(".box", {
  x: 300,
  repeat: -1,
  yoyo: true
});
```

Visual:

```text
Forward
↓
Backward
↓
Forward
↓
Backward
```

---

## Important Rule

```text
yoyo does nothing without repeat
```

Incorrect:

```js
yoyo: true
```

Correct:

```js
repeat: 1,
yoyo: true
```

---

# 9. Callback Functions

Callbacks are event hooks built into animations.

They allow JavaScript code to execute during different stages of the animation lifecycle.

---

## onStart

Runs when the animation begins.

```js
onStart: () => {
  console.log("Started");
}
```

---

## onUpdate

Runs every rendered frame.

```js
onUpdate: () => {
  console.log("Updating");
}
```

---

## onComplete

Runs when animation finishes.

```js
onComplete: () => {
  console.log("Completed");
}
```

---

## onRepeat

Runs after each repeat cycle.

```js
onRepeat: () => {
  console.log("Repeated");
}
```

---

## onInterrupt

Runs if the animation is stopped before completion.

```js
onInterrupt: () => {
  console.log("Interrupted");
}
```

---

## onPause

Runs when paused.

```js
onPause: () => {
  console.log("Paused");
}
```

---

## onResume

Runs when resumed.

```js
onResume: () => {
  console.log("Resumed");
}
```

---

## onReverseComplete

Runs when a reversed animation returns to its starting state.

```js
onReverseComplete: () => {
  console.log("Returned");
}
```

---

# 10. Callback Execution Order

Typical animation lifecycle:

```text
onStart
↓
onUpdate
↓
onUpdate
↓
onUpdate
↓
onRepeat
↓
onUpdate
↓
onComplete
```

Understanding this flow makes debugging much easier.

---

# 11. Performance Notes

## Be Careful with onUpdate

```js
onUpdate: () => {
  console.log("running");
}
```

This can run:

```text
60 Times Per Second
```

or

```text
120 Times Per Second
```

on high refresh rate displays.

Use it wisely.

---

# 12. Common Production Patterns

## Premium Entrance

```js
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});
```

---

## Luxury Landing Page Motion

```js
gsap.to(".hero", {
  x: 300,
  duration: 1.2,
  ease: "power4.out"
});
```

---

## Infinite Floating Effect

```js
gsap.to(".icon", {
  y: -20,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});
```

---

## Playful Button

```js
gsap.to(".button", {
  scale: 1.1,
  duration: 0.4,
  ease: "back.out"
});
```

---

# 13. Day 2 Summary

## Concepts Mastered

✅ Motion

✅ Duration

✅ Easing

✅ `.in`

✅ `.out`

✅ `.inOut`

✅ Power Eases

✅ Back Eases

✅ Bounce Eases

✅ Default GSAP Ease

✅ Repeat

✅ Yoyo

✅ Callback Functions

✅ Callback Lifecycle

✅ Performance Awareness

---

## Golden Rules

```text
UI Entrance
=
power2.out

UI Exit
=
power2.in

Looping Motion
=
power2.inOut

Infinite Loop
=
repeat:-1

Forward + Reverse
=
repeat + yoyo
```

### Day 2 Status

```text
GSAP Fundamentals
████████████████████ 100%
```

Next Topic:

```text
Day 3
↓
GSAP Timeline
↓
Stagger
↓
Timeline Position Parameters
```
