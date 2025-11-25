
export interface PollItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  votes: number;
}

export interface PollData {
  id: string;
  title: string;
  question: string;
  endsIn: string;
  totalVotes: number;
  restaurant: {
    name: string;
    location: string;
    description: string;
    avatar: string;
    website: string;
  };
  items: PollItem[];
  createdAt: number;
}

const DEMO_POLL: PollData = {
  id: 'battle-demo',
  title: 'The Ultimate Cheat Day Burger',
  question: 'Which one are you ordering this Friday?',
  endsIn: '14h 32m',
  totalVotes: 1243, 
  createdAt: Date.now(),
  restaurant: {
    name: 'Gotham Burgers',
    location: '123 Flavor St, New York',
    description: 'We craft the juiciest, most insane burgers in the city using premium wagyu blends.',
    avatar: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    website: 'gothamburgers.com'
  },
  items: [
    {
      id: 'A',
      name: 'The Truffle Smash',
      description: 'Double wagyu patty, black truffle mayo, caramelized onions, aged swiss cheese on brioche.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '$18.00',
      votes: 812,
    },
    {
      id: 'B',
      name: 'Classic BBQ Stack',
      description: 'Slow-smoked brisket topper, crispy onion rings, house bourbon BBQ sauce, cheddar melt.',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '$16.50',
      votes: 431,
    }
  ]
};

// Helper to get all polls from storage
const getStoredPolls = (): Record<string, PollData> => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem('menufight_polls');
    return stored ? JSON.parse(stored) : { [DEMO_POLL.id]: DEMO_POLL };
};

// Save all polls to storage
const savePolls = (polls: Record<string, PollData>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('menufight_polls', JSON.stringify(polls));
};

export const createPoll = (poll: PollData) => {
    const polls = getStoredPolls();
    polls[poll.id] = poll;
    savePolls(polls);
    return poll;
};

export const getPollData = (id: string): PollData | null => {
  const polls = getStoredPolls();
  return polls[id] || polls['battle-demo'] || null;
};

export const castVote = (pollId: string, itemId: string): PollData | null => {
  const polls = getStoredPolls();
  const currentPoll = polls[pollId];

  if (!currentPoll) return null;
  
  const updatedItems = currentPoll.items.map(item => {
    if (item.id === itemId) {
      return { ...item, votes: item.votes + 1 };
    }
    return item;
  });

  const updatedPoll = {
    ...currentPoll,
    totalVotes: currentPoll.totalVotes + 1,
    items: updatedItems
  };

  polls[pollId] = updatedPoll;
  savePolls(polls);
  
  // Save user vote for this specific poll to prevent double voting locally
  localStorage.setItem(`menufight_voted_${pollId}`, itemId);
  
  return updatedPoll;
};

export const getUserVote = (pollId: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(`menufight_voted_${pollId}`);
};
