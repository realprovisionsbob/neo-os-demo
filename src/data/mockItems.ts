import { ZenItem } from '@/components/ZenCard';

export const mockZenItems: ZenItem[] = [
  {
    id: '1',
    source: 'email',
    title: 'Re: Q1 Partnership Proposal',
    body: 'Michael Chen from TechVentures wants to schedule a call about the partnership we discussed at the conference. He mentioned potential investment opportunities.',
    sender: 'Michael Chen',
    priority: 2,
    proposedAction: 'Reply with availability for next week. I drafted a response.',
    time: '2h ago'
  },
  {
    id: '2',
    source: 'neo',
    title: 'Approve Sysco Invoice?',
    body: 'Invoice from Sysco for $2,340.00 for Real Provisions. Amount matches expected monthly order.',
    priority: 2,
    proposedAction: 'Approve payment - this is a recurring vendor with correct amount.',
    time: 'Just now'
  },
  {
    id: '3',
    source: 'slack',
    title: 'New PR needs review',
    body: 'Sarah pushed the authentication refactor. 847 lines changed across 12 files. Tests are passing.',
    sender: 'Sarah (Engineering)',
    priority: 3,
    proposedAction: 'Schedule 30 min code review block tomorrow morning.',
    time: '45m ago'
  },
  {
    id: '4',
    source: 'calendar',
    title: 'Reminder: Dentist appointment tomorrow',
    body: 'Dr. Williams at 10:00 AM. Address: 1234 Medical Center Dr. Expected duration: 1 hour for cleaning.',
    priority: 3,
    proposedAction: 'I\'ve blocked your calendar and set a reminder for 9:15 AM.',
    time: 'Tomorrow'
  },
  {
    id: '5',
    source: 'task',
    title: 'Weekly report overdue',
    body: 'The investor update email was due yesterday. I have a draft ready based on last week\'s metrics.',
    priority: 1,
    proposedAction: 'Send the draft I prepared, or let me know what to change.',
    time: 'Overdue'
  },
  {
    id: '6',
    source: 'email',
    title: 'Newsletter: AI Weekly Digest',
    body: 'This week in AI: GPT-5 rumors, new open source models, and Apple\'s ML announcements. Low priority reading material.',
    sender: 'AI Weekly',
    priority: 5,
    proposedAction: 'Archive - I\'ll summarize if you want to catch up later.',
    time: '6h ago'
  },
  {
    id: '7',
    source: 'neo',
    title: 'Danni\'s birthday in 2 weeks',
    body: 'Based on your calendar, Danni\'s birthday is coming up on February 12th. Last year you took her to that sushi place downtown.',
    priority: 3,
    proposedAction: 'Would you like me to research restaurant options and make a reservation?',
    time: 'Heads up'
  },
  {
    id: '8',
    source: 'slack',
    title: 'Team lunch poll results',
    body: 'The team voted: Thai food won with 8 votes. Italian came second with 5. Friday at noon works for everyone.',
    sender: 'Team Social',
    priority: 4,
    proposedAction: 'Order from Siam Garden for Friday pickup? They have the best Pad Thai.',
    time: '3h ago'
  },
];

export const completedToday = 14;
export const dismissedToday = 7;
