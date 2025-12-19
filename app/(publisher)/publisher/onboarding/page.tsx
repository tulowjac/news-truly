'use client';

export default function PublisherOnboarding() {
    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to NewsTruly</h1>
                <p className="text-slate-500">Let's set up your publisher profile.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Organization Name</label>
                        <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="e.g. Springfield Gazette" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Municipality / Town</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                            <option>Select a town...</option>
                            <option>Springfield</option>
                            <option>Shelbyville</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Logo</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-500 hover:bg-slate-50 cursor-pointer">
                            Click to upload logo
                        </div>
                    </div>

                    <button className="w-full bg-publisher-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Create Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
