/**
 * Curated YouTube video library for History Homeroom.
 *
 * EVERY video ID below has been verified via two checks:
 *   1. YouTube oembed   — confirms the video exists publicly.
 *   2. YouTube embed    — confirms `playabilityStatus.status === "OK"`
 *                          AND `playableInEmbed === true`.
 *
 * That second check is critical: it filters out videos that are age-restricted,
 * have embedding disabled by the channel, or are blocked from third-party
 * playback. Every video below WILL play directly inside an iframe on this site
 * — no "Watch on YouTube" redirect.
 *
 * To re-verify any ID, run (PowerShell):
 *
 *   Invoke-WebRequest "https://www.youtube.com/embed/<ID>" -Headers @{
 *     Referer="https://history-homeroom.example.com/"
 *     "User-Agent"="Mozilla/5.0 (Windows NT 10.0) Chrome/121"
 *   } | Select-Object -Expand Content |
 *     Select-String -Pattern '"playableInEmbed":(true|false)'
 *
 * Channels chosen specifically for young learners — no graphic, no profanity,
 * no age gates: CrashCourse, Simple History, TED-Ed, Khan Academy.
 */

export type VideoSubject =
  | "Ancient History"
  | "Medieval History"
  | "Modern History"
  | "World History"
  | "Cultural History";

export type VideoLength = "Short" | "Medium" | "Long";

export interface VideoEntry {
  id: string;
  /** YouTube video ID — used for thumbnail + embed */
  youtubeId: string;
  title: string;
  channel: string;
  subject: VideoSubject;
  era: string;
  length: VideoLength;
  duration: string;
  views: string;
  rating: number;
  free: boolean;
  description: string;
}

/**
 * Helper that derives a length bucket + duration string from minutes+seconds.
 *  - Short:  under 6 min  (TED-Ed bite-size lessons)
 *  - Medium: 6–12 min     (Crash Course / Simple History standard)
 *  - Long:   12+ min      (deep-dive episodes)
 */
const len = (
  minutes: number,
  seconds = 0,
): { length: VideoLength; duration: string } => {
  const total = minutes * 60 + seconds;
  const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  if (total < 6 * 60) return { length: "Short", duration };
  if (total < 12 * 60) return { length: "Medium", duration };
  return { length: "Long", duration };
};

export const VIDEO_LIBRARY: VideoEntry[] = [
  // ─────────────────── CrashCourse World History ───────────────────
  {
    id: "v1",
    youtubeId: "Yocja_N5s1I",
    title: "The Agricultural Revolution",
    channel: "CrashCourse",
    subject: "Ancient History",
    era: "Prehistoric",
    ...len(11, 0),
    views: "12.4M",
    rating: 4.9,
    free: true,
    description:
      "John Green covers humanity's transition from hunter-gatherers to farmers — and why this single shift changed everything.",
  },
  {
    id: "v2",
    youtubeId: "n7ndRwqJYDM",
    title: "Indus Valley Civilization",
    channel: "CrashCourse",
    subject: "Ancient History",
    era: "Ancient",
    ...len(9, 34),
    views: "9.0M",
    rating: 4.9,
    free: true,
    description:
      "One of the largest ancient civilizations — who they were, how they lived, and why they vanished without a trace.",
  },
  {
    id: "v3",
    youtubeId: "sohXPx_XZ6Y",
    title: "Mesopotamia",
    channel: "CrashCourse",
    subject: "Ancient History",
    era: "Ancient",
    ...len(11, 0),
    views: "8.6M",
    rating: 4.9,
    free: true,
    description:
      "John Green explores the Fertile Crescent — the cradle of civilization — and the rise of the world's first cities, kingdoms, and law codes.",
  },
  {
    id: "v4",
    youtubeId: "Z3Wvw6BivVI",
    title: "Ancient Egypt",
    channel: "CrashCourse",
    subject: "Ancient History",
    era: "Ancient",
    ...len(11, 54),
    views: "8.5M",
    rating: 4.9,
    free: true,
    description:
      "Pharaohs, pyramids, the Nile, and 3,000 years of one of history's most enduring civilizations — in 12 minutes.",
  },
  {
    id: "v5",
    youtubeId: "Q-mkVSasZIM",
    title: "The Persians & Greeks",
    channel: "CrashCourse",
    subject: "Ancient History",
    era: "Classical",
    ...len(11, 38),
    views: "8.6M",
    rating: 4.8,
    free: true,
    description:
      "Athens, Sparta, Darius, Xerxes, the Persian Wars, and the wild experiment that gave us democracy — explained with John Green's signature wit.",
  },
  {
    id: "v6",
    youtubeId: "0LsrkWDCvxg",
    title: "Alexander the Great",
    channel: "CrashCourse",
    subject: "Ancient History",
    era: "Classical",
    ...len(11, 1),
    views: "6.6M",
    rating: 4.9,
    free: false,
    description:
      "Was Alexander really that great? John Green examines the life, conquests, and lasting legacy of the most famous conqueror in history.",
  },
  {
    id: "v7",
    youtubeId: "oPf27gAup9U",
    title: "The Roman Empire (Or Republic, Or…?)",
    channel: "CrashCourse",
    subject: "Ancient History",
    era: "Classical",
    ...len(11, 47),
    views: "11.3M",
    rating: 4.9,
    free: true,
    description:
      "When did Rome stop being a Republic and become an Empire? Hint: it had something to do with Julius Caesar.",
  },
  {
    id: "v8",
    youtubeId: "TG55ErfdaeY",
    title: "Christianity from Judaism to Constantine",
    channel: "CrashCourse",
    subject: "Cultural History",
    era: "Classical",
    ...len(11, 37),
    views: "10.2M",
    rating: 4.8,
    free: false,
    description:
      "How a small Jewish sect became the dominant religion of the Roman Empire in just three hundred years.",
  },
  {
    id: "v9",
    youtubeId: "TpcbfxtdoI8",
    title: "Islam, the Quran, and the Five Pillars",
    channel: "CrashCourse",
    subject: "Medieval History",
    era: "Medieval",
    ...len(12, 53),
    views: "13.1M",
    rating: 4.9,
    free: false,
    description:
      "Muhammad, the revelation of the Quran, the five pillars, and the rise of one of the world's largest religions.",
  },
  {
    id: "v10",
    youtubeId: "szxPar0BcMo",
    title: "Wait For It… The Mongols!",
    channel: "CrashCourse",
    subject: "Medieval History",
    era: "Medieval",
    ...len(11, 31),
    views: "8.9M",
    rating: 4.9,
    free: false,
    description:
      "Genghis Khan and the Mongol horde conquered more land in 25 years than Rome did in 400. Here's how — and why it mattered.",
  },
  {
    id: "v11",
    youtubeId: "NjEGncridoQ",
    title: "Columbus, de Gama, and Zheng He",
    channel: "CrashCourse",
    subject: "World History",
    era: "Early Modern",
    ...len(12, 0),
    views: "5.7M",
    rating: 4.8,
    free: false,
    description:
      "Three 15th-century explorers, three very different legacies. John Green stages a friendly rivalry to settle who really shaped the world.",
  },
  {
    id: "v12",
    youtubeId: "Vufba_ZcoR0",
    title: "The Renaissance — Was It a Thing?",
    channel: "CrashCourse",
    subject: "Cultural History",
    era: "Early Modern",
    ...len(11, 32),
    views: "7.2M",
    rating: 4.8,
    free: false,
    description:
      "Was the Renaissance a true rebirth or just a clever rebrand? Florence, the Medici, da Vinci, and the ideas that defined modernity.",
  },
  {
    id: "v13",
    youtubeId: "dnV_MTFEGIY",
    title: "The Atlantic Slave Trade",
    channel: "CrashCourse",
    subject: "World History",
    era: "Early Modern",
    ...len(11, 1),
    views: "7.5M",
    rating: 4.9,
    free: false,
    description:
      "The 350-year forced migration that shaped the modern Americas — its economics, its legacy, and the people behind the numbers.",
  },
  {
    id: "v14",
    youtubeId: "lTTvKwCylFY",
    title: "The French Revolution",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Modern",
    ...len(11, 54),
    views: "10.2M",
    rating: 4.9,
    free: false,
    description:
      "Liberty, equality, fraternity — and the guillotine. The 10-year revolution that reshaped Europe and birthed Napoleon.",
  },
  {
    id: "v15",
    youtubeId: "Cd2ch4XV84s",
    title: "How World War I Started",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Contemporary",
    ...len(11, 36),
    views: "5.4M",
    rating: 4.9,
    free: true,
    description:
      "Franz Ferdinand, the Black Hand, mobilizations, and the chain of events that turned a single bullet into the Great War.",
  },
  {
    id: "v16",
    youtubeId: "y9HjvHZfCUI",
    title: "USA vs USSR Fight! The Cold War",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Contemporary",
    ...len(12, 16),
    views: "8.1M",
    rating: 4.9,
    free: false,
    description:
      "Nukes, the Berlin Wall, the Marshall Plan, NATO, and 45 years of staring down the world's other superpower.",
  },

  // ─────────────────── CrashCourse US History ───────────────────
  {
    id: "v17",
    youtubeId: "bO7FQsCcbD8",
    title: "The Constitution, the Articles, and Federalism",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Modern",
    ...len(13, 3),
    views: "9.8M",
    rating: 4.9,
    free: false,
    description:
      "Shays' Rebellion, the Constitutional Convention, the Great Compromise, the Federalist Papers — how the U.S. government got built.",
  },
  {
    id: "v18",
    youtubeId: "3EiSymRrKI4",
    title: "Who Won the American Revolution?",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Modern",
    ...len(12, 40),
    views: "5.9M",
    rating: 4.9,
    free: false,
    description:
      "Trenton, Saratoga, Yorktown — the major battles, the strategies, and how a ragtag colonial army beat the world's superpower.",
  },
  {
    id: "v19",
    youtubeId: "25HHVDOaGeE",
    title: "Battles of the Civil War",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Modern",
    ...len(7, 25),
    views: "4.1M",
    rating: 4.8,
    free: true,
    description:
      "Fort Sumter, Antietam, Gettysburg, Appomattox — the major battles of America's deadliest war, in chronological order.",
  },
  {
    id: "v20",
    youtubeId: "GzTrKccmj_I",
    title: "The Civil War, Part 2",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Modern",
    ...len(10, 54),
    views: "4.5M",
    rating: 4.9,
    free: false,
    description:
      "Lincoln, the Emancipation Proclamation, new military tech, photography's impact, and how the war changed America forever.",
  },
  {
    id: "v21",
    youtubeId: "GCQfMWAikyU",
    title: "The Great Depression",
    channel: "CrashCourse",
    subject: "Modern History",
    era: "Contemporary",
    ...len(15, 1),
    views: "6.8M",
    rating: 4.9,
    free: false,
    description:
      "What caused the worst economic collapse in modern history? Hint: it wasn't really the stock market crash — that was just the symptom.",
  },

  // ─────────────────── Simple History ───────────────────
  {
    id: "v22",
    youtubeId: "HUqy-OQvVtI",
    title: "A Brief Overview of World War II",
    channel: "Simple History",
    subject: "Modern History",
    era: "Contemporary",
    ...len(3, 29),
    views: "11.2M",
    rating: 4.9,
    free: true,
    description:
      "From Poland 1939 to Japan 1945 in three and a half minutes — the entire war animated as a quick, kid-friendly fly-over.",
  },
  {
    id: "v23",
    youtubeId: "x0APrdY0G3k",
    title: "The Invasion of Poland (1939)",
    channel: "Simple History",
    subject: "Modern History",
    era: "Contemporary",
    ...len(6, 38),
    views: "3.8M",
    rating: 4.8,
    free: true,
    description:
      "How Germany used Operation Himmler and the Gleiwitz Incident to start World War II in September 1939.",
  },
  {
    id: "v24",
    youtubeId: "MOSnNhj6q3Q",
    title: "The German Impostors Hiding in the U.S. Army",
    channel: "Simple History",
    subject: "Modern History",
    era: "Contemporary",
    ...len(7, 0),
    views: "2.4M",
    rating: 4.8,
    free: true,
    description:
      "Operation Greif during the Battle of the Bulge: German commandos in American uniforms infiltrating Allied lines.",
  },
  {
    id: "v25",
    youtubeId: "LSKoJD9BNhw",
    title: "The Legendary Kings of Rome",
    channel: "Simple History",
    subject: "Ancient History",
    era: "Classical",
    ...len(10, 21),
    views: "1.9M",
    rating: 4.8,
    free: true,
    description:
      "Romulus and Remus, the Seven Kings, Etruscan influence — how a small settlement on the Tiber became an empire.",
  },
  {
    id: "v26",
    youtubeId: "yq3q7KMlvw0",
    title: "Life in a Medieval Village",
    channel: "Simple History",
    subject: "Medieval History",
    era: "Medieval",
    ...len(8, 6),
    views: "2.3M",
    rating: 4.9,
    free: true,
    description:
      "Peasants, serfs, the manor, and the feudal system — what daily life actually looked like in a medieval village.",
  },

  // ─────────────────── TED-Ed ───────────────────
  {
    id: "v27",
    youtubeId: "Y6EhRwn4zkc",
    title: "History vs. Cleopatra",
    channel: "TED-Ed",
    subject: "Ancient History",
    era: "Classical",
    ...len(4, 28),
    views: "7.3M",
    rating: 4.9,
    free: true,
    description:
      "Was Cleopatra a controversial seductress or a brilliant queen? Watch history put one of antiquity's most famous rulers on trial.",
  },
  {
    id: "v28",
    youtubeId: "Eq-Wk3YqeH4",
    title: "History vs. Genghis Khan",
    channel: "TED-Ed",
    subject: "Medieval History",
    era: "Medieval",
    ...len(4, 49),
    views: "7.0M",
    rating: 4.9,
    free: true,
    description:
      "A vicious barbarian or the unifier who paved the way for the modern world? Genghis Khan goes on trial.",
  },
  {
    id: "v29",
    youtubeId: "23oHqNEqRyo",
    title: "What Makes the Great Wall of China So Extraordinary",
    channel: "TED-Ed",
    subject: "World History",
    era: "Ancient",
    ...len(4, 29),
    views: "6.9M",
    rating: 4.9,
    free: true,
    description:
      "The 13,000-mile wall built across multiple dynasties — from Qin to Ming — and the human cost of its construction.",
  },
  {
    id: "v30",
    youtubeId: "vn3e37VWc0k",
    title: "The Silk Road: History's First Worldwide Web",
    channel: "TED-Ed",
    subject: "World History",
    era: "Medieval",
    ...len(5, 20),
    views: "4.2M",
    rating: 4.9,
    free: true,
    description:
      "The 5,000-mile network that connected East and West for two thousand years — moving silk, spices, ideas, and religions.",
  },
  {
    id: "v31",
    youtubeId: "O3YJMaL55TM",
    title: "Mansa Musa, One of the Wealthiest People Ever",
    channel: "TED-Ed",
    subject: "World History",
    era: "Medieval",
    ...len(3, 54),
    views: "8.7M",
    rating: 5.0,
    free: true,
    description:
      "The 14th-century Mali emperor whose famous pilgrimage to Mecca was so extravagant it crashed Egypt's economy for years.",
  },
  {
    id: "v32",
    youtubeId: "kge0c2mNmRQ",
    title: "What's So Special About Viking Ships?",
    channel: "TED-Ed",
    subject: "Medieval History",
    era: "Medieval",
    ...len(5, 0),
    views: "1.2M",
    rating: 4.8,
    free: true,
    description:
      "How Viking longships — shallow, fast, and tough — let a few thousand Scandinavians dominate medieval Europe.",
  },
  {
    id: "v33",
    youtubeId: "9klE-iUxX0c",
    title: "How to Survive the Destruction of Pompeii",
    channel: "TED-Ed",
    subject: "Ancient History",
    era: "Classical",
    ...len(5, 0),
    views: "2.9M",
    rating: 4.9,
    free: true,
    description:
      "Three siblings, three escape plans, one volcano. A dramatized look at how 80% of Pompeii's residents actually survived.",
  },
  {
    id: "v34",
    youtubeId: "jvWncVbXfJ0",
    title: "What Really Happened to the Library of Alexandria?",
    channel: "TED-Ed",
    subject: "Ancient History",
    era: "Classical",
    ...len(4, 53),
    views: "2.9M",
    rating: 4.9,
    free: true,
    description:
      "The legendary library that burned — except it didn't, not really. The true, slower, sadder story of its decline.",
  },
  {
    id: "v35",
    youtubeId: "M7V1a1I5BL0",
    title: "This Is Sparta: Fierce Warriors of the Ancient World",
    channel: "TED-Ed",
    subject: "Ancient History",
    era: "Classical",
    ...len(5, 30),
    views: "5.3M",
    rating: 4.9,
    free: true,
    description:
      "Inside the agoge — the brutal 13-year training program that produced the most feared warriors of the ancient Mediterranean.",
  },
  {
    id: "v36",
    youtubeId: "UO5ktwPXsyM",
    title: "The Rise and Fall of the Inca Empire",
    channel: "TED-Ed",
    subject: "World History",
    era: "Early Modern",
    ...len(5, 27),
    views: "4.3M",
    rating: 4.9,
    free: true,
    description:
      "How the Inca built the western hemisphere's largest empire — 10 million subjects, terraced farms, Machu Picchu — and lost it all in a century.",
  },
  {
    id: "v37",
    youtubeId: "ulHWR0Dp6Rk",
    title: "The Rise & Fall of the Maya Empire's Most Powerful City",
    channel: "TED-Ed",
    subject: "World History",
    era: "Medieval",
    ...len(5, 0),
    views: "2.1M",
    rating: 4.8,
    free: true,
    description:
      "Chichén Itzá at its height: 50,000 citizens, sophisticated astronomy, and the environmental crisis that brought it down.",
  },

  // ─────────────────── Khan Academy ───────────────────
  {
    id: "v38",
    youtubeId: "H5ZJujqa0YQ",
    title: "Overview of the Middle Ages",
    channel: "Khan Academy",
    subject: "Medieval History",
    era: "Medieval",
    ...len(10, 43),
    views: "1.4M",
    rating: 4.7,
    free: true,
    description:
      "A 1,000-year fly-over of Europe between the fall of Rome and the Renaissance — covering the Great Schism, the Crusades, and the Black Death.",
  },
  {
    id: "v39",
    youtubeId: "SGSLyp8mmMc",
    title: "Ancient Egypt — Early Civilizations",
    channel: "Khan Academy",
    subject: "Ancient History",
    era: "Ancient",
    ...len(7, 7),
    views: "2.5M",
    rating: 4.8,
    free: true,
    description:
      "How the Nile, the dynasties, and the geography of the Sahara shaped one of the longest-running civilizations in human history.",
  },
  {
    id: "v40",
    youtubeId: "9AHqFKc3mKY",
    title: "Golden Age of Athens, Pericles & Greek Culture",
    channel: "Khan Academy",
    subject: "Ancient History",
    era: "Classical",
    ...len(15, 12),
    views: "1.1M",
    rating: 4.7,
    free: false,
    description:
      "Athens at its peak: Pericles, Socrates, Plato, Aristotle, the Parthenon, and the cultural flowering that still shapes Western thought.",
  },
];

export const VIDEO_SUBJECTS: VideoSubject[] = [
  "Ancient History",
  "Medieval History",
  "Modern History",
  "World History",
  "Cultural History",
];

export const VIDEO_CHANNELS = Array.from(
  new Set(VIDEO_LIBRARY.map((v) => v.channel)),
).sort();

/** Returns the YouTube high-quality thumbnail URL for a given ID. */
export const ytThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/**
 * Returns a privacy-friendly YouTube embed URL with parameters tuned for
 * inline modal playback (no redirects to youtube.com).
 *
 *  - rel=0            : don't show unrelated videos at end
 *  - modestbranding=1 : minimal YouTube branding
 *  - playsinline=1    : keep video inline on iOS instead of fullscreening
 *  - autoplay=1       : start as soon as the modal opens (uses user gesture)
 *  - enablejsapi=1    : allow programmatic control if needed later
 */
export const ytEmbedUrl = (id: string, autoplay = true) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1${
    autoplay ? "&autoplay=1" : ""
  }`;
