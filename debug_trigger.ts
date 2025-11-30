
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    console.error('❌ Missing environment variables. Please check .env.local');
    process.exit(1);
}

// Use service role key to bypass RLS for verification
const adminClient = createClient(supabaseUrl, serviceRoleKey);
const authClient = createClient(supabaseUrl, supabaseAnonKey);

async function testSignupFlow() {
    // Use a valid-looking email format
    const email = `test.user.${Date.now()}@gmail.com`;
    const password = 'password123';
    const restaurantName = `Test Restaurant ${Date.now()}`;

    console.log(`1. Attempting to sign up user: ${email}`);

    const { data: authData, error: authError } = await authClient.auth.signUp({
        email,
        password,
        options: {
            data: { restaurant_name: restaurantName },
        },
    });

    if (authError) {
        console.error('❌ Signup failed:', authError.message);
        return;
    }

    const userId = authData.user?.id;
    if (!userId) {
        console.error('❌ Signup succeeded but no user ID returned (maybe email confirmation required?)');
        console.log('Auth Data:', authData);
        return;
    }

    console.log(`✅ Signup successful. User ID: ${userId}`);
    console.log('2. Waiting 2 seconds for trigger to fire...');

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('3. Checking owners table...');
    const { data: ownerData, error: ownerError } = await adminClient
        .from('owners')
        .select('*')
        .eq('id', userId)
        .single();

    if (ownerError) {
        console.error('❌ Could not find owner record:', ownerError.message);
        console.log('   This means the trigger DID NOT fire or failed.');

        console.log('4. Attempting MANUAL insert to check for table constraints...');
        const { error: manualInsertError } = await adminClient
            .from('owners')
            .insert({
                id: userId,
                restaurant_name: restaurantName,
                // Intentionally omitting owner_name to see if it's required
            });

        if (manualInsertError) {
            console.error('❌ Manual insert FAILED:', manualInsertError.message);
            console.log('   This suggests a constraint violation (e.g. missing required field).');
        } else {
            console.log('✅ Manual insert SUCCEEDED.');
            console.log('   This means the table is fine, but the trigger is missing or broken.');
        }

    } else {
        console.log('✅ Found owner record:', ownerData);
        console.log('   The trigger IS working correctly.');
    }
}

testSignupFlow();
