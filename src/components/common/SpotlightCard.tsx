import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
  dataCursorText?: string;
  tiltMaxAngle?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(138, 43, 226, 0.18)',
  onClick,
  dataCursorText,
  tiltMaxAngle = 8,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calcular tilt 3D
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * tiltMaxAngle;
    const rotateX = -((y - centerY) / centerY) * tiltMaxAngle;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-text={dataCursorText}
      animate={{
        rotateX: isHovered ? tilt.rotateX : 0,
        rotateY: isHovered ? tilt.rotateY : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative overflow-hidden rounded-2xl border border-[rgba(138,43,226,0.2)] bg-[rgba(15,0,30,0.7)] backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(168,85,247,0.45)] ${className}`}
    >
      {/* Spotlight Radial Follower */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      
      {/* Conteúdo com ligeira elevação z */}
      <div style={{ transform: 'translateZ(10px)' }} className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
