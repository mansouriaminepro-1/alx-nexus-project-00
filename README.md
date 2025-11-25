# MenuFight

A modern restaurant polling application built with Vite, React, and Supabase.

## Features

- **Authentication**: Supabase auth with automatic owner profile creation
- **Poll Management**: Create and manage menu item battles
- **Real-time Voting**: Track votes and results in real-time
- **Premium UI**: Modern design with glassmorphism and micro-animations

## Tech Stack

- **Frontend**: Vite + React 19 + TypeScript
- **Backend**: Supabase (Auth + Database)
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mansouriaminepro-1/alx-nexus-project-00.git
   cd alx-nexus-project-00
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run the database trigger SQL (see `supabase_trigger_fixed.sql`)

5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

Run the SQL trigger in your Supabase SQL Editor to automatically sync user signups to the `owners` table:

```sql
-- See supabase_trigger_fixed.sql for the complete trigger code
```

## License

ISC
