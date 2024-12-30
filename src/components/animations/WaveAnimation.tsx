import React, { useEffect, useRef } from 'react';

export function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw sine wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)'; // Purple with opacity
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
                 Math.sin(x * 0.02 + phase) * 30 + 
                 Math.sin(x * 0.01 + phase * 0.5) * 20;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={100}
      className="absolute bottom-0 left-0 w-full opacity-50"
    />
  );
}