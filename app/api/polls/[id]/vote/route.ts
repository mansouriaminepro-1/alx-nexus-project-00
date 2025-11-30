
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { id: pollId } = await params;
    const { itemId } = await request.json();

    // Get IP address
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    // Check if this IP has already voted for this poll
    const { data: existingVote, error: checkError } = await supabase
      .from('votes')
      .select('id')
      .eq('poll_id', pollId)
      .eq('ip_address', ip)
      .single();

    if (existingVote) {
      return NextResponse.json({ error: 'You have already voted in this poll.' }, { status: 403 });
    }

    // 1. Insert Vote into 'votes' table
    const { error } = await supabase
      .from('votes')
      .insert({
        poll_id: pollId,
        poll_item_id: itemId,
        ip_address: ip
      });

    if (error) {
      console.error('Vote Insert Error:', error);
      return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Vote API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
