import React, { useEffect, useRef } from 'react';

export function FrequencyBars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barCount = 32;
    const bars: number[] = Array(barCount).fill(0);
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update bar heights with some randomness
      bars.forEach((_, i) => {
        const target = Math.random() * 50 + 10;
        bars[i] = bars[i] * 0.9 + target * 0.1;
      });

      // Draw bars
      const barWidth = canvas.width / barCount;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.3)'; // Purple with opacity

      bars.forEach((height, i) => {
        const x = i * barWidth;
        const y = canvas.height - height;
        ctx.fillRect(x, y, barWidth - 1, height);
      });

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
      width={200}
      height={60}
      className="absolute opacity-75"
    />
  );
}