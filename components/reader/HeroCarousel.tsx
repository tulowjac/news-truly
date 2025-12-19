'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from './HeroSlide';
import { SearchLocationBar } from './SearchLocationBar';

interface HeroCarouselProps {
    featuredStories: any[];
}

export function HeroCarousel({ featuredStories = [] }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);

    const DURATION = 8000;
    const UPDATE_INTERVAL = 100;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredStories.length);
        setProgress(0);
    }, [featuredStories.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
        setProgress(0);
    }, [featuredStories.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        nextSlide();
                        return 0;
                    }
                    return prev + (100 / (DURATION / UPDATE_INTERVAL));
                });
            }, UPDATE_INTERVAL);
        }
        return () => clearInterval(interval);
    }, [isPlaying, nextSlide]);

    if (!featuredStories.length) return null;

    return (
        <div
            className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-reader-bg group"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
        >
            {/* Slides */}
            {featuredStories.map((story, index) => (
                <HeroSlide
                    key={story.id}
                    story={story}
                    isActive={index === currentIndex}
                />
            ))}

            {/* Controls Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between pb-8">
                {/* Navigation Arrows (Sides) */}
                <div className="flex-1 flex items-center justify-between px-4 md:px-8">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="pointer-events-auto p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="pointer-events-auto p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Dashboard / Search Layer */}
                <div className="pointer-events-auto w-full px-4 mb-12">
                    <SearchLocationBar />

                    {/* Pagination Dots & Progress */}
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3">
                            {featuredStories.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                        {/* Active Progress Bar (Decorative) */}
                        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-reader-secondary transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
