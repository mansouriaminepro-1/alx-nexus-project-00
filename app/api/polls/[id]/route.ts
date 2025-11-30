
import { createClient } from '@/src/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const pollId = params.id;

    // 1. Fetch Poll Details, Owner, and Items
    const { data: poll, error: pollError } = await supabase
      .from('poll')
      .select(`
        *,
        owner:owners(*),
        items:poll_items(*)
      `)
      .eq('id', pollId)
      .single();

    if (pollError || !poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    // 2. Fetch Vote Counts from 'votes' table using 'poll_item_id'
    const { data: votesData, error: votesError } = await supabase
      .from('votes')
      .select('poll_item_id')
      .eq('poll_id', pollId);

    if (votesError) {
      console.error('Error fetching votes:', votesError);
    }

    // Calculate votes per item
    const voteCounts: Record<string, number> = {};
    let totalVotes = 0;

    if (votesData) {
      votesData.forEach((v: any) => {
        const itemId = v.poll_item_id;
        voteCounts[itemId] = (voteCounts[itemId] || 0) + 1;
        totalVotes++;
      });
    }

    // 3. Format Response
    const formattedData = {
      id: poll.id,
      title: poll.title,
      question: poll.description,
      endsIn: '24h',
      totalVotes: totalVotes,
      createdAt: new Date(poll.created_at).getTime(),
      restaurant: {
        name: poll.owner?.restaurant_name || 'Restaurant',
        location: 'Location',
        description: 'Welcome to our battle!',
        avatar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&q=80',
        website: '#'
      },
      items: (poll.items || []).map((item: any) => ({
        id: item.id,
        name: item.item_name,
        description: item.item_description,
        image: item.image_url,
        price: item.price ? `$${item.price}` : '',
        votes: voteCounts[item.id] || 0
      })).sort((a: any, b: any) => a.id.localeCompare(b.id))
    };

    return NextResponse.json(formattedData);

  } catch (error: any) {
    console.error('Fetch Poll Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const pollId = params.id;

    // 1. Check Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Verify Ownership
    const { data: poll, error: pollError } = await supabase
      .from('poll')
      .select('owner_id')
      .eq('id', pollId)
      .single();

    if (pollError || !poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    if (poll.owner_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 3. Delete Poll (Cascading delete should handle items and votes if configured, otherwise delete manually)
    // Assuming cascade delete is set up in DB, or we delete items first.
    // For safety, let's try deleting the poll directly.
    const { error: deleteError } = await supabase
      .from('poll')
      .delete()
      .eq('id', pollId);

    if (deleteError) {
      console.error('Delete Poll Error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete poll' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Delete Poll API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
