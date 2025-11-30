# 🥊 MENUFIGHT — Restaurant Menu Battle & Validation Platform

Validate new menu items before you launch them. Reduce risk. Make better decisions.

## 🌐 Live Demo

[🔗 Your Deployment URL Here]
*(Add the Vercel link once deployed)*

## 📂 GitHub Repository

[🔗 GitHub Repo URL Here]

## 📘 Overview

**MENUFIGHT** is a real-time decision tool for restaurants.
It allows chefs, restaurant managers, and food creators to compare two potential dishes, collect customer votes, and instantly see which dish has the highest chance of success before committing costs.

Restaurants frequently lose money when launching new dishes that customers don’t love. MENUFIGHT solves that by:

- ✔️ Testing ideas
- ✔️ Collecting customer sentiment
- ✔️ Showing clear results
- ✔️ Reducing menu-launch risk

## 🎯 Project Mission

To help restaurants make data-backed menu decisions in minutes—not weeks—using a simple, fun, and highly interactive poll-based system.

## 🧩 Primary Users

- Restaurants
- Cloud kitchens
- Cafés
- Food creators testing new recipes

## 🚀 Core Features

### 🔐 1. Authentication
- Sign up, login, logout
- Secure sessions with Supabase Auth
- Clean UI with validation

### 🗳️ 2. Create a Menu Battle (Poll)
- Add a title and question
- Upload two dish images
- Add descriptions
- Choose poll duration: 24h / 48h / 1 Week
- Input validation ensures no bad data enters the DB

### 🧑‍🤝‍🧑 3. Public Voting Page
- Accessed via a shareable link
- Users vote with one click
- Smooth animations
- No account required

### 📊 4. Restaurant Dashboard
- View total votes
- Track ongoing and past polls
- Measure performance:
  - Total Votes
  - Menu Wins
  - Active Reach
- Super-fast database queries (optimized with Supabase counts)

### 📈 5. Real-Time Result Calculation
- Instant display of winner
- Updated bar charts or progress indicators
- No page reload needed

## ⚙️ Technical Stack

### Frontend
- **Next.js 14** (App Router)
- **React + TypeScript**
- **Tailwind CSS**
- **shadcn/ui components**
- **React Hook Form + Zod**

### Backend
- **Supabase Auth**
- **Supabase Postgres**
- **Supabase Storage**
- **Supabase RLS** (Row Level Security)

### Deployment
- **Vercel** (Frontend + API Routes)
- **Supabase Cloud**

## 🧱 Architecture

### 📁 Folder Structure
```
src/
 ├── app/
 │    ├── (auth)/
 │    ├── dashboard/
 │    ├── create-poll/
 │    ├── poll/[id]/
 │    └── api/
 │         ├── dashboard/
 │         ├── polls/
 │         └── votes/
 ├── components/
 │    ├── home/
 │    ├── dashboard/
 │    ├── vote/
 │    ├── results/
 │    ├── forms/
 │    ├── ui/
 │    └── layout/
 ├── lib/
 │    ├── constants.ts
 │    └── supabaseClient.ts
 ├── types/
 │    ├── api.ts
 │    ├── poll.ts
 │    └── index.ts
```

### 🔒 Security Best Practices Applied
- Strict input validation on all API routes
- Database-side counting to avoid memory overload
- RLS policies: only owners can access their data
- HTTPS secure endpoints
- No sensitive data in client
- Centralized constants (no hardcoded URLs)
- Removed unused components + eliminated Vite leftovers

### ⚡ Performance Best Practices Applied
- Database aggregation instead of fetching full tables
- Image optimization via Next.js
- Clean state management (no over-rendering)
- Minimal dependencies
- Lazy-loaded sections
- Fast dashboard (~90–98% improvement with counts)

### 🎨 UI/UX Best Practices Applied
- Clear visual hierarchy
- Consistent spacing + typography scale
- Mobile-first adaptive layout
- Smooth micro-interactions
- High contrast and readability
- Accessible labels & aria attributes
- Polls created in less than 20 seconds

## 📘 Database Schema

### users
| Column | Type | Notes |
| :--- | :--- | :--- |
| id | uuid | PK |
| name | text | ✓ |
| restaurant_name | text | ✓ |

### polls
| Column | Type |
| :--- | :--- |
| id | uuid |
| title | text |
| question | text |
| owner_id | uuid (RLS) |
| duration | text |

### poll_items
| Column | Type |
| :--- | :--- |
| id | uuid |
| poll_id | uuid |
| name | text |
| image_url | text |

### votes
| Column | Type |
| :--- | :--- |
| id | uuid |
| poll_id | uuid |
| poll_item_id | uuid |
| ip_address | text |

## 🧪 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd menufight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add environment variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the project**
   ```bash
   npm run dev
   ```
