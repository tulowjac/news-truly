'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DiscoverySectionProps {
    title: string;
    linkText?: string;
    linkHref?: string;
    children: React.ReactNode;
    className?: string;
}

export function DiscoverySection({ title, linkText, linkHref, children, className = '' }: DiscoverySectionProps) {
    return (
        <section className={`py-12 md:py-16 ${className}`}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-end justify-between mb-8 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-serif font-bold text-white"
                    >
                        {title}
                    </motion.h2>

                    {linkText && linkHref && (
                        <Link href={linkHref} className="group flex items-center gap-2 text-reader-secondary hover:text-white transition-colors pb-1">
                            <span className="text-sm font-medium tracking-wide uppercase">{linkText}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
