import Link from 'next/link';
import { getContentRepo } from '@/lib/repositories';
import { DealDetail } from '@/components/reader/ContentDetails';
import { notFound } from 'next/navigation';

// List Page
export async function SavingsIndex() {
    const repo = getContentRepo();
    const deals = await repo.getDeals();

    return (
        <div className="space-y-8">
            <header className="border-b border-white/10 pb-8">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Local Savings</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deals.map((deal) => (
                    <Link href={`/savings/${deal.slug}`} key={deal.id} className="bg-white text-reader-bg rounded-xl p-6 hover:shadow-lg transition-transform hover:-translate-y-1 block relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-reader-secondary text-reader-bg text-xs font-bold px-3 py-1 rounded-bl-lg">DEAL</div>
                        <div className="font-bold text-lg mb-2">{deal.title}</div>
                        <p className="text-sm opacity-80 mb-4">{deal.excerpt}</p>
                        <div className="text-xs uppercase font-bold tracking-wider opacity-60">Expires {new Date(deal.validUntil).toLocaleDateString()}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Detail Page
export async function DealPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const repo = getContentRepo();
    const deal = await repo.getDealBySlug(slug);
    if (!deal) notFound();
    return <DealDetail deal={deal} />;
}
