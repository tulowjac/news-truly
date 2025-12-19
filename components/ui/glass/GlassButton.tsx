import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'publisher';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
    ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref}
                className={cn(
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

                    // Publisher Light Variant
                    variant === 'publisher' && [
                        'bg-white/70 text-publisher-primary border-slate-200/60',
                        'hover:bg-white/90 hover:border-publisher-primary/30 hover:shadow-sm',
                        'active:scale-[0.98] text-slate-800',
                        'font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
                    ],

                    // Sizes
                    size === 'sm' && 'h-8 px-3 text-xs',
                    size === 'md' && 'h-10 px-5 text-sm',
                    size === 'lg' && 'h-12 px-8 text-base',

                    className
                )}
                {...props}
            >
                {/* Inner glow for extra depth on primary */}
                {variant === 'primary' && (
                    <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                )}
                <span className="relative z-10 flex items-center gap-2">{props.children}</span>
            </Comp>
        );
    }
);

GlassButton.displayName = 'GlassButton';
