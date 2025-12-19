import { ContentRepo } from "./ContentRepo";
import { News, Event, Deal, Job, Business } from "@/lib/types/content";

const MOCK_NEWS: News[] = [
    {
        id: "1",
        slug: "town-council-approves-park-renovation",
        title: "Town Council Approves New Park Renovation Budget",
        excerpt: "In a unanimous vote last night, the town council approved the $2M renovation plan for Central Park.",
        content: "<p>In a unanimous vote last night, the town council approved the $2M renovation plan for Central Park. The project includes a new playground, splash pad, and walking trails.</p>",
        createdAt: new Date().toISOString(),
        author: { name: "Sarah Jenkins" },
        town: "Springfield",
        type: "news",
        topics: ["Government", "Community"]
    },
    {
        id: "2",
        slug: "local-bakery-wins-national-award",
        title: "Main Street Bakery Wins National Sourdough Award",
        excerpt: "The beloved Main Street Bakery has been recognized nationally for their signature sourdough bread.",
        content: "<p>The beloved Main Street Bakery has been recognized nationally for their signature sourdough bread.</p>",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        author: { name: "Mike Ross" },
        town: "Springfield",
        type: "news",
        topics: ["Business", "Food"]
    }
];

const MOCK_EVENTS: Event[] = [
    {
        id: "3",
        slug: "summer-jazz-concert",
        title: "Summer Jazz Concert Series",
        excerpt: "Join us for an evening of smooth jazz in the park.",
        content: "<p>Join us for an evening of smooth jazz in the park.</p>",
        createdAt: new Date().toISOString(),
        author: { name: "Events Team" },
        type: "event",
        startDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        endDate: new Date(Date.now() + 86400000 * 5 + 7200000).toISOString(),
        venueName: "Central Park Bandstand",
        address: "123 Park Ave, Springfield",
        cost: "Free"
    }
];

const MOCK_DEALS: Deal[] = [
    {
        id: "4",
        slug: "50-off-pizza",
        title: "50% Off Large Pizzas",
        excerpt: "Get half off any large specialist pizza this weekend.",
        content: "<p>Get half off any large specialist pizza this weekend.</p>",
        createdAt: new Date().toISOString(),
        author: { name: "Pizza Palace" },
        type: "deal",
        validUntil: new Date(Date.now() + 86400000 * 3).toISOString(),
        promoCode: "PIZZA50",
        businessId: "biz-1"
    }
];

const MOCK_JOBS: Job[] = [
    {
        id: "5",
        slug: "barista-full-time",
        title: "Experienced Barista",
        excerpt: "We are looking for an experienced barista to join our morning team.",
        content: "<p>We are looking for an experienced barista to join our morning team.</p>",
        createdAt: new Date().toISOString(),
        author: { name: "Coffee Bean" },
        type: "job",
        employmentType: "Full-time",
        salaryRange: "$18-22/hr",
        companyName: "Coffee Bean Co.",
        location: "Downtown Springfield"
    }
];

export class MockContentRepo implements ContentRepo {
    async getNews(): Promise<News[]> {
        return MOCK_NEWS;
    }
    async getNewsBySlug(slug: string): Promise<News | null> {
        return MOCK_NEWS.find(n => n.slug === slug) || null;
    }
    async getEvents(): Promise<Event[]> {
        return MOCK_EVENTS;
    }
    async getEventBySlug(slug: string): Promise<Event | null> {
        return MOCK_EVENTS.find(e => e.slug === slug) || null;
    }
    async getDeals(): Promise<Deal[]> {
        return MOCK_DEALS;
    }
    async getDealBySlug(slug: string): Promise<Deal | null> {
        return MOCK_DEALS.find(d => d.slug === slug) || null;
    }
    async getJobs(): Promise<Job[]> {
        return MOCK_JOBS;
    }
    async getJobBySlug(slug: string): Promise<Job | null> {
        return MOCK_JOBS.find(j => j.slug === slug) || null;
    }
    async getBusinesses(): Promise<Business[]> {
        return [];
    }
    async getBusinessBySlug(slug: string): Promise<Business | null> {
        return null;
    }
    async searchContent(query: string): Promise<(News | Event | Deal | Job)[]> {
        const q = query.toLowerCase();
        const all = [...MOCK_NEWS, ...MOCK_EVENTS, ...MOCK_DEALS, ...MOCK_JOBS];
        return all.filter(item =>
            item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q)
        );
    }
}
