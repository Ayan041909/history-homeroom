import type { HistoricalEvent, HistoricalFigure, Session, FAQItem, HistoricalClass } from "@/types";
import { IMAGES } from "./images";

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: "1",
    title: "The Fall of the Roman Empire",
    year: "476 AD",
    description:
      "The collapse of the Western Roman Empire marked the end of ancient Rome and the beginning of the Middle Ages, reshaping the entire civilized world.",
    imageUrl: IMAGES.events.fallOfRome,
    category: "Ancient History",
  },
  {
    id: "2",
    title: "The Renaissance",
    year: "14th–17th Century",
    description:
      "A cultural and intellectual rebirth in Europe that transformed art, science, and philosophy, giving rise to figures like da Vinci, Michelangelo, and Galileo.",
    imageUrl: IMAGES.events.renaissance,
    category: "Cultural History",
  },
  {
    id: "3",
    title: "The American Revolution",
    year: "1775–1783",
    description:
      "Thirteen colonies broke free from British rule to forge the United States of America, establishing the principles of liberty and democracy that still resonate today.",
    imageUrl: IMAGES.events.americanRevolution,
    category: "Modern History",
  },
  {
    id: "4",
    title: "The French Revolution",
    year: "1789–1799",
    description:
      "A radical political and social transformation that dismantled the French monarchy, introduced the Declaration of the Rights of Man, and changed the face of Europe forever.",
    imageUrl: IMAGES.events.frenchRevolution,
    category: "Modern History",
  },
  {
    id: "5",
    title: "World War I",
    year: "1914–1918",
    description:
      "The Great War engulfed the world in unprecedented conflict, reshaping nations, toppling empires, and claiming over 20 million lives across four grueling years.",
    imageUrl: IMAGES.events.ww1,
    category: "World History",
  },
  {
    id: "6",
    title: "The Moon Landing",
    year: "July 20, 1969",
    description:
      "Apollo 11 carried Neil Armstrong and Buzz Aldrin to the lunar surface, fulfilling a decade-long mission and marking humanity's greatest achievement in exploration.",
    imageUrl: IMAGES.events.moonLanding,
    category: "Scientific History",
  },
];

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: "1",
    name: "Cleopatra VII",
    era: "69–30 BC",
    description:
      "The last active ruler of the Ptolemaic Kingdom of Egypt, renowned for her intelligence, political acumen, and relationships with Julius Caesar and Mark Antony.",
    imageUrl: IMAGES.figures.cleopatra,
    type: "person",
  },
  {
    id: "2",
    name: "Napoleon Bonaparte",
    era: "1769–1821",
    description:
      "French military genius and emperor who conquered much of Europe, reformed legal systems through the Napoleonic Code, and left an indelible mark on world history.",
    imageUrl: IMAGES.figures.napoleon,
    type: "person",
  },
  {
    id: "3",
    name: "The Colosseum",
    era: "72–80 AD",
    description:
      "Rome's iconic amphitheater, built under Emperor Vespasian, that held up to 80,000 spectators and hosted gladiatorial contests, public spectacles, and dramatic performances.",
    imageUrl: IMAGES.places.colosseum,
    type: "place",
  },
  {
    id: "4",
    name: "The Great Wall of China",
    era: "7th Century BC – 1644 AD",
    description:
      "A series of fortifications stretching over 13,000 miles, built by successive Chinese dynasties to protect against nomadic invasions — one of history's greatest construction feats.",
    imageUrl: IMAGES.places.greatWall,
    type: "place",
  },
];

export const MOCK_SESSIONS: Session[] = [
  { id: "g1", type: "group", day: "Monday", date: "2026-05-04", tutorName: "Ayan Gupta", maxSeats: 20, bookedSeats: ["u1", "u2", "u3", "u4", "u5"], startTime: "10:00 AM", endTime: "11:00 AM" },
  { id: "g2", type: "group", day: "Tuesday", date: "2026-05-05", tutorName: "Lakshay Rastogi", maxSeats: 20, bookedSeats: ["u1", "u2"], startTime: "10:00 AM", endTime: "11:00 AM" },
  { id: "g3", type: "group", day: "Wednesday", date: "2026-05-06", tutorName: "Ashton Andrade", maxSeats: 20, bookedSeats: [], startTime: "10:00 AM", endTime: "11:00 AM" },
  { id: "g4", type: "group", day: "Thursday", date: "2026-05-07", tutorName: "Lakshay Rastogi", maxSeats: 20, bookedSeats: ["u1"], startTime: "2:00 PM", endTime: "3:00 PM" },
  { id: "g5", type: "group", day: "Friday", date: "2026-05-08", tutorName: "Ayan Gupta", maxSeats: 20, bookedSeats: ["u1", "u2", "u3"], startTime: "2:00 PM", endTime: "3:00 PM" },

  { id: "o1", type: "1on1", day: "Monday", date: "2026-05-04", tutorName: "Lakshay Rastogi", maxSeats: 1, bookedSeats: [], startTime: "9:00 AM", endTime: "10:00 AM" },
  { id: "o2", type: "1on1", day: "Tuesday", date: "2026-05-05", tutorName: "Ashton Andrade", maxSeats: 1, bookedSeats: ["u7"], startTime: "9:00 AM", endTime: "10:00 AM" },
  { id: "o3", type: "1on1", day: "Wednesday", date: "2026-05-06", tutorName: "Ayan Gupta", maxSeats: 1, bookedSeats: [], startTime: "11:00 AM", endTime: "12:00 PM" },
  { id: "o4", type: "1on1", day: "Thursday", date: "2026-05-07", tutorName: "Ashton Andrade", maxSeats: 1, bookedSeats: [], startTime: "3:00 PM", endTime: "4:00 PM" },
  { id: "o5", type: "1on1", day: "Friday", date: "2026-05-08", tutorName: "Lakshay Rastogi", maxSeats: 1, bookedSeats: [], startTime: "1:00 PM", endTime: "2:00 PM" },

  { id: "p1", type: "peer", day: "Monday", date: "2026-05-04", tutorName: "Ashton Andrade", maxSeats: 8, bookedSeats: ["u1", "u2", "u3"], startTime: "4:00 PM", endTime: "5:30 PM" },
  { id: "p2", type: "peer", day: "Tuesday", date: "2026-05-05", tutorName: "Ayan Gupta", maxSeats: 8, bookedSeats: [], startTime: "4:00 PM", endTime: "5:30 PM" },
  { id: "p3", type: "peer", day: "Wednesday", date: "2026-05-06", tutorName: "Lakshay Rastogi", maxSeats: 8, bookedSeats: ["u1"], startTime: "4:00 PM", endTime: "5:30 PM" },
  { id: "p4", type: "peer", day: "Thursday", date: "2026-05-07", tutorName: "Ayan Gupta", maxSeats: 8, bookedSeats: ["u1", "u2", "u3", "u4", "u5", "u6"], startTime: "5:00 PM", endTime: "6:30 PM" },
  { id: "p5", type: "peer", day: "Friday", date: "2026-05-08", tutorName: "Ashton Andrade", maxSeats: 8, bookedSeats: ["u1", "u2"], startTime: "5:00 PM", endTime: "6:30 PM" },
];

export const MOCK_CLASSES: HistoricalClass[] = [
  { id: "c1", tutorId: "tutor1", title: "Ancient Civilizations", description: "Explore the rise and fall of Egypt, Greece, and Rome", schedule: "Mon/Wed 10am", maxStudents: 25, enrolledStudents: ["s1", "s2", "s3", "s4", "s5", "s6", "s7"], subject: "Ancient History" },
  { id: "c2", tutorId: "tutor1", title: "World War II Deep Dive", description: "A comprehensive study of WWII causes, events, and consequences", schedule: "Tue/Thu 2pm", maxStudents: 20, enrolledStudents: ["s1", "s2", "s3"], subject: "Modern History" },
  { id: "c3", tutorId: "tutor1", title: "Renaissance Art & Culture", description: "Art, literature, and ideas that defined the Renaissance era", schedule: "Friday 1pm", maxStudents: 15, enrolledStudents: ["s1", "s4", "s5", "s8", "s9"], subject: "Cultural History" },
];

export const FAQ_ITEMS: FAQItem[] = [
  { question: "How do I book a tutoring session?", answer: "Navigate to the Home page and scroll to the Tutoring section. Choose between Group Tutoring, 1-on-1 Tutoring, or Peer Workshops. Click on your preferred option to see available sessions, then select a time slot and the number of seats you need." },
  { question: "What's the difference between the subscription plans?", answer: "Free gives you access to basic lessons and community content. Plus ($9.99/month) unlocks all lessons, priority booking, and group tutoring. Premium ($19.99/month) includes everything in Plus, plus unlimited 1-on-1 tutoring sessions and exclusive content." },
  { question: "How do I earn badges?", answer: "Badges are earned automatically based on your progress. Complete lessons, pass quizzes, finish assignments, and accumulate study time to unlock badges. Your badge collection is displayed on your dashboard." },
  { question: "Is my personal data secure?", answer: "Absolutely. We use Firebase's enterprise-grade security with end-to-end encryption for all sensitive data. Your authentication is handled by Google Firebase Auth, and all connections use HTTPS/TLS." },
  { question: "How do Peer Workshops work?", answer: "Peer Workshops bring groups of learners together to collaborate on historical projects and discussions. You can book seats in advance — sessions accommodate up to 8 participants and are facilitated by a session leader." },
  { question: "What does the AI Chatbot help with?", answer: "Our chatbot helps you navigate the website, answers questions about features, explains how to use different tools, and provides quick access to common actions like booking sessions or finding lessons." },
];

// ────────────── New: testimonials ──────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Maya R.",
    role: "AP World History · Junior",
    avatarUrl: IMAGES.team.amara,
    quote:
      "History Homeroom turned my dreaded essay unit into the most exciting part of my week. The 1-on-1 tutoring helped me bump my AP score from a 3 to a 5.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Daniel K.",
    role: "Sophomore · Self-paced learner",
    avatarUrl: IMAGES.team.daniel,
    quote:
      "The lessons feel like a Netflix documentary, but I actually retain everything because of the quizzes and peer workshops afterward.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya S.",
    role: "Homeschool parent",
    avatarUrl: IMAGES.team.priya,
    quote:
      "I trust the curriculum. Every tutor we've worked with is rigorous, kind, and clearly loves what they do. My daughter asks for more history.",
    rating: 5,
  },
  {
    id: "t4",
    name: "James W.",
    role: "Grade 11 · IB History HL",
    avatarUrl: IMAGES.team.james,
    quote:
      "Peer Workshops were a game-changer. Debating sources with other students made the material click in a way textbooks never did.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Sarah M.",
    role: "Mom of two history nerds",
    avatarUrl: IMAGES.team.sarah,
    quote:
      "Worth every penny. The progress dashboard and badge system keep my kids motivated, and I love seeing what they're learning each week.",
    rating: 5,
  },
];

// ────────────── New: featured tutors ──────────────
export interface FeaturedTutor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  rating: number;
  students: number;
  image: string;
}

export const FEATURED_TUTORS: FeaturedTutor[] = [
  {
    id: "ft1",
    name: "Ayan Gupta",
    specialty: "Modern & World History",
    bio: "Founder of History Homeroom. Passionate about making 20th-century history click for young learners.",
    rating: 5.0,
    students: 1240,
    image: IMAGES.team.ayan,
  },
  {
    id: "ft2",
    name: "Lakshay Rastogi",
    specialty: "Ancient & Classical History",
    bio: "Co-founder and curriculum lead. Specializes in Mesopotamia, Greece, Rome, and the foundations of civilization.",
    rating: 4.9,
    students: 1180,
    image: IMAGES.team.lakshay,
  },
  {
    id: "ft3",
    name: "Ashton Andrade",
    specialty: "Cultural & Political History",
    bio: "Co-founder and operations lead. Focuses on revolutions, civil rights movements, and the ideas that shape societies.",
    rating: 4.9,
    students: 1090,
    image: IMAGES.team.ashton,
  },
];
