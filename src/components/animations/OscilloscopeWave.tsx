import React, { useEffect, useRef } from 'react';

export function OscilloscopeWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;
    const waves = [
      { freq: 0.02, amp: 30, speed: 0.05, color: 'rgba(168, 85, 247, 0.6)' },
      { freq: 0.01, amp: 20, speed: 0.03, color: 'rgba(139, 92, 246, 0.5)' },
      { freq: 0.03, amp: 15, speed: 0.07, color: 'rgba(124, 58, 237, 0.4)' }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 3;

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + 
                   Math.sin(x * wave.freq + phase * wave.speed) * wave.amp;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';

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
      height={200}
      className="absolute bottom-0 left-0 w-full opacity-90"
    />
  );
}