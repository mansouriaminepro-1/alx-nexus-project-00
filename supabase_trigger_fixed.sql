-- UPDATED TRIGGER TO HANDLE EMAIL CONFIRMATION
-- This version works whether email confirmation is enabled or disabled

-- 1. Drop the old trigger
drop trigger if exists on_auth_user_created on auth.users;

-- 2. Update the function to handle both cases
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Only insert if the user doesn't already exist in owners table
  -- This prevents duplicate inserts
  insert into public.owners (id, restaurant_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'restaurant_name'
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$;

-- 3. Create trigger that fires on BOTH insert and update
-- It will fire when user signs up AND when they confirm email
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row
  execute procedure public.handle_new_user();
