import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get poll by ID
app.get('/api/polls/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: poll, error: pollError } = await supabase
      .from('poll')
      .select('*, owners(*)')
      .eq('id', id)
      .single();

    if (pollError) throw pollError;

    const { data: items, error: itemsError } = await supabase
      .from('poll_items')
      .select('*')
      .eq('poll_id', id)
      .order('position');

    if (itemsError) throw itemsError;

    // Fetch votes for this poll
    const { data: votesData, error: votesError } = await supabase
      .from('votes')
      .select('poll_item_id')
      .eq('poll_id', id);

    if (votesError) console.error('Error fetching votes:', votesError);

    // Calculate vote counts
    const voteCounts = {};
    let totalVotes = 0;
    if (votesData) {
      votesData.forEach(v => {
        if (v.poll_item_id) {
          voteCounts[v.poll_item_id] = (voteCounts[v.poll_item_id] || 0) + 1;
          totalVotes++;
        }
      });
    }

    // Calculate time remaining
    const endsAt = new Date(poll.closes_at);
    const now = new Date();
    const diff = endsAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const endsIn = diff > 0 ? `${hours}h ${minutes}m` : 'Ended';

    res.json({
      id: poll.id,
      title: poll.title,
      question: poll.description,
      endsIn,
      totalVotes: totalVotes,
      restaurant: {
        name: poll.owners?.restaurant_name || 'Restaurant',
        location: 'Local Area',
        description: 'Helping decide the next menu item!',
        avatar: poll.owners?.restaurant_logo_url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&q=80',
        website: ''
      },
      items: items.map(item => ({
        id: item.id,
        name: item.item_name,
        description: item.item_description || '',
        image: item.image_url,
        price: item.price ? `$${item.price}` : '',
        votes: voteCounts[item.id] || 0
      }))
    });
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create poll
app.post('/api/polls/create', upload.fields([
  { name: 'itemA_image', maxCount: 1 },
  { name: 'itemB_image', maxCount: 1 }
]), async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { title, question, duration } = req.body;
    const files = req.files;

    // Upload images
    const uploadImage = async (file, path) => {
      const { error } = await supabase.storage
        .from('poll-images')
        .upload(path, file.buffer, { contentType: file.mimetype });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage
        .from('poll-images')
        .getPublicUrl(path);
      return publicUrl;
    };

    const timestamp = Date.now();
    const imageAUrl = await uploadImage(files.itemA_image[0], `${user.id}/${timestamp}-a`);
    const imageBUrl = await uploadImage(files.itemB_image[0], `${user.id}/${timestamp}-b`);

    // Calculate end time
    const durationMs = duration === '24h' ? 24 * 60 * 60 * 1000
      : duration === '48h' ? 48 * 60 * 60 * 1000
        : 7 * 24 * 60 * 60 * 1000;
    const closesAt = new Date(Date.now() + durationMs).toISOString();

    // Create poll
    const { data: poll, error: pollError } = await supabase
      .from('poll')
      .insert({
        owner_id: user.id,
        title,
        description: question || 'Which one are you ordering?',
        duration,
        closes_at: closesAt,
        is_active: true,
      })
      .select()
      .single();

    if (pollError) throw pollError;

    // Create poll items
    const { error: itemsError } = await supabase
      .from('poll_items')
      .insert([
        {
          poll_id: poll.id,
          item_name: req.body.itemA_name,
          item_description: req.body.itemA_desc,
          price: parseFloat(req.body.itemA_price) || 0,
          image_url: imageAUrl,
          position: 0,
        },
        {
          poll_id: poll.id,
          item_name: req.body.itemB_name,
          item_description: req.body.itemB_desc,
          price: parseFloat(req.body.itemB_price) || 0,
          image_url: imageBUrl,
          position: 1,
        }
      ]);

    if (itemsError) throw itemsError;

    res.json({ pollId: poll.id });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: error.message });
  }
});

// Vote on poll
app.post('/api/polls/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId } = req.body;

    // Get user if authenticated (optional)
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id;
    }

    // Insert vote
    const { error } = await supabase
      .from('votes')
      .insert({
        poll_id: id,
        poll_item_id: itemId,
        user_id: userId
      });

    if (error) throw error;

    res.json({ success: true });
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ error: error.message });
  }
});

// Auth signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, restaurantName } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { restaurant_name: restaurantName } }
    });

    if (authError) throw authError;

    // Create owner record
    if (authData.user) {
      await supabase.from('owners').upsert({
        id: authData.user.id,
        restaurant_name: restaurantName,
        owner_name: email.split('@')[0],
        created_at: new Date().toISOString(),
      });
    }

    res.json({ success: true, session: authData.session });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Dashboard Data
app.get('/api/dashboard', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // 1. Fetch Owner Information
    let { data: owner, error: ownerError } = await supabase
      .from('owners')
      .select('*')
      .eq('id', user.id)
      .single();

    if (ownerError || !owner) {
      // Fallback using auth metadata
      owner = {
        restaurant_name: user.user_metadata?.restaurant_name || 'My Restaurant',
        owner_name: user.email?.split('@')[0] || 'Chef'
      };
    }

    // 2. Fetch Polls for Owner with Items
    const { data: polls, error: pollsError } = await supabase
      .from('poll')
      .select(`
        *,
        poll_items (
          id,
          item_name,
          item_description,
          image_url,
          price,
          position
        )
      `)
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (pollsError) throw pollsError;

    // 3. Fetch Vote Counts Aggregated from 'votes' table
    const pollIds = polls.map(p => p.id);
    let voteCounts = {};
    let itemVoteCounts = {}; // key: poll_item_id
    let uniqueIps = new Set();

    if (pollIds.length > 0) {
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select('poll_id, poll_item_id, ip_address')
        .in('poll_id', pollIds);

      if (!votesError && votesData) {
        votesData.forEach((v) => {
          voteCounts[v.poll_id] = (voteCounts[v.poll_id] || 0) + 1;
          if (v.poll_item_id) {
            itemVoteCounts[v.poll_item_id] = (itemVoteCounts[v.poll_item_id] || 0) + 1;
          }
          if (v.ip_address) uniqueIps.add(v.ip_address);
        });
      }
    }

    // 4. Transform Data for Frontend
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
      const items = (poll.poll_items || []).map((item) => {
        const votes = itemVoteCounts[item.id] || 0;
        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        return {
          id: item.id,
          name: item.item_name,
          description: item.item_description || '',
          image: item.image_url || 'https://via.placeholder.com/400?text=No+Image',
          price: item.price ? `$${item.price}` : '',
          votes,
          percentage
        };
      });

      const coverImage = items.length > 0
        ? items[0].image
        : 'https://via.placeholder.com/400?text=No+Image';

      return {
        id: poll.id,
        title: poll.title,
        status: isActive ? 'Active' : 'Completed',
        endsIn: timeLabel,
        totalVotes,
        date: new Date(poll.created_at).toLocaleDateString(),
        image: coverImage,
        items, // Return all items with vote data
        winRate: isActive ? 'Leading' : 'Winner',
      };
    });

    const activePolls = transformedPolls.filter(p => p.status === 'Active');
    const historyPolls = transformedPolls.filter(p => p.status === 'Completed');

    const totalVotesAllTime = Object.values(voteCounts).reduce((a, b) => a + b, 0);

    res.json({
      owner: {
        name: owner?.owner_name || owner?.restaurant_name || 'Chef',
        restaurantName: owner?.restaurant_name || 'My Restaurant',
        email: user.email || ''
      },
      stats: {
        totalVotes: totalVotesAllTime,
        menuWins: historyPolls.length,
        activeReach: uniqueIps.size,
      },
      activePolls,
      historyPolls
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

