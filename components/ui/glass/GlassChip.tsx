import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GlassChipProps {
    label: string;
    href?: string;
    active?: boolean;
    className?: string;
    startIcon?: React.ReactNode;
}

export function GlassChip({ label, href, active, className, startIcon }: GlassChipProps) {
    const content = (
        <>
            <div className={cn(
                "absolute inset-0 transition-colors duration-300",
                active ? "bg-white/15" : "bg-white/5 group-hover:bg-white/10"
            )} />

            {/* Top highlight sheen */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />

            <span className={cn(
                "relative flex items-center gap-2 text-sm font-medium transition-colors z-10",
                active ? "text-white" : "text-white/70 group-hover:text-white"
            )}>
                {startIcon && <span className="opacity-80 group-hover:opacity-100">{startIcon}</span>}
                {label}
            </span>
        </>
    );

    const containerClasses = cn(
        "group relative inline-flex items-center justify-center px-4 py-1.5 rounded-full overflow-hidden transition-all duration-300",
        "backdrop-blur-md border",
        active
            ? "border-white/25 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            : "border-white/10 hover:border-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.03)]",
        className
    );

    if (href) {
        return (
            <Link href={href} className={containerClasses}>
                {content}
            </Link>
        );
    }

    return (
        <div className={containerClasses}>
            {content}
        </div>
    );
}
