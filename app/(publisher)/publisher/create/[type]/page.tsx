'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CreateEditorPage() {
    const params = useParams();
    const type = params.type as string;

    // Simple state for MVP form
    const [title, setTitle] = useState('');

    const typeLabels: Record<string, string> = {
        news: 'News Article',
        event: 'Event',
        deal: 'Deal',
        job: 'Job Listing'
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <header className="mb-8 border-b border-slate-200 pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">New {typeLabels[type] || 'Post'}</h1>
                    <p className="text-sm text-slate-500">Draft mode</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-300 rounded text-slate-600 font-medium hover:bg-slate-50">Save Draft</button>
                    <button className="px-4 py-2 bg-publisher-primary text-white rounded font-medium hover:bg-blue-700">Publish</button>
                </div>
            </header>

            <form className="space-y-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Title / Headline</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-publisher-primary focus:border-publisher-primary"
                        placeholder="Enter a catchy headline..."
                    />
                </div>

                {/* Dynamic Fields based on Type */}
                {type === 'event' && (
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                            <input type="datetime-local" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">End Date</label>
                            <input type="datetime-local" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                    </div>
                )}

                {type === 'deal' && (
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Promo Code</label>
                            <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="e.g. SAVE20" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Valid Until</label>
                            <input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                    </div>
                )}

                {/* Editor Placeholder */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                    <div className="border border-slate-300 rounded-lg min-h-[300px] bg-slate-50 flex items-center justify-center text-slate-400">
                        Rich Text Editor (TipTap) Placeholder
                    </div>
                </div>
            </form>
        </div>
    );
}
