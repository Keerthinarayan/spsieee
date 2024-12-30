import React, { useEffect, useRef } from 'react';

export function SpectrumAnalyzer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barCount = 32;
    const bars: number[] = Array(barCount).fill(0);
    const peaks: number[] = Array(barCount).fill(0);
    let animationFrameId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.9)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.7)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0.5)');

      // Update bars with wave-like pattern
      bars.forEach((_, i) => {
        const baseHeight = Math.sin(frame * 0.05 + i * 0.2) * 0.5 + 0.5;
        const randomFactor = Math.random() * 0.3;
        const target = (baseHeight + randomFactor) * canvas.height * 0.8;
        bars[i] = bars[i] * 0.85 + target * 0.15;
        
        // Update peaks
        peaks[i] = Math.max(peaks[i], bars[i]);
        peaks[i] *= 0.95; // Decay peaks
      });

      // Draw bars and peaks
      const barWidth = canvas.width / barCount;
      ctx.fillStyle = gradient;

      bars.forEach((height, i) => {
        const x = i * barWidth;
        const y = canvas.height - height;
        
        // Bar
        ctx.fillRect(x + 1, y, barWidth - 2, height);
        
        // Peak
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(x + 1, canvas.height - peaks[i], barWidth - 2, 2);
        ctx.fillStyle = gradient;
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
      width={300}
      height={100}
      className="absolute opacity-90"
    />
  );
}