import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SectionGranthiPheras({ sectionData }) {
  const [activePhera, setActivePhera] = useState(1);

  const pheraInsights = [
    { round: 1, title: "First Phera — Divine Grace", desc: "Circling the flames for righteousness, spiritual devotion, and pure intentions." },
    { round: 2, title: "Second Phera — Courage & Nurture", desc: "Seeking strength to overcome obstacles together with unyielding unity." },
    { round: 3, title: "Third Phera — Prosperity & Harmony", desc: "Invoking prosperity, abundance, and wisdom in fulfilling shared responsibilities." },
    { round: 4, title: "Fourth Phera — Sacred Bond & Companionship", desc: "Binding hearts in eternal love, mutual respect, and spiritual union." }
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

