-- Row Level Security Policies for Hamzah's Manzil
-- Apply these policies after running the initial schema migration

-- ============================================================================
-- Properties - No direct access needed (admin only via other tables)
-- ============================================================================

-- ============================================================================
-- Floors
-- ============================================================================
create policy "Public can read floors for building overview"
  on floors for select
  using (true);

create policy "Admin can manage floors"
  on floors for all
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Units
-- ============================================================================
create policy "Public can read published units"
  on units for select
  using (is_published = true);

create policy "Admin can read all units"
  on units for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can insert units"
  on units for insert
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can update units"
  on units for update
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can delete units"
  on units for delete
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Tenants
-- ============================================================================
create policy "Admin can read all tenants"
  on tenants for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Tenants can read their own record"
  on tenants for select
  using (
    auth.role() = 'tenant' and
    id = current_setting('request.jwt.sub')::uuid
  );

create policy "Admin can insert tenants"
  on tenants for insert
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can update tenants"
  on tenants for update
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can delete tenants"
  on tenants for delete
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Leases
-- ============================================================================
create policy "Admin can read all leases"
  on leases for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Tenants can read their own leases"
  on leases for select
  using (
    auth.role() = 'tenant' and
    tenant_id = current_setting('request.jwt.sub')::uuid
  );

create policy "Admin can insert leases"
  on leases for insert
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can update leases"
  on leases for update
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can delete leases"
  on leases for delete
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Payments
-- ============================================================================
create policy "Admin can read all payments"
  on payments for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Tenants can read their own payments"
  on payments for select
  using (
    auth.role() = 'tenant' and
    tenant_id = current_setting('request.jwt.sub')::uuid
  );

create policy "Admin can insert payments"
  on payments for insert
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can update payments"
  on payments for update
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can delete payments"
  on payments for delete
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Documents - Private storage
-- ============================================================================
create policy "Admin can read all documents"
  on documents for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Tenants can read their own documents"
  on documents for select
  using (
    auth.role() = 'tenant' and
    (tenant_id = current_setting('request.jwt.sub')::uuid or lease_id in (
      select id from leases where tenant_id = current_setting('request.jwt.sub')::uuid
    ))
  );

create policy "Admin can manage documents"
  on documents for all
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Maintenance Requests
-- ============================================================================
create policy "Public can create maintenance requests (as enquiries)"
  on maintenance_requests for insert
  with check (true);

create policy "Admin can read all maintenance requests"
  on maintenance_requests for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Tenants can read and create their own requests"
  on maintenance_requests for select
  using (auth.role() = 'tenant' and created_by = current_setting('request.jwt.sub')::uuid);

create policy "Tenants can create requests"
  on maintenance_requests for insert
  with check (auth.role() = 'tenant');

create policy "Admin can update maintenance requests"
  on maintenance_requests for update
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can delete maintenance requests"
  on maintenance_requests for delete
  using (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Expenses
-- ============================================================================
create policy "Admin can read all expenses"
  on expenses for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can manage expenses"
  on expenses for all
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Enquiries
-- ============================================================================
create policy "Public can create enquiries (with validation)"
  on enquiries for insert
  with check (
    length(visitor_name) > 0 and
    length(phone) > 0
  );

create policy "Admin can read all enquiries"
  on enquiries for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can update enquiries"
  on enquiries for update
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can delete enquiries"
  on enquiries for delete
  using (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- WiFi Settings - Private
-- ============================================================================
create policy "Admin can read wifi settings"
  on property_wifi_settings for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Admin can manage wifi settings"
  on property_wifi_settings for all
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- WiFi Unit Access
-- ============================================================================
create policy "Admin can read all wifi unit access"
  on wifi_unit_access for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

create policy "Tenants can check their unit's wifi access"
  on wifi_unit_access for select
  using (
    auth.role() = 'tenant' and
    unit_id in (select unit_id from tenants where id = current_setting('request.jwt.sub')::uuid)
  );

create policy "Admin can manage wifi unit access"
  on wifi_unit_access for all
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Profiles
-- ============================================================================
create policy "Users can read their own profile"
  on profiles for select
  using (id = current_setting('request.jwt.sub')::uuid);

create policy "Users can update their own profile"
  on profiles for update
  using (id = current_setting('request.jwt.sub')::uuid);

-- Allow owner/admin to read all profiles
create policy "Admin can read all profiles"
  on profiles for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Activity Logs - Read only for admin
-- ============================================================================
create policy "Admin can read activity logs"
  on activity_logs for select
  using (auth.role() = 'owner' or auth.role() = 'admin');

-- ============================================================================
-- Website Settings
-- ============================================================================
create policy "Public can read website settings"
  on website_settings for select
  using (true);

create policy "Admin can manage website settings"
  on website_settings for all
  using (auth.role() = 'owner' or auth.role() = 'admin')
  with check (auth.role() = 'owner' or auth.role() = 'admin');