import React, { useState } from 'react';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassChip } from '@/components/ui/glass/GlassChip';
import { cn } from '@/lib/utils'; // Assuming this exists or imports are handled

const CATEGORIES = ['News', 'Events', 'Savings', 'Jobs', 'Businesses'];

export function SearchLocationBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter(); // Import this

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
            {/* Main Search Bar Wrapper */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className={`relative z-20 group transition-all duration-300 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
            >
                {/* 
                   Combined Glass Pill 
                */}
                <div
                    className="flex flex-col md:flex-row items-center rounded-2xl md:rounded-full p-2 shadow-2xl border transition-colors"
                    style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(var(--glass-blur))',
                        borderColor: isFocused ? 'rgba(255,255,255,0.25)' : 'var(--glass-border)',
                        boxShadow: 'var(--glass-shadow)'
                    }}
                >

                    {/* Location Selector - Functional Link */}
                    <div className="w-full md:w-auto px-1">
                        <GlassButton
                            variant="primary"
                            size="sm"
                            href="/search?type=location" // Placeholder navigation
                            className="w-full md:w-auto rounded-xl md:rounded-full justify-start md:justify-center border-0 bg-white/5 hover:bg-white/10"
                        >
                            <MapPin className="w-4 h-4 text-reader-secondary mr-2" />
                            <span className="font-medium text-sm whitespace-nowrap">Follow your town</span>
                            <ChevronRight className="w-3 h-3 opacity-50 ml-1" />
                        </GlassButton>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-2" />

                    {/* Search Input - Functional */}
                    <div className="flex-1 w-full relative">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused ? 'text-white' : 'text-white/40'}`} />
                        <input
                            type="text"
                            placeholder="What are you interested in?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 pl-12 pr-4 py-3 text-base md:text-lg font-medium outline-none"
                        />
                    </div>

                    {/* Search Button (Mobile Only) */}
                    <button
                        onClick={handleSearch}
                        className="md:hidden w-full mt-2 bg-reader-secondary text-reader-bg font-bold py-3 rounded-xl"
                    >
                        Search
                    </button>
                </div>
            </motion.div>

            {/* Category Chips - reusing GlassChip */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-3"
            >
                {CATEGORIES.map((cat, i) => (
                    <GlassChip
                        key={cat}
                        label={cat}
                        href={`/${cat.toLowerCase()}`}
                    />
                ))}
            </motion.div>
        </div>
    );
}
