import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const navItems = [
  { id: "sos", label: "SOS Reset", icon: "⚡" },
  { id: "cycle", label: "Cycle", icon: "🌙" },
  { id: "deep-dive", label: "Deep Dive", icon: "🌿" },
  { id: "daily", label: "Daily", icon: "🌱" },
  { id: "asanas", label: "Asanas", icon: "🧘" },
  { id: "programs", label: "Programs", icon: "📋" },
];

const feelings = [
  {
    icon: "🌧️",
    title: "Anxious",
    text: "Slow down and reconnect",
  },
  {
    icon: "💺",
    title: "Sore",
    text: "Gentle movement & mobility",
  },
  {
    icon: "⚡",
    title: "Wired",
    text: "Shift toward a calmer pace",
  },
  {
    icon: "🌙",
    title: "Cramping",
    text: "Choose gentle movement",
  },
  {
    icon: "🌱",
    title: "Low Energy",
    text: "Keep your practice light",
  },
];

const cyclePhases = [
  {
    icon: "🌙",
    phase: "Phase 1",
    title: "Menstrual",
    energy: "Low energy · Rest",
    poses: ["Child's Pose", "Supine Twist", "Legs-Up-the-Wall"],
    bg: "bg-rose-50",
  },
  {
    icon: "🌱",
    phase: "Phase 2",
    title: "Follicular",
    energy: "Rising energy · Build",
    poses: ["Sun Salutations", "Warrior Poses", "Tree Pose"],
    bg: "bg-green-50",
  },
  {
    icon: "☀️",
    phase: "Phase 3",
    title: "Ovulation",
    energy: "Peak energy · Strong",
    poses: ["Camel", "Wheel", "Goddess Pose"],
    bg: "bg-amber-50",
  },
  {
    icon: "🍃",
    phase: "Phase 4",
    title: "Luteal",
    energy: "Declining energy · Soften",
    poses: ["Reclined Bound Angle", "Seated Forward Fold"],
    bg: "bg-emerald-50",
  },
];

const asanas = [
  {
    sanskrit: "Tadasana",
    name: "Mountain Pose",
    category: "Full Body",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",
  },
  {
    sanskrit: "Vrikshasana",
    name: "Tree Pose",
    category: "Balance",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=85",
  },
  {
    sanskrit: "Bhujangasana",
    name: "Cobra Pose",
    category: "Back",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?auto=format&fit=crop&w=800&q=85",
  },
];

const programs = [
  {
    title: "7-Day Beginner Flow",
    type: "Beginner",
    duration: "7 Days",
    description: "Build a simple yoga habit with approachable daily practices.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Morning Energy Flow",
    type: "Morning",
    duration: "15–30 min",
    description: "Start your day with mindful movement and energizing practice.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Gentle Recovery",
    type: "Recovery",
    duration: "10–30 min",
    description: "Slow practices for lighter days and softer movement.",
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=85",
  },
];

function Yoga() {
  const [activeSection, setActiveSection] = useState("sos");
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      <Navbar />

      {/* =====================================================
          YOGA PRACTICE HUB
      ====================================================== */}
      <section className="px-4 pb-6 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-white px-5 py-7 shadow-sm ring-1 ring-gray-100 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
                  FlowState Yoga
                </span>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Find the practice that fits your moment.
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                  Move, breathe, recover, and reconnect with a practice
                  designed around how you feel today.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-green-50 px-4 py-3">
                <span className="text-2xl">🌿</span>

                <div>
                  <p className="text-xs font-medium text-green-700">
                    Your practice
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    Your pace. Your moment.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="mt-6 border-t border-gray-100 pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Explore FlowState
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      activeSection === item.id
                        ? "bg-green-700 text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOS RESET
      ====================================================== */}
      <section id="sos" className="scroll-mt-28 px-4 py-5 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-700 shadow-lg">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-6 text-white sm:p-8 lg:p-10">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-green-100">
                ⚡ FlowState Reset
              </span>

              <h2 className="mt-4 text-3xl font-bold">
                Need a reset?
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-green-50">
                Tell us how you feel right now and find a focused practice
                for the moment you're in.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-green-50">
                  10–20 min
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-green-50">
                  Focused practice
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-green-50">
                  Practice at your pace
                </span>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-7">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Quick Check-In
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  How are you feeling?
                </h3>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {feelings.map((feeling) => (
                  <button
                    key={feeling.title}
                    onClick={() => setSelectedFeeling(feeling.title)}
                    className={`rounded-2xl border p-3 text-left transition ${
                      selectedFeeling === feeling.title
                        ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                        : "border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{feeling.icon}</span>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {feeling.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {feeling.text}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollToSection("deep-dive")}
                className="mt-4 w-full rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                {selectedFeeling
                  ? `Continue With ${selectedFeeling} →`
                  : "Find My Practice →"}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Modify or skip movements whenever something doesn't feel right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CYCLE AWARENESS
      ====================================================== */}
      <section id="cycle" className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Cycle-Aware Practice
              </span>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Yoga that moves with your cycle.
              </h2>

              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Your body doesn't feel the same every day. Your practice
                doesn't have to either.
              </p>
            </div>

            <button className="self-start rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800">
              Explore Cycle Yoga →
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cyclePhases.map((phase) => (
              <div
                key={phase.title}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${phase.bg} text-lg`}
                  >
                    {phase.icon}
                  </div>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
                    {phase.phase}
                  </span>
                </div>

                <h3 className="mt-4 font-bold">{phase.title}</h3>

                <p className="mt-1 text-xs font-medium text-green-700">
                  {phase.energy}
                </p>

                <div className="mt-3 space-y-1">
                  {phase.poses.map((pose) => (
                    <p key={pose} className="text-xs text-gray-500">
                      • {pose}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DEEP DIVE
      ====================================================== */}
      <section
        id="deep-dive"
        className="scroll-mt-28 px-4 py-5 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Extended Practice
              </span>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Go deeper with your practice.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                When you have more time, explore longer practices focused on
                mobility, strength, recovery, breathwork, and mindful movement.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-green-50 p-3">
                  <p className="text-sm font-bold">⏱ 60–120 min</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Extended practice
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-3">
                  <p className="text-sm font-bold">🧘 Full Body</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Connected movement
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-3">
                  <p className="text-sm font-bold">🌬 Breathwork</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Mindful breathing
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-3">
                  <p className="text-sm font-bold">🌿 Recovery</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Deeper exploration
                  </p>
                </div>
              </div>

              <button className="mt-5 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
                Explore Deep Practice →
              </button>
            </div>

            <div className="relative min-h-64">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85"
                alt="Extended yoga practice"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold text-green-700">
                  Take your time.
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Longer practice doesn't mean more pressure. Move at a pace
                  that feels appropriate for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DAILY PRACTICE
      ====================================================== */}
      <section id="daily" className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-green-50 p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Everyday Wellness
                </span>

                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                  Build your daily practice.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
                  Short, approachable sessions that fit naturally into your
                  routine.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
                  10 min
                </span>

                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
                  20 min
                </span>

                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
                  30 min
                </span>

                <button className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-800">
                  Start Practice →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ASANA ENCYCLOPEDIA
      ====================================================== */}
      <section id="asanas" className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Explore & Learn
            </span>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Asana Encyclopedia
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Explore yoga asanas with guidance, benefits, difficulty levels,
              and practice recommendations.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center rounded-xl border border-gray-200 bg-gray-50 px-4">
                <span className="mr-3 text-gray-400">🔍</span>

                <input
                  type="text"
                  placeholder="Search asanas, benefits, poses..."
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>

              <button className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
                Search
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Standing",
                "Seated",
                "Backbends",
                "Forward Bends",
                "Twists",
                "Inversions",
                "Balance",
                "Hip Openers",
                "Relaxation",
              ].map((category) => (
                <button
                  key={category}
                  className="rounded-full bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-600 transition hover:bg-green-700 hover:text-white"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Asanas */}
          <div className="mt-7 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Featured Practice
              </p>

              <h3 className="mt-1 text-xl font-bold">
                Start with approachable poses.
              </h3>
            </div>

            <button className="hidden text-sm font-semibold text-green-700 sm:block">
              View All Asanas →
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {asanas.map((asana) => (
              <div
                key={asana.sanskrit}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={asana.image}
                    alt={`Person practicing ${asana.name}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-green-700 backdrop-blur-sm">
                    {asana.level}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-green-700">
                    {asana.sanskrit}
                  </p>

                  <h4 className="mt-1 font-bold">{asana.name}</h4>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{asana.category}</span>

                    <button className="font-semibold text-green-700">
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRAMS
      ====================================================== */}
      <section
        id="programs"
        className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Guided Practice
              </span>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Popular Yoga Programs
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Structured practices for different goals, schedules, and
                experience levels.
              </p>
            </div>

            <button className="self-start text-sm font-semibold text-green-700">
              View All Programs →
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
                      {program.type}
                    </span>

                    <span className="text-xs text-gray-500">
                      {program.duration}
                    </span>
                  </div>

                  <h3 className="mt-2 font-bold">{program.title}</h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {program.description}
                  </p>

                  <button className="mt-4 w-full rounded-full bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800">
                    Start Program
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MATERNITY JOURNEY
      ====================================================== */}
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-stone-100 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="lg:w-2/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Gentle Wellness
              </span>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                A safer yoga journey through pregnancy.
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Gentle, trimester-aware movement designed around changing
                energy, comfort, and mobility.
              </p>
            </div>

            <div className="grid flex-1 gap-3 sm:grid-cols-3">
              {[
                {
                  icon: "🌱",
                  title: "First Trimester",
                  text: "Grounding & gentle movement",
                },
                {
                  icon: "🌿",
                  title: "Second Trimester",
                  text: "Stability & supported movement",
                },
                {
                  icon: "🌸",
                  title: "Third Trimester",
                  text: "Balance, comfort & support",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <span className="text-xl">{item.icon}</span>

                  <h3 className="mt-3 text-sm font-bold">{item.title}</h3>

                  <p className="mt-1 text-xs leading-5 text-green-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold">Beyond Pregnancy</p>

                <p className="mt-1 text-xs text-gray-500">
                  Postpartum recovery and nursing posture relief.
                </p>
              </div>

              <span className="text-xs text-gray-400">
                Practice comfortably and seek appropriate professional guidance
                when needed.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SAFETY
      ====================================================== */}
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Practice With Confidence
            </span>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Safety & Smart Practice
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Build a practice that respects your comfort, your choices, and
              how your body feels today.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                icon: "🛡️",
                title: "Safety Check-In",
                text: "Share relevant conditions before starting a practice.",
              },
              {
                icon: "🔄",
                title: "Modify or Skip",
                text: "Choose an easier variation or skip a movement.",
              },
              {
                icon: "🎧",
                title: "Audio Guidance",
                text: "Follow simple alignment and movement cues.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
              >
                <span className="text-2xl">{item.icon}</span>

                <h3 className="mt-3 font-bold">{item.title}</h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3">
            <p className="text-xs leading-5 text-gray-600">
              <span className="font-semibold text-gray-800">
                Mindful reminder:
              </span>{" "}
              Practice within your comfort level. If you're unsure whether a
              practice is appropriate for you, consider seeking guidance from
              a qualified professional.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY FLOWSTATE
      ====================================================== */}
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-green-50 p-6 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
              The FlowState Difference
            </span>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              More than a yoga library.
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              FlowState helps you choose a practice based on how you feel,
              what your body needs, and how much time you have.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Traditional approach
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Yoga Library
              </h3>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>01 · Browse practices</p>
                <p>02 · Choose what you need</p>
                <p>03 · Start</p>
              </div>
            </div>

            <div className="rounded-2xl bg-green-700 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-100">
                FlowState approach
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Yoga With Context
              </h3>

              <div className="mt-4 space-y-2 text-sm text-green-50">
                <p>01 · How are you feeling?</p>
                <p>02 · Choose your need</p>
                <p>03 · Get focused practice</p>
                <p>04 · Spend less time deciding</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🧠", "Mental-first", "Begin with how you feel."],
              ["💚", "Physical + Mental", "Connect movement with well-being."],
              ["⏱️", "Flexible Duration", "Practice within your available time."],
              ["✨", "Personalized", "Recommendations can adapt to your needs."],
              ["🌙", "Cycle-Aware", "Adapt practice to changing energy."],
              ["🛡️", "Safety-First", "Modify, skip, and practice comfortably."],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <span className="text-lg">{icon}</span>

                <h3 className="mt-2 text-sm font-bold">{title}</h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-green-700 px-6 py-10 text-center text-white shadow-lg sm:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
              🌿
            </div>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Your practice starts with one breath.
            </h2>

            <p className="mt-3 text-sm leading-6 text-green-50">
              Take a few minutes today to move, breathe, and reconnect.
            </p>

            <button
              onClick={() => scrollToSection("sos")}
              className="mt-5 rounded-full bg-white px-7 py-3 text-sm font-semibold text-green-700 shadow-md transition hover:bg-green-50"
            >
              Start Your Yoga Journey
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="mt-4 bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700 text-lg">
                  🌿
                </div>

                <span className="text-xl font-bold text-white">
                  FlowState
                </span>
              </div>

              <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
                A wellness platform designed to help you connect mental
                well-being and physical recovery through yoga.
              </p>

              <p className="mt-4 text-sm font-medium text-green-400">
                Move better. Feel better. Live in balance.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Yoga
              </h3>

              <div className="mt-3 space-y-2 text-sm text-gray-400">
                {navItems.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block transition hover:text-green-400"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                FlowState
              </h3>

              <div className="mt-3 space-y-2 text-sm text-gray-400">
                <button className="block transition hover:text-green-400">
                  Dashboard
                </button>

                <button className="block transition hover:text-green-400">
                  About
                </button>

                <button className="block transition hover:text-green-400">
                  Contact
                </button>

                <button className="block transition hover:text-green-400">
                  Privacy
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-gray-800 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 FlowState. All rights reserved.</p>

            <p>
              Practice at your own pace. Listen to your body.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Yoga;