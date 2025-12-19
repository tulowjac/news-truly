
export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type PostType = 'article' | 'event' | 'deal' | 'job';

export interface PublisherPost {
    id: string;
    title: string;
    type: PostType;
    status: PostStatus;
    publishedAt?: string;
    views: number;
    clicks?: number;
    town?: string;
    lastUpdated: string;
}

export interface DashboardMetrics {
    totalViews: number;
    viewsChange: number; // percentage
    activeDeals: number;
    dealsExpiringSoon: number;
    revenue: number;
}

export const MOCK_METRICS: DashboardMetrics = {
    totalViews: 12500,
    viewsChange: 12,
    activeDeals: 3,
    dealsExpiringSoon: 2,
    revenue: 0,
};

export const MOCK_POSTS: PublisherPost[] = [
    {
        id: '1',
        title: 'Summer Sale Event',
        type: 'event',
        status: 'published',
        publishedAt: '2 days ago',
        views: 1200,
        clicks: 45,
        town: 'Springfield',
        lastUpdated: '2025-06-15T10:00:00Z'
    },
    {
        id: '2',
        title: 'New Lunch Specials',
        type: 'deal',
        status: 'draft',
        views: 0,
        town: 'Springfield',
        lastUpdated: '2025-06-18T09:30:00Z'
    },
    {
        id: '3',
        title: 'Hiring: Head Chef',
        type: 'job',
        status: 'published',
        publishedAt: '1 week ago',
        views: 850,
        town: 'Shelbyville',
        lastUpdated: '2025-06-10T14:15:00Z'
    },
    {
        id: '4',
        title: 'Community Clean Up Drive',
        type: 'article',
        status: 'scheduled',
        views: 0,
        town: 'Springfield',
        lastUpdated: '2025-06-20T08:00:00Z'
    },
    {
        id: '5',
        title: 'Weekend Music Festival',
        type: 'event',
        status: 'published',
        publishedAt: '3 days ago',
        views: 3400,
        clicks: 120,
        town: 'Capital City',
        lastUpdated: '2025-06-14T11:20:00Z'
    }
];

export const PLANS = [
    {
        name: 'Basic',
        price: 0,
        features: ['5 Posts per month', 'Basic Analytics'],
        cta: 'Current Plan',
        highlight: false
    },
    {
        name: 'Pro Publisher',
        price: 29,
        features: ['Unlimited Posts', 'Priority placement', 'Advanced Analytics', '"Verified" Badge'],
        cta: 'Upgrade to Pro',
        highlight: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Multiple Users', 'API Access', 'Dedicated Support'],
        cta: 'Contact Sales',
        highlight: false
    }
];
