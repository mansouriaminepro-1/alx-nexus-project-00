
import { createClient } from '@/src/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const restaurantName = formData.get('restaurantName') as string;

    if (!email || !password || !restaurantName) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Create Supabase Auth User
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          restaurant_name: restaurantName,
        },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'User creation failed.' }, { status: 500 });
    }

    // 2. Insert into 'owners' table using SERVICE ROLE key to bypass RLS/Auth issues during signup
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (serviceRoleKey) {
      const adminClient = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

      const { error: dbError } = await adminClient
        .from('owners')
        .upsert({
          id: authData.user.id,
          restaurant_name: restaurantName,
          owner_name: email.split('@')[0],
          created_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Owner Creation Error:', dbError);
        // Don't fail the whole request if only the profile fails, but log it
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
