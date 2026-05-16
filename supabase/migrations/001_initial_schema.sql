-- MedSync initial schema (run in Supabase SQL editor or via CLI)

create extension if not exists "uuid-ossp";

create type user_role as enum ('admin', 'doctor', 'staff', 'ambulance');
create type alert_severity as enum ('low', 'medium', 'high', 'critical');
create type resource_request_status as enum ('pending', 'approved', 'fulfilled', 'rejected');

create table hospitals (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  city text not null,
  address text,
  icu_beds_total int not null default 0 check (icu_beds_total >= 0),
  icu_beds_available int not null default 0 check (icu_beds_available >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  hospital_id uuid references hospitals(id) on delete set null,
  full_name text,
  role user_role not null default 'staff',
  created_at timestamptz not null default now()
);

create table alerts (
  id uuid primary key default uuid_generate_v4(),
  hospital_id uuid not null references hospitals(id) on delete cascade,
  title text not null,
  message text not null,
  severity alert_severity not null default 'medium',
  acknowledged boolean not null default false,
  created_at timestamptz not null default now()
);

create table resource_requests (
  id uuid primary key default uuid_generate_v4(),
  from_hospital_id uuid not null references hospitals(id) on delete cascade,
  to_hospital_id uuid references hospitals(id) on delete set null,
  resource_type text not null,
  quantity int not null check (quantity > 0),
  status resource_request_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table icu_snapshots (
  id uuid primary key default uuid_generate_v4(),
  hospital_id uuid not null references hospitals(id) on delete cascade,
  beds_occupied int not null,
  beds_total int not null,
  recorded_at timestamptz not null default now()
);

create index idx_alerts_hospital on alerts(hospital_id);
create index idx_alerts_created on alerts(created_at desc);
create index idx_icu_snapshots_hospital_time on icu_snapshots(hospital_id, recorded_at desc);

alter table hospitals enable row level security;
alter table profiles enable row level security;
alter table alerts enable row level security;
alter table resource_requests enable row level security;

-- Policies: refine per role in Phase 3
create policy "Authenticated read hospitals"
  on hospitals for select
  to authenticated
  using (true);

create policy "Authenticated read alerts"
  on alerts for select
  to authenticated
  using (true);
