import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'publisher';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
    ({ className, variant = 'primary', size = 'md', href, ...props }, ref) => {

        const classes = cn(
            // Base
            'relative overflow-hidden inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reader-accent focus-visible:ring-offset-2',
            'disabled:opacity-50 disabled:pointer-events-none',

            // Glass Base (Common)
            'backdrop-blur-md border',

            // Variants
            variant === 'primary' && [
                'bg-white/10 text-white border-white/20',
                'hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]',
                'active:scale-[0.98]',
                // Top-left highlight sheen
                'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-100 before:transition-opacity',
            ],

            variant === 'secondary' && [
                'bg-black/20 text-white/90 border-white/10',
                'hover:bg-black/30 hover:border-white/20 hover:text-white',
                'active:scale-[0.98]',
            ],

            variant === 'ghost' && [
                'bg-transparent text-white/70 border-transparent',
                'hover:bg-white/5 hover:text-white',
                'active:scale-[0.98]',
            ],

            // Publisher Variant (Now Dark)
            variant === 'publisher' && [
                'bg-white/5 text-white border-white/10',
                'hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-publisher-primary/20',
                'active:scale-[0.98]',
                'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50',
            ],

            // Sizes
            size === 'sm' && 'h-8 px-3 text-xs',
            size === 'md' && 'h-10 px-5 text-sm',
            size === 'lg' && 'h-12 px-8 text-base',

            className
        );

        const content = (
            <>
                {/* Inner glow for extra depth on primary */}
                {variant === 'primary' && (
                    <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                )}
                <span className="relative z-10 flex items-center gap-2">{props.children}</span>
            </>
        );

        if (href) {
            return (
                <Link href={href} className={classes}>
                    {content}
                </Link>
            );
        }

        return (
            <button
                ref={ref}
                className={classes}
                {...props}
            >
                {content}
            </button>
        );
    }
);

GlassButton.displayName = 'GlassButton';
