-- Initial schema for Hamzah's Manzil Property Management System
-- Create all tables and RLS policies

-- Extensions
create extension if not exists "uuid-ossp" version "^1.1.0";

-- Properties table (single property for this system)
create table properties (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  address text,
  phone text,
  email text,
  whatsapp_number text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Insert default property
insert into properties (name, phone, email) values
  ('Hamzah''s Manzil', '9873444716', 'khalid0142759@gmail.com');

-- Floors table
create table floors (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) not null,
  floor_number integer not null,
  name text not null,
  description text,
  is_owner_residence boolean default false,
  unit_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(property_id, floor_number)
);

-- Units table
create table units (
  id uuid primary key default uuid_generate_v4(),
  floor_id uuid references floors(id) not null,
  unit_number text not null,
  unit_type text not null check (unit_type in ('1 BHK', '2 BHK', 'Room Set')),
  bedrooms integer not null,
  bathrooms integer not null,
  status text not null default 'Vacant' check (status in ('Vacant', 'Occupied', 'Maintenance', 'Temporarily Unavailable')),
  monthly_rent numeric(10, 2) not null,
  security_deposit numeric(10, 2) not null,
  wifi_included boolean default false,
  wifi_charges numeric(10, 2) default 0,
  description text,
  facilities text[],
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(floor_id, unit_number)
);

-- Tenants table
create table tenants (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  email text,
  permanent_address text,
  emergency_contact text,
  family_members integer default 1,
  id_document_url text,
  id_document_type text,
  unit_id uuid references units(id),
  lease_start date,
  lease_end date,
  monthly_rent numeric(10, 2),
  security_deposit numeric(10, 2),
  status text not null default 'Active' check (status in ('Active', 'Former')),
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Leases table (for lease history)
create table leases (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references tenants(id) not null,
  unit_id uuid references units(id) not null,
  start_date date not null,
  end_date date,
  monthly_rent numeric(10, 2) not null,
  security_deposit numeric(10, 2) not null,
  status text not null default 'Active' check (status in ('Active', 'Expired', 'Terminated')),
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Payments table
create table payments (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references tenants(id) not null,
  unit_id uuid references units(id) not null,
  lease_id uuid references leases(id),
  payment_month text not null, -- Format: YYYY-MM
  amount numeric(10, 2) not null,
  payment_date date not null,
  payment_method text not null check (payment_method in ('Cash', 'UPI', 'Bank Transfer', 'Other')),
  transaction_ref text,
  status text not null default 'Paid' check (status in ('Paid', 'Pending', 'Partial', 'Cancelled')),
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(tenant_id, payment_month, payment_method)
);

-- Documents table
create table documents (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid references tenants(id),
  lease_id uuid references leases(id),
  unit_id uuid references units(id),
  file_url text not null,
  file_type text not null,
  file_name text not null,
  is_private boolean default true,
  created_at timestamp with time zone default now()
);

-- Maintenance requests table
create table maintenance_requests (
  id uuid primary key default uuid_generate_v4(),
  unit_id uuid references units(id) not null,
  tenant_id uuid references tenants(id),
  title text not null,
  description text,
  priority text not null default 'Medium' check (priority in ('Low', 'Medium', 'High', 'Urgent')),
  status text not null default 'Pending' check (status in ('Pending', 'In Progress', 'Completed')),
  estimated_cost numeric(10, 2) default 0,
  actual_cost numeric(10, 2) default 0,
  notes text,
  created_by uuid references tenants(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Expenses table
create table expenses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null check (category in ('Electricity', 'Water', 'Repairs', 'Cleaning', 'Maintenance', 'Internet/Wi-Fi', 'Other')),
  amount numeric(10, 2) not null,
  date date not null,
  unit_id uuid references units(id),
  description text,
  receipt_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enquiries table
create table enquiries (
  id uuid primary key default uuid_generate_v4(),
  visitor_name text not null,
  phone text not null,
  email text,
  interested_unit_id uuid references units(id),
  message text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Closed')),
  owner_responded boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Property WiFi settings table
create table property_wifi_settings (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) not null,
  wifi_ssid text,
  wifi_password_hash text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- WiFi unit access table
create table wifi_unit_access (
  id uuid primary key default uuid_generate_v4(),
  unit_id uuid references units(id) not null,
  lease_id uuid references leases(id),
  access_enabled boolean default false,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(unit_id)
);

-- Profile for users
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null unique,
  full_name text,
  role text not null default 'tenant' check (role in ('owner', 'admin', 'tenant')),
  phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Activity logs table
create table activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  action text not null,
  table_name text,
  record_id uuid,
  details jsonb,
  created_at timestamp with time zone default now()
);

-- Website settings table
create table website_settings (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) not null,
  show_contact_info boolean default true,
  show_unit_rent boolean default true,
  show_wifi_info boolean default true,
  rent_due_day integer default 5,
  announcement text,
  updated_at timestamp with time zone default now()
);

-- Insert default website settings
insert into website_settings (property_id, announcement) values
  (
    (select id from properties limit 1),
    'Welcome to Hamzah''s Manzil - Premium residential rental accommodation'
  );

-- Create indexes for better performance
create index idx_units_status on units(status);
create index idx_units_floor_id on units(floor_id);
create index idx_tenants_status on tenants(status);
create index idx_tenants_unit_id on tenants(unit_id);
create index idx_payments_tenant_id on payments(tenant_id);
create index idx_payments_payment_month on payments(payment_month);
create index idx_maintenance_units_id on maintenance_requests(unit_id);
create index idx_maintenance_status on maintenance_requests(status);
create index idx_enquiries_status on enquiries(status);
create index idx_wifi_unit_access_unit_id on wifi_unit_access(unit_id);

-- Enable row level security
alter table properties enable row level security;
alter table floors enable row level security;
alter table units enable row level security;
alter table tenants enable row level security;
alter table leases enable row level security;
alter table payments enable row level security;
alter table documents enable row level security;
alter table maintenance_requests enable row level security;
alter table expenses enable row level security;
alter table enquiries enable row level security;
alter table property_wifi_settings enable row level security;
alter table wifi_unit_access enable row level security;
alter table profiles enable row level security;
alter table activity_logs enable row level security;
alter table website_settings enable row level security;