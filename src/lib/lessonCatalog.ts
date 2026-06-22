import { IMAGES } from "@/lib/images";

export const FREE_LESSON_COUNT = 10;
export const PLUS_ACCESSIBLE_COUNT = 200;
export const PREMIUM_EXCLUSIVE_COUNT = 10;
export const TOTAL_LESSON_TARGET = 210;

export type LessonLevel = "Beginner" | "Intermediate" | "Advanced";
export type LessonAccessTier = "free" | "plus" | "premium";

export interface LessonCard {
  id: string;
  title: string;
  subject: string;
  level: LessonLevel;
  duration: string;
  students: number;
  rating: number;
  tier: LessonAccessTier;
  thumbnail: string;
  description: string;
}

const SUBJECTS = [
  "Ancient History",
  "Medieval History",
  "Modern History",
  "Cultural History",
  "World History",
] as const;

const LEVELS: LessonLevel[] = ["Beginner", "Intermediate", "Advanced"];

const THUMBNAILS = [
  IMAGES.places.pyramidsGiza,
  IMAGES.events.fallOfRome,
  IMAGES.lessons.greekDemocracy,
  IMAGES.events.islamicGoldenAge,
  IMAGES.events.columbus,
  IMAGES.events.ww2,
  IMAGES.figures.napoleon,
  IMAGES.figures.cleopatra,
  IMAGES.places.greatWall,
  IMAGES.places.machuPicchu,
  IMAGES.lessons.spaceRace,
  IMAGES.events.ww1,
  IMAGES.events.pyramids,
  IMAGES.lessons.blackDeath,
  IMAGES.events.americanRevolution,
  IMAGES.events.frenchRevolution,
  IMAGES.lessons.crusades,
  IMAGES.lessons.daVinci,
  IMAGES.places.colosseum,
  IMAGES.events.cuneiform,
  IMAGES.lessons.silkRoad,
  IMAGES.events.magnaCarta,
];

/** Flagship lessons — first 10 free; last 5 are Premium-exclusive. */
const FLAGSHIP_LESSONS: Omit<LessonCard, "tier">[] = [
  { id: "1", title: "Introduction to Ancient Egypt", subject: "Ancient History", level: "Beginner", duration: "45 min", students: 8400, rating: 4.9, thumbnail: IMAGES.lessons.egypt, description: "Discover the land of pharaohs, explore the Nile's role, and understand the foundations of one of history's greatest civilizations." },
  { id: "2", title: "The Roman Republic & Senate", subject: "Ancient History", level: "Intermediate", duration: "60 min", students: 6200, rating: 4.8, thumbnail: IMAGES.lessons.romanSenate, description: "Explore how Rome governed itself before the Empire — the Senate, consuls, laws, and the tensions that led to civil war." },
  { id: "3", title: "Greek Philosophy & Democracy", subject: "Ancient History", level: "Intermediate", duration: "55 min", students: 5800, rating: 4.7, thumbnail: IMAGES.lessons.greekDemocracy, description: "From Socrates to Pericles — understand how the ancient Greeks invented democratic ideas that still shape our world today." },
  { id: "4", title: "The Black Death & Medieval Society", subject: "Medieval History", level: "Intermediate", duration: "50 min", students: 4900, rating: 4.8, thumbnail: IMAGES.lessons.blackDeath, description: "How the plague of 1347–1351 wiped out a third of Europe's population and permanently transformed social and economic structures." },
  { id: "5", title: "The Crusades: Faith & Power", subject: "Medieval History", level: "Advanced", duration: "70 min", students: 4300, rating: 4.6, thumbnail: IMAGES.lessons.crusades, description: "A nuanced look at the motivations, major campaigns, and lasting consequences of two centuries of religious warfare." },
  { id: "6", title: "Causes of World War I", subject: "Modern History", level: "Intermediate", duration: "65 min", students: 9100, rating: 4.9, thumbnail: IMAGES.lessons.ww1Causes, description: "Unpack the MAIN causes — Militarism, Alliances, Imperialism, Nationalism — and trace how a single assassination sparked global war." },
  { id: "7", title: "Leonardo da Vinci: Art & Science", subject: "Cultural History", level: "Beginner", duration: "40 min", students: 10200, rating: 4.9, thumbnail: IMAGES.lessons.daVinci, description: "Explore the genius of da Vinci — his masterworks, his scientific notebooks, and how one man embodied the Renaissance spirit." },
  { id: "8", title: "The Silk Road & Global Trade", subject: "World History", level: "Intermediate", duration: "55 min", students: 5100, rating: 4.8, thumbnail: IMAGES.lessons.silkRoad, description: "Follow the 4,000-mile trade route connecting East and West, and discover how it spread goods, ideas, and religions across civilizations." },
  { id: "9", title: "The Space Race", subject: "Modern History", level: "Beginner", duration: "45 min", students: 8800, rating: 4.9, thumbnail: IMAGES.lessons.spaceRace, description: "From Sputnik to Apollo 11 — the story of how Cold War rivalry pushed humanity beyond Earth for the first time." },
  { id: "10", title: "Magna Carta & the Rule of Law", subject: "Medieval History", level: "Beginner", duration: "42 min", students: 6700, rating: 4.8, thumbnail: IMAGES.events.magnaCarta, description: "How a 1215 charter in England laid groundwork for constitutional government and limits on royal power." },
  { id: "11", title: "The Holocaust: History & Memory", subject: "Modern History", level: "Advanced", duration: "80 min", students: 7700, rating: 5.0, thumbnail: IMAGES.lessons.holocaust, description: "A deeply respectful examination of the Holocaust — its origins, execution, liberation, and why we must never forget." },
  { id: "12", title: "Decolonization in Africa & Asia", subject: "Modern History", level: "Advanced", duration: "75 min", students: 3600, rating: 4.7, thumbnail: IMAGES.lessons.decolonization, description: "Trace how dozens of nations won independence between 1945 and 1975 and the complex legacies of colonial rule." },
  { id: "13", title: "The Civil Rights Movement", subject: "Modern History", level: "Intermediate", duration: "60 min", students: 11300, rating: 5.0, thumbnail: IMAGES.lessons.civilRights, description: "Trace the struggle for racial equality in America from Brown v. Board of Education to the Civil Rights Act of 1964." },
  { id: "14", title: "The French Revolution", subject: "Modern History", level: "Advanced", duration: "68 min", students: 7200, rating: 4.8, thumbnail: IMAGES.events.frenchRevolution, description: "From the fall of the Bastille to Napoleon — liberty, terror, and the birth of modern political ideology." },
  { id: "15", title: "The American Revolution", subject: "Modern History", level: "Intermediate", duration: "58 min", students: 9500, rating: 4.9, thumbnail: IMAGES.events.americanRevolution, description: "How thirteen colonies challenged an empire and forged a new republic founded on Enlightenment ideals." },
];

const TOPIC_BANK: Record<(typeof SUBJECTS)[number], string[]> = {
  "Ancient History": [
    "Mesopotamia and the Birth of Writing", "Hammurabi's Code and Early Law", "The Persian Empire at Its Height",
    "Sparta vs. Athens", "Alexander the Great's Conquests", "The Punic Wars", "Daily Life in Pompeii",
    "Cleopatra and the End of Egypt", "The Han Dynasty and Silk Road Origins", "Maya Civilization and Astronomy",
    "Aztec Society Before Conquest", "Inca Roads and Administration", "Phoenician Traders of the Mediterranean",
    "The Oracle at Delphi", "Roman Engineering and Aqueducts", "Fall of the Western Roman Empire",
    "Byzantium: Rome's Eastern Heir", "Zoroastrianism and Persian Religion", "Celtic Europe Before Rome",
    "The Bronze Age Collapse", "Minoan Crete and Knossos", "Assyrian Military Empire",
    "Nubia and the Kingdom of Kush", "Carthage and Mediterranean Trade", "Roman Law and the Twelve Tables",
    "Gladiators and Roman Entertainment", "Women in Ancient Athens", "The Library of Alexandria",
    "Sumerian City-States", "The Epic of Gilgamesh in Context", "Roman Britain and Hadrian's Wall",
    "Etruscans and the Founding of Rome", "Hellenistic Kingdoms After Alexander", "Ancient Olympic Games",
    "Temple Architecture from Egypt to Greece", "Roman Republic to Empire Transition", "Viking Age Scandinavia",
    "Charlemagne and the Frankish Empire", "Monasticism in Early Medieval Europe", "The Viking Expansion East",
  ],
  "Medieval History": [
    "Feudalism and the Manor System", "Knights, Chivalry, and Castles", "The Hundred Years' War",
    "Joan of Arc and French Nationhood", "The Great Schism in the Church", "Medieval Universities and Scholasticism",
    "Thomas Aquinas and Medieval Philosophy", "The Mongol Empire Under Genghis Khan", "Marco Polo's Journey to China",
    "The Reconquista in Spain", "Ottoman Rise and Constantinople's Fall", "The Printing Press Revolution",
    "Medieval Plague and Social Change", "Guilds and Urban Life", "Women in Medieval Europe",
    "Islamic Golden Age Science", "Al-Andalus: Muslim Spain", "The Norman Conquest of England",
    "Richard the Lionheart and the Third Crusade", "Saladin and the Ayyubid Dynasty", "The Inquisition in Context",
    "Gothic Cathedrals and Faith", "Peasant Life and the Harvest Cycle", "Medieval Japan and the Samurai Code",
    "The Song Dynasty and Innovation", "Medieval African Kingdoms: Mali", "The Swahili Coast Trade Network",
    "The Hanseatic League", "The Avignon Papacy", "The Wars of the Roses", "Medieval Medicine and Apothecaries",
    "Courtly Love and Medieval Literature", "The Children's Crusade", "Medieval Heresy and Reform Movements",
    "The Teutonic Knights in the Baltic", "Timur and Central Asian Empires", "Medieval Ethiopia and Lalibela",
    "The Aztec Triple Alliance", "Pre-Columbian Andean Civilizations", "Medieval Climate and the Little Ice Age",
  ],
  "Modern History": [
    "The Enlightenment and Reason", "Industrial Revolution in Britain", "Child Labor and Factory Reform",
    "Napoleon's Empire and Legacy", "Congress of Vienna and European Order", "Latin American Independence Movements",
    "The Scramble for Africa", "Imperialism in India", "Meiji Restoration in Japan",
    "World War II: Origins and Blitzkrieg", "The D-Day Landings", "The Atomic Bomb and Its Aftermath",
    "The Cold War Begins", "The Cuban Missile Crisis", "Vietnam War in Global Context",
    "The Berlin Wall and German Reunification", "Apartheid and South African Liberation", "The Iranian Revolution",
    "The Fall of the Soviet Union", "European Union and Integration", "The Arab Spring",
    "Globalization Since 1990", "The War on Terror", "Climate Change and Environmental History",
    "Women's Suffrage Movements", "The Great Depression Worldwide", "New Deal and Welfare States",
    "Russian Revolution of 1917", "Stalinism and the Soviet Union", "Mao's China and the Cultural Revolution",
    "Korean War and Divided Peninsula", "Partition of India and Pakistan", "The Troubles in Northern Ireland",
    "Pinochet and Chilean History", "The Rwandan Genocide", "Nelson Mandela and Reconciliation",
    "The Digital Revolution", "Brexit and Modern Britain", "COVID-19 as Historical Turning Point",
    "Rise of China in the 21st Century", "Populism in Modern Democracies", "Migration and Refugee Crises",
  ],
  "Cultural History": [
    "The Harlem Renaissance", "Impressionism and Modern Art", "Shakespeare's England",
    "Baroque Music and Court Culture", "The Birth of Jazz", "Hollywood and American Mythmaking",
    "Propaganda in Totalitarian States", "Fashion Through the Victorian Era", "Food History: Spice Routes",
    "Sports and National Identity", "Photography and the Modern Eye", "Radio and Mass Media Age",
    "Comic Books as Cultural Mirror", "Punk Rock and Youth Rebellion", "The Beatles and the 1960s",
    "Architecture of the Bauhaus", "Film Noir and Postwar Anxiety", "Video Games as Historical Narrative",
    "Memorials and Public Memory", "Museums and How We Tell History", "Oral History Methods",
    "Folklore and National Legends", "Carnival and Festival Traditions", "Sacred Music Across Cultures",
    "The Novel from Dickens to Today", "Street Art and Political Expression", "Coffeehouses and Public Debate",
    "Tea Culture in Britain and China", "The Olympics as Global Stage", "National Anthems and Identity",
    "Censorship and Banned Books", "Reality TV and Celebrity Culture", "Social Media and Protest Movements",
    "Cosplay and Fan Communities", "Documentary Film and Truth", "Podcasts and History Storytelling",
    "Board Games Through the Ages", "Theme Parks and Historical Fantasy", "Language Change Over Centuries",
    "Emoji and Digital Communication", "Stand-Up Comedy and Satire", "Fashion Icons of the 20th Century",
  ],
  "World History": [
    "The Columbian Exchange", "Atlantic Slave Trade and Its Legacies", "Pan-Africanism and Diaspora",
    "The United Nations and Global Governance", "Human Rights After 1945", "International Law and the ICC",
    "The Green Revolution in Agriculture", "Water Rights and River Civilizations", "Desert Empires and Trade",
    "Pacific Island Navigation", "Australian Aboriginal Histories", "Arctic Peoples and Adaptation",
    "The Amazon and Indigenous Stewardship", "Trans-Saharan Gold and Salt Routes", "Indian Ocean Trade Network",
    "The Opium Wars and China", "Korean History Before Division", "Southeast Asian Kingdoms",
    "Polynesian Migration Theories", "The Bering Strait and First Americans", "Comparative Revolutions",
    "Genocide Prevention and Remembrance", "Refugee Diasporas in the 20th Century", "Urbanization Megacities",
    "Pandemics Before COVID", "Comparative Empires: Rome and Han", "World Religions: Origins and Spread",
    "Secularism and Modern States", "International Space Cooperation", "Antarctic Exploration History",
    "Deep Sea and Underwater Archaeology", "Comparative Slavery Systems", "World Fairs and Global Exhibitions",
    "Olympic Boycotts and Politics", "Fair Trade and Ethical Consumption", "Microfinance and Development",
    "NGOs and Humanitarian Aid", "Comparative Education Systems", "World Health Organization Origins",
    "Nuclear Proliferation Timeline", "Cyber Warfare in the 21st Century", "Comparative Constitutional Design",
  ],
};

/**
 * Maps specific lesson topic titles to their ideal thumbnail images.
 * Any title listed here will use its dedicated image instead of the
 * rotating THUMBNAILS fallback.
 */
const TOPIC_IMAGE_MAP: Record<string, string> = {
  // Ancient History
  "Mesopotamia and the Birth of Writing": IMAGES.lessons.mesopotamia,
  "Hammurabi's Code and Early Law": IMAGES.lessons.hammurabi,
  "The Persian Empire at Its Height": IMAGES.lessons.persianEmpire,
  "Sparta vs. Athens": IMAGES.lessons.spartaAthens,
  "Alexander the Great's Conquests": IMAGES.lessons.alexanderGreat,
  "The Punic Wars": IMAGES.lessons.punicWars,
  "Daily Life in Pompeii": IMAGES.lessons.pompeii,
  "Cleopatra and the End of Egypt": IMAGES.figures.cleopatra,
  "The Han Dynasty and Silk Road Origins": IMAGES.lessons.silkRoad,
  "Maya Civilization and Astronomy": IMAGES.places.machuPicchu,
  "Aztec Society Before Conquest": IMAGES.places.machuPicchu,
  "Inca Roads and Administration": IMAGES.places.machuPicchu,
  "Fall of the Western Roman Empire": IMAGES.events.fallOfRome,
  "Byzantium: Rome's Eastern Heir": IMAGES.places.colosseum,
  "Roman Engineering and Aqueducts": IMAGES.places.colosseum,
  "Sumerian City-States": IMAGES.lessons.mesopotamia,
  "The Epic of Gilgamesh in Context": IMAGES.lessons.mesopotamia,
  "Nubia and the Kingdom of Kush": IMAGES.lessons.egypt,
  "Temple Architecture from Egypt to Greece": IMAGES.lessons.egypt,
  "Hellenistic Kingdoms After Alexander": IMAGES.lessons.alexanderGreat,
  "Ancient Olympic Games": IMAGES.lessons.greekDemocracy,
  "Women in Ancient Athens": IMAGES.lessons.greekDemocracy,
  "The Library of Alexandria": IMAGES.lessons.greekDemocracy,
  "Etruscans and the Founding of Rome": IMAGES.lessons.romanSenate,
  "Roman Republic to Empire Transition": IMAGES.lessons.romanSenate,
  "Roman Law and the Twelve Tables": IMAGES.lessons.romanSenate,
  "Gladiators and Roman Entertainment": IMAGES.places.colosseum,
  "Roman Britain and Hadrian's Wall": IMAGES.places.colosseum,
  "Carthage and Mediterranean Trade": IMAGES.lessons.punicWars,
  "Phoenician Traders of the Mediterranean": IMAGES.lessons.silkRoad,
  // Medieval History
  "The Mongol Empire Under Genghis Khan": IMAGES.places.greatWall,
  "Marco Polo's Journey to China": IMAGES.lessons.silkRoad,
  "Ottoman Rise and Constantinople's Fall": IMAGES.lessons.crusades,
  "Richard the Lionheart and the Third Crusade": IMAGES.lessons.crusades,
  "Saladin and the Ayyubid Dynasty": IMAGES.lessons.crusades,
  "The Children's Crusade": IMAGES.lessons.crusades,
  "The Teutonic Knights in the Baltic": IMAGES.lessons.crusades,
  "Medieval Plague and Social Change": IMAGES.lessons.blackDeath,
  "The Black Death": IMAGES.lessons.blackDeath,
  "Islamic Golden Age Science": IMAGES.events.islamicGoldenAge,
  "Al-Andalus: Muslim Spain": IMAGES.events.islamicGoldenAge,
  "Medieval African Kingdoms: Mali": IMAGES.lessons.decolonization,
  "Medieval Japan and the Samurai Code": IMAGES.places.greatWall,
  "The Song Dynasty and Innovation": IMAGES.places.greatWall,
  "The Norman Conquest of England": IMAGES.events.magnaCarta,
  "The Great Schism in the Church": IMAGES.events.magnaCarta,
  "Medieval Universities and Scholasticism": IMAGES.lessons.greekDemocracy,
  "Gothic Cathedrals and Faith": IMAGES.events.magnaCarta,
  "Joan of Arc and French Nationhood": IMAGES.events.frenchRevolution,
  "The Hundred Years' War": IMAGES.events.frenchRevolution,
  "The Wars of the Roses": IMAGES.events.frenchRevolution,
  "The Printing Press Revolution": IMAGES.events.cuneiform,
  "Charlemagne and the Frankish Empire": IMAGES.lessons.crusades,
  // Modern History
  "Napoleon's Empire and Legacy": IMAGES.figures.napoleon,
  "Congress of Vienna and European Order": IMAGES.figures.napoleon,
  "Russian Revolution of 1917": IMAGES.events.ww1,
  "World War II: Origins and Blitzkrieg": IMAGES.events.ww2,
  "The D-Day Landings": IMAGES.events.ww2,
  "The Atomic Bomb and Its Aftermath": IMAGES.events.ww2,
  "Stalinism and the Soviet Union": IMAGES.events.ww2,
  "Mao's China and the Cultural Revolution": IMAGES.places.greatWall,
  "Korean War and Divided Peninsula": IMAGES.places.greatWall,
  "Vietnam War in Global Context": IMAGES.events.ww2,
  "The Cuban Missile Crisis": IMAGES.lessons.spaceRace,
  "The Cold War Begins": IMAGES.lessons.spaceRace,
  "The Berlin Wall and German Reunification": IMAGES.lessons.spaceRace,
  "The Fall of the Soviet Union": IMAGES.lessons.spaceRace,
  "Apartheid and South African Liberation": IMAGES.lessons.civilRights,
  "Women's Suffrage Movements": IMAGES.lessons.civilRights,
  "Nelson Mandela and Reconciliation": IMAGES.lessons.civilRights,
  "The Scramble for Africa": IMAGES.lessons.decolonization,
  "Imperialism in India": IMAGES.lessons.decolonization,
  "Partition of India and Pakistan": IMAGES.lessons.decolonization,
  "Latin American Independence Movements": IMAGES.events.americanRevolution,
  "Industrial Revolution in Britain": IMAGES.events.ww1,
  "Child Labor and Factory Reform": IMAGES.events.ww1,
  "The Great Depression Worldwide": IMAGES.events.ww1,
  "The Enlightenment and Reason": IMAGES.events.renaissance,
  "Meiji Restoration in Japan": IMAGES.places.greatWall,
  // Cultural History
  "Impressionism and Modern Art": IMAGES.events.frenchRevolution,
  "Shakespeare's England": IMAGES.events.magnaCarta,
  "The Harlem Renaissance": IMAGES.lessons.civilRights,
  // World History
  "The Columbian Exchange": IMAGES.events.columbus,
  "Atlantic Slave Trade and Its Legacies": IMAGES.lessons.civilRights,
  "Pan-Africanism and Diaspora": IMAGES.lessons.civilRights,
  "Trans-Saharan Gold and Salt Routes": IMAGES.lessons.silkRoad,
  "Indian Ocean Trade Network": IMAGES.lessons.silkRoad,
  "The Opium Wars and China": IMAGES.places.greatWall,
  "Pandemics Before COVID": IMAGES.lessons.blackDeath,
  "Comparative Empires: Rome and Han": IMAGES.lessons.romanSenate,
  "International Space Cooperation": IMAGES.lessons.spaceRace,
  "Antarctic Exploration History": IMAGES.lessons.spaceRace,
};

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function buildGeneratedLessons(startId: number, count: number): LessonCard[] {
  const lessons: LessonCard[] = [];
  let id = startId;
  let topicIndex = 0;

  for (const subject of SUBJECTS) {
    const topics = TOPIC_BANK[subject];
    for (const title of topics) {
      if (lessons.length >= count) break;
      const seed = id;
      const level = LEVELS[Math.floor(pseudoRandom(seed) * LEVELS.length)];
      const durationMin = 35 + Math.floor(pseudoRandom(seed + 1) * 45);
      const students = 1200 + Math.floor(pseudoRandom(seed + 2) * 9800);
      const rating = Math.round((4.3 + pseudoRandom(seed + 3) * 0.7) * 10) / 10;

      const thumbnail =
        TOPIC_IMAGE_MAP[title] ?? THUMBNAILS[topicIndex % THUMBNAILS.length];

      lessons.push({
        id: String(id),
        title,
        subject,
        level,
        duration: `${durationMin} min`,
        students,
        rating,
        tier: "plus",
        thumbnail,
        description: `An engaging deep dive into ${title.toLowerCase()} — primary sources, key figures, and lasting impact on the world we live in today.`,
      });
      id++;
      topicIndex++;
    }
    if (lessons.length >= count) break;
  }

  return lessons;
}

function buildCatalog(): LessonCard[] {
  const premiumFlagshipCount = 5;

  const flagship: LessonCard[] = FLAGSHIP_LESSONS.map((lesson, index) => ({
    ...lesson,
    tier:
      index < FREE_LESSON_COUNT
        ? "free"
        : index >= FLAGSHIP_LESSONS.length - premiumFlagshipCount
          ? "premium"
          : "plus",
  }));

  const generated = buildGeneratedLessons(flagship.length + 1, TOTAL_LESSON_TARGET - flagship.length);

  const premiumFromGenerated = PREMIUM_EXCLUSIVE_COUNT - premiumFlagshipCount;
  for (let i = generated.length - premiumFromGenerated; i < generated.length; i++) {
    generated[i].tier = "premium";
  }

  return [...flagship, ...generated];
}

export const LESSON_CATALOG = buildCatalog();

export const LESSON_SUBJECTS = ["All", ...SUBJECTS] as const;

export const LESSON_LEVELS = ["All Levels", ...LEVELS] as const;

export function countLessonsByTier(tier: LessonAccessTier): number {
  return LESSON_CATALOG.filter((l) => l.tier === tier).length;
}
