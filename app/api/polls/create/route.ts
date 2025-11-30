import { createClient } from '@/src/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Check Authentication
    let user = null;

    // Try Authorization header first (client-side token)
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    // Fallback to cookies if no user from header
    if (!user) {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Please log in first.' }, { status: 401 });
    }

    // 2. Parse Form Data
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const question = formData.get('question') as string;
    const duration = formData.get('duration') as string;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // 3. Calculate Closes At
    const now = new Date();
    let closesAt = new Date(now);
    switch (duration) {
      case '48h':
        closesAt.setHours(now.getHours() + 48);
        break;
      case '1 Week':
        closesAt.setDate(now.getDate() + 7);
        break;
      case '24h':
      default:
        closesAt.setHours(now.getHours() + 24);
        break;
    }

    // 4. Create Poll Record in DB
    const { data: poll, error: pollError } = await supabase
      .from('poll')
      .insert({
        owner_id: user.id,
        title,
        description: question,
        closes_at: closesAt.toISOString(),
        is_active: true,
      })
      .select()
      .single();

    if (pollError) {
      console.error('DB Poll Error:', pollError);
      throw new Error('Failed to create poll record');
    }

    const pollId = poll.id;
    const items = [];
    const contenders = ['A', 'B'];

    // 5. Process Items & Upload Images
    for (let i = 0; i < contenders.length; i++) {
      const key = contenders[i];
      const name = formData.get(`item${key}_name`) as string;
      const desc = formData.get(`item${key}_desc`) as string;
      const price = formData.get(`item${key}_price`) as string;
      const imageFile = formData.get(`item${key}_image`) as File | null;

      let imageUrl = 'https://via.placeholder.com/400?text=No+Image';

      // Upload Image if exists
      if (imageFile && imageFile.size > 0) {
        // Sanitize filename to avoid issues
        const fileExt = imageFile.name.split('.').pop() || 'jpg';
        const sanitizedFileName = `${Date.now()}-${key}.${fileExt}`;
        const filePath = `${pollId}/${sanitizedFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('poll_images')
          .upload(filePath, imageFile, {
            upsert: true
          });

        if (uploadError) {
          console.error(`Upload Error for ${key}:`, uploadError);
          // Fallback to placeholder if upload fails, don't crash the whole poll creation
        } else {
          const { data } = supabase.storage
            .from('poll_images')
            .getPublicUrl(filePath);
          imageUrl = data.publicUrl;
        }
      }

      items.push({
        poll_id: pollId,
        item_name: name || `Option ${key}`,
        item_description: desc || '',
        price: price ? parseFloat(price) : 0,
        image_url: imageUrl,
        position: i + 1,
      });
    }

    // 6. Insert Poll Items
    const { error: itemsError } = await supabase
      .from('poll_items')
      .insert(items);

    if (itemsError) {
      console.error('DB Items Error:', itemsError);
      // Clean up poll if items fail? For now, we throw to alert user.
      throw new Error('Failed to create poll items');
    }

    return NextResponse.json({ success: true, pollId });

  } catch (error: any) {
    console.error('Create Poll API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
