import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar/Navbar";

const popularTopics = [
  {
    label: "What is Yoga?",
    slug: "what-is-yoga",
  },
  {
    label: "Pranayama",
    slug: "understanding-pranayama",
  },
  {
    label: "Yoga Sutras",
    slug: "yoga-sutras",
  },
  {
    label: "Surya Namaskar",
    slug: "surya-namaskar",
  },
];

const floatingSymbols = ["ॐ", "✦", "◌", "✧", "☽"];

const knowledgeCategories = [
  {
    id: "foundations",
    icon: "🕉️",
    title: "Yoga Foundations",
    description:
      "Explore the origins, meaning and essential principles behind yoga.",
    topics: "Origins · Meaning · Core Concepts",
  },
  {
    id: "practices",
    icon: "🧘",
    title: "Practices & Techniques",
    description:
      "Understand asanas, pranayama, mudras and other yogic practices.",
    topics: "Asana · Pranayama · Mudra",
  },
  {
    id: "philosophy",
    icon: "📜",
    title: "Philosophy & Wisdom",
    description:
      "Discover timeless ideas, texts and philosophies that shape yoga.",
    topics: "Yoga Sutras · Gita · Eight Limbs",
  },
  {
    id: "wellness",
    icon: "🌿",
    title: "Yoga & Wellness",
    description:
      "Learn how yogic knowledge connects with balance and everyday well-being.",
    topics: "Mind · Body · Balance",
  },
  {
    id: "lifestyle",
    icon: "☀️",
    title: "Yogic Lifestyle",
    description:
      "Explore mindful routines, habits and principles for daily living.",
    topics: "Dinacharya · Habits · Balance",
  },
  {
    id: "sanskrit",
    icon: "अ",
    title: "Sanskrit & Terminology",
    description:
      "Understand important Sanskrit words and concepts used in yoga.",
    topics: "Words · Meaning · Pronunciation",
  },
];

const learningPaths = [
  {
    icon: "🌱",
    title: "New to Yoga?",
    description:
      "Understand the basics and begin your journey with simple concepts.",
    slug: "what-is-yoga",
    accent: "emerald",
  },
  {
    icon: "🕉️",
    title: "Ancient Wisdom",
    description:
      "Explore India's yoga philosophy, classical texts and traditions.",
    slug: "yoga-sutras",
    accent: "amber",
  },
  {
    icon: "🧘",
    title: "Understanding Practice",
    description:
      "Learn the meaning behind asanas, pranayama, mudras and other practices.",
    slug: "understanding-pranayama",
    accent: "amber",
  },
];

const popularLearningTopics = [
  {
    number: "01",
    title: "What is Yoga?",
    description:
      "Understand the meaning, purpose and deeper idea of yoga beyond physical postures.",
    icon: "🕉️",
    slug: "what-is-yoga",
  },
  {
    number: "02",
    title: "History of Yoga",
    description:
      "Explore how yoga developed through different periods and traditions.",
    icon: "⌛",
    slug: "history-of-yoga",
  },
  {
    number: "03",
    title: "The Eight Limbs of Yoga",
    description:
      "Explore the eight interconnected principles described in the Yoga Sutras.",
    icon: "✦",
    slug: "eight-limbs-of-yoga",
  },
  {
    number: "04",
    title: "Surya Namaskar",
    description:
      "Discover the sequence, purpose and cultural context behind the Sun Salutation.",
    icon: "☀️",
    slug: "surya-namaskar",
  },
  {
    number: "05",
    title: "Understanding Pranayama",
    description:
      "Learn the foundations of breath awareness and traditional breathing practices.",
    icon: "◌",
    slug: "understanding-pranayama",
  },
  {
    number: "06",
    title: "Yoga Sutras of Patanjali",
    description:
      "Explore important ideas and principles of classical yoga philosophy.",
    icon: "📜",
    slug: "yoga-sutras",
  },
  {
    number: "07",
    title: "Mudras and Their Meaning",
    description:
      "Understand the symbolic hand gestures used in different yogic traditions.",
    icon: "🤲",
    slug: "mudras-and-their-meaning",
  },
  {
    number: "08",
    title: "Yoga Nidra Explained",
    description:
      "Learn about the practice commonly described as yogic relaxation.",
    icon: "☾",
    slug: "yoga-nidra-explained",
  },
];

const ancientTexts = [
  {
    title: "Patanjali Yoga Sutras",
    subtitle: "The Philosophy of Yoga",
    symbol: "ॐ",
    description:
      "Explore important ideas and principles associated with classical yoga philosophy.",
    tag: "Classical Yoga",
    article: "yoga-sutras",
  },
  {
    title: "Bhagavad Gita",
    subtitle: "Yoga in Everyday Life",
    symbol: "☸",
    description:
      "Understand perspectives on Karma Yoga, Bhakti Yoga and Jnana Yoga in simple language.",
    tag: "Indian Philosophy",
    article: "bhagavad-gita",
  },
  {
    title: "Upanishadic Wisdom",
    subtitle: "Self and Inner Knowledge",
    symbol: "◌",
    description:
      "Explore ancient ideas about the self, consciousness and inner knowledge.",
    tag: "Ancient Wisdom",
    article: "upanishadic-wisdom",
  },
];

const yogaTimeline = [
  {
    era: "Ancient Traditions",
    period: "Early roots",
    title: "Early Yogic Ideas",
    description:
      "Ideas related to meditation, self-discipline and inner exploration developed within ancient Indian traditions.",
    icon: "◉",
  },
  {
    era: "Classical Yoga",
    period: "Classical period",
    title: "Yoga Sutras",
    description:
      "Yoga philosophy became more systematically expressed through teachings associated with Patanjali.",
    icon: "ॐ",
  },
  {
    era: "Hatha Development",
    period: "Medieval period",
    title: "Rise of Hatha Yoga",
    description:
      "Physical practices, breathwork and disciplined methods became increasingly important in Hatha traditions.",
    icon: "◌",
  },
  {
    era: "Global Journey",
    period: "19th–20th Century",
    title: "Yoga Reaches the World",
    description:
      "Yoga travelled beyond India and developed through diverse schools and teaching traditions.",
    icon: "✦",
  },
  {
    era: "Modern Era",
    period: "Today",
    title: "Ancient Wisdom, Modern Life",
    description:
      "People continue to explore yoga through philosophical, physical and wellness-oriented perspectives.",
    icon: "∞",
  },
];

const accentStyles = {
  emerald: {
    border: "border-emerald-300/15 hover:border-emerald-300/35",
    bg: "from-emerald-300/[0.08] to-transparent",
    icon: "border-emerald-300/20 bg-emerald-300/[0.08]",
    text: "text-emerald-300",
  },
  amber: {
    border: "border-amber-300/15 hover:border-amber-300/35",
    bg: "from-amber-300/[0.08] to-transparent",
    icon: "border-amber-300/20 bg-amber-300/[0.08]",
    text: "text-amber-300",
  },
};

const KnowledgeHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchResultsRef = useRef(null);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return popularLearningTopics.filter((topic) => {
      return (
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const scrollToResults = () => {
    setTimeout(() => {
      searchResultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const handlePopularClick = (topic) => {
    setSearchQuery(topic.label);
    scrollToResults();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    scrollToResults();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#070b14] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-162.5 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[15%] h-72 w-72 rounded-full bg-amber-400/6 blur-[130px]" />
          <div className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-emerald-400/4 blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />

          {floatingSymbols.map((symbol, index) => (
            <motion.div
              key={index}
              className="absolute select-none text-amber-200/20"
              style={{
                left: `${12 + index * 18}%`,
                top: `${18 + (index % 3) * 25}%`,
                fontSize: `${30 + index * 10}px`,
              }}
              animate={{
                y: [0, -14, 0],
                opacity: [0.12, 0.35, 0.12],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/5 px-4 py-2 text-sm text-amber-200 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_15px_rgba(252,211,77,0.8)]" />
            FlowState Knowledge Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-5 max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Explore the{" "}
            <span className="bg-linear-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
              wisdom
            </span>{" "}
            behind yoga.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
          >
            From ancient Indian knowledge to modern everyday understanding.
            Discover the ideas, practices and traditions that continue to guide
            people around the world.
          </motion.p>

          {/* FUNCTIONAL SEARCH */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 w-full max-w-2xl"
          >
            <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 backdrop-blur-xl transition duration-300 focus-within:border-amber-300/40 focus-within:bg-white/[0.07]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5 shrink-0 text-amber-200/70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m2.35-5.4a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z"
                />
              </svg>

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search yoga topics, Sanskrit terms, practices..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 sm:text-base"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-slate-500 transition hover:text-amber-200"
                >
                  Clear
                </button>
              )}

              <button
                type="submit"
                className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-semibold text-[#1a1205] transition hover:bg-amber-200"
              >
                Search
              </button>
            </div>

            {/* Popular functional tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-sm text-slate-500">Popular:</span>

              {popularTopics.map((topic) => (
                <button
                  type="button"
                  key={topic.slug}
                  onClick={() => handlePopularClick(topic)}
                  className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/30 hover:bg-amber-300/10 hover:text-amber-200 sm:text-sm"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 sm:text-sm">
              Ancient wisdom · Clear understanding · Modern life
            </p>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-3 text-amber-300/70"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      <section
        ref={searchResultsRef}
        className="relative scroll-mt-24 px-4 pb-8 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          {searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/[0.07] bg-white/2.5 p-5"
            >
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-amber-300/70">Search results</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""} for "
                    {searchQuery}"
                  </h2>
                </div>

                <button
                  onClick={() => setSearchQuery("")}
                  className="w-fit text-sm text-slate-500 transition hover:text-amber-200"
                >
                  Close results
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {searchResults.map((topic) => (
                    <a
                      key={topic.slug}
                      href={`/knowledge-hub/article/${topic.slug}`}
                      className="group rounded-xl border border-white/6 bg-[#0b101c]/70 p-4 transition hover:border-amber-300/25 hover:bg-white/4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-white group-hover:text-amber-200">
                            {topic.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {topic.description}
                          </p>
                        </div>

                        <span className="text-amber-300 transition group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 p-5 text-slate-500">
                  No matching topic found yet. Try Yoga, Pranayama, Surya
                  Namaskar or Yoga Sutras.
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* EXPLORE THE KNOWLEDGE */}
      <section
        id="explore"
        className="relative scroll-mt-24 border-t border-white/5 px-4 py-14 sm:px-6 sm:py-16 lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[20%] h-64 w-64 rounded-full bg-amber-500/4 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-8 max-w-2xl text-center"
          >
            <span className="text-sm font-medium uppercase tracking-[0.22em] text-amber-300/70">
              Begin Exploring
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore the{" "}
              <span className="bg-linear-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                knowledge
              </span>
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              Choose a path and begin discovering the ideas, practices and
              traditions behind yoga.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {knowledgeCategories.map((category, index) => (
              <motion.a
                key={category.id}
                href={`/knowledge-hub/${category.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5 transition duration-300 hover:border-amber-300/30 hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-300/6 text-xl transition group-hover:scale-110">
                  {category.icon}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-amber-200">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-3">
                  <span className="text-xs text-slate-500">
                    {category.topics}
                  </span>

                  <span className="text-amber-300 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* START YOUR LEARNING JOURNEY */}
      <section className="relative px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-8 max-w-2xl text-center"
          >
            <span className="text-sm font-medium uppercase tracking-[0.22em] text-amber-300/70">
              Start Here
            </span>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Start your{" "}
              <span className="bg-linear-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                learning journey
              </span>
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              Three simple ways to begin exploring yoga knowledge.
            </p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-3">
            {learningPaths.map((path, index) => {
              const accent = accentStyles[path.accent];

              return (
                <motion.a
                  key={path.title}
                  href={`/knowledge-hub/article/${path.slug}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  className={`group rounded-2xl border bg-linear-to-br ${accent.border} ${accent.bg} p-6`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl ${accent.icon}`}
                  >
                    {path.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {path.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {path.description}
                  </p>

                  <div
                    className={`mt-5 flex items-center gap-2 text-sm font-medium ${accent.text}`}
                  >
                    Start exploring →
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR TOPICS */}
      <section className="relative border-y border-white/5 bg-white/1.5 px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.22em] text-amber-300/70">
                Popular Topics
              </span>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Explore what people are{" "}
                <span className="text-amber-300">curious about</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
              Simple topics to help you understand yoga step by step.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularLearningTopics.map((topic, index) => (
              <motion.a
                key={topic.slug}
                href={`/knowledge-hub/article/${topic.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -4 }}
                className="group relative min-h-47.5 overflow-hidden rounded-2xl border border-white/8 bg-[#0b101c]/70 p-5 transition hover:border-amber-300/25 hover:bg-white/4"
              >
                <span className="absolute right-4 top-2 text-5xl font-bold text-white/2.5">
                  {topic.number}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-300/6 text-lg">
                  {topic.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-amber-200">
                  {topic.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {topic.description}
                </p>

                <div className="mt-4 text-sm text-amber-300">
                  Explore →
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ANCIENT TEXTS */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.035] blur-[140px]" />
          <div className="absolute left-[5%] top-[5%] text-[10rem] text-amber-200/1.5">
            ॐ
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300/70">
              A Living Archive
            </span>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ancient Indian{" "}
              <span className="bg-linear-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                texts & wisdom
              </span>
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Explore influential texts and traditions through simple and
              respectful explanations.
            </p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-3">
            {ancientTexts.map((text, index) => (
              <motion.a
                key={text.title}
                href={`/knowledge-hub/article/${text.article}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -5 }}
                className="group relative min-h-82.5 overflow-hidden rounded-3xl border border-amber-300/12 bg-linear-to-b from-amber-300/[0.07] via-white/2.5 to-transparent p-6"
              >
                <div className="absolute right-5 top-2 text-6xl text-amber-200/8 transition group-hover:scale-110">
                  {text.symbol}
                </div>

                <span className="relative z-10 rounded-full border border-amber-300/15 bg-amber-300/6 px-3 py-1 text-xs text-amber-200/80">
                  {text.tag}
                </span>

                <div className="relative z-10 mt-14">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {text.subtitle}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold text-white group-hover:text-amber-200">
                    {text.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {text.description}
                  </p>
                </div>

                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between border-t border-white/6 pt-3">
                  <span className="text-sm text-slate-500">
                    Explore the text
                  </span>

                  <span className="text-amber-300 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* YOGA THROUGH THE AGES */}
      <section className="relative border-t border-white/5 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300/70">
              A Journey Through Time
            </span>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Yoga through the{" "}
              <span className="text-amber-300">ages</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Follow a simple journey from ancient traditions to modern life.
            </p>
          </motion.div>

          <div className="relative mt-10 hidden lg:block">
            <div className="absolute left-0 right-0 top-8.5 h-px bg-linear-to-r from-transparent via-amber-300/30 to-transparent" />

            <div className="grid grid-cols-5 gap-4">
              {yogaTimeline.map((item, index) => (
                <motion.div
                  key={item.era}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                >
                  <div className="relative z-10 flex h-17.5 items-center">
                    <div className="flex h-17.5 w-17.5 items-center justify-center rounded-full border border-amber-300/25 bg-[#0b101c] text-xl text-amber-200">
                      {item.icon}
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="text-xs uppercase tracking-[0.14em] text-amber-300/60">
                      {item.period}
                    </span>

                    <p className="mt-2 text-xs font-medium text-emerald-300/70">
                      {item.era}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 lg:hidden">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-amber-300/40 via-amber-300/15 to-transparent" />

            <div className="space-y-7">
              {yogaTimeline.map((item, index) => (
                <motion.div
                  key={item.era}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  className="relative pl-14"
                >
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/25 bg-[#0b101c] text-sm text-amber-200">
                    {item.icon}
                  </div>

                  <span className="text-xs uppercase tracking-[0.14em] text-amber-300/60">
                    {item.period}
                  </span>

                  <p className="mt-1 text-xs text-emerald-300/70">
                    {item.era}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUE YOUR JOURNEY */}
      <section className="relative border-t border-white/5 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300/70">
              Learn · Reflect · Practice
            </span>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Continue your{" "}
              <span className="text-amber-300">journey</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Knowledge becomes more meaningful when you explore it through
              experience.
            </p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-2">
            <motion.a
              href="/yoga"
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -5 }}
              className="group relative min-h-70 overflow-hidden rounded-3xl border border-emerald-300/[0.14] bg-linear-to-br from-emerald-300/8 via-white/2.5 to-transparent p-7"
            >
              <div className="absolute -right-5 -top-8 text-[9rem] opacity-[0.035]">
                🧘
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/8 text-xl">
                  🧘
                </div>

                <div className="mt-auto pt-10">
                  <span className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">
                    Practice
                  </span>

                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Take it to the mat
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                    Turn what you learn into mindful movement, breath and
                    everyday experience.
                  </p>

                  <div className="mt-5 text-sm font-medium text-emerald-300">
                    Explore Yoga →
                  </div>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="/deep-dive"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative min-h-70 overflow-hidden rounded-3xl border border-amber-300/[0.14] bg-linear-to-br from-amber-300/8 via-white/2.5 to-transparent p-7"
            >
              <div className="absolute -right-5 -top-8 text-[9rem] text-amber-200 opacity-[0.035]">
                ✦
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/8 text-xl text-amber-200">
                  ✦
                </div>

                <div className="mt-auto pt-10">
                  <span className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
                    Reflect
                  </span>

                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Go deeper
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                    Slow down, reflect and explore ideas through a deeper guided
                    experience.
                  </p>

                  <div className="mt-5 text-sm font-medium text-amber-300">
                    Enter Deep Dive →
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/5 blur-[140px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-amber-300/15 bg-linear-to-b from-amber-300/8 via-white/2.5 to-transparent px-6 py-12 text-center sm:px-10"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/8 text-2xl text-amber-200">
            ॐ
          </div>

          <span className="mt-6 block text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Your Journey Begins Here
          </span>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Explore. Understand.{" "}
            <span className="text-amber-300">Experience.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Explore yoga, philosophy, practices and traditions through clear,
            simple and modern explanations.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#explore"
              className="rounded-xl bg-linear-to-r from-amber-300 to-yellow-500 px-6 py-3 font-semibold text-[#1a1205] transition hover:scale-[1.02]"
            >
              Begin Exploring →
            </a>

            <a
              href="/yoga"
              className="rounded-xl border border-white/10 bg-white/3 px-6 py-3 font-medium text-slate-200 transition hover:border-amber-300/25 hover:text-amber-200"
            >
              Explore Yoga
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/6 bg-[#050811] px-4 pb-6 pt-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <a href="/" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[0.07]">
                  🌿
                </div>

                <span className="text-2xl font-bold">
                  <span className="text-white">Flow</span>
                  <span className="text-amber-300">State</span>
                </span>
              </a>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                A space to explore yoga knowledge, traditions and practices
                through a modern lens.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                Explore
              </h3>

              <div className="mt-4 flex flex-col gap-2 text-sm">
                <a
                  href="/knowledge-hub"
                  className="text-slate-500 transition hover:text-amber-200"
                >
                  Knowledge Hub
                </a>

                <a
                  href="/yoga"
                  className="text-slate-500 transition hover:text-amber-200"
                >
                  Yoga
                </a>

                <a
                  href="/deep-dive"
                  className="text-slate-500 transition hover:text-amber-200"
                >
                  Deep Dive
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                Discover
              </h3>

              <div className="mt-4 flex flex-col gap-2 text-sm">
                <a
                  href="/knowledge-hub/foundations"
                  className="text-slate-500 transition hover:text-amber-200"
                >
                  Yoga Foundations
                </a>

                <a
                  href="/knowledge-hub/practices"
                  className="text-slate-500 transition hover:text-amber-200"
                >
                  Practices
                </a>

                <a
                  href="/knowledge-hub/philosophy"
                  className="text-slate-500 transition hover:text-amber-200"
                >
                  Philosophy
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/6 pt-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 FlowState. Explore with curiosity.</p>

            <div className="flex items-center gap-2">
              <span className="text-amber-300/60">ॐ</span>
              <span>Ancient wisdom · Modern exploration</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KnowledgeHub;