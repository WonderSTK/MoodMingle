import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const moodColors = {
  happy: ['#FFD700', '#FFA500'],
  sad: ['#4682B4', '#1E90FF'],
  excited: ['#FF4500', '#FF6347'],
  relaxed: ['#98FB98', '#00FA9A'],
  angry: ['#DC143C', '#FF0000'],
  default: ['#3f51b5', '#f50057'],
};

function AnimatedBackground({ mood, children }) {
  const colors = useMemo(() => {
    return moodColors[mood.toLowerCase()] || moodColors.default;
  }, [mood]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(45deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        zIndex: -1,
      }}
      animate={{
        background: `linear-gradient(45deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
      }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedBackground;