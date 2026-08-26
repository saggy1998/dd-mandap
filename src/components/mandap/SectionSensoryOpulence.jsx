import React from "react";
import { motion } from "framer-motion";
import { Maximize2, Quote, Palette } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SectionSensoryOpulence({ sectionData, onOpenLightbox }) {
  const colorSwatches = [
    { name: "Bridal Red", hex: "#B83A28", bg: "#B83A28" },
    { name: "Mandap Gold", hex: "#D4A359", bg: "#D4A359" },
    { name: "Warm Amber", hex: "#E28938", bg: "#E28938" },
    { name: "Emerald Jewel", hex: "#163B2E", bg: "#163B2E" },
    { name: "Silk Ivory", hex: "#FAF5ED", bg: "#FAF5ED" }
  ];

  return (
    <section id={sectionData.id} className="snap-frame snap-frame--content">
      <div className="snap-content-row snap-content-row--right">
        <motion.article
          className="snap-card snap-card--right"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.45 }}
        >
          <span className="card-eyebrow">{sectionData.eyebrow}</span>
          <h2 className="card-headline-serif">{sectionData.title}</h2>
          <p className="card-subtitle-tag">{sectionData.subtitle}</p>

          <div className="card-body-block">
            {sectionData.paragraphs.map((para, idx) => (
              <p key={idx} className="card-body-text">
                {para}
              </p>
            ))}
          </div>

        </motion.article>
      </div>
    </section>
  );
}

