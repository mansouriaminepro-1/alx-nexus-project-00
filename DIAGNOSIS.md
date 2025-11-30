# Diagnosis Checklist

Based on my investigation, here's what I found:

## ✅ What's Working
1. **SignupForm.tsx** - Correctly passes `restaurant_name` in metadata (line 60)
2. **AuthModal.tsx** - Correctly passes `restaurant_name` in metadata (line 89)
3. **Trigger SQL** - You confirmed you ran it
4. **Test showed success** - We saw a row in the owners table with restaurant_name

## ❓ Possible Issues

### Issue 1: Email Confirmation Required
- Supabase might require email confirmation before the user is "confirmed"
- The trigger might only fire for CONFIRMED users
- Check: Supabase Dashboard → Authentication → Settings → Email Auth → "Enable email confirmations"

### Issue 2: RLS (Row Level Security) Policies
- The `owners` table might have RLS enabled
- RLS could be blocking the trigger from inserting
- The trigger runs with `security definer` which should bypass RLS, but let's verify

### Issue 3: Trigger Error Not Visible
- If the trigger fails, the signup might still succeed
- The error would be silent to the user
- We need to check Supabase logs

## Next Steps to Diagnose

1. **Check Supabase Logs**:
   - Go to Supabase Dashboard → Logs → Postgres Logs
   - Look for errors related to the trigger

2. **Check Email Confirmation Settings**:
   - Go to Authentication → Settings
   - See if "Enable email confirmations" is ON
   - If yes, users must confirm email before trigger fires

3. **Check RLS Policies**:
   - Go to Table Editor → owners → RLS tab
   - See what policies exist

4. **Test with Real Email**:
   - Sign up with a real email you can access
   - Confirm the email
   - Check if row appears in owners table

## Which issue do you think it is?
