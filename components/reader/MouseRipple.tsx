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
        // Only active on Reader pages (assuming Reader is dark background)
        // Adjust logic if needed, but for now we apply to all as per requirement "Reader experience only"
        // The Layout wrapper handles scoping generally, but we can double check.

        // Performance: Use requestAnimationFrame for smooth interpolation
        const animate = () => {
            // Linear interpolation (Lerp) for smoothness: 0.1 factor
            // cx += (mx - cx) * 0.1
            cx.current = cx.current + (mx.current - cx.current) * 0.08;
            cy.current = cy.current + (my.current - cy.current) * 0.08;

            if (rippleRef.current) {
                rippleRef.current.style.setProperty('--rx', `${cx.current}px`);
                rippleRef.current.style.setProperty('--ry', `${cy.current}px`);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            mx.current = e.clientX;
            my.current = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Do not render on non-Reader pages if checking pathname (optional safety)
    // Assuming this component is mounted in (reader)/layout.tsx, so it's safe.

    return (
        <div
            ref={rippleRef}
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            style={{
                // Default start off-screen
                '--rx': '-500px',
                '--ry': '-500px'
            } as React.CSSProperties}
        >
            <div
                className="absolute w-[800px] h-[800px] rounded-full blur-[100px] opacity-[0.08] transition-opacity duration-1000"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                    left: 0,
                    top: 0,
                    transform: 'translate(calc(var(--rx) - 50%), calc(var(--ry) - 50%))',
                    willChange: 'transform',
                }}
            />
        </div>
    );
}
