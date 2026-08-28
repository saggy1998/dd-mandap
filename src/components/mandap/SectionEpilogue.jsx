import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SectionEpilogue({ sectionData, author }) {
  return (
    <section id={sectionData.id} className="snap-frame snap-frame--content">
      <div className="snap-content-row snap-content-row--center">
        <motion.article
          className="snap-card snap-card--center"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
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

          <div className="signature-divider">
            <div className="signature-line" />
            <Flame size={18} className="gold-icon" />
            <div className="signature-line" />
          </div>

          <div className="author-signature-block">
            <span className="brand-eyebrow">ARTICLE BY</span>
            <h3 className="author-name-written">{author}</h3>
            <span className="author-title-role">DULHAN DIARIES</span>
          </div>

          <div className="footer-bottom-bar">
            <span>© {new Date().getFullYear()} Dulhan Diaries. All rights reserved.</span>
            <span>Mandap: Around the Sacred Fire</span>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

