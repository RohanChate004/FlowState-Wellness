import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { categories, articles } from "./knowledgeData";

const popularTopics = [
  "What is Yoga?",
  "Pranayama",
  "Yoga Sutras",
  "Surya Namaskar",
];

const learningPaths = [
  {
    icon: "🌱",
    title: "New to Yoga?",
    description:
      "Understand the basics and begin your journey with simple concepts.",
    slug: "what-is-yoga",
    color: "green",
  },
  {
    icon: "🕉️",
    title: "Ancient Wisdom",
    description:
      "Explore India's yoga philosophy, classical texts and traditions.",
    slug: "yoga-sutras",
    color: "amber",
  },
  {
    icon: "🧘",
    title: "Understanding Practice",
    description:
      "Learn about asanas, pranayama and other yogic practices.",
    slug: "understanding-pranayama",
    color: "green",
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

const KnowledgeHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchResultsRef = useRef(null);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return articles.filter((article) => {
      const category = categories.find(
        (item) => item.id === article.category
      );

      return (
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.slug.toLowerCase().includes(query) ||
        category?.title.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const scrollToResults = () => {
    setTimeout(() => {
      searchResultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    scrollToResults();
  };

  const handlePopularClick = (topic) => {
    setSearchQuery(topic);
    scrollToResults();
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl text-center">

          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            FlowState Knowledge Hub
          </div>

          {/* Heading */}
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Explore the{" "}
            <span className="text-emerald-600">wisdom</span>{" "}
            behind yoga.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            From ancient Indian knowledge to modern everyday understanding.
            Discover the ideas, practices and traditions behind yoga.
          </p>

          {/* =================================================
              SEARCH
          ================================================== */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-7 w-full max-w-2xl"
          >
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm focus-within:border-emerald-400">

              {/* Search Icon */}
              <div className="pl-2 text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m2.35-5.4a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search yoga topics, practices, philosophy..."
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-2 text-sm text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}

              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Search
              </button>
            </div>

            {/* Popular */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-sm text-slate-400">
                Popular:
              </span>

              {popularTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handlePopularClick(topic)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:text-sm"
                >
                  {topic}
                </button>
              ))}
            </div>
          </form>

          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-slate-400 sm:text-sm">
            Ancient wisdom · Clear understanding · Modern life
          </p>
        </div>
      </section>

      {/* =====================================================
          SEARCH RESULTS
      ====================================================== */}
      {searchQuery.trim() && (
        <section
          ref={searchResultsRef}
          className="border-b border-slate-200 bg-slate-50 px-4 py-7 sm:px-6 lg:px-10"
        >
          <div className="mx-auto max-w-6xl">

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm font-medium text-emerald-600">
                    Search Results
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-slate-900">
                    {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""} for "
                    {searchQuery}"
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="w-fit text-sm text-slate-400 hover:text-emerald-600"
                >
                  Close results
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2">

                  {searchResults.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/knowledge-hub/article/${article.slug}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-emerald-300 hover:bg-emerald-50/40"
                    >
                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <div className="mb-2 text-xl">
                            {article.icon}
                          </div>

                          <h3 className="font-semibold text-slate-900">
                            {article.title}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {article.description}
                          </p>

                          <p className="mt-2 text-xs text-emerald-600">
                            {article.readTime}
                          </p>
                        </div>

                        <span className="text-emerald-600">
                          →
                        </span>

                      </div>
                    </Link>
                  ))}

                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-500">
                  No matching topic found. Try Yoga, Pranayama, Surya Namaskar
                  or Yoga Sutras.
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          EXPLORE THE KNOWLEDGE
      ====================================================== */}
      <section
        id="explore"
        className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-7 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Begin Exploring
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Explore the{" "}
              <span className="text-emerald-600">
                knowledge
              </span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Choose a category and discover the ideas behind yoga.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/knowledge-hub/${category.id}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-xl">
                  {category.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-400">
                    Explore category
                  </span>

                  <span className="text-emerald-600">
                    →
                  </span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          START YOUR LEARNING JOURNEY
      ====================================================== */}
      <section className="bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-7 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Start Here
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Start your{" "}
              <span className="text-emerald-600">
                learning journey
              </span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Three simple ways to begin exploring yoga knowledge.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">

            {learningPaths.map((path) => (
              <Link
                key={path.title}
                to={`/knowledge-hub/article/${path.slug}`}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  path.color === "emerald"
                    ? "border-emerald-200 hover:border-emerald-400"
                    : "border-amber-200 hover:border-amber-400"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border text-xl ${
                    path.color === "emerald"
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  {path.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {path.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {path.description}
                </p>

                <div
                  className={`mt-4 text-sm font-medium ${
                    path.color === "emerald"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  Start exploring →
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR TOPICS
      ====================================================== */}
      <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="mb-7">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Popular Topics
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Explore what people are{" "}
              <span className="text-emerald-600">
                curious about
              </span>
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Simple topics to help you understand yoga step by step.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {articles.map((article, index) => (
              <Link
                key={article.slug}
                to={`/knowledge-hub/article/${article.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30"
              >
                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-lg">
                    {article.icon}
                  </div>

                  <span className="text-xs font-semibold text-slate-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {article.description}
                </p>

                <div className="mt-4 text-sm text-emerald-600">
                  Explore →
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          ANCIENT INDIAN TEXTS
      ====================================================== */}
      <section className="bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-7 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
              A Living Archive
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Ancient Indian{" "}
              <span className="text-amber-600">
                texts & wisdom
              </span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Explore influential texts and traditions through simple
              explanations.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">

            {ancientTexts.map((text) => (
              <Link
                key={text.title}
                to={`/knowledge-hub/article/${text.article}`}
                className="rounded-xl border border-amber-200 bg-white p-5 shadow-sm hover:border-amber-400"
              >
                <div className="flex items-center justify-between">

                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-700">
                    {text.tag}
                  </span>

                  <span className="text-3xl text-amber-200">
                    {text.symbol}
                  </span>

                </div>

                <p className="mt-7 text-xs uppercase tracking-[0.15em] text-slate-400">
                  {text.subtitle}
                </p>

                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {text.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {text.description}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-3 text-sm text-amber-600">
                  Explore the text →
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          YOGA THROUGH THE AGES
      ====================================================== */}
      <section className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              A Journey Through Time
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Yoga through the{" "}
              <span className="text-emerald-600">
                ages
              </span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Follow a simple journey from ancient traditions to modern life.
            </p>
          </div>

          {/* Desktop */}
          <div className="mt-8 hidden lg:block">

            <div className="grid grid-cols-5 gap-4">

              {yogaTimeline.map((item) => (
                <div key={item.era}>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-lg text-emerald-700">
                    {item.icon}
                  </div>

                  <span className="mt-4 block text-xs uppercase tracking-[0.12em] text-emerald-600">
                    {item.period}
                  </span>

                  <p className="mt-1 text-xs font-medium text-amber-600">
                    {item.era}
                  </p>

                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                </div>
              ))}

            </div>
          </div>

          {/* Mobile */}
          <div className="mt-8 space-y-6 lg:hidden">

            {yogaTimeline.map((item) => (
              <div
                key={item.era}
                className="flex gap-4 border-l border-emerald-200 pl-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-sm text-emerald-700">
                  {item.icon}
                </div>

                <div>
                  <span className="text-xs uppercase tracking-[0.12em] text-emerald-600">
                    {item.period}
                  </span>

                  <p className="mt-1 text-xs text-amber-600">
                    {item.era}
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTINUE YOUR JOURNEY
      ====================================================== */}
      <section className="border-t border-slate-200 bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-7 max-w-2xl text-center">

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Learn · Reflect · Practice
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Continue your{" "}
              <span className="text-emerald-600">
                journey
              </span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Knowledge becomes more meaningful when you explore it through
              experience.
            </p>

          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            {/* Yoga */}
            <Link
              to="/yoga"
              className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm hover:border-emerald-400"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-xl">
                🧘
              </div>

              <span className="mt-6 block text-xs uppercase tracking-[0.18em] text-emerald-600">
                Practice
              </span>

              <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                Take it to the mat
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Turn what you learn into mindful movement, breath and everyday
                experience.
              </p>

              <div className="mt-4 text-sm font-medium text-emerald-600">
                Explore Yoga →
              </div>
            </Link>

            {/* Deep Dive */}
            <Link
              to="/deep-dive"
              className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm hover:border-amber-400"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-xl">
                ✦
              </div>

              <span className="mt-6 block text-xs uppercase tracking-[0.18em] text-amber-600">
                Reflect
              </span>

              <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                Go deeper
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Slow down, reflect and explore ideas through a deeper guided
                experience.
              </p>

              <div className="mt-4 text-sm font-medium text-amber-600">
                Enter Deep Dive →
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center sm:px-10">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-white text-xl text-emerald-600">
            ॐ
          </div>

          <span className="mt-5 block text-xs uppercase tracking-[0.2em] text-emerald-600">
            Your Journey Begins Here
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore. Understand.{" "}
            <span className="text-emerald-600">
              Experience.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Explore yoga, philosophy, practices and traditions through clear,
            simple and modern explanations.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="#explore"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Begin Exploring →
            </a>

            <Link
              to="/yoga"
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
            >
              Explore Yoga
            </Link>

          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-slate-200 bg-white px-4 pb-6 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div className="lg:col-span-2">

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50">
                  🌿
                </div>

                <span className="text-2xl font-bold">
                  <span className="text-slate-800">
                    Flow
                  </span>
                  <span className="text-emerald-600">
                    State
                  </span>
                </span>
              </Link>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                A space to explore yoga knowledge, traditions and practices
                through a modern lens.
              </p>

            </div>

            {/* Explore */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-700">
                Explore
              </h3>

              <div className="mt-3 flex flex-col gap-2 text-sm">

                <Link
                  to="/knowledge-hub"
                  className="text-slate-500 hover:text-emerald-600"
                >
                  Knowledge Hub
                </Link>

                <Link
                  to="/yoga"
                  className="text-slate-500 hover:text-emerald-600"
                >
                  Yoga
                </Link>

                <Link
                  to="/deep-dive"
                  className="text-slate-500 hover:text-emerald-600"
                >
                  Deep Dive
                </Link>

              </div>
            </div>

            {/* Discover */}
            <div>

              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-700">
                Discover
              </h3>

              <div className="mt-3 flex flex-col gap-2 text-sm">

                <Link
                  to="/knowledge-hub/foundations"
                  className="text-slate-500 hover:text-emerald-600"
                >
                  Yoga Foundations
                </Link>

                <Link
                  to="/knowledge-hub/practices"
                  className="text-slate-500 hover:text-emerald-600"
                >
                  Practices
                </Link>

                <Link
                  to="/knowledge-hub/philosophy"
                  className="text-slate-500 hover:text-emerald-600"
                >
                  Philosophy
                </Link>

              </div>
            </div>

          </div>

          <div className="mt-7 flex flex-col gap-2 border-t border-slate-200 pt-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 FlowState. Explore with curiosity.
            </p>

            <div className="flex items-center gap-2">
              <span className="text-emerald-600">
                ॐ
              </span>
              <span>
                Ancient wisdom · Modern exploration
              </span>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default KnowledgeHub;