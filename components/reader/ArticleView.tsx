import Link from 'next/link';
import { News } from '@/lib/types/content';

export default function ArticleView({ article }: { article: News }) {
    return (
        <article className="max-w-4xl mx-auto bg-reader-card rounded-2xl overflow-hidden border border-white/5">
            <header className="p-8 md:p-12 space-y-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <span className="bg-reader-secondary/20 text-reader-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {article.town || 'News'}
                    </span>
                    {article.topics.map(topic => (
                        <span key={topic} className="text-reader-secondary/70 text-xs uppercase tracking-wider">#{topic}</span>
                    ))}
                </div>

                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                    {article.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-reader-secondary border-t border-white/10 pt-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/10"></div>
                        <div>
                            <div className="font-bold text-white">{article.author.name}</div>
                            <div className="text-xs">Author</div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-white/10"></div>
                    <div>
                        <div className="text-white">{new Date(article.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs">Published</div>
                    </div>
                </div>
            </header>

            <div className="p-8 md:p-12 text-reader-text leading-relaxed space-y-6 font-serif text-lg">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="bg-white/5 p-8 text-center">
                <h3 className="text-white font-bold mb-2">Enjoying this story?</h3>
                <p className="text-sm text-reader-secondary mb-4">Support local journalism by subscribing or sharing.</p>
                <div className="flex justify-center gap-4">
                    <button className="px-6 py-2 bg-reader-secondary text-reader-bg font-bold rounded-full hover:bg-white transition-colors">Subscribe Free</button>
                </div>
            </div>
        </article>
    );
}
