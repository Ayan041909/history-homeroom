"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, BookOpen, Video, Headphones, Map, Filter, Star, Clock, PlaySquare, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoLibrary } from "@/components/resources/VideoLibrary";
import { useToast } from "@/components/shared/Toast";
import { downloadResource } from "@/lib/resourceDownload";

type ResourceType = "all" | "guide" | "video" | "audio" | "map" | "quiz";

const RESOURCES = [
  { id: "1", title: "Complete Guide to Ancient Egypt", type: "guide", subject: "Ancient History", pages: 42, rating: 4.9, downloads: 12400, free: true, description: "A comprehensive PDF covering Egyptian dynasties, culture, religion, and the significance of the Nile." },
  { id: "2", title: "World War II: Causes & Consequences", type: "guide", subject: "Modern History", pages: 68, rating: 4.8, downloads: 9800, free: false, description: "Deep-dive study guide covering the rise of fascism, major battles, the Holocaust, and post-war restructuring." },
  { id: "3", title: "The Renaissance Explained", type: "video", subject: "Cultural History", duration: "48 min", rating: 4.9, downloads: 7600, free: true, description: "An engaging video lecture exploring how the Renaissance transformed art, science, and philosophy across Europe." },
  { id: "4", title: "Ancient Rome: Rise and Fall", type: "video", subject: "Ancient History", duration: "62 min", rating: 4.7, downloads: 11200, free: false, description: "Comprehensive video covering the Roman Republic, Empire, social structures, and the eventual collapse in 476 AD." },
  { id: "5", title: "The French Revolution Podcast Series", type: "audio", subject: "Modern History", duration: "3h 20min", rating: 4.6, downloads: 5400, free: false, description: "Six-episode audio series narrating the causes, major events, and lasting impact of the French Revolution." },
  { id: "6", title: "Historical Maps Collection", type: "map", subject: "World History", pages: 30, rating: 4.8, downloads: 8700, free: true, description: "30 high-resolution historical maps tracing empire borders, trade routes, and migration patterns from 3000 BC to 1900 AD." },
  { id: "7", title: "American Revolution Study Pack", type: "guide", subject: "Modern History", pages: 55, rating: 4.9, downloads: 14100, free: false, description: "Complete study pack including timelines, key figures, battle maps, and primary source documents from the revolutionary period." },
  { id: "8", title: "Quiz Bank: Ancient Civilizations", type: "quiz", subject: "Ancient History", questions: 200, rating: 4.7, downloads: 6300, free: false, description: "200 curated quiz questions covering Egypt, Greece, Rome, Mesopotamia, and the Indus Valley — perfect for exam prep." },
  { id: "9", title: "The Silk Road: Trade & Culture", type: "map", subject: "World History", pages: 15, rating: 4.5, downloads: 4200, free: true, description: "Illustrated maps and commentary on the ancient Silk Road trade network, its routes, goods exchanged, and cultural impact." },
  { id: "10", title: "Cold War: Flashpoints & Crises", type: "video", subject: "Modern History", duration: "55 min", rating: 4.8, downloads: 8100, free: false, description: "Video lecture analyzing the key Cold War flashpoints including Korea, Cuba, Vietnam, and the arms race." },
  { id: "11", title: "Medieval Europe Audio Guide", type: "audio", subject: "Medieval History", duration: "2h 10min", rating: 4.6, downloads: 3900, free: false, description: "Narrated audio tour of medieval European society, feudalism, the Church's power, and the Crusades." },
  { id: "12", title: "Quick Quiz: Modern World History", type: "quiz", subject: "Modern History", questions: 100, rating: 4.7, downloads: 5500, free: true, description: "100 review questions spanning industrialization, World Wars, decolonization, and Cold War — great for quick revision." },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  guide: <FileText size={16} />,
  video: <Video size={16} />,
  audio: <Headphones size={16} />,
  map: <Map size={16} />,
  quiz: <BookOpen size={16} />,
};

const TYPE_LABELS: Record<string, string> = {
  guide: "Study Guide",
  video: "Video Lecture",
  audio: "Audio Series",
  map: "Historical Map",
  quiz: "Quiz Bank",
};

const SUBJECTS = ["All Subjects", "Ancient History", "Medieval History", "Modern History", "Cultural History", "World History"];

export default function ResourcesPage() {
  const [type, setType] = useState<ResourceType>("all");
  const [subject, setSubject] = useState("All Subjects");
  const [search, setSearch] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const toast = useToast();

  const handleResourceAction = (resource: { id: string; title: string; type: string; subject: string; free: boolean }) => {
    if (!resource.free) {
      toast.info("Plus required", `Unlock "${resource.title}" with a 1-week free trial of Plus.`);
      return;
    }
    try {
      downloadResource(resource);
      toast.success("Download started", `"${resource.title}" is downloading to your device.`);
    } catch {
      toast.info("Download unavailable", "Please try again or contact support.");
    }
  };

  const filtered = RESOURCES.filter((r) => {
    if (type !== "all" && r.type !== type) return false;
    if (subject !== "All Subjects" && r.subject !== subject) return false;
    if (freeOnly && !r.free) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.subject.toLowerCase().includes(search.toLowerCase())) return false;
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
              <BookOpen size={14} /> Resources & Video Library
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl mb-3">
              Everything You Need to <span className="gold-gradient-text">Master History</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              A curated YouTube video library, plus study guides, audio series, maps, and quiz banks — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="mb-8 mx-auto glass h-auto p-1.5 rounded-full">
            <TabsTrigger
              value="videos"
              className="px-4 sm:px-6 py-2.5 text-sm font-semibold flex items-center gap-2 rounded-full text-gold/80 hover:text-gold dark:text-muted-foreground dark:hover:text-foreground data-active:!bg-gold/15 data-active:!text-gold data-active:!border data-active:!border-gold/35 data-active:shadow-sm dark:data-active:!gold-gradient dark:data-active:!text-white dark:data-active:!border-transparent dark:data-active:shadow-md"
            >
              <PlaySquare size={15} /> Video Library
            </TabsTrigger>
            <TabsTrigger
              value="library"
              className="px-4 sm:px-6 py-2.5 text-sm font-semibold flex items-center gap-2 rounded-full text-gold/80 hover:text-gold dark:text-muted-foreground dark:hover:text-foreground data-active:!bg-gold/15 data-active:!text-gold data-active:!border data-active:!border-gold/35 data-active:shadow-sm dark:data-active:!gold-gradient dark:data-active:!text-white dark:data-active:!border-transparent dark:data-active:shadow-md"
            >
              <BookOpen size={15} /> Study Resources
            </TabsTrigger>
          </TabsList>

          {/* ─────────── Video Library Tab ─────────── */}
          <TabsContent value="videos">
            <VideoLibrary />
          </TabsContent>

          {/* ─────────── Study Resources Tab ─────────── */}
          <TabsContent value="library">
            {/* Search */}
            <div className="relative mb-4 max-w-xl">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides, videos, audio, maps, quizzes…"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 transition-colors"
                aria-label="Search resources"
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {/* Type filter */}
              <div className="flex flex-wrap gap-2">
                {([["all", "All Types"], ["guide", "Guides"], ["video", "Videos"], ["audio", "Audio"], ["map", "Maps"], ["quiz", "Quizzes"]] as [ResourceType, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => setType(val)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                      type === val ? "gold-gradient text-white shadow" : "border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                    }`}>
                    {label}
                  </button>
                ))}
              </div>

              <div className="h-6 w-px bg-border hidden sm:block" />

              {/* Subject filter */}
              <select value={subject} onChange={(e) => setSubject(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-sm border border-border bg-background focus:border-gold/60 focus:outline-none transition-colors">
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>

              {/* Free toggle */}
              <button onClick={() => setFreeOnly((f) => !f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
                  freeOnly ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
                }`}>
                <Filter size={13} /> Free Only
              </button>

              <span className="text-xs text-muted-foreground ml-auto">{filtered.length} resource{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
                <p className="font-semibold mb-1">No resources found</p>
                <p className="text-sm">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((resource, i) => (
                  <motion.div key={resource.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="p-5 rounded-2xl border border-border bg-card hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gold/10 text-gold text-xs font-medium">
                        {TYPE_ICONS[resource.type]}
                        {TYPE_LABELS[resource.type]}
                      </div>
                      {resource.free
                        ? <span className="px-2 py-0.5 rounded-lg bg-green-500/10 text-green-500 text-xs font-bold">FREE</span>
                        : <span className="px-2 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium">Plus+</span>
                      }
                    </div>

                    <h3 className="font-semibold text-sm mb-2 leading-snug group-hover:text-gold transition-colors">{resource.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">{resource.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Star size={11} className="text-gold" /> {resource.rating}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />
                        {"pages" in resource ? `${resource.pages} pages` : "duration" in resource ? resource.duration : `${resource.questions} questions`}
                      </span>
                      <span className="flex items-center gap-1"><Download size={11} /> {resource.downloads.toLocaleString()}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleResourceAction(resource)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-gold ${
                        resource.free
                          ? "gold-gradient text-white hover:opacity-90 shadow"
                          : "border border-gold/40 text-gold hover:bg-gold/8"
                      }`}
                      aria-label={resource.free ? `Download ${resource.title}` : `Unlock ${resource.title} with Plus`}
                    >
                      <Download size={13} />
                      {resource.free ? "Download Free" : "Unlock with Plus"}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
