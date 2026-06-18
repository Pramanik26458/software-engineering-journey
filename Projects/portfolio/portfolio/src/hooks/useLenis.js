"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,

      // Easing
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Update ScrollTrigger on every Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker drives Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after page load
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });

      lenis.destroy();
    };
  }, []);
}