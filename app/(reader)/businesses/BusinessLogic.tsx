import Link from 'next/link';
import { getContentRepo } from '@/lib/repositories';
import { notFound } from 'next/navigation';

// List Page
export async function BusinessIndex() {
    const repo = getContentRepo();
    const businesses = await repo.getBusinesses();

    // Mock Empty State for MVP since mock repo returns empty
    // In a real app we'd just render the list
    const showEmpty = businesses.length === 0;

    return (
        <div className="space-y-8">
            <header className="border-b border-white/10 pb-8">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Local Businesses</h1>
                <p className="text-reader-secondary">Support local. Shop local.</p>
            </header>

            {showEmpty ? (
                <div className="text-center py-20 bg-reader-card rounded-xl border border-white/5">
                    <p className="text-reader-secondary">No businesses listed yet. Be the first!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {businesses.map((biz) => (
                        <Link href={`/businesses/${biz.slug}`} key={biz.id} className="bg-reader-card rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all p-4 text-center group">
                            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full mb-4 flex items-center justify-center text-2xl">
                                {biz.logo ? <img src={biz.logo} alt={biz.title} /> : '🏢'}
                            </div>
                            <h3 className="font-bold text-white group-hover:text-reader-secondary transition-colors">{biz.title}</h3>
                            <div className="text-xs text-reader-secondary mt-1">{biz.category}</div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

// Detail Page
export async function BusinessPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const repo = getContentRepo();
    const biz = await repo.getBusinessBySlug(slug);

    if (!biz) notFound();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center py-8">
                <div className="w-24 h-24 mx-auto bg-white/10 rounded-full mb-6 flex items-center justify-center text-4xl">
                    {biz.logo ? <img src={biz.logo} alt={biz.title} /> : '🏢'}
                </div>
                <h1 className="text-4xl font-serif font-bold text-white mb-2">{biz.title}</h1>
                <p className="text-reader-secondary">{biz.address}</p>
            </header>

            <div className="bg-reader-card rounded-2xl p-8 border border-white/10 text-reader-text leading-relaxed">
                <h3 className="text-xl font-bold text-white mb-4">About</h3>
                <div dangerouslySetInnerHTML={{ __html: biz.content }} />
            </div>
        </div>
    );
}
