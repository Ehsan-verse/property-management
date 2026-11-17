# Hamzah's Manzil - Property Management Website

A premium, modern property rental website with a secure owner dashboard built with React, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### Public Website
- **Homepage** - Hero section with property introduction, building overview, and contact form
- **About Page** - Property information and facilities
- **Building Overview** - Interactive floor selector showing all 6 floors
- **Units Page** - Searchable and filterable rental units (14 total)
- **Unit Details** - Individual unit pages with rent info and facilities

### Private Owner Dashboard
- **Overview** - Dashboard with statistics, recent activity
- **Floors & Units** - Manage building floors and rental units
- **Tenant Management** - Add, edit, view tenant records
- **Rent & Payments** - Track rent collection and payment history
- **Expenses** - Property expense tracking
- **Maintenance** - Track maintenance requests
- **Wi-Fi Access** - Central management for common Wi-Fi network
- **Enquiries** - View and manage visitor enquiries
- **Reports** - Financial and occupancy reports
- **Settings** - Website configuration

## 🏗️ Project Structure

```
hamzahs-manzil/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Common components (Button, StatusBadge, etc.)
│   │   ├── dashboard/      # Dashboard layout components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   └── ui/             # UI primitives
│   ├── data/               # Static data (floors, unit types)
│   ├── hooks/              # React hooks (useAuth)
│   ├── pages/
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── public/         # Public facing pages
│   ├── App.tsx
│   ├── main.tsx
│   ├── supabase.ts
│   └── types.ts            # TypeScript types
├── supabase/
│   ├── migrations/         # SQL migrations
│   └── rls_policies.sql    # Row Level Security policies
├── netlify.toml            # Netlify configuration
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Netlify account

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd hamzahs-manzil

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🔧 Supabase Setup

### 1. Create Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready

### 2. Run Migrations
```bash
# In Supabase SQL editor, run the initial migration
# File: supabase/migrations/20240101000000_initial_schema.sql

# Then apply RLS policies
# File: supabase/rls_policies.sql
```

### 3. Configure Authentication
1. Go to Authentication > Settings
2. Enable "Email" provider
3. Set "URL cranky configuration" to your app's URL and Netlify URL

### 4. Create Owner User
```sql
-- Run in SQL Editor to create the first owner account
insert into auth.users (email, hashed_password, email_confirmed_at)
values ('khalid0142759@gmail.com', 'hash-here', now());

-- Get the user ID and create profile
insert into profiles (user_id, full_name, role)
values (
  (select id from auth.users where email = 'khalid0142759@gmail.com'),
  'Khalid Anwar',
  'owner'
);
```

### 5. Store Files (Wi-Fi documents)
1. Go to Storage > Buckets
2. Create a new bucket: `owner-documents`
3. Set it to **Private**

### 6. Get API Keys
Go to Project Settings > API and copy:
- ` anon/public` (for frontend)
- Add these to your `.env` file

## 🚀 Netlify Deployment

### 1. Build the Project
```bash
npm run build
```

### 2. Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```

### 3. Deploy via Git (Recommended)
1. Push code to GitHub
2. Go to Netlify dashboard
3. New site from Git
4. Connect your repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 4. Environment Variables in Netlify
Add these in Site Settings > Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🏢 Property Structure

The building has 6 floors:

| Floor | Type | Rental Units |
|-------|------|--------------|
| Ground | Owner Residence | N/A |
| 1st | Mixed | 2 (1 x 2 BHK, 1 x Room Set) |
| 2nd | All 1 BHK | 3 |
| 3rd | All 1 BHK | 3 |
| 4th | All 1 BHK | 3 |
| 5th | All 1 BHK | 3 |

**Total Rental Units: 14**

## 🔐 Security Features

- Row Level Security (RLS) on all tables
- Role-based access control (Owner, Admin, Tenant)
- Private document storage
- No tenant data exposed publicly
- Wi-Fi credentials never shown publicly
- Secure authentication via Supabase

## 🎨 Design System

Colors:
- `manzil-50` to `manzil-900` - Custom gray scale
- `manzil-gold` - Primary accent (#c5a880)

Typography: System font stack for clean, fast loading

Components:
- Card-based layout
- Subtle shadows and rounded corners
- Responsive grid system
- Smooth transitions

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🛠️ Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint code
```

## 📋 Database Tables

| Table | Purpose |
|-------|---------|
| properties | Property details (name, contact) |
| floors | Building floors |
| units | Rental units with rent, status |
| tenants | Tenant records |
| leases | Lease history |
| payments | Rent payments |
| documents | PDF/image storage |
| maintenance_requests | Maintenance tracking |
| expenses | Property expenses |
| enquiries | Visitor enquiries |
| wifi_settings | Common Wi-Fi config |
| wifi_unit_access | Per-unit Wi-Fi access |
| profiles | User roles |
| activity_logs | Audit trail |
| website_settings | Public settings |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Internal use only - Hamzah's Manzil Property Management