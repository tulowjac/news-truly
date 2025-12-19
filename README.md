# NewsTruly MVP

A hyper-local news platform built with Next.js 14+, Tailwind CSS, and Headless WordPress.

## Project Architecture

This project uses **Next.js Route Groups** to completely separate the visual themes and layouts for different user types:

- **`app/(reader)`**: The main news reading experience.
  - **Theme**: Dark Mode (Deep Evergreen).
  - **Layout**: Immersive, content-focused.
- **`app/(publisher)`**: The publisher portal for creating content.
  - **Theme**: Light Mode "SaaS" style.
  - **Layout**: Dashboard with Sidebar.
- **`app/(auth)`**: Authentication flows.
  - **Theme**: Neutral / Clean.

### Data Layer (Repository Pattern)

The app uses a Repository Pattern (`lib/repositories/ContentRepo.ts`) to abstract data fetching.
- **`MockContentRepo.ts`**: Currently active. Provides static data for development without a CMS.
- **`WPContentRepo.ts`**: (To implementation) Connects to WordPress via GraphQL/REST.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## WordPress Backend Setup (Required for Production)

To connect this frontend to a real WordPress instance, you must configure the following:

### 1. Plugins
Install these plugins on your WordPress site:
- **WPGraphQL**: For efficient content fetching.
- **Advanced Custom Fields (ACF)**: For structured data (Events, Deals).
- **WPGraphQL for ACF**: To expose ACF fields to GraphQL.
- **JWT Authentication for WP REST API**: For secure publisher actions.

### 2. Custom Post Types (CPTs)
Register the following CPTs (or use a CPT UI plugin):
- `event`
- `deal` (Savings)
- `job`
- `business`

### 3. ACF Groups
Create generic field groups for each type:
- **Events**: `start_date`, `end_date`, `venue_name`, `venue_address`, `cost`, `ticket_url`.
- **Deals**: `promo_code`, `valid_until`, `business_id` (Post Object).
- **Jobs**: `company_name`, `location`, `salary_range`, `employment_type` (Select), `apply_url`.
- **Businesses**: `address`, `phone`, `website`, `logo` (Image), `hours`.

### 4. Environment Variables
Create a `.env.local` file:
```env
WORDPRESS_API_URL=https://your-site.com/graphql
WORDPRESS_REST_URL=https://your-site.com/wp-json/wp/v2
USE_MOCK_DATA=false
```

## Publisher Workflow
1. Publishers log in via `/(auth)/login`.
2. Access the dashboard at `/(publisher)/dashboard`.
3. Create content via the Wizard `/(publisher)/create`.
4. Billing is scaffolded at `/(publisher)/billing` (requires Stripe integration).
