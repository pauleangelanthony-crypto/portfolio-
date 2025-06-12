"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
  age: number;
  maxAge: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };

      // Add new point
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        age: 0,
        maxAge: 100 + Math.random() * 100,
      });

      // Limit points array size
      if (pointsRef.current.length > 200) {
        pointsRef.current = pointsRef.current.slice(-200);
      }
    };

    const render = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      pointsRef.current.forEach((point, i) => {
        // Update position
        point.x += point.dx;
        point.y += point.dy;
        point.age++;

        // Remove old points
        if (point.age > point.maxAge) {
          pointsRef.current.splice(i, 1);
          return;
        }

        // Calculate opacity based on age
        const opacity = 1 - point.age / point.maxAge;

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${opacity * 0.7})`; // Changed to purple-600 color
        ctx.fill();

        // Draw connections between points
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const otherPoint = pointsRef.current[j];
          const distance = Math.sqrt(
            Math.pow(point.x - otherPoint.x, 2) +
              Math.pow(point.y - otherPoint.y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.2})`; // Changed to purple-600 color
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
}
