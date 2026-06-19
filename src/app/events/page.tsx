"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Search, Calendar, ChevronRight } from "lucide-react";
import { ExternalImage } from "@/components/shared/ExternalImage";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const ALL_EVENTS = [
  { id: "1", title: "The Birth of Writing — Cuneiform", year: "3400 BC", era: "Ancient", region: "Middle East", image: IMAGES.events.cuneiform, description: "In Mesopotamia, the Sumerians developed the world's first writing system — cuneiform — transforming record-keeping, law, and literature forever.", significance: "Foundation of all human communication and recorded history." },
  { id: "2", title: "Construction of the Great Pyramids", year: "2560 BC", era: "Ancient", region: "Africa", image: IMAGES.events.pyramids, description: "Under Pharaoh Khufu, tens of thousands of workers erected the Great Pyramid of Giza — a mathematical and engineering marvel that still stands today.", significance: "Symbol of ancient Egypt's power, organization, and vision." },
  { id: "3", title: "The Birth of Democracy in Athens", year: "508 BC", era: "Ancient", region: "Europe", image: IMAGES.events.athensDemocracy, description: "Cleisthenes reformed Athenian government to give citizens direct power — creating the world's first democracy and permanently reshaping political thought.", significance: "Foundation of modern democratic governance worldwide." },
  { id: "4", title: "The Fall of the Roman Empire", year: "476 AD", era: "Classical", region: "Europe", image: IMAGES.events.fallOfRome, description: "The deposition of the last Roman Emperor Romulus Augustulus marked the end of ancient Rome and the beginning of the Middle Ages in Western Europe.", significance: "Reshaping of European civilization for the next millennium." },
  { id: "5", title: "The Islamic Golden Age", year: "750–1258 AD", era: "Medieval", region: "Middle East", image: IMAGES.events.islamicGoldenAge, description: "For 500 years, Baghdad and other Islamic cities became centers of science, philosophy, mathematics, and medicine — preserving and advancing human knowledge.", significance: "Transmission and expansion of classical knowledge to the modern world." },
  { id: "6", title: "The Magna Carta", year: "1215 AD", era: "Medieval", region: "Europe", image: IMAGES.events.magnaCarta, description: "King John of England signed this landmark charter at Runnymede, establishing for the first time that the king was subject to the rule of law.", significance: "Birth of constitutional governance and rule of law." },
  { id: "7", title: "The Renaissance", year: "14th–17th Century", era: "Early Modern", region: "Europe", image: IMAGES.events.renaissance, description: "Beginning in Florence, a cultural and intellectual rebirth swept Europe — transforming art, architecture, science, and philosophy through figures like da Vinci and Michelangelo.", significance: "The bridge between medieval thinking and the modern world." },
  { id: "8", title: "Columbus Reaches the Americas", year: "1492", era: "Early Modern", region: "Americas", image: IMAGES.events.columbus, description: "Christopher Columbus's 1492 voyage connected two worlds that had been separated for 12,000 years, initiating an era of exploration — and devastating colonization.", significance: "Transformation of global demographics, trade, and history." },
  { id: "9", title: "The American Revolution", year: "1775–1783", era: "Modern", region: "Americas", image: IMAGES.events.americanRevolution, description: "Thirteen colonies declared independence from Britain and forged the United States, establishing ideals of liberty and self-governance that inspired revolutions worldwide.", significance: "Model for democratic revolutions around the globe." },
  { id: "10", title: "The French Revolution", year: "1789–1799", era: "Modern", region: "Europe", image: IMAGES.events.frenchRevolution, description: "France's radical political and social transformation dismantled the monarchy and nobility, establishing new ideas about citizenship, rights, and national identity.", significance: "Spread of revolutionary democratic ideas across Europe and the world." },
  { id: "11", title: "The Industrial Revolution", year: "1760–1840", era: "Modern", region: "Europe", image: IMAGES.events.industrialRevolution, description: "Steam power, factories, and mechanized production transformed Britain — then the world — creating modern economies, cities, and labor movements.", significance: "Created the economic and technological foundations of modern society." },
  { id: "12", title: "World War I", year: "1914–1918", era: "Contemporary", region: "Global", image: IMAGES.events.ww1, description: "The Great War engulfed the globe in unprecedented conflict, claiming 20 million lives, toppling four empires, and planting the seeds for an even greater conflict.", significance: "Reshaped the political map of the world and introduced modern warfare." },
  { id: "13", title: "World War II & The Holocaust", year: "1939–1945", era: "Contemporary", region: "Global", image: IMAGES.events.ww2, description: "The deadliest conflict in history — 70–85 million deaths, the Holocaust, and the eventual Allied victory — defined the 20th century and birthed the United Nations.", significance: "Established the modern international order and human rights framework." },
  { id: "14", title: "The Moon Landing", year: "July 20, 1969", era: "Contemporary", region: "Global", image: IMAGES.events.moonLanding, description: "Apollo 11 astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, fulfilling a decade-long national commitment and inspiring a generation.", significance: "The greatest achievement of human exploration and scientific ambition." },
];

const ERAS = ["All Eras", "Ancient", "Classical", "Medieval", "Early Modern", "Modern", "Contemporary"];
const REGIONS = ["All Regions", "Europe", "Americas", "Africa", "Middle East", "Asia", "Global"];

/**
 * Maps each event ID to a search keyword that pre-filters the Lessons page to
 * content related to that event. Kept intentionally broad so multiple lessons
 * surface (e.g. "renaissance" matches da Vinci AND Renaissance overview).
 */
const EVENT_LESSON_SEARCH: Record<string, string> = {
  "1":  "cuneiform writing mesopotamia",
  "2":  "egypt pyramids",
  "3":  "greek democracy athens",
  "4":  "roman empire fall",
  "5":  "islamic golden age",
  "6":  "magna carta",
  "7":  "renaissance",
  "8":  "columbus americas",
  "9":  "american revolution",
  "10": "french revolution",
  "11": "industrial revolution",
  "12": "world war I",
  "13": "world war II holocaust",
  "14": "space race moon",
};

export default function EventsPage() {
  const [era, setEra] = useState("All Eras");
  const [region, setRegion] = useState("All Regions");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = ALL_EVENTS.filter((e) => {
    if (era !== "All Eras" && e.era !== era) return false;
    if (region !== "All Regions" && e.region !== region) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.year.includes(search)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(201,168,76,0.08),transparent)]" aria-hidden="true" />
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-5">
              <Globe size={14} /> Historical Events Timeline
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl mb-3">
              Moments That <span className="gold-gradient-text">Changed the World</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">Explore the pivotal events across all of human history.</p>
            <div className="relative max-w-lg mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="search" placeholder="Search events or years..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm shadow-sm transition-colors" />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {ERAS.map((e) => (
              <button key={e} onClick={() => setEra(e)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  era === e ? "gold-gradient text-white shadow" : "border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}>
                {e}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-border hidden lg:block" />
          <select value={region} onChange={(e) => setRegion(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-sm border border-border bg-background focus:border-gold/60 focus:outline-none">
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <span className="text-xs text-muted-foreground ml-auto">{filtered.length} events</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-2xl border border-border bg-card hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 group overflow-hidden cursor-pointer"
              onClick={() => setSelected(selected === event.id ? null : event.id)}>
              <div className="relative h-44 overflow-hidden">
                <ExternalImage src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg gold-gradient text-white text-[10px] font-bold">{event.era}</span>
                  <span className="px-2 py-0.5 rounded-lg bg-black/50 text-white/80 text-[10px]">{event.region}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1.5 text-gold text-xs mb-1">
                    <Calendar size={11} /> {event.year}
                  </div>
                  <h3 className="font-heading font-bold text-white text-base leading-tight">{event.title}</h3>
                </div>
              </div>

              <motion.div initial={false} animate={{ height: selected === event.id ? "auto" : 0, opacity: selected === event.id ? 1 : 0 }}
                transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="p-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{event.description}</p>
                  <div className="p-3 rounded-xl bg-gold/5 border border-gold/15">
                    <p className="text-xs font-semibold text-gold mb-1">Historical Significance</p>
                    <p className="text-xs text-muted-foreground">{event.significance}</p>
                  </div>
                  <Link
                    href={`/lessons?search=${encodeURIComponent(EVENT_LESSON_SEARCH[event.id] ?? event.title)}`}
                    className="mt-3 flex items-center gap-1 text-xs text-gold font-semibold hover:underline"
                  >
                    Explore related lessons <ChevronRight size={12} />
                  </Link>
                </div>
              </motion.div>

              {selected !== event.id && (
                <div className="px-4 py-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Globe size={40} className="mx-auto mb-4 opacity-40" />
            <p className="font-semibold">No events found</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
