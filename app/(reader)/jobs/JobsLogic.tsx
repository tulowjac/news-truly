import Link from 'next/link';
import { getContentRepo } from '@/lib/repositories';
import { JobDetail } from '@/components/reader/ContentDetails';
import { notFound } from 'next/navigation';

// List Page
export async function JobsIndex() {
    const repo = getContentRepo();
    const jobs = await repo.getJobs();

    return (
        <div className="space-y-8">
            <header className="border-b border-white/10 pb-8">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Local Jobs</h1>
            </header>
            <div className="space-y-4">
                {jobs.map((job) => (
                    <Link href={`/jobs/${job.slug}`} key={job.id} className="bg-reader-card border border-white/10 p-6 rounded-xl flex justify-between items-center hover:bg-white/5 transition-colors group">
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-reader-secondary transition-colors">{job.title}</h3>
                            <div className="text-sm text-reader-secondary mt-1 flex gap-3">
                                <span>{job.companyName}</span>
                                <span>•</span>
                                <span>{job.location}</span>
                            </div>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="bg-white/10 px-3 py-1 rounded text-sm text-white mb-1 inline-block">{job.employmentType}</div>
                            <div className="text-sm text-reader-secondary">{job.salaryRange}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Detail Page
export async function JobPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const repo = getContentRepo();
    const job = await repo.getJobBySlug(slug);
    if (!job) notFound();
    return <JobDetail job={job} />;
}
