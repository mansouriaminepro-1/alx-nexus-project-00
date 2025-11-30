import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const authClient = createClient(supabaseUrl, supabaseAnonKey);

async function testSignup() {
    const email = `test.user.${Date.now()}@gmail.com`;
    const password = 'password123';
    const restaurantName = `Test Restaurant ${Date.now()}`;

    console.log(`Testing signup with:`);
    console.log(`  Email: ${email}`);
    console.log(`  Restaurant Name: ${restaurantName}`);

    const { data, error } = await authClient.auth.signUp({
        email,
        password,
        options: {
            data: { restaurant_name: restaurantName },
        },
    });

    if (error) {
        console.error('❌ Signup failed:', error.message);
        return;
    }

    console.log('✅ Signup successful!');
    console.log('User ID:', data.user?.id);
    console.log('User metadata:', data.user?.user_metadata);
    console.log('\nNow check your Supabase owners table for a new row with this ID.');
}

testSignup();
