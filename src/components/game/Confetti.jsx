import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Confetti() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: -20, x: particle.x, opacity: 1, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 20, 
            opacity: 0,
            rotate: Math.random() * 720 - 360
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            delay: particle.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
    </div>
  );
}