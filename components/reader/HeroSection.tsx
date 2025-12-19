'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchLocationBar } from './SearchLocationBar';

interface HeroStory {
    id: string;
    title: string;
    excerpt?: string;
    image: string;
    slug: string;
    category?: string;
    author?: {
        name: string;
    };
    createdAt: string;
}

interface HeroSectionProps {
    featuredStories: HeroStory[];
}

export function HeroSection({ featuredStories = [] }: HeroSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 8000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % featuredStories.length);
        setTimeout(() => setIsAnimating(false), 800);
    }, [isAnimating, featuredStories.length]);

    if (!featuredStories.length) return null;

    const activeStory = featuredStories[currentIndex];

    return (
        <div className="relative w-full h-[95vh] min-h-[700px] overflow-hidden flex flex-col">

            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                {featuredStories.map((story, idx) => (
                    <div
                        key={story.id}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                            idx === currentIndex ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <Image
                            src={story.image}
                            alt={story.title}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                        />
                        {/* Cinematic Gradient Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-reader-bg via-reader-bg/40 to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-r from-reader-bg via-reader-bg/50 to-transparent opacity-80" />
                    </div>
                ))}
            </div>

            {/* Navigation / Top Bar Placeholder (Assuming global nav exists, but adding spacing) */}
            <div className="relative z-20 pt-8 px-6 md:px-12 flex justify-between items-center">
                {/* Branding or Breadcrumbs could go here */}
                <div className="text-white/30 text-xs tracking-[0.2em] uppercase font-bold">
                    Today's Briefing
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-end pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

                    {/* Left: Typography & Headline */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Meta Label */}
                        <div className={cn(
                            "flex items-center gap-3 overflow-hidden",
                            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0 transition-all duration-700 delay-100"
                        )}>
                            <span className="bg-reader-accent text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                                {activeStory.category || "Featured"}
                            </span>
                            <span className="text-reader-secondary text-sm font-mono flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-reader-secondary/50"></span>
                                {new Date(activeStory.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className={cn(
                            "font-serif-display font-bold text-5xl md:text-7xl lg:text-8xl text-reader-text leading-[0.9] tracking-tight",
                            isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0 transition-all duration-700 delay-200"
                        )}>
                            <Link href={`/news/${activeStory.slug}`} className="hover:text-white/90 transition-colors">
                                {activeStory.title}
                            </Link>
                        </h1>

                        {/* Excerpt */}
                        <p className={cn(
                            "text-lg md:text-xl text-reader-secondary max-w-2xl leading-relaxed",
                            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0 transition-all duration-700 delay-300"
                        )}>
                            {activeStory.excerpt}
                        </p>

                        {/* CTA */}
                        <div className={cn(
                            "flex",
                            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0 transition-all duration-700 delay-400"
                        )}>
                            <Link
                                href={`/news/${activeStory.slug}`}
                                className="group flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-all"
                            >
                                <span className="text-sm font-bold tracking-widest uppercase">Read Full Story</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: Controls & Next Up */}
                    <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end space-y-8">

                        {/* Location/Search Widget embedded in Hero */}
                        <div className="w-full">
                            <SearchLocationBar />
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-4 w-full justify-start lg:justify-end">
                            {featuredStories.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => !isAnimating && setCurrentIndex(idx)}
                                    className={cn(
                                        "h-1 transition-all duration-500 rounded-full",
                                        idx === currentIndex
                                            ? "w-12 bg-reader-accent"
                                            : "w-2 bg-white/20 hover:bg-white/40"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade for Section Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-reader-bg to-transparent z-10" />
        </div>
    );
}
