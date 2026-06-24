import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Numbered process timeline. A connector line fills with aqua as the user
 * scrolls the section (scrubbed, transform-only). Steps reveal on enter.
 * This does NOT pin or hijack the scroll. Static under reduced motion.
 */
export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !root.current || !fill.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={root} className="relative mx-auto max-w-4xl">
      {/* Track + animated fill */}
      <div
        aria-hidden="true"
        className="absolute bottom-3 left-[28px] top-3 w-[2px] bg-line md:left-1/2 md:-translate-x-1/2"
      >
        <div
          ref={fill}
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-aqua to-blue"
          style={{ transform: reduce ? "scaleY(1)" : "scaleY(0)" }}
        />
      </div>

      <ol className="relative">
        {processSteps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <li
              key={step.n}
              className="timeline-step relative py-5 md:grid md:grid-cols-2 md:gap-x-14 md:py-7"
            >
              {/* Node on the line */}
              <span className="absolute left-[10px] top-[26px] z-10 grid h-[38px] w-[38px] place-items-center rounded-full border-2 border-aqua bg-white font-display text-[13px] font-bold text-blue shadow-soft md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                {step.n}
              </span>

              <div
                className={
                  isLeft
                    ? "pl-[68px] md:col-start-1 md:pl-0 md:pr-8 md:text-right"
                    : "pl-[68px] md:col-start-2 md:pl-8"
                }
              >
                <div className="rounded-card bg-white p-6 shadow-soft ring-1 ring-line transition-shadow duration-300 hover:shadow-lift">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
