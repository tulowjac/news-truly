import React from "react";
import Link from "next/link"; // Use Next.js Link for optimized navigation

export default function PublisherLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Ideally, we would get the current path here to set active state, 
    // but for this server component layout, we can just render the links.
    // Client components inside can handle active states if needed, 
    // or we can use a client component wrapper for the sidebar.
    // For MVP, we will keep it simple and assume the sidebar is static 
    // but styled correctly. To highlight "Dashboard" etc., we might need 
    // a client client component for the Navigation logic.
    // Let's create a "PublisherSidebar" component inline or separately if needed.
    // Actually, let's keep it simple for now and just style it.

    return (
        <div className="min-h-screen bg-publisher-bg text-publisher-text flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-publisher-card border-r border-publisher-accent hidden md:flex flex-col h-screen sticky top-0 z-30 shadow-publisher-card">
                <div className="p-6 border-b border-publisher-accent flex items-center gap-2">
                    {/* Brand Logo / Title */}
                    <div className="h-8 w-8 bg-publisher-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
                        N
                    </div>
                    <h1 className="text-xl font-serif font-bold text-publisher-text">Publisher</h1>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <SidebarLink href="/publisher/dashboard" label="Dashboard" icon={<LayoutGridIcon />} />
                    <SidebarLink href="/publisher/content" label="My Content" icon={<FileTextIcon />} />
                    <SidebarLink href="/publisher/create" label="Create New" icon={<PlusCircleIcon />} />
                    <SidebarLink href="/publisher/billing" label="Billing" icon={<CreditCardIcon />} />
                </nav>

                <div className="p-4 border-t border-publisher-accent bg-publisher-card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-publisher-accent border border-publisher-accent shadow-sm" />
                        <div>
                            <p className="text-sm font-medium text-publisher-text">Jane Publisher</p>
                            <p className="text-xs text-publisher-muted">Standard Plan</p>
                        </div>
                    </div>
                    <Link href="/" className="block w-full py-2 px-4 bg-publisher-accent/10 text-publisher-muted text-sm font-medium rounded-lg hover:bg-publisher-accent/20 hover:text-publisher-text transition-colors text-center">
                        &larr; Back to Reader App
                    </Link>
                </div>
            </aside >

            {/* Mobile Header & Main Content */}
            < div className="flex-1 flex flex-col min-h-screen" >
                <header className="bg-publisher-card border-b border-publisher-accent h-16 flex items-center px-6 justify-between md:hidden sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-slate-500 hover:text-publisher-primary">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </Link>
                        <span className="font-serif font-bold text-lg text-slate-800">Publisher Portal</span>
                    </div>
                    <button className="p-2 text-slate-500">
                        {/* Mobile Menu Icon Placeholder */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </header>

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div >
        </div >
    );
}

// Simple Helper Components for Icons to avoid large imports if not needed, 
// or use Lucide if available (it is installed).
// Let's assume standard icons for now.

function SidebarLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
    // Note: In a real app, use usePathname() to determine active state.
    // For this prototype, we'll rely on the user navigating to see the active state 
    // or just default styling. Ideally, we move this to a client component.

    return (
        <Link
            href={href}
            className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-publisher-muted rounded-lg transition-all duration-200 hover:bg-publisher-accent/10 hover:text-publisher-text active:bg-publisher-primary/10 active:text-publisher-primary focus:outline-none focus:ring-2 focus:ring-publisher-primary/20"
        >
            <span className="text-publisher-muted/70 group-hover:text-publisher-primary transition-colors duration-200">
                {icon}
            </span>
            {label}
        </Link>
    );
}

// Icons (Using minimalist SVG to avoid dependency issues in this quick edit, 
// but Lucide is better if we imported it. Since I cannot see imports, I'll inline SVGs safely)

const LayoutGridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
);

const FileTextIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
);

const PlusCircleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
    </svg>
);

const CreditCardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
);
