export interface BaseContent {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML
    featuredImage?: string;
    createdAt: string;
    author: {
        name: string;
        avatar?: string;
    };
    town?: string;
}

export interface News extends BaseContent {
    type: 'news';
    topics: string[];
}

export interface Event extends BaseContent {
    type: 'event';
    startDate: string;
    endDate: string;
    venueName: string;
    address: string;
    ticketUrl?: string;
    cost?: string;
}

export interface Deal extends BaseContent {
    type: 'deal';
    businessId?: string; // Relation to business
    promoCode?: string;
    validUntil: string;
    redemptionInstructions?: string;
    claimUrl?: string; // If external
}

export interface Job extends BaseContent {
    type: 'job';
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
    salaryRange?: string;
    companyName: string; // Or relation to business
    location: string;
    applyUrl?: string;
}

export interface Business extends BaseContent {
    type: 'business';
    category: string;
    address: string;
    phone?: string;
    website?: string;
    hours?: string;
    logo?: string;
}

export type ContentItem = News | Event | Deal | Job | Business;
