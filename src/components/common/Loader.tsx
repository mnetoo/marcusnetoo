import React, { useState, useEffect } from 'react';
import './Loader.css';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Se o usuário prefere movimento reduzido ou já viu nesta sessão, finalizar imediatamente
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenLoader = sessionStorage.getItem('mn_loader_seen');

    if (prefersReducedMotion || hasSeenLoader) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem('mn_loader_seen', 'true');
            if (onComplete) onComplete();
          }, 200);
          return 100;
        }
        return prev + 10;
      });
    }, 80); // ~0.8s a 1.0s total

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    sessionStorage.setItem('mn_loader_seen', 'true');
    if (onComplete) onComplete();
  };

  if (isFinished) return null;

  return (
    <div className="loader-overlay" onClick={handleSkip} title="Clique para pular">
      <div className="loader-container">
        <div className="loader-brand">
          <span className="loader-tag">// portfolio</span>
          <h1 className="loader-name">Marcus Neto</h1>
        </div>

        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-footer">
          <span className="loader-percentage">{progress}%</span>
          <button className="loader-skip" onClick={handleSkip}>
            Pular [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loader;
