import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  alpha: number;
}

export function EnergyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();

  const createParticle = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || particlesRef.current.length >= 50) return;

    const colors = ['#9333ea', '#a855f7', '#c084fc', '#e9d5ff'];
    
    particlesRef.current.push({
      x: Math.random() * canvas.width,
      y: -10,
      speed: 1 + Math.random() * 3,
      size: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    createParticle();

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.y += particle.speed;
      particle.alpha = Math.max(0, 1 - (particle.y / canvas.height));
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
      ctx.shadowBlur = 15;
      ctx.shadowColor = particle.color;
      ctx.fill();
      
      return particle.y < canvas.height;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
}