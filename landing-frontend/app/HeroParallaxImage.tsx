"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type HeroParallaxImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function HeroParallaxImage({ src, alt, priority }: HeroParallaxImageProps) {
  const frameRef = useRef<number | null>(null);
  const currentOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      targetOffsetRef.current = Math.min(window.scrollY * 0.18, 48);
    };

    const animate = () => {
      currentOffsetRef.current += (targetOffsetRef.current - currentOffsetRef.current) * 0.08;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(0, ${currentOffsetRef.current}px, 0) scale(1.08)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    handleScroll();
    animate();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div ref={imageRef} className="absolute inset-0 will-change-transform">
      <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
    </div>
  );
}
