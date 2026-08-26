import React from "react";
import { motion } from "framer-motion";

export default function HeroSection({ data, onScrollClick }) {
  return (
    <section className="snap-frame snap-frame--hero" id="hero-frame">
      <motion.div
        className="snap-hero-content"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="hero-title-main"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Mandap
          <span className="hero-title-serif-break">
            <em>Around the Sacred Fire</em>
          </span>
          <span className="hero-author-subtitle">
            written by Kajal Patel
          </span>
        </motion.h1>
      </motion.div>
    </section>
  );
}

