import React from "react";
import { MOCK_METRICS, MOCK_POSTS } from "@/lib/mock-data";
import Link from "next/link";
// import { GlassButton } from "@/components/ui/glass/GlassButton"; // Removing potential build error source

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header / Welcome */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-publisher-text">Dashboard</h1>
                    <p className="text-publisher-muted mt-1">Welcome back to the NewsTruly Publisher Portal.</p>
                </div>

                <Link
                    href="/publisher/create"
                    className="inline-flex items-center justify-center px-6 py-2 bg-publisher-primary text-white rounded-xl font-medium hover:bg-publisher-primary-hover transition-colors shadow-sm active:scale-95"
                >
                    + Create New
                </Link>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    label="Total Views"
                    value={MOCK_METRICS.totalViews.toLocaleString()}
                    subtext={<span className="text-emerald-600 font-medium">↑ {MOCK_METRICS.viewsChange}% from last week</span>}
                />
                <MetricCard
                    label="Active Deals"
                    value={MOCK_METRICS.activeDeals.toString()}
                    subtext={<span className="text-amber-600">{MOCK_METRICS.dealsExpiringSoon} expiring soon</span>}
                />
                <MetricCard
                    label="Subscriber Revenue"
                    value={`$${MOCK_METRICS.revenue.toFixed(2)}`}
                    subtext={<span className="text-publisher-muted">Connect Stripe to earn</span>}
                />
            </div>

            {/* Recent Content Section */}
            <div className="bg-publisher-card rounded-publisher-card border border-publisher-accent shadow-publisher-card overflow-hidden">
                <div className="px-6 py-4 border-b border-publisher-accent flex items-center justify-between">
                    <h2 className="text-lg font-serif font-bold text-slate-800">Recent Content</h2>
                    <Link href="/publisher/content" className="text-sm font-medium text-publisher-primary hover:text-publisher-primary-hover">
                        View All
                    </Link>
                </div>
                <div className="divide-y divide-publisher-accent">
                    {MOCK_POSTS.slice(0, 3).map((post) => (
                        <div key={post.id} className="px-6 py-4 flex items-center justify-between hover:bg-publisher-accent/10 transition-colors">
                            <div>
                                <h3 className="font-medium text-publisher-text">{post.title}</h3>
                                <div className="text-sm text-publisher-muted flex items-center gap-2 mt-1">
                                    <span className="capitalize">{post.type}</span>
                                    <span>•</span>
                                    <span>Published {post.publishedAt || "Not yet"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                    ${post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                                    {post.status}
                                </span>
                                <button className="text-sm font-medium text-slate-400 hover:text-publisher-primary transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, subtext }: { label: string; value: string; subtext: React.ReactNode }) {
    return (
        <div className="bg-publisher-card p-6 rounded-publisher-card border border-publisher-accent shadow-publisher-card flex flex-col gap-2 transition-transform hover:-translate-y-0.5 duration-300">
            <h3 className="text-sm font-medium text-publisher-muted">{label}</h3>
            <p className="text-3xl font-bold text-publisher-text">{value}</p>
            <p className="text-xs">{subtext}</p>
        </div>
    );
}
