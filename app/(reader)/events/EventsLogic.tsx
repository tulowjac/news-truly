import Link from 'next/link';
import { getContentRepo } from '@/lib/repositories';
import { EventDetail } from '@/components/reader/ContentDetails';
import { notFound } from 'next/navigation';

// List Page
export async function EventsIndex() {
    const repo = getContentRepo();
    const events = await repo.getEvents();

    return (
        <div className="space-y-8">
            <header className="border-b border-white/10 pb-8">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Local Events</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                    <Link href={`/events/${event.slug}`} key={event.id} className="bg-reader-card rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex group">
                        <div className="w-24 bg-white/5 flex flex-col items-center justify-center p-2 text-center border-r border-white/5">
                            <span className="text-xs uppercase text-reader-secondary">{new Date(event.startDate).toLocaleString('default', { month: 'short' })}</span>
                            <span className="text-2xl font-bold text-white">{new Date(event.startDate).getDate()}</span>
                        </div>
                        <div className="p-4 flex-1">
                            <h3 className="font-bold text-white group-hover:text-reader-secondary transition-colors line-clamp-1">{event.title}</h3>
                            <p className="text-xs text-reader-secondary mt-1">{event.venueName} • {event.cost || 'Free'}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Detail Page
export async function EventPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const repo = getContentRepo();
    const event = await repo.getEventBySlug(slug);
    if (!event) notFound();
    return <EventDetail event={event} />;
}
