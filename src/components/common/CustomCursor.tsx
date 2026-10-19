import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Desativar se for dispositivo touch ou reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Detectar elementos clicáveis ou com texto customizado
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('a, button, [role="button"], input, textarea, .interactive-card, [data-cursor-text]') as HTMLElement | null;
        if (interactiveEl) {
          setIsHovered(true);
          const customText = interactiveEl.getAttribute('data-cursor-text');
          setCursorText(customText || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Render loop para suavizar o anel (lerp)
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={cursorDotRef} 
        className={`custom-cursor-dot ${isHovered ? 'hovered' : ''}`} 
      />
      <div 
        ref={cursorRingRef} 
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${cursorText ? 'has-text' : ''}`}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;
