import { News, Event, Deal, Job, Business } from "@/lib/types/content";

export interface ContentRepo {
    // News
    getNews(limit?: number, offset?: number): Promise<News[]>;
    getNewsBySlug(slug: string): Promise<News | null>;

    // Events
    getEvents(limit?: number): Promise<Event[]>;
    getEventBySlug(slug: string): Promise<Event | null>;

    // Deals
    getDeals(limit?: number): Promise<Deal[]>;
    getDealBySlug(slug: string): Promise<Deal | null>;

    // Jobs
    getJobs(limit?: number): Promise<Job[]>;
    getJobBySlug(slug: string): Promise<Job | null>;

    // Businesses
    getBusinesses(limit?: number): Promise<Business[]>;
    getBusinessBySlug(slug: string): Promise<Business | null>;

    // Search
    searchContent(query: string, type?: string): Promise<(News | Event | Deal | Job)[]>;
}
