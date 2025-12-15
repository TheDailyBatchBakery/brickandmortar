# Brick & Mortar

A template website for businesses to sell pickup-only orders. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Customer-facing menu with categories
- Item options (size, flavor, add-ons)
- Shopping cart functionality
- Pickup date & time selector
- Order cutoff logic
- ZIP code restriction
- Order confirmation page
- Admin dashboard for order management
- Daily order view
- Order status management (New / Preparing / Ready)
- Download orders as CSV
- Toggle to close/open ordering

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for Netlify deployment. Simply connect your GitHub repository to Netlify and it will automatically build and deploy.

## Environment Variables

Create a `.env.local` file with:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (optional for now)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key (optional for now)

## Important Notes

### Current Setup (Development/Demo)
- Orders are stored in-memory and will reset on server restart
- Menu items are hardcoded in `/app/api/menu/route.ts`
- This works for testing but **NOT for production**

### For Production
You'll need to set up a database. Recommended options:
1. **Supabase** (easiest) - Free PostgreSQL database
2. **PostgreSQL** - Traditional database
3. **MongoDB** - NoSQL option

The code is structured to make this transition easy - just replace the storage functions in `/lib/storage/orders.ts` and `/app/api/menu/route.ts` with database calls.

## Next Steps After Deployment

1. Set up a database (Supabase recommended)
2. Update API routes to use the database
3. Add authentication for admin dashboard
4. Customize menu items and business settings
5. Configure allowed ZIP codes
6. Set business hours and order cutoff times

