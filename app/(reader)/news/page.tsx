import Link from 'next/link';
import { getContentRepo } from '@/lib/repositories';

export default async function NewsIndexPage() {
    const repo = getContentRepo();
    const news = await repo.getNews();

    return (
        <div className="space-y-8">
            <header className="border-b border-white/10 pb-8">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Local News</h1>
                <p className="text-reader-secondary">Latest updates from your community.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <Link href={`/news/${item.slug}`} key={item.id} className="bg-reader-card rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group block">
                        <div className="aspect-video bg-white/5 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-white/20">Image</div>
                        </div>
                        <div className="p-5 space-y-3">
                            <div className="flex items-center gap-2 text-xs text-reader-secondary">
                                <span className="px-2 py-0.5 rounded bg-white/10 text-white">{item.town || "Local"}</span>
                                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="font-serif font-bold text-lg text-white group-hover:text-reader-secondary transition-colors">{item.title}</h3>
                            <p className="text-sm text-reader-secondary line-clamp-2">{item.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
