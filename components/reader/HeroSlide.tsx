import React from 'react';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';

interface HeroSlideProps {
    story: {
        id: number | string;
        title: string;
        excerpt: string;
        image: string;
        author: string;
        town?: string;
        createdAt: string;
    };
    isActive: boolean;
}

export function HeroSlide({ story, isActive }: HeroSlideProps) {
    return (
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            {/* Background Image with Parallax-like scaling */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className={`w-full h-full relative transition-transform duration-[8000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}>
                    {/* Using a placeholder if image is invalid, but assuming valid URL or local path */}
                    {/* In a real scenario, use next/image with fill. Here using a styled div for simplicity if image prop is a URL string */}
                    {story.image ? (
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${story.image})` }}
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-900" />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-reader-bg via-reader-bg/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" /> {/* General darkening */}
                </div>
            </div>

            {/* Content Content - Staggered reveal would be handled by parent or Framer Motion, here simple CSS transitions */}
            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-8 pt-20">
                    <div className={`max-w-3xl space-y-4 transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Trust Signals */}
                        <div className="flex items-center gap-4 text-reader-secondary font-medium tracking-wide text-sm uppercase">
                            <div className="flex items-center gap-1.5">
                                <span className="w-8 h-[1px] bg-reader-secondary"></span>
                                {story.author || 'NewsTruly'}
                            </div>
                            {story.town && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {story.town}
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {new Date(story.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Text */}
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-white leading-[1.1] drop-shadow-lg">
                            {story.title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 max-w-xl font-light leading-relaxed drop-shadow-md">
                            {story.excerpt}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
