import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MANDAP_DATA, MEDIA_ASSETS } from "@/data/mandapContent";
import AgniFlameCanvas from "./AgniFlameCanvas";
import HeroSection from "./HeroSection";
import SectionAgniWitness from "./SectionAgniWitness";
import SectionGranthiPheras from "./SectionGranthiPheras";
import SectionSaptapadi from "./SectionSaptapadi";
import SectionSensoryOpulence from "./SectionSensoryOpulence";
import EtherealAgni from "./EtherealAgni";
import { X } from "lucide-react";

const TOTAL_FRAMES = 6;

export default function MandapMoodBoard() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const snapContainerRef = useRef(null);

  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setActiveFrame(idx);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFrame = useCallback((idx) => {
    const container = snapContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: idx * container.clientHeight, behavior: "smooth" });
  }, []);

  const handleOpenLightbox = (src, caption) => {
    setLightboxImage({ src, caption });
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="snap-page-root">
      {/* Ethereal Sacred Agni — luxurious fire animation */}
      <EtherealAgni activeFrame={activeFrame} totalFrames={TOTAL_FRAMES} />

      {/* ════════════════════════════════════════════════════════
          BACKGROUND MEDIA 1 — Behind Frames 0, 1, 2
          When Frame 3 is scrolled to, photo-sticky-wrapper rises
          up in normal scroll flow and physically PUSHES this image up!
      ════════════════════════════════════════════════════════ */}
      <div className="fixed-still-bg">
        <div className="bg-canvas-wrapper">
          <AgniFlameCanvas scrollIntensity={activeFrame / (TOTAL_FRAMES - 1)} />
        </div>
        <img
          src={`${process.env.PUBLIC_URL}${MEDIA_ASSETS.portrait}`}
          alt="The Sacred Witness — Mandap Details"
          className="still-bg-img still-bg-img--hero"
        />
        <div className="still-bg-overlay" />
      </div>

      {/* ════════════════════════════════════════════════════════
          SNAP SCROLL CONTAINER
          Frames 0-2: transparent overlays over Background Media 1.
          Frames 3-6: wrapped in photo-sticky-wrapper.
          Background Media 2 (mandap_full_view.jpg) pushes up Media 1
          at Frame 3, then pins sticky while Frames 4, 5, 6 overlay it!
      ════════════════════════════════════════════════════════ */}
      <div className="snap-scroll-container" ref={snapContainerRef}>
        {/* FRAME 0 — HERO */}
        <HeroSection
          data={MANDAP_DATA}
          onScrollClick={() => scrollToFrame(1)}
        />

        {/* FRAME 1 — SECTION I (AGNI WITNESS) */}
        <SectionAgniWitness
          sectionData={MANDAP_DATA.sections[0]}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* FRAME 2 — SECTION II (GRANTHI PHERAS) */}
        <SectionGranthiPheras
          sectionData={MANDAP_DATA.sections[1]}
        />

        {/* ════════════════════════════════════════════════════════
            PHOTO STICKY WRAPPER — Frames 3, 4, 5, 6
            1. Pushes up Background Media 1 as Frame 3 enters from bottom.
            2. Pins mandap_full_view.jpg at top: 0 while scrolling Frames 3-6.
            3. Cards 4, 5, 6 scroll UP ON TOP OF the pinned image!
        ════════════════════════════════════════════════════════ */}
        <div className="photo-sticky-wrapper">
          <div className="sticky-bg-image-box">
            <img
              src={`${process.env.PUBLIC_URL}${MEDIA_ASSETS.fullView}`}
              alt="Mandap Full Opulence View"
              className="still-bg-img"
            />
            <div className="still-bg-overlay still-bg-overlay--secondary" />
          </div>

          {/* FRAME 3 — CLEAN SECONDARY IMAGE REVEAL & FOCUS */}
          <section className="snap-frame snap-frame--clean-focus">
            {/* The text label has been removed to leave only the background image in focus */}
          </section>

          {/* FRAME 4 — SECTION III (SAPTAPADI - 7 STEPS) */}
          <SectionSaptapadi
            sectionData={MANDAP_DATA.sections[2]}
          />

          {/* FRAME 5 — SECTION IV (SENSORY OPULENCE) */}
          <SectionSensoryOpulence
            sectionData={MANDAP_DATA.sections[3]}
            onOpenLightbox={handleOpenLightbox}
          />

        </div>
      </div>

      {/* ── RIGHT-SIDE PROGRESS THREAD ── */}
      <nav className="snap-progress-nav" aria-label="Mandap navigation">
        <div className="snap-progress-track">
          <div
            className="snap-progress-fill"
            style={{ height: `${((activeFrame + 1) / TOTAL_FRAMES) * 100}%` }}
          />
        </div>
        {Array.from({ length: TOTAL_FRAMES }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`snap-progress-dot ${activeFrame === i ? "active" : ""}`}
            onClick={() => scrollToFrame(i)}
            aria-label={`Go to section ${i + 1}`}
          >
            <span className="dot-tooltip">
              {i === 0 && "Hero"}
              {i === 1 && "I. Agni Witness"}
              {i === 2 && "II. Sacred Circle"}
              {i === 3 && "Visual Canopy"}
              {i === 4 && "III. 7 Steps"}
              {i === 5 && "IV. Atmosphere"}
            </span>
          </button>
        ))}
      </nav>

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox-backdrop" onClick={handleCloseLightbox}>
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={handleCloseLightbox}
          >
            <X size={20} />
          </button>

          <img
            src={lightboxImage.src}
            alt={lightboxImage.caption}
            className="lightbox-image"
          />

          <p className="lightbox-caption">{lightboxImage.caption}</p>
        </div>
      )}
    </div>
  );
}

