"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Play,
  Lock,
  Star,
  Eye,
  Clock,
  X,
  PlaySquare,
  Filter,
  Tv,
} from "lucide-react";
import {
  VIDEO_LIBRARY,
  VIDEO_SUBJECTS,
  VIDEO_CHANNELS,
  ytThumbnail,
  ytEmbedUrl,
  type VideoLength,
  type VideoEntry,
} from "@/lib/videoLibrary";

const LENGTHS: ("All" | VideoLength)[] = ["All", "Short", "Medium", "Long"];
const LENGTH_DESC: Record<VideoLength, string> = {
  Short: "< 6 min",
  Medium: "6–12 min",
  Long: "12+ min",
};

function VideoModal({
  video,
  onClose,
}: {
  video: VideoEntry | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${video.title}`}
        >
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-5xl my-8 rounded-3xl overflow-hidden bg-card border border-gold/30 shadow-2xl shadow-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white hover:bg-black/80 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close video"
            >
              <X size={18} />
            </button>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={ytEmbedUrl(video.youtubeId, true)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 font-bold inline-flex items-center gap-1">
                  <PlaySquare size={11} aria-hidden="true" /> {video.channel}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold font-bold">
                  {video.subject}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {video.era}
                </span>
                <span className="ml-auto flex items-center gap-3 text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} aria-hidden="true" /> {video.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye size={11} aria-hidden="true" /> {video.views} views
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star size={11} className="text-gold fill-gold" aria-hidden="true" /> {video.rating}
                  </span>
                </span>
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl">{video.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{video.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function VideoLibrary() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState<string>("All");
  const [channel, setChannel] = useState<string>("All");
  const [length, setLength] = useState<"All" | VideoLength>("All");
  const [freeOnly, setFreeOnly] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return VIDEO_LIBRARY.filter((v) => {
      if (subject !== "All" && v.subject !== subject) return false;
      if (channel !== "All" && v.channel !== channel) return false;
      if (length !== "All" && v.length !== length) return false;
      if (freeOnly && !v.free) return false;
      if (
        q &&
        !v.title.toLowerCase().includes(q) &&
        !v.description.toLowerCase().includes(q) &&
        !v.channel.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [search, subject, channel, length, freeOnly]);

  const activeVideo = filtered.find((v) => v.id === activeId)
    ?? VIDEO_LIBRARY.find((v) => v.id === activeId)
    ?? null;

  const reset = () => {
    setSearch("");
    setSubject("All");
    setChannel("All");
    setLength("All");
    setFreeOnly(false);
  };

  return (
    <section aria-label="Video library">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-gold/20 bg-gradient-to-br from-card via-card to-gold/5 p-6 sm:p-8 mb-6 relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-red-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />

        <div className="relative flex flex-wrap items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
            <PlaySquare size={22} className="text-white fill-white" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-black text-2xl sm:text-3xl">
              Curated <span className="gold-gradient-text">Video Library</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {VIDEO_LIBRARY.length} hand-picked YouTube documentaries from the world&apos;s best history channels.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold">
            <Tv size={12} aria-hidden="true" />
            {VIDEO_CHANNELS.length} channels
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos by title, description, or channel..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
            aria-label="Search video library"
          />
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Subject pills */}
        <div className="flex flex-wrap gap-2">
          {(["All", ...VIDEO_SUBJECTS] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                subject === s
                  ? "gold-gradient text-white shadow"
                  : "border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
              aria-pressed={subject === s}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-border hidden sm:block" />

        {/* Channel select */}
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="px-3 py-1.5 rounded-xl text-sm border border-border bg-background focus:border-gold/60 focus:outline-none transition-colors"
          aria-label="Filter by channel"
        >
          <option value="All">All channels</option>
          {VIDEO_CHANNELS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Length select */}
        <select
          value={length}
          onChange={(e) => setLength(e.target.value as "All" | VideoLength)}
          className="px-3 py-1.5 rounded-xl text-sm border border-border bg-background focus:border-gold/60 focus:outline-none transition-colors"
          aria-label="Filter by length"
        >
          {LENGTHS.map((l) => (
            <option key={l} value={l}>
              {l === "All" ? "Any length" : `${l} (${LENGTH_DESC[l]})`}
            </option>
          ))}
        </select>

        {/* Free toggle */}
        <button
          onClick={() => setFreeOnly((f) => !f)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border focus-visible:ring-2 focus-visible:ring-gold ${
            freeOnly
              ? "border-gold bg-gold/10 text-gold"
              : "border-border text-muted-foreground hover:border-gold/40"
          }`}
          aria-pressed={freeOnly}
        >
          <Filter size={13} aria-hidden="true" /> Free only
        </button>

        {(search || subject !== "All" || channel !== "All" || length !== "All" || freeOnly) && (
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear filters
          </button>
        )}

        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} of {VIDEO_LIBRARY.length} video{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground rounded-2xl border border-dashed border-border">
          <PlaySquare size={40} className="mx-auto mb-4 opacity-40" aria-hidden="true" />
          <p className="font-semibold mb-1">No videos match your filters</p>
          <p className="text-sm">Try clearing filters or broadening your search.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((video, i) => (
              <motion.button
                key={video.id}
                layout
                type="button"
                onClick={() => setActiveId(video.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
                className="card-tilt text-left group relative rounded-2xl border border-border bg-card hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 overflow-hidden flex flex-col focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                aria-label={`Play video: ${video.title} by ${video.channel}`}
              >
                {/* Thumbnail with play button */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <ExternalImage
                    src={ytThumbnail(video.youtubeId)}
                    alt={`Thumbnail for ${video.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-500 transition-all">
                      <Play size={22} className="text-white ml-1 fill-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-white text-[11px] font-semibold tabular-nums">
                    {video.duration}
                  </div>

                  {/* Free / Lock badge */}
                  {video.free ? (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-bold shadow">
                      FREE
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 backdrop-blur flex items-center justify-center">
                      <Lock size={12} className="text-gold" aria-hidden="true" />
                    </div>
                  )}

                  {/* Channel badge */}
                  <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-white text-[10px] font-bold">
                    <PlaySquare size={10} className="text-red-500 fill-red-500" aria-hidden="true" />
                    {video.channel}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">
                    {video.subject} · {video.era}
                  </p>
                  <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2 min-h-[2.5rem]">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3 flex-1">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/50 pt-2.5">
                    <span className="inline-flex items-center gap-1">
                      <Eye size={11} aria-hidden="true" /> {video.views}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} className="text-gold fill-gold" aria-hidden="true" />
                      {video.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} aria-hidden="true" /> {video.length}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <VideoModal video={activeVideo} onClose={() => setActiveId(null)} />
    </section>
  );
}
