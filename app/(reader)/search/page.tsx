'use client';
import { useState, useEffect } from 'react';
// Note: In a real app we would server action this, but for MVP client-side fetch from API is easier or just client side filtering of mock
// Since we have a repo, we'll make a server component search wrapper?
// Let's implement this as a Client component that calls an API route for now, or just imports repo if we are careful about bundles.
// Actually, let's keep it simple: Client component with a mock search function for MVP to demonstrate UI.

// REAL IMPLEMENTATION NOTE: Creating an API route /api/search to bridge the repo is cleaner.

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    // Stub results for UI
    const results = [
        { id: '1', title: 'Start typing to search...', type: 'info' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-serif font-bold text-white mb-6">Search</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search news, events, jobs..."
                    className="w-full bg-reader-card border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-reader-secondary text-lg"
                />
            </header>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'News', 'Events', 'Savings', 'Jobs'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab
                                ? 'bg-reader-secondary text-reader-bg font-bold'
                                : 'bg-white/5 text-reader-secondary hover:bg-white/10'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <div className="p-8 text-center text-reader-secondary border border-dashed border-white/10 rounded-xl">
                    Results will appear here.
                </div>
            </div>
        </div>
    );
}
