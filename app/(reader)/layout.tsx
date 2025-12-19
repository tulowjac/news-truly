import React from "react";

import { MouseRipple } from '@/components/reader/MouseRipple';

export default function ReaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-reader-bg text-reader-text selection:bg-reader-secondary selection:text-reader-bg relative">
            <MouseRipple />
            {/* Placeholder for Reader Header */}
            <header className="p-4 border-b border-white/10 sticky top-0 bg-reader-bg/80 backdrop-blur z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-serif font-bold tracking-tight">NewsTruly</h1>
                    <nav className="space-x-4 text-sm font-medium text-reader-secondary">
                        <a href="/" className="hover:text-white transition-colors">Home</a>
                        <a href="/search" className="hover:text-white transition-colors">Search</a>
                        <a href="/my-news" className="hover:text-white transition-colors">My News</a>
                        <a href="/publisher/dashboard" className="text-xs border border-white/20 px-2 py-1 rounded hover:bg-white/10">Publisher Portal</a>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto p-4 md:py-8">
                {children}
            </main>

            {/* Placeholder for Reader Footer */}
            <footer className="p-8 border-t border-white/10 mt-12 text-center text-reader-secondary text-sm">
                &copy; {new Date().getFullYear()} NewsTruly. Local News Reinvented.
            </footer>
        </div>
    );
}
