import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SectionSaptapadi({ sectionData }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id={sectionData.id} className="snap-frame snap-frame--content">
      <div className="snap-content-row snap-content-row--left">
        <motion.article
          className="snap-card snap-card--left snap-card--wide"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.45 }}
        >
          <span className="card-eyebrow">{sectionData.eyebrow}</span>
          <h2 className="card-headline-serif">{sectionData.title}</h2>
          <p className="card-subtitle-tag">{sectionData.subtitle}</p>

          <div className="card-body-block">
            {sectionData.paragraphs.slice(0, 2).map((para, idx) => (
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

