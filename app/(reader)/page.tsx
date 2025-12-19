import React from 'react';
import { getContentRepo } from '@/lib/repositories';
import { HeroSection } from '@/components/reader/HeroSection';
import { DiscoverySection } from '@/components/reader/DiscoverySection';
import { ArticleCard } from '@/components/reader/ArticleCard';
import { cn } from '@/lib/utils';

// --- Inline Mini-Cards for specific discovery sections (keeping localized for now) ---

function EventCard({ item }: { item: any }) {
    return (
        <div className="group relative bg-reader-card border border-white/5 overflow-hidden hover:border-reader-accent/50 transition-all duration-300">
            <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="text-center bg-white/5 rounded p-2 min-w-[3.5rem]">
                        <div className="text-xs text-reader-secondary uppercase font-bold">
                            {new Date(item.startDate).toLocaleDateString(undefined, { month: 'short' })}
                        </div>
                        <div className="text-xl font-bold text-white font-serif-display">
                            {new Date(item.startDate).toLocaleDateString(undefined, { day: 'numeric' })}
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-reader-text font-serif-display mb-2 group-hover:text-reader-accent transition-colors">
                    {item.title}
                </h3>
                <p className="text-sm text-reader-secondary line-clamp-2 mb-4 flex-1">
                    {item.venueName}
                </p>

                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-white transition-colors">
                    Get Tickets
                </button>
            </div>
        </div>
    );
}

function DealCard({ item }: { item: any }) {
    return (
        <div className="flex bg-reader-card border border-white/5 group hover:bg-white/5 transition-colors">
            <div className="w-24 bg-white/5 flex items-center justify-center text-3xl shrink-0">
                {/* Placeholder Icon/Img */}
                🍕
            </div>
            <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white font-serif-display group-hover:text-reader-accent transition-colors">{item.title}</h3>
                    <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                        -20%
                    </span>
                </div>
                <p className="text-sm text-reader-secondary mt-1 line-clamp-1">{item.excerpt}</p>
                <div className="mt-2 text-xs text-reader-secondary/50 uppercase tracking-wide">
                    Exp: {new Date(item.validUntil).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}

function JobCard({ item }: { item: any }) {
    return (
        <div className="block bg-reader-card border border-white/5 p-5 hover:border-l-4 hover:border-l-reader-accent transition-all duration-200 cursor-pointer">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <span className="text-xs text-emerald-400 font-mono">{item.salaryRange}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-reader-secondary">
                <span className="font-bold text-white/60">{item.companyName}</span>
                <span>•</span>
                <span>{item.location}</span>
            </div>
        </div>
    );
}

export default async function ReaderHome() {
    const repo = getContentRepo();
    const [news, events, deals, jobs] = await Promise.all([
        repo.getNews(),
        repo.getEvents(),
        repo.getDeals(),
        repo.getJobs()
    ]);

    // Format news for carousel
    const featuredStories = news.slice(0, 5).map((item, idx) => ({
        ...item,
        image: idx % 2 === 0
            ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600'
            : 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600',
        category: idx === 0 ? "Breaking News" : "Politics"
    }));

    // Remaining stories for grid
    const feedStories = news.slice(1).map((item, idx) => ({
        ...item,
        image: idx % 2 === 0
            ? 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'
            : 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&q=80&w=800'
    }));

    return (
        <div className="min-h-screen bg-reader-bg pb-20">
            {/* Cinematic Hero Section */}
            <HeroSection featuredStories={featuredStories} />

            {/* Editorial Feed */}
            <div className="relative z-20 -mt-20 container mx-auto px-4 md:px-8">

                {/* Top Stories Section */}
                <div className="bg-reader-bg pt-12 pb-8">
                    <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                        <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-white">Top Stories</h2>
                        <span className="text-reader-secondary text-sm uppercase tracking-widest hidden md:block">Daily Briefing</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {feedStories.map((item, idx) => (
                            <div key={item.id} className={idx === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
                                <ArticleCard
                                    title={item.title}
                                    excerpt={item.excerpt}
                                    image={item.image}
                                    category="Local News"
                                    date={new Date(item.createdAt).toLocaleDateString()}
                                    href={`/news/${item.slug}`}
                                    size={idx === 0 ? "large" : "medium"}
                                    priority={idx < 2}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events Row */}
                <DiscoverySection title="Happening This Week" linkText="All Events" linkHref="/events" className="border-t border-white/5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {events.map(item => <EventCard key={item.id} item={item} />)}
                        {events.length < 4 && events.map(item => (
                            <EventCard key={`${item.id}-dup`} item={{ ...item, id: `${item.id}-dup` }} />
                        ))}
                    </div>
                </DiscoverySection>

                {/* 3-Column Utility Grid (Deals, Jobs) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-t border-white/5">

                    {/* Deals Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="font-serif-display text-2xl text-white mb-6">Exclusive Deals</h3>
                        <div className="space-y-3">
                            {deals.map(item => <DealCard key={item.id} item={item} />)}
                        </div>
                    </div>

                    {/* Jobs Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="font-serif-display text-2xl text-white mb-6">Local Opportunities</h3>
                        <div className="space-y-3">
                            {jobs.map(item => <JobCard key={item.id} item={item} />)}
                        </div>
                    </div>

                    {/* Advertisement / Subscribe Column */}
                    <div className="lg:col-span-4 bg-white/5 p-8 flex flex-col justify-center items-center text-center space-y-4 border border-white/5">
                        <h3 className="font-serif-display text-3xl text-white">NewsTruly Premium</h3>
                        <p className="text-reader-secondary text-sm">Support local journalism and get ad-free access to all stories.</p>
                        <button className="mt-4 px-8 py-3 bg-reader-accent text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
                            Subscribe Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
