import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BaseCardProps {
    title: string;
    subtitle?: string;
    image?: string;
    href: string;
    meta?: React.ReactNode;
    className?: string;
}

export function NewsCard({ title, subtitle, image, href, meta }: BaseCardProps) {
    return (
        <Link href={href} className="group block h-full bg-reader-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-reader-secondary/5 transition-all duration-300">
            <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
                {image ? (
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-reader-card/80 to-transparent opacity-60" />
            </div>
            <div className="p-6 space-y-3">
                {meta && <div className="text-xs font-medium text-reader-secondary/80 flex flex-wrap gap-2">{meta}</div>}
                <h3 className="font-serif font-bold text-xl text-white group-hover:text-reader-secondary transition-colors line-clamp-2 leading-tight">
                    {title}
                </h3>
                {subtitle && <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">{subtitle}</p>}
            </div>
        </Link>
    );
}
