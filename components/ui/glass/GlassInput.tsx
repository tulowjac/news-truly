import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
    ({ className, containerClassName, ...props }, ref) => {
        return (
            <div className={cn("relative group", containerClassName)}>
                <div className="absolute inset-0 bg-white/5 rounded-2xl md:rounded-full blur-sm group-hover:bg-white/10 transition-colors" />
                <div className={cn(
                    "relative flex items-center w-full rounded-2xl md:rounded-full overflow-hidden",
                    "bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300",
                    "group-focus-within:bg-white/10 group-focus-within:border-white/25 group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
                    "hover:border-white/20"
                )}>
                    {/* We don't render the icon here anymore to allow more flexibility in the parent, 
               but the styles provided support it if needed. Use children or just style the input. 
           */}
                    <input
                        ref={ref}
                        className={cn(
                            "w-full bg-transparent border-none text-white placeholder:text-white/40",
                            "focus:ring-0 focus:outline-none px-4 py-3 text-base md:text-lg font-medium",
                            className
                        )}
                        {...props}
                    />
                </div>
            </div>
        );
    }
);

GlassInput.displayName = 'GlassInput';
