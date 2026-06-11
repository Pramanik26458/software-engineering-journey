# GSAP Timeline & ScrollTrigger - Today's Learning Notes

## What is a Timeline?

A Timeline in GSAP is used to organize multiple animations into a sequence. Instead of manually adding delays to every animation, you add animations to a timeline and GSAP manages the order automatically.

### Without Timeline

```javascript
gsap.to(".box1", {
  x: 200,
  duration: 1
});

gsap.to(".box2", {
  x: 200,
  duration: 1,
  delay: 1
});
```

Problem:

* Difficult to manage
* Delays become messy in large projects
* Hard to maintain

### With Timeline

```javascript
const tl = gsap.timeline();

tl.to(".box1", {
  x: 200,
  duration: 1
});

tl.to(".box2", {
  x: 200,
  duration: 1
});
```

Benefits:

* Cleaner code
* Easier maintenance
* Better control over animations

---

# Timeline Methods

## play()

Starts or continues the timeline.

```javascript
tl.play();
```

---

## pause()

Stops the timeline at its current position.

```javascript
tl.pause();
```

---

## resume()

Continues a paused timeline.

```javascript
tl.resume();
```

---

## reverse()

Plays the timeline backward.

```javascript
tl.reverse();
```

Example:

* Button hover in → animation plays
* Button hover out → animation reverses

---

## restart()

Starts the timeline from the beginning.

```javascript
tl.restart();
```

---

## seek()

Moves timeline to a specific time.

```javascript
tl.seek(2);
```

Meaning:

* Jump directly to the 2-second mark

---

# Position Parameters

Position parameters control when an animation starts relative to other animations.

---

## "<" (Start Together)

```javascript
tl.to(".box1", {
  x: 100
});

tl.to(".box2", {
  y: 100
}, "<");
```

Meaning:

* box1 and box2 start at the same time.

---

## ">" (Start After Previous)

```javascript
tl.to(".box1", {
  x: 100
});

tl.to(".box2", {
  y: 100
}, ">");
```

Meaning:

* box2 starts after box1 finishes.

---

## "+=1"

```javascript
tl.to(".box2", {
  y: 100
}, "+=1");
```

Meaning:

* Wait 1 second after previous animation ends.

---

## "-=0.5"

```javascript
tl.to(".box2", {
  y: 100
}, "-=0.5");
```

Meaning:

* Start 0.5 seconds before previous animation ends.

---

# ScrollTrigger

ScrollTrigger allows animations to respond to page scrolling.

Basic Example:

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box"
  }
});
```

---

# trigger

Determines which element controls the ScrollTrigger.

```javascript
scrollTrigger: {
  trigger: ".box"
}
```

Meaning:

* The position of `.box` controls the animation.

---

# start

Defines when the animation begins.

```javascript
start: "top 30%"
```

Meaning:

Element Top → Viewport 30%

Visual:

```text
Viewport

30%  ← Animation Starts
|
|
|
|
Element Top Reaches Here
```

---

# end

Defines when the animation finishes.

```javascript
end: "top 10%"
```

Meaning:

Element Top → Viewport 10%

Visual:

```text
Viewport

10% ← Animation Ends

30% ← Animation Starts
```

The animation progress occurs between start and end.

---

# markers

Shows visual debugging markers.

```javascript
markers: true
```

GSAP displays:

* Start Marker
* End Marker
* Trigger Position

Always use markers while learning.

---

# scrub

The most important concept learned today.

## Without scrub

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top 30%"
}
```

Behavior:

* Animation starts at start point.
* Plays automatically.
* Scrolling does not control progress.

---

## With scrub

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top 30%",
  end: "top 10%",
  scrub: true
}
```

Behavior:

* Scroll controls animation progress.
* Scroll down → animation moves forward.
* Scroll up → animation moves backward.

Think of your scrollbar as a video timeline.

---

## scrub: true

```javascript
scrub: true
```

Animation follows scrolling exactly.

---

## scrub: 2

```javascript
scrub: 2
```

Meaning:

* Animation takes about 2 seconds to catch up with scroll position.
* Creates a smoother effect.

Example:

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top 30%",
  end: "top 10%",
  scrub: 2
}
```

---

# pin

Another major concept learned today.

## What is pin?

Pin keeps an element fixed on the screen while the page continues scrolling.

```javascript
pin: true
```

---

## Example

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top 30%",
    end: "top 10%",
    scrub: true,
    pin: true
  }
});
```

---

## How pin Works

Step 1:

* Element reaches start point.

Step 2:

* Element becomes fixed.

Step 3:

* User continues scrolling.

Step 4:

* Animation progresses.

Step 5:

* End point reached.

Step 6:

* Element is released.

---

# Real Meaning of Your Code

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top 30%",
  end: "top 10%",
  scrub: 2,
  pin: true
}
```

Explanation:

1. `.box` controls the trigger.
2. Animation starts when the box's top reaches 30% of the viewport.
3. Animation ends when the box's top reaches 10% of the viewport.
4. Animation progress is linked to scrolling.
5. A 2-second smoothing effect is applied.
6. The box remains pinned during the animation.
7. Once the end point is reached, the box is released.

---

# Interview Revision

### What is Timeline?

A GSAP feature used to sequence and control multiple animations.

### What is ScrollTrigger?

A GSAP plugin that connects animations to scrolling.

### What is start?

Defines when the animation begins.

### What is end?

Defines when the animation finishes.

### What is scrub?

Links animation progress to scroll progress.

### What is scrub: 2?

Adds 2 seconds of smoothing while following the scroll.

### What is pin?

Keeps an element fixed during a specified scroll range.

### Why use markers?

To visually debug start and end positions.
