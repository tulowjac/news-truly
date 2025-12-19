import { Event, Deal, Job, Business } from "@/lib/types/content";

export function EventDetail({ event }: { event: Event }) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-reader-card rounded-2xl p-8 border border-white/10 md:flex gap-8 items-start">
                <div className="bg-white/5 w-full md:w-1/3 aspect-square rounded-xl flex items-center justify-center text-white/20">
                    Event Image
                </div>
                <div className="flex-1 space-y-4">
                    <span className="inline-block px-3 py-1 rounded bg-reader-secondary/20 text-reader-secondary text-xs uppercase font-bold tracking-wider">Event</span>
                    <h1 className="text-3xl font-serif font-bold text-white">{event.title}</h1>

                    <div className="space-y-2 text-sm text-reader-text">
                        <div className="flex gap-4 border-b border-white/5 pb-2">
                            <span className="text-reader-secondary w-20">Date</span>
                            <span className="font-bold text-white">{new Date(event.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-4 border-b border-white/5 pb-2">
                            <span className="text-reader-secondary w-20">Time</span>
                            <span className="font-bold text-white">{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex gap-4 border-b border-white/5 pb-2">
                            <span className="text-reader-secondary w-20">Venue</span>
                            <span className="font-bold text-white">{event.venueName}</span>
                        </div>
                        <div className="flex gap-4 border-b border-white/5 pb-2">
                            <span className="text-reader-secondary w-20">Cost</span>
                            <span className="font-bold text-white">{event.cost || 'Free'}</span>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="bg-white text-reader-bg font-bold px-6 py-3 rounded-lg hover:bg-reader-secondary transition-colors w-full md:w-auto">Get Tickets / RSVP</button>
                    </div>
                </div>
            </div>

            <div className="bg-reader-card rounded-2xl p-8 border border-white/10 text-reader-text leading-relaxed font-serif">
                <h3 className="text-xl font-bold text-white mb-4 sans-serif">About Event</h3>
                <div dangerouslySetInnerHTML={{ __html: event.content }} />
            </div>
        </div>
    )
}

export function DealDetail({ deal }: { deal: Deal }) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white text-reader-bg rounded-2xl p-8 md:flex gap-8 items-center border-[6px] border-reader-secondary/50">
                <div className="flex-1 space-y-4">
                    <span className="inline-block px-3 py-1 rounded bg-reader-bg/10 text-reader-bg text-xs uppercase font-bold tracking-wider">Exclusive Deal</span>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold">{deal.title}</h1>
                    <p className="text-lg opacity-80">{deal.excerpt}</p>

                    <div className="bg-reader-bg/5 p-4 rounded-lg border border-dashed border-reader-bg/20">
                        <div className="text-xs uppercase tracking-wide opacity-50 font-bold mb-1">Promo Code</div>
                        <div className="text-2xl font-mono font-bold tracking-widest">{deal.promoCode || 'NO CODE NEEDED'}</div>
                    </div>

                    <div className="text-sm opacity-60">Valid until {new Date(deal.validUntil).toLocaleDateString()}</div>
                </div>
                <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <button className="w-full bg-reader-bg text-white font-bold py-4 rounded-xl shadow-xl hover:scale-105 transition-transform">Claim Deal</button>
                </div>
            </div>
            <div className="bg-reader-card rounded-2xl p-8 border border-white/10 text-reader-text leading-relaxed">
                <h3 className="text-xl font-bold text-white mb-4">Details</h3>
                <div dangerouslySetInnerHTML={{ __html: deal.content }} />
            </div>
        </div>
    )
}

export function JobDetail({ job }: { job: Job }) {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header className="text-center space-y-4 py-8">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">{job.title}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">🏢 {job.companyName}</span>
                    <span className="flex items-center gap-1">📍 {job.location}</span>
                    <span className="flex items-center gap-1">💼 {job.employmentType}</span>
                    <span className="flex items-center gap-1">💰 {job.salaryRange}</span>
                </div>
                <button className="bg-reader-secondary text-reader-bg font-bold px-8 py-3 rounded-full hover:bg-white transition-colors">Apply Now</button>
            </header>

            <div className="bg-reader-card rounded-2xl p-8 border border-white/10 text-reader-text leading-relaxed">
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">Job Description</h3>
                <div dangerouslySetInnerHTML={{ __html: job.content }} />
            </div>
        </div>
    )
}
