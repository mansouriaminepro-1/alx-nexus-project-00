-- Copy and paste this into your Supabase SQL Editor to set up the automation.

-- 1. Create the function that handles the insertion
-- This function takes the new user's ID and the 'restaurant_name' from the metadata
-- and inserts it into your public 'owners' table.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.owners (id, restaurant_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'restaurant_name'
  );
  return new;
end;
$$;

-- 2. Create the trigger to fire the function
-- This tells Postgres to run the above function every time a row is inserted into auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
