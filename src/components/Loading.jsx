import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  initial: {
    fill: "transparent",
    stroke: "#4a9df8",
    strokeWidth: 1.5,
    strokeDasharray: 300,
    strokeDashoffset: 300,
  },
  animate: {
    strokeDashoffset: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
  fill: {
    fill: "#4a9df8",
    stroke: "none",
    transition: {
      delay: 2,
      duration: 1,
      ease: "easeIn",
    },
  },
};

export default function LoadingText() {
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#f0f4f8",
      }}
    >
      <svg viewBox="0 0 500 150" width="100%" height="100%">
        <motion.text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="48"
          fontFamily="'Courier New', Courier, monospace"
          variants={textVariants}
          initial="initial"
          animate={["animate", "fill"]}
        >
          Loading...
        </motion.text>
      </svg>
    </div>
  );
}
