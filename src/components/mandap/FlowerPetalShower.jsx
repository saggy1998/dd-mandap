import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FlowerPetalShower({ triggerCount }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!triggerCount || triggerCount <= 0) return;

    // Generate cascading flower petals
    const newPetals = Array.from({ length: 36 }).map((_, i) => {
      const isGold = Math.random() > 0.45;
      return {
        id: `${Date.now()}-${i}-${Math.random()}`,
        left: Math.random() * 95,
        size: Math.random() * 16 + 12,
        duration: Math.random() * 3.5 + 2.5,
        delay: Math.random() * 0.8,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 120,
        isGold,
      };
    });

    setPetals((prev) => [...prev, ...newPetals]);

    const timer = setTimeout(() => {
      setPetals((prev) => prev.slice(newPetals.length));
    }, 5000);

    return () => clearTimeout(timer);
  }, [triggerCount]);

  return (
    <div className="petal-shower-layer">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              y: "-10vh",
              x: `${petal.left}vw`,
              opacity: 1,
              rotate: 0,
              scale: 0.8,
            }}
            animate={{
              y: "105vh",
              x: `${petal.left + petal.drift / 10}vw`,
              rotate: petal.rotate + 360,
              opacity: [1, 1, 0.8, 0],
              scale: [0.8, 1.1, 0.9, 0.7],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: petal.size,
              height: petal.size * 1.3,
              borderRadius: "80% 0 80% 50%",
              background: petal.isGold
                ? "linear-gradient(135deg, #F5D38A 0%, #C5A059 60%, #8E6F3B 100%)"
                : "linear-gradient(135deg, #E0533C 0%, #B83A28 70%, #6E1A10 100%)",
              boxShadow: petal.isGold
                ? "0 2px 10px rgba(197, 160, 89, 0.4)"
                : "0 2px 10px rgba(184, 58, 40, 0.4)",
              zIndex: 9999,
              pointerEvents: "none",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
