"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Globe, MapPin, Plane } from "@/components/Icons";
import { PageHero } from "@/components/UI";

const stats = [
  {
    value: 2,
    label: "Office locations",
    detail: "Karachi & Khairpur",
    icon: MapPin,
  },
  {
    value: 4,
    label: "Core Services",
    detail: "Global trade, registration, consultancy & growth",
    icon: Briefcase,
  },
  {
    value: 12,
    label: "Product Categories",
    detail: "Machinery, electronics, consumer goods & chemicals",
    icon: Globe,
  },
  {
    value: 3,
    label: "Trade Corridors",
    detail: "Pakistan, China & Middle East",
    icon: Plane,
  },
];

function CountUp({ value }) {
  const ref = useRef(null);
  const [count, setCount] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    const animate = () => {
      const startTime = performance.now();
      const duration = 1100;
      setCount(0);

      const update = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setCount(Math.round(value * progress));
        if (progress < 1) frame = requestAnimationFrame(update);
      };

      frame = requestAnimationFrame(update);
    };

    if (typeof IntersectionObserver === "undefined") {
      animate();
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} aria-label={String(value)}>
      {count}
    </span>
  );
}

export default function ImpactStats() {
  return (
    <section className="ajrak-pattern w-full min-w-0 overflow-x-clip py-12 text-slate-700 sm:py-14" aria-labelledby="impact-stats-title">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Ajrak Impex at a glance"
          text="A clear start to global trade"
        />
        <div className="grid min-w-0 grid-cols-1 gap-3 min-[380px]:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label, detail, icon: Icon }) => (
            <article
              key={label}
              className="flex min-w-0 flex-col items-center rounded-xl bg-white/90 px-3 py-3 text-center shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon-50">
                <Icon className="h-5 w-5 text-maroon-700" />
              </span>
              <p className="mt-2 min-w-0 text-3xl font-extrabold tracking-tight text-navy-800 sm:text-4xl">
                <CountUp value={value} />
              </p>
              <h3 className="mt-1 min-w-0 text-sm font-bold leading-5 text-navy-800">{label}</h3>
              <p className="mt-1 min-w-0 max-w-full text-xs leading-5 text-slate-600 [overflow-wrap:anywhere]">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
