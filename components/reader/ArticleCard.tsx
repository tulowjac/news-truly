import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
    title: string;
    excerpt?: string;
    image?: string;
    category?: string;
    author?: string;
    date?: string;
    href: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    priority?: boolean;
}

export function ArticleCard({
    title,
    excerpt,
    image,
    category,
    author,
    date,
    href,
    className,
    size = 'medium',
    priority = false,
}: ArticleCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative block w-full h-full overflow-hidden bg-reader-card transition-all duration-300",
                className
            )}
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-reader-surface flex items-center justify-center text-reader-secondary/20">
                        <span className="font-serif-display text-4xl">N</span>
                    </div>
                )}

                {/* Overlay for text legibility if needed, but we'll put text below for editorial feel */}
                {size === 'large' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                )}
            </div>

            <div className="p-5 flex flex-col gap-3">
                {/* Metadata */}
                <div className="flex items-center gap-3 text-xs font-medium tracking-widest uppercase text-reader-secondary">
                    {category && <span className="text-reader-accent">{category}</span>}
                    {date && <span>{date}</span>}
                </div>

                {/* Title */}
                <h3 className={cn(
                    "font-serif-display font-bold text-reader-text group-hover:text-reader-accent transition-colors duration-200 leading-tight",
                    size === 'large' ? "text-3xl md:text-4xl" : "text-xl"
                )}>
                    {title}
                </h3>

                {/* Excerpt */}
                {excerpt && size !== 'small' && (
                    <p className="text-sm leading-relaxed text-reader-secondary line-clamp-2 md:line-clamp-3">
                        {excerpt}
                    </p>
                )}

                {/* Author */}
                {author && (
                    <div className="mt-2 text-xs text-reader-secondary/60">
                        By <span className="text-reader-text">{author}</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
