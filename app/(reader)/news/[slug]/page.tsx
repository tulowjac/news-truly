import { getContentRepo } from '@/lib/repositories';
import ArticleView from '@/components/reader/ArticleView';
import { notFound } from 'next/navigation';

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const repo = getContentRepo();
    const article = await repo.getNewsBySlug(slug);

    if (!article) {
        notFound();
    }

    return <ArticleView article={article} />;
}
