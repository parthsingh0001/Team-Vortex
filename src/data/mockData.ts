export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: 'online' | 'offline' | 'hybrid';
  category: string;
  maxParticipants: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: string;
  tags: string[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  eventId: string;
  teamId?: string;
  checkedIn: boolean;
  registeredAt: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  eventId: string;
  members: Participant[];
  maxMembers: number;
  inviteCode: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  channel: 'email' | 'whatsapp' | 'website';
  sentAt: string;
  eventId?: string;
  read: boolean;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'HackSphere 2026',
    description: 'A 48-hour hackathon bringing together developers, designers, and innovators to build the future. Cash prizes, mentorship, and networking opportunities.',
    date: '2026-03-15',
    time: '09:00 AM',
    venue: 'Innovation Hub, Building A',
    type: 'hybrid',
    category: 'Hackathon',
    maxParticipants: 200,
    registeredCount: 142,
    status: 'upcoming',
    tags: ['AI', 'Web3', 'Cloud'],
  },
  {
    id: '2',
    title: 'DevOps Summit',
    description: 'Learn about the latest in CI/CD, containerization, and infrastructure automation from industry experts.',
    date: '2026-03-20',
    time: '10:00 AM',
    venue: 'https://meet.google.com/abc-def-ghi',
    type: 'online',
    category: 'Conference',
    maxParticipants: 500,
    registeredCount: 318,
    status: 'upcoming',
    tags: ['DevOps', 'Docker', 'Kubernetes'],
  },
  {
    id: '3',
    title: 'UI/UX Design Workshop',
    description: 'Hands-on workshop covering Figma prototyping, design systems, and user research methodologies.',
    date: '2026-03-25',
    time: '02:00 PM',
    venue: 'Design Lab, Room 204',
    type: 'offline',
    category: 'Workshop',
    maxParticipants: 50,
    registeredCount: 47,
    status: 'upcoming',
    tags: ['Design', 'Figma', 'UX'],
  },
  {
    id: '4',
    title: 'Startup Pitch Night',
    description: 'Present your startup idea to a panel of investors and mentors. Top 3 pitches win seed funding.',
    date: '2026-04-02',
    time: '06:00 PM',
    venue: 'Auditorium Hall',
    type: 'offline',
    category: 'Competition',
    maxParticipants: 30,
    registeredCount: 22,
    status: 'upcoming',
    tags: ['Startup', 'Pitch', 'Funding'],
  },
  {
    id: '5',
    title: 'AI/ML Bootcamp',
    description: 'Intensive 3-day bootcamp covering machine learning fundamentals, neural networks, and practical applications.',
    date: '2026-04-10',
    time: '09:00 AM',
    venue: 'Tech Center, Lab 3',
    type: 'hybrid',
    category: 'Bootcamp',
    maxParticipants: 80,
    registeredCount: 65,
    status: 'upcoming',
    tags: ['AI', 'ML', 'Python'],
  },
];

export const mockParticipants: Participant[] = [
  { id: 'p1', name: 'Alice Chen', email: 'alice@example.com', eventId: '1', teamId: 't1', checkedIn: true, registeredAt: '2026-02-15', avatar: '' },
  { id: 'p2', name: 'Bob Martinez', email: 'bob@example.com', eventId: '1', teamId: 't1', checkedIn: false, registeredAt: '2026-02-16', avatar: '' },
  { id: 'p3', name: 'Carol Johnson', email: 'carol@example.com', eventId: '1', teamId: 't2', checkedIn: true, registeredAt: '2026-02-17', avatar: '' },
  { id: 'p4', name: 'David Kim', email: 'david@example.com', eventId: '1', checkedIn: false, registeredAt: '2026-02-18', avatar: '' },
  { id: 'p5', name: 'Eva Singh', email: 'eva@example.com', eventId: '2', checkedIn: true, registeredAt: '2026-02-20', avatar: '' },
  { id: 'p6', name: 'Frank Wilson', email: 'frank@example.com', eventId: '2', checkedIn: true, registeredAt: '2026-02-21', avatar: '' },
  { id: 'p7', name: 'Grace Lee', email: 'grace@example.com', eventId: '3', teamId: 't3', checkedIn: false, registeredAt: '2026-02-22', avatar: '' },
  { id: 'p8', name: 'Henry Park', email: 'henry@example.com', eventId: '3', teamId: 't3', checkedIn: true, registeredAt: '2026-02-23', avatar: '' },
];

export const mockTeams: Team[] = [
  { id: 't1', name: 'Code Crusaders', eventId: '1', members: [mockParticipants[0], mockParticipants[1]], maxMembers: 4, inviteCode: 'CC-2026' },
  { id: 't2', name: 'Pixel Pirates', eventId: '1', members: [mockParticipants[2]], maxMembers: 4, inviteCode: 'PP-2026' },
  { id: 't3', name: 'Design Ninjas', eventId: '3', members: [mockParticipants[6], mockParticipants[7]], maxMembers: 3, inviteCode: 'DN-2026' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'HackSphere Registration Open', message: 'Registration is now open for HackSphere 2026. Register before March 10!', type: 'info', channel: 'email', sentAt: '2026-02-10', eventId: '1', read: true },
  { id: 'n2', title: 'Venue Change Alert', message: 'UI/UX Workshop has been moved to Room 204 in the Design Lab.', type: 'warning', channel: 'website', sentAt: '2026-02-20', eventId: '3', read: false },
  { id: 'n3', title: 'Team Formation Deadline', message: 'Complete your team formation for HackSphere by March 12.', type: 'urgent', channel: 'whatsapp', sentAt: '2026-02-25', eventId: '1', read: false },
  { id: 'n4', title: 'DevOps Summit Speakers Announced', message: '5 industry leaders confirmed as keynote speakers for DevOps Summit.', type: 'success', channel: 'email', sentAt: '2026-02-28', eventId: '2', read: true },
  { id: 'n5', title: 'Check-in Reminder', message: 'Don\'t forget to check in at the venue for the AI/ML Bootcamp.', type: 'info', channel: 'whatsapp', sentAt: '2026-03-01', eventId: '5', read: false },
];
