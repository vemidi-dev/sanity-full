"use client";

import { useEffect, useState } from "react";

type StickyCtaBarProps = {
  productName: string;
  priceLabel: string;
  buttonText: string;
};

export default function StickyCtaBar({ productName, priceLabel, buttonText }: StickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full border-t border-gray-200/80 bg-white/90 shadow-lg backdrop-blur transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-gray-800">{productName}</p>
          <p className="text-sm text-gray-600">{priceLabel}</p>
          <p className="text-xs text-[#7A6A2A]">Ограничени бройки днес</p>
        </div>
        <button className="w-full rounded-full bg-[#A3D977] px-6 py-2 font-medium text-black shadow transition-all duration-300 ease-out hover:scale-105 sm:w-auto">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
