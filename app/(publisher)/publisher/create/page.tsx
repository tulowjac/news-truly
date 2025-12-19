import React from "react";
import Link from "next/link";

const CONTENT_TYPES = [
    {
        id: 'article',
        title: 'News Article',
        description: 'Share a story, announcement, or update.',
        icon: (
            <svg className="w-8 h-8 text-slate-400 group-hover:text-publisher-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        )
    },
    {
        id: 'event',
        title: 'Event',
        description: 'Promote a local event or gathering.',
        icon: (
            <svg className="w-8 h-8 text-slate-400 group-hover:text-publisher-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        id: 'deal',
        title: 'Deal / Savings',
        description: 'Offer a discount or special promotion.',
        icon: (
            <svg className="w-8 h-8 text-slate-400 group-hover:text-publisher-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
        )
    },
    {
        id: 'job',
        title: 'Job Listing',
        description: 'Hire for a local position.',
        icon: (
            <svg className="w-8 h-8 text-slate-400 group-hover:text-publisher-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    }
];

export default function CreateContentPage() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Create New Content</h1>
                <p className="text-slate-500 text-lg">What would you like to publish today?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CONTENT_TYPES.map((type) => (
                    <Link
                        key={type.id}
                        href={`/publisher/create/wizard?type=${type.id}`}
                        className="group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-publisher-primary/50 transition-all duration-300 flex flex-col gap-4 items-start"
                    >
                        <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-publisher-primary/10 transition-colors">
                            {type.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-publisher-primary transition-colors">{type.title}</h3>
                            <p className="text-slate-500">{type.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
