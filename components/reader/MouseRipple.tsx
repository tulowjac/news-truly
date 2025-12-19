'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function MouseRipple() {
    const rippleRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const pathname = usePathname();

    // Target position (mouse)
    const mx = useRef(0);
    const my = useRef(0);

    // Current position (smooth)
    const cx = useRef(0);
    const cy = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mx.current = e.clientX;
            my.current = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Initialize center screen
        mx.current = window.innerWidth / 2;
        my.current = window.innerHeight / 2;
        cx.current = window.innerWidth / 2;
        cy.current = window.innerHeight / 2;

        const animate = () => {
            // Slower, "liquid" delay (0.04 instead of 0.08)
            cx.current = cx.current + (mx.current - cx.current) * 0.05;
            cy.current = cy.current + (my.current - cy.current) * 0.05;

            if (rippleRef.current) {
                // Move the center of the gradient
                rippleRef.current.style.setProperty('--rx', `${cx.current}px`);
                rippleRef.current.style.setProperty('--ry', `${cy.current}px`);

                // Minor parallax for the container itself to feel like "page movement"
                // Move opposite to mouse slightly (-0.02)
                const px = (window.innerWidth / 2 - cx.current) * 0.02;
                const py = (window.innerHeight / 2 - cy.current) * 0.02;
                rippleRef.current.style.transform = `translate(${px}px, ${py}px)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div
            ref={rippleRef}
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            style={{
                '--rx': '50%',
                '--ry': '50%',
                transition: 'transform 0.1s linear' // smooth parallax lag
            } as React.CSSProperties}
        >
            {/* Main Glow Orb */}
            <div
                className="absolute rounded-full blur-[100px] opacity-[0.5] mix-blend-screen will-change-transform"
                style={{
                    top: 0, left: 0,
                    width: '1000px',
                    height: '1000px',
                    // Cool cyan-blue liquid gradient
                    background: 'radial-gradient(circle, rgba(200, 230, 255, 0.15) 0%, rgba(50, 100, 255, 0.05) 40%, transparent 70%)',
                    transform: 'translate(calc(var(--rx) - 50%), calc(var(--ry) - 50%))',
                }}
            />

            {/* Secondary Follower Orb (For liquid trail effect) */}
            <div
                className="absolute rounded-full blur-[120px] opacity-[0.3] mix-blend-screen will-change-transform"
                style={{
                    top: 0, left: 0,
                    width: '1400px',
                    height: '1400px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
                    // Lag it by offsetting using same vars but different scale or just wider
                    transform: 'translate(calc(var(--rx) - 50%), calc(var(--ry) - 50%)) scale(1.1)',
                }}
            />
        </div>
    );
}
