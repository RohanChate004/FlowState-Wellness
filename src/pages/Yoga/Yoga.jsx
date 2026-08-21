import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const API_BASE = "http://127.0.0.1:8000/api/yoga";

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
    value: "anxious",
    icon: "🌧️",
    title: "Anxious",
    text: "Slow down and reconnect",
  },
  {
    value: "sore",
    icon: "💺",
    title: "Sore",
    text: "Gentle movement & mobility",
  },
  {
    value: "wired",
    icon: "⚡",
    title: "Wired",
    text: "Shift toward a calmer pace",
  },
  {
    value: "cramping",
    icon: "🌙",
    title: "Cramping",
    text: "Choose gentle movement",
  },
  {
    value: "low_energy",
    icon: "🌱",
    title: "Low Energy",
    text: "Keep your practice light",
  },
];

const cyclePhaseUI = {
  menstrual: {
    icon: "🌙",
    phase: "Phase 1",
    accent: "rose",
    bg: "bg-rose-50",
    selected: "border-rose-300 bg-rose-50",
  },
  follicular: {
    icon: "🌱",
    phase: "Phase 2",
    accent: "green",
    bg: "bg-green-50",
    selected: "border-green-300 bg-green-50",
  },
  ovulation: {
    icon: "☀️",
    phase: "Phase 3",
    accent: "amber",
    bg: "bg-amber-50",
    selected: "border-amber-300 bg-amber-50",
  },
  luteal: {
    icon: "🍃",
    phase: "Phase 4",
    accent: "emerald",
    bg: "bg-emerald-50",
    selected: "border-emerald-300 bg-emerald-50",
  },
};

const programs = [
  {
    title: "7-Day Beginner Flow",
    type: "Beginner",
    duration: "7 Days",
    description:
      "Build a simple yoga habit with approachable daily practices.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Morning Energy Flow",
    type: "Morning",
    duration: "15–30 min",
    description:
      "Start your day with mindful movement and energizing practice.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Gentle Recovery",
    type: "Recovery",
    duration: "10–30 min",
    description:
      "Slow practices for lighter days and softer movement.",
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=85",
  },
];

function Yoga() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("sos");

  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [sosRecommendations, setSosRecommendations] = useState([]);
  const [sosLoading, setSosLoading] = useState(false);
  const [sosError, setSosError] = useState("");

  const [cyclePhasesData, setCyclePhasesData] = useState([]);
  const [selectedCyclePhase, setSelectedCyclePhase] = useState(null);
  const [loadingCyclePhases, setLoadingCyclePhases] = useState(true);
  const [cycleError, setCycleError] = useState("");

  const [asanas, setAsanas] = useState([]);
  const [loadingAsanas, setLoadingAsanas] = useState(true);
  const [asanaError, setAsanaError] = useState("");

  /* =====================================================
     ACTIVE SECTION OBSERVER
  ====================================================== */

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

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

  /* =====================================================
     FETCH ASANAS
  ====================================================== */

  useEffect(() => {
    const fetchAsanas = async () => {
      try {
        setLoadingAsanas(true);
        setAsanaError("");

        const response = await fetch(
          `${API_BASE}/asanas/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch asanas.");
        }

        const data = await response.json();

        setAsanas(data);
      } catch (error) {
        console.error("Asana API Error:", error);
        setAsanaError(
          "Unable to load asanas right now."
        );
      } finally {
        setLoadingAsanas(false);
      }
    };

    fetchAsanas();
  }, []);

  /* =====================================================
     FETCH CYCLE PHASES
  ====================================================== */

  useEffect(() => {
    const fetchCyclePhases = async () => {
      try {
        setLoadingCyclePhases(true);
        setCycleError("");

        const response = await fetch(
          `${API_BASE}/cycle-phases/`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch cycle phases."
          );
        }

        const data = await response.json();

        setCyclePhasesData(data);

        if (data.length > 0) {
          setSelectedCyclePhase(data[0]);
        }
      } catch (error) {
        console.error("Cycle API Error:", error);
        setCycleError(
          "Unable to load cycle information right now."
        );
      } finally {
        setLoadingCyclePhases(false);
      }
    };

    fetchCyclePhases();
  }, []);

  /* =====================================================
     SOS RECOMMENDATIONS
  ====================================================== */

  const getSOSRecommendations = async () => {
    if (!selectedFeeling) return;

    try {
      setSosLoading(true);
      setSosError("");
      setSosRecommendations([]);

      const response = await fetch(
        `${API_BASE}/sos/?mood=${encodeURIComponent(
          selectedFeeling
        )}`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to get recommendations."
        );
      }

      const data = await response.json();

      setSosRecommendations(data);
    } catch (error) {
      console.error(
        "SOS recommendation error:",
        error
      );

      setSosError(
        "We couldn't create your practice right now. Please try again."
      );
    } finally {
      setSosLoading(false);
    }
  };

  /* =====================================================
     NAVIGATION
  ====================================================== */

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const startCyclePractice = () => {
    if (!selectedCyclePhase) return;

    navigate(
      `/cycle-practice/${selectedCyclePhase.slug}`
    );
  };

  const getCycleUI = (slug) =>
    cyclePhaseUI[slug] || {
      icon: "🌿",
      phase: "",
      bg: "bg-green-50",
      selected: "border-green-300 bg-green-50",
    };

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      <Navbar />

      {/* =====================================================
          HERO / PRACTICE HUB
      ====================================================== */}

      <section className="px-4 pb-6 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

            <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.4fr_0.6fr] lg:px-10 lg:py-10">

              <div className="max-w-3xl">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  🌿 FlowState Yoga
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Find the practice that fits your moment.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                  Move, breathe, recover, and reconnect with
                  a practice shaped around how you feel today.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                    🧠 Mental well-being
                  </span>

                  <span className="rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                    🧘 Physical recovery
                  </span>

                  <span className="rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                    🌙 Cycle-aware
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full rounded-3xl bg-green-50 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                    🌿
                  </div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-green-700">
                    Your practice
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Your pace. Your moment.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Choose what feels right instead of
                    forcing your body into a routine.
                  </p>
                </div>
              </div>
            </div>

            {/* QUICK NAVIGATION */}

            <div className="border-t border-gray-100 px-5 py-4 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <p className="hidden text-xs font-semibold uppercase tracking-wider text-gray-400 sm:block">
                  Explore FlowState
                </p>

                <div className="flex flex-1 gap-2 overflow-x-auto pb-1 sm:flex-none">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        scrollToSection(item.id)
                      }
                      className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${activeSection === item.id
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
        </div>
      </section>

      {/* =====================================================
          SOS RESET
      ====================================================== */}

      <section
        id="sos"
        className="scroll-mt-28 px-4 py-5 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-700 shadow-lg">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">

            {/* SOS INTRO */}

            <div className="p-6 text-white sm:p-8 lg:p-10">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-green-100">
                ⚡ FlowState Reset
              </span>

              <h2 className="mt-5 text-3xl font-bold">
                Need a reset?
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-green-50">
                Tell us how you feel right now and find a
                focused practice for the moment you're in.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-green-50">
                  10–20 min
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-green-50">
                  Personalized
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-green-50">
                  Practice at your pace
                </span>
              </div>

              <div className="mt-10 hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-200">
                  A simpler way to begin
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">
                      1
                    </span>
                    <span className="text-sm text-green-50">
                      Check in with yourself
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">
                      2
                    </span>
                    <span className="text-sm text-green-50">
                      Get a focused practice
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">
                      3
                    </span>
                    <span className="text-sm text-green-50">
                      Move at your own pace
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SOS INTERACTION */}

            <div className="bg-white p-5 sm:p-7 lg:p-8">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Quick Check-In
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  How are you feeling?
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Choose what feels closest to your current
                  state.
                </p>
              </div>

              {/* FEELINGS */}

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {feelings.map((feeling) => (
                  <button
                    key={feeling.value}
                    onClick={() => {
                      setSelectedFeeling(feeling.value);
                      setSosRecommendations([]);
                      setSosError("");
                    }}
                    className={`rounded-2xl border p-3.5 text-left transition ${selectedFeeling === feeling.value
                        ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                        : "border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {feeling.icon}
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800">
                          {feeling.title}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {feeling.text}
                        </p>
                      </div>

                      {selectedFeeling ===
                        feeling.value && (
                          <span className="ml-auto text-green-700">
                            ✓
                          </span>
                        )}
                    </div>
                  </button>
                ))}
              </div>

              {/* ACTION */}

              <button
                onClick={getSOSRecommendations}
                disabled={
                  !selectedFeeling || sosLoading
                }
                className={`mt-5 w-full rounded-full px-5 py-3.5 text-sm font-semibold transition ${selectedFeeling && !sosLoading
                    ? "bg-green-700 text-white shadow-sm hover:bg-green-800"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
              >
                {sosLoading
                  ? "Creating Your Practice..."
                  : selectedFeeling
                    ? `Continue With ${feelings.find(
                      (item) =>
                        item.value ===
                        selectedFeeling
                    )?.title
                    } →`
                    : "Select How You're Feeling →"}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Modify or skip movements whenever something
                doesn't feel right.
              </p>

              {/* ERROR */}

              {sosError && (
                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                  {sosError}
                </div>
              )}

              {/* LOADING */}

              {sosLoading && (
                <div className="mt-6 rounded-3xl bg-green-50 p-7 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    🧘
                  </div>

                  <h3 className="mt-4 text-base font-bold">
                    Creating your FlowState practice...
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Finding movements that match how you
                    feel.
                  </p>
                </div>
              )}

              {/* SINGLE SOS RESULT */}

              {!sosLoading &&
                sosRecommendations.length > 0 && (
                  <div className="mt-7 border-t border-gray-100 pt-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">
                            🌿
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                              Personalized Practice
                            </p>

                            <h3 className="text-xl font-bold">
                              Your FlowState Reset
                            </h3>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-500">
                          A practice for how you're feeling
                          <span className="font-semibold text-gray-700">
                            {" "}
                            ·{" "}
                            {
                              feelings.find(
                                (item) =>
                                  item.value ===
                                  selectedFeeling
                              )?.title
                            }
                          </span>
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                        {sosRecommendations.length} practices
                      </span>
                    </div>

                    {/* RECOMMENDATIONS */}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {sosRecommendations.map(
                        (asana) => (
                          <Link
                            key={asana.id}
                            to={`/asanas/${asana.id}`}
                            className="group rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-green-200 hover:bg-white hover:shadow-md"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-semibold text-green-700">
                                  {
                                    asana.sanskrit_name
                                  }
                                </p>

                                <h4 className="mt-1 font-bold text-gray-900">
                                  {asana.name}
                                </h4>
                              </div>

                              <span className="text-lg text-green-700 transition group-hover:translate-x-1">
                                →
                              </span>
                            </div>

                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                              {
                                asana.short_description
                              }
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500">
                                {asana.category}
                              </span>

                              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500">
                                {asana.difficulty}
                              </span>

                              {asana.duration_seconds && (
                                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500">
                                  {asana.duration_seconds >=
                                    60
                                    ? `${Math.floor(
                                      asana.duration_seconds /
                                      60
                                    )} min`
                                    : `${asana.duration_seconds} sec`}
                                </span>
                              )}
                            </div>
                          </Link>
                        )
                      )}
                    </div>

                    {/* PRACTICE NOTE */}

                    <div className="mt-5 rounded-2xl bg-green-50 px-4 py-3.5">
                      <p className="text-xs leading-5 text-gray-600">
                        <span className="font-semibold text-green-800">
                          Your practice, your pace.
                        </span>{" "}
                        Choose any movement above to explore
                        its instructions, benefits,
                        modifications, and safety guidance.
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CYCLE AWARENESS
      ====================================================== */}

      <section
        id="cycle"
        className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-6">
            <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              🌙 Cycle-Aware Practice
            </span>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Yoga that moves with your cycle.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Explore different practice styles for each phase,
              from restorative movement to more active practice.
            </p>
          </div>

          {/* PHASE CARDS */}

          {loadingCyclePhases ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
              <div className="text-3xl">🌙</div>

              <p className="mt-3 text-sm text-gray-500">
                Loading cycle information...
              </p>
            </div>
          ) : cycleError ? (
            <div className="rounded-3xl border border-red-100 bg-red-50 p-7 text-center">
              <p className="text-sm text-red-600">
                {cycleError}
              </p>
            </div>
          ) : cyclePhasesData.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
              <p className="text-sm text-gray-500">
                No cycle information available yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cyclePhasesData.map((phase) => {
                const ui = getCycleUI(phase.slug);

                const isSelected =
                  selectedCyclePhase?.id ===
                  phase.id;

                return (
                  <button
                    key={phase.id}
                    onClick={() =>
                      setSelectedCyclePhase(phase)
                    }
                    className={`group rounded-3xl border p-5 text-left shadow-sm transition ${isSelected
                        ? `${ui.selected} shadow-md`
                        : "border-gray-100 bg-white hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${ui.bg} text-2xl`}
                      >
                        {ui.icon}
                      </div>

                      <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-gray-500 shadow-sm">
                        {ui.phase}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold capitalize">
                      {phase.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-green-700">
                      {phase.energy_context}
                    </p>

                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-500">
                      {phase.practice_style}
                    </p>

                    <div className="mt-4 space-y-1.5">
                      {phase.recommendations
                        .filter(
                          (recommendation) =>
                            recommendation.is_active
                        )
                        .slice(0, 3)
                        .map(
                          (recommendation) => (
                            <p
                              key={
                                recommendation.id
                              }
                              className="text-xs text-gray-500"
                            >
                              <span className="mr-1 text-green-600">
                                •
                              </span>
                              {
                                recommendation
                                  .asana.name
                              }
                            </p>
                          )
                        )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        {phase.intensity}
                      </span>

                      <span className="text-xs font-semibold text-green-700">
                        {isSelected
                          ? "Selected ✓"
                          : "Explore →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* SELECTED PHASE */}

          {selectedCyclePhase && (
            <div className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

              <div className="border-b border-gray-100 p-6 sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  <div className="max-w-2xl">
                    <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      {
                        selectedCyclePhase.practice_style
                      }
                    </span>

                    <h3 className="mt-2 text-2xl font-bold capitalize">
                      {selectedCyclePhase.name} Practice
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {
                        selectedCyclePhase.description
                      }
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                      {
                        selectedCyclePhase.intensity
                      }
                    </span>

                    <span className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500">
                      {
                        selectedCyclePhase.duration_minutes
                      }{" "}
                      min
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    Energy ·{" "}
                    {
                      selectedCyclePhase.energy_context
                    }
                  </span>

                  <span className="rounded-full bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    Practice ·{" "}
                    {
                      selectedCyclePhase.practice_style
                    }
                  </span>
                </div>
              </div>

              {/* RECOMMENDATIONS */}

              <button
                onClick={startCyclePractice}
                className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
              >
                Start This Practice →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          DEEP DIVE
      ====================================================== */}

      <section
        id="deep-dive"
        className="scroll-mt-28 px-4 py-6 sm:px-6 lg:px-10"
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

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600">
                When you have more time, explore longer
                practices focused on mobility, strength,
                recovery, breathwork, and mindful movement.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["⏱", "60–120 min", "Extended practice"],
                  ["🧘", "Full Body", "Connected movement"],
                  ["🌬", "Breathwork", "Mindful breathing"],
                  ["🌿", "Recovery", "Deeper exploration"],
                ].map(([icon, title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl bg-green-50 p-4"
                  >
                    <p className="text-sm font-bold">
                      {icon} {title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <button className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
                Explore Deep Practice →
              </button>
            </div>

            <div className="relative min-h-72">
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
                  Longer practice doesn't mean more pressure.
                  Move at a pace that feels appropriate for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DAILY PRACTICE
      ====================================================== */}

      <section
        id="daily"
        className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10"
      >
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
                  Short, approachable sessions that fit
                  naturally into your routine.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["10 min", "20 min", "30 min"].map(
                  (duration) => (
                    <button
                      key={duration}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-green-700 hover:text-white"
                    >
                      {duration}
                    </button>
                  )
                )}

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

      <section
        id="asanas"
        className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Explore & Learn
            </span>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Asana Encyclopedia
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Explore yoga asanas with guidance, benefits,
              difficulty levels, and practice recommendations.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center rounded-xl border border-gray-200 bg-gray-50 px-4">
                <span className="mr-3 text-gray-400">
                  🔍
                </span>

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

          <div className="mt-4">

            {loadingAsanas ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
                <div className="text-3xl">🧘</div>

                <p className="mt-3 text-sm text-gray-500">
                  Loading asanas...
                </p>
              </div>
            ) : asanaError ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                <p className="text-sm text-red-600">
                  {asanaError}
                </p>

                <button
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-3 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white"
                >
                  Try Again
                </button>
              </div>
            ) : asanas.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
                <p className="text-sm text-gray-500">
                  No asanas available yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {asanas.slice(0, 3).map(
                  (asana) => (
                    <div
                      key={asana.id}
                      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-44 overflow-hidden bg-green-50">
                        {asana.image_url ? (
                          <img
                            src={asana.image_url}
                            alt={`Person practicing ${asana.name}`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-5xl">
                              🧘
                            </span>
                          </div>
                        )}

                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-green-700 backdrop-blur-sm">
                          {asana.difficulty}
                        </span>
                      </div>

                      <div className="p-4">
                        <p className="text-xs font-semibold text-green-700">
                          {asana.sanskrit_name}
                        </p>

                        <h4 className="mt-1 font-bold">
                          {asana.name}
                        </h4>

                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                          {
                            asana.short_description
                          }
                        </p>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {asana.category}
                          </span>

                          <Link
                            to={`/asanas/${asana.id}`}
                            className="font-semibold text-green-700 hover:text-green-800"
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
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

          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Guided Practice
            </span>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Popular Yoga Programs
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Structured practices for different goals,
              schedules, and experience levels.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
                      {program.type}
                    </span>

                    <span className="text-xs text-gray-500">
                      {program.duration}
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold">
                    {program.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {program.description}
                  </p>

                  <button className="mt-5 w-full rounded-full bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800">
                    Start Program
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MATERNITY
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-stone-100 p-6 sm:p-8">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center">

            <div className="lg:w-2/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Gentle Wellness
              </span>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                A safer yoga journey through pregnancy.
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Gentle, trimester-aware movement designed
                around changing energy, comfort, and mobility.
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
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <span className="text-2xl">
                    {item.icon}
                  </span>

                  <h3 className="mt-3 text-sm font-bold">
                    {item.title}
                  </h3>

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
                <p className="text-sm font-bold">
                  Beyond Pregnancy
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Postpartum recovery and nursing posture
                  relief.
                </p>
              </div>

              <span className="text-xs leading-5 text-gray-400 sm:max-w-md sm:text-right">
                Practice comfortably and seek appropriate
                professional guidance when needed.
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

          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Practice With Confidence
            </span>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Safety & Smart Practice
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Build a practice that respects your comfort,
              your choices, and how your body feels today.
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
                <span className="text-2xl">
                  {item.icon}
                </span>

                <h3 className="mt-3 font-bold">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 px-4 py-3.5">
            <p className="text-xs leading-5 text-gray-600">
              <span className="font-semibold text-gray-800">
                Mindful reminder:
              </span>{" "}
              Practice within your comfort level. If you're
              unsure whether a practice is appropriate for
              you, consider seeking guidance from a qualified
              professional.
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
            <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
              The FlowState Difference
            </span>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              More than a yoga library.
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              FlowState helps you choose a practice based on
              how you feel, what your body needs, and how much
              time you have.
            </p>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-2">

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
              [
                "💚",
                "Physical + Mental",
                "Connect movement with well-being.",
              ],
              [
                "⏱️",
                "Flexible Duration",
                "Practice within your available time.",
              ],
              [
                "✨",
                "Personalized",
                "Recommendations can adapt to your needs.",
              ],
              [
                "🌙",
                "Cycle-Aware",
                "Adapt practice to changing energy.",
              ],
              [
                "🛡️",
                "Safety-First",
                "Modify, skip, and practice comfortably.",
              ],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <span className="text-lg">{icon}</span>

                <h3 className="mt-2 text-sm font-bold">
                  {title}
                </h3>

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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              🌿
            </div>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Your practice starts with one breath.
            </h2>

            <p className="mt-3 text-sm leading-6 text-green-50">
              Take a few minutes today to move, breathe,
              and reconnect.
            </p>

            <button
              onClick={() =>
                scrollToSection("sos")
              }
              className="mt-6 rounded-full bg-white px-7 py-3 text-sm font-semibold text-green-700 shadow-md transition hover:bg-green-50"
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
                A wellness platform designed to help you
                connect mental well-being and physical
                recovery through yoga.
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
                {navItems.slice(0, 4).map(
                  (item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        scrollToSection(item.id)
                      }
                      className="block transition hover:text-green-400"
                    >
                      {item.label}
                    </button>
                  )
                )}
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
            <p>
              © 2026 FlowState. All rights reserved.
            </p>

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