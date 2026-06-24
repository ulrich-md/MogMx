import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  /** seconds of delay, e.g. for staggering a list (index * 0.06) */
  delay?: number;
  /** initial vertical offset in px */
  y?: number;
};

/**
 * Scroll-reveal wrapper (Motion whileInView). Honors prefers-reduced-motion
 * by rendering static. Animates transform + opacity only.
 */
export function Reveal({ children, delay = 0, y = 22, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? undefined : { duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
