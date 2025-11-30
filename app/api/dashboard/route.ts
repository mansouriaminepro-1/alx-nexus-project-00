
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Check Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch Owner Information
    let { data: owner, error: ownerError } = await supabase
      .from('owners')
      .select('*')
      .eq('id', user.id)
      .single();

    if (ownerError || !owner) {
      console.warn("Owner fetch error or missing (using fallback):", ownerError);
      // Fallback using auth metadata if available
      owner = {
        restaurant_name: user.user_metadata?.restaurant_name || 'My Restaurant',
        owner_name: user.email?.split('@')[0] || 'Chef'
      };
    }

    // 3. Fetch Polls for Owner with Items
    const { data: polls, error: pollsError } = await supabase
      .from('poll')
      .select(`
        *,
        poll_items (
          id,
          item_name,
          image_url
        )
      `)
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (pollsError) {
      console.error("Poll fetch error:", pollsError);
      throw new Error("Failed to load polls");
    }

    // 4. Fetch Vote Counts Aggregated from 'votes' table
    const pollIds = polls.map(p => p.id);
    let voteCounts: Record<string, number> = {};
    let itemVoteCounts: Record<string, number> = {}; // key: poll_item_id
    let uniqueIps = new Set<string>();

    if (pollIds.length > 0) {
      // Fetch votes for these polls
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select('poll_id, poll_item_id, ip_address')
        .in('poll_id', pollIds);

      if (!votesError && votesData) {
        votesData.forEach((v: any) => {
          voteCounts[v.poll_id] = (voteCounts[v.poll_id] || 0) + 1;
          if (v.poll_item_id) {
            itemVoteCounts[v.poll_item_id] = (itemVoteCounts[v.poll_item_id] || 0) + 1;
          }
          if (v.ip_address) uniqueIps.add(v.ip_address);
        });
      }
    }

    // 5. Transform Data for Frontend
    const now = new Date();

    const transformedPolls = polls.map((poll) => {
      const closesAt = new Date(poll.closes_at);
      const isActive = poll.is_active && closesAt > now;
      const totalVotes = voteCounts[poll.id] || 0;

      let timeLabel = '';
      if (isActive) {
        const diffMs = closesAt.getTime() - now.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0) {
          timeLabel = `${days}d left`;
        } else {
          timeLabel = `${hours}h left`;
        }
      } else {
        timeLabel = 'Completed';
      }

      // Process items with vote percentages
      const items = (poll.poll_items || []).map((item: any) => {
        const votes = itemVoteCounts[item.id] || 0;
        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        return {
          id: item.id,
          name: item.item_name,
          image: item.image_url || 'https://via.placeholder.com/400?text=No+Image',
          votes,
          percentage
        };
      });

      return {
        id: poll.id,
        title: poll.title,
        status: isActive ? 'Active' : 'Completed',
        endsIn: timeLabel,
        totalVotes,
        date: new Date(poll.created_at).toLocaleDateString(),
        items, // Return all items
        winRate: isActive ? 'Leading' : 'Winner',
      };
    });

    const activePolls = transformedPolls.filter(p => p.status === 'Active');
    const historyPolls = transformedPolls.filter(p => p.status === 'Completed');

    const totalVotesAllTime = Object.values(voteCounts).reduce((a, b) => a + b, 0);

    return NextResponse.json({
      owner: {
        name: owner?.owner_name || owner?.restaurant_name || 'Chef',
        restaurantName: owner?.restaurant_name || 'My Restaurant',
        email: user.email || ''
      },
      stats: {
        totalVotes: totalVotesAllTime,
        menuWins: historyPolls.length,
        activeReach: uniqueIps.size, // Unique voters across all polls
      },
      activePolls,
      historyPolls
    });

  } catch (error: any) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
