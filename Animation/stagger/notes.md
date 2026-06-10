# GSAP Mastery Notes — Day 3 🚀

## Stagger, Timeline & Animation Sequencing

---

# Table of Contents

1. Stagger
2. Timeline
3. Timeline Chaining
4. Position Parameters
5. Labels
6. Building Loader Animations
7. Hero Reveal Animations
8. Best Practices
9. Day 3 Summary

---

# 1. Stagger

## What is Stagger?

Stagger is a way to distribute animation timing across multiple elements automatically.

Without stagger:

```js
gsap.to(".box", {
  x: 300
});
```

All elements animate at the same time.

```text
Box1 ↓
Box2 ↓
Box3 ↓
Box4 ↓
```

---

With stagger:

```js
gsap.to(".box", {
  x: 300,
  stagger: 0.2
});
```

Elements animate one after another.

```text
Box1
 ↓ 0.2s
Box2
 ↓ 0.2s
Box3
 ↓ 0.2s
Box4
```

---

## Simple Syntax

```js
gsap.to(".box", {
  x: 300,
  stagger: 0.2
});
```

---

## Advanced Stagger

```js
gsap.to("h1 span", {
  y: 500,
  opacity: 0,

  stagger: {
    each: 0.03,
    from: "center"
  }
});
```

---

### each

Defines delay between elements.

```js
stagger:{
  each:0.1
}
```

---

### from

Controls animation starting point.

```js
from:"start"
```

```text
A → B → C → D → E
```

---

```js
from:"end"
```

```text
E → D → C → B → A
```

---

```js
from:"center"
```

```text
C → B → D → A → E
```

---

```js
from:"random"
```

Random order every time.

---

# 2. Timeline

## What is Timeline?

A Timeline is a container that controls multiple animations.

Without timeline:

```js
gsap.to(".box1",{});
gsap.to(".box2",{});
gsap.to(".box3",{});
```

Difficult to manage.

---

With timeline:

```js
const tl = gsap.timeline();

tl.to(".box1",{})
  .to(".box2",{})
  .to(".box3",{});
```

Everything becomes organized.

---

## Real-Life Analogy

Think of a timeline as a playlist.

```text
Song 1
↓
Song 2
↓
Song 3
```

Each animation plays in sequence.

---

# 3. Timeline Chaining

Multiple animations can be chained together.

```js
const tl = gsap.timeline();

tl.to(".box1",{
  x:500,
  duration:1
})

.to(".box2",{
  x:500,
  duration:1
})

.to(".box3",{
  x:500,
  duration:1
});
```

Flow:

```text
Box1
↓
Box2
↓
Box3
```

---

# 4. Position Parameters

Position parameters control exactly when an animation starts.

---

## "<"

Start at the same time as the previous animation.

```js
tl.to(".box1",{x:500})

.to(".box2",{x:500},"<");
```

Result:

```text
Box1 ──────►
Box2 ──────►
```

Both start together.

---

## ">"

Start after previous animation ends.

```js
">"
```

Result:

```text
Box1 finishes
↓
Box2 starts
```

---

## "<0.3"

Start 0.3 seconds after previous animation starts.

```js
"<0.3"
```

Example:

```text
Box1 starts
↓
0.3 sec
↓
Box2 starts
```

---

## ">0.3"

Start 0.3 seconds after previous animation ends.

```js
">0.3"
```

---

## "-=0.5"

Overlap animation.

```js
"-=0.5"
```

Meaning:

```text
Start 0.5 seconds earlier
```

Example:

```js
.from(".heading h1",{
  yPercent:100
},"-=0.5")
```

Creates smoother transitions.

---

# 5. Labels

## What are Labels?

Labels are named markers inside a timeline.

Instead of remembering exact timings:

```js
2.4
3.7
4.2
```

Use labels.

---

## Creating a Label

```js
tl.add("hero");
```

---

## Using a Label

```js
.to(".box",{
  x:500
},"hero")
```

---

## Multiple Animations on Same Label

```js
tl.add("basu")

.to(".box4",{
  x:500
},"basu")

.to(".box5",{
  x:500
},"basu")
```

Result:

```text
Box4
Box5
```

Start together.

---

# 6. Loader Animation

## Counter Logic

```js
let count = 0;

const interval = setInterval(() => {

  count++;

  if(count === 100){
    clearInterval(interval);
  }

},30);
```

---

## Updating UI

```js
loaderCount.textContent = `${count}%`;
```

Result:

```text
0%
1%
2%
...
100%
```

---

# 7. Hero Reveal Animation

Professional websites often use this sequence:

```text
Loader
↓
Background Reveal
↓
Heading Reveal
↓
Subheading Reveal
```

---

## Example Timeline

```js
const tl = gsap.timeline();

tl.to(".loaderCounter",{
  opacity:0,
  duration:0.6
})

.to(".loader",{
  yPercent:100,
  duration:1
},"<")

.from(".background img",{
  scale:1.2,
  duration:1.2
},"-=0.95")

.from(".heading h1",{
  yPercent:100,
  duration:1
},"-=0.87")

.from(".subHeading h2",{
  yPercent:100,
  duration:1
},"-=0.87");
```

---

## Animation Flow

```text
Counter Fade Out
↓
Loader Slide Up
↓
Background Zoom In
↓
Heading Reveal
↓
Subheading Reveal
```

This is one of the most common landing page animation patterns.

---

# 8. Best Practices

## Use Timeline for Complex Animations

Avoid:

```js
gsap.to(...)
gsap.to(...)
gsap.to(...)
```

Prefer:

```js
const tl = gsap.timeline();
```

---

## Use Labels

Bad:

```js
2.7
3.4
4.8
```

Good:

```js
"hero"
"loader"
"content"
```

---

## Use Overflow Hidden

Required for reveal animations.

```css
.heading,
.subHeading{
  overflow:hidden;
}
```

---

## Use Position Parameters

Avoid unnecessary delays.

Prefer:

```js
"<"
">"
"-=0.5"
```

---

# Day 3 Summary

## Concepts Mastered

✅ Stagger

✅ Timeline

✅ Timeline Chaining

✅ Position Parameters

✅ Labels

✅ Loader Counter

✅ Loader Animation

✅ Hero Reveal Animation

✅ Reveal Techniques

---

# Golden Rules ⭐

```text
Stagger
=
Delay distributed across elements

Timeline
=
Animation Playlist

<
=
Start together

>
=
Start after previous ends

Label
=
Timeline Bookmark

-=0.5
=
Start earlier

overflow:hidden
=
Required for reveal animations
```

---

## Day 3 Status

```text
GSAP Timeline & Sequencing
████████████████████ 100%
```

### Next Topic

```text
Day 4
↓
Timeline Controls
(play, pause, reverse, restart)

OR

ScrollTrigger
```

Depending on your instructor's roadmap.
