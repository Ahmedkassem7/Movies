import { motion } from "framer-motion";

const letter = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.04, // Duration per letter
      ease: "easeOut",
    },
  },
};

const container = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Speed between letters (smaller = faster)
      delayChildren: 0.5, // Delay before typing starts
    },
  },
};

export default function LoadingLineReveal({ textContent }) {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="overflow-hidden"
    >
      <motion.p
        className="display-4 text-white fw-bold m-0"
        style={{
          overflow: "hidden",
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
      >
        {[...textContent].map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            style={{
              display: "inline-block",
              whiteSpace: "pre", // preserve spaces
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
