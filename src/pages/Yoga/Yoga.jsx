import { useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import Footer from "../../components/Footer/Footer";

import API_BASE_URL from "../../services/api";

const API_BASE = `${API_BASE_URL}/api/yoga`;

const navItems = [

  { id: "sos", label: "SOS Reset", icon: "⚡" },

  { id: "cycle", label: "Cycle", icon: "🌙" },

  { id: "deep-dive", label: "Deep Dive", icon: "🌿" },

  { id: "daily", label: "Daily", icon: "☀️" },

  { id: "asanas", label: "Asanas", icon: "🧘" },

  { id: "programs", label: "Programs", icon: "📋" },

];

const feelings = [

  { value: "anxious", icon: "🌧️", title: "Anxious", text: "Slow down and reconnect" },

  { value: "sore", icon: "🪷", title: "Sore", text: "Gentle movement and mobility" },

  { value: "wired", icon: "⚡", title: "Wired", text: "Find a calmer pace" },

  { value: "cramping", icon: "🌙", title: "Cramping", text: "Choose gentle movement" },

  { value: "low_energy", icon: "🌱", title: "Low energy", text: "Keep it light today" },

];

const cycleUI = {

  menstrual: { icon: "🌙", phase: "PHASE 01", color: "rose" },

  follicular: { icon: "🌱", phase: "PHASE 02", color: "green" },

  ovulation: { icon: "☀️", phase: "PHASE 03", color: "amber" },

  luteal: { icon: "🍃", phase: "PHASE 04", color: "emerald" },

};

const deepDiveFocuses = [

  { slug: "stress-calm", icon: "🌿", title: "Stress & Calm", description: "Slow down and release tension.", category: "Mind" },

  { slug: "back-body-relief", icon: "🧍", title: "Back & Body Relief", description: "Gentle movement for everyday stiffness.", category: "Body" },

  { slug: "energy-focus", icon: "⚡", title: "Energy & Focus", description: "Refresh your body and attention.", category: "Energy" },

  { slug: "better-sleep", icon: "🌙", title: "Better Sleep", description: "Ease into rest with a slower practice.", category: "Rest" },

];

// Keep the existing Programs content and presentation intentionally unchanged.

const programs = [

  {

    title: "7-Day Beginner Flow",

    type: "Beginner",

    duration: "7 Days",

    description: "Build a simple yoga habit with approachable daily practices.",

    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",

  },

  {

    title: "Morning Energy Flow",

    type: "Morning",

    duration: "15–30 min",

    description: "Start your day with mindful movement and energizing practice.",

    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=85",

  },

  {

    title: "Gentle Recovery",

    type: "Recovery",

    duration: "10–30 min",

    description: "Slow practices for lighter days and softer movement.",

    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=85",

  },

];

// Manual image URLs for the Yoga page. Add more verified URLs here as needed.
// This direct Cloudinary URL is the verified image URL supplied for Adho Mukha Svanasana.
const manualAsanaImages = {
  "Adho Mukha Svanasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Adho_Mukha_Svanasana_ttcapa.jpg",

  "Anjaneyasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Anjaneyasana_bnkgzu.jpg",

  "Ardha Matsyendrasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Ardha_Matsendrasana_r1baey.jpg",

  "Baddha Konasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Baddha_Konasana_ydpilm.jpg",

  "Balasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Balasana_kb5dhr.jpg",

  "Bhujangasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Bhujangasana_aahquh.jpg",

  Bitilasana:
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Bitilasana_ttxekd.jpg",

  "Garudasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Garudasana_fp3fgl.jpg",

  "Marjaryasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Marjaryeasana_jmon6g.jpg",

  "Matsyasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Matsyasana_kcgrgg.jpg",

  "Paschimottanasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Paschimottasana_w1s0fz.jpg",

  "Savasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Savasana_scdcyc.jpg",

  "Setu Bandhasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Setu_Bandhasana_pri5eu.jpg",

  "Sukasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Sukasana_dyw2us.jpg",

  "Tadasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Tadasana_idntdx.jpg",

  "Trikonasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Trikonasana_ixevg5.jpg",

  "Utkatasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Utkatasana_dabjql.jpg",

  "Virabhadrasana I":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Virabhadrasana_I_uwjzfq.jpg",

  "Virabhadrasana II":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Virabhadrasana_II_wb7zem.jpg",

  "Vrikasana":
    "https://res.cloudinary.com/lluailha/image/upload/v1791444771/media/yoga/asanas/images/Vrikasana_vd0ziu.jpg",
};



const getAsanaImage = (asana) => {
  const name = String(asana?.name || "").trim().toLowerCase();
  const sanskritName = String(asana?.sanskrit_name || "")
    .trim()
    .toLowerCase();

  const images = Object.fromEntries(
    Object.entries(manualAsanaImages).map(([key, url]) => [
      key.trim().toLowerCase(),
      url,
    ])
  );

  return (
    images[name] ||
    images[sanskritName] ||
    asana?.image_url ||
    ""
  );
};

const categories = [

  "All",

  "Standing",

  "Seated",

  "Backbends",

  "Forward Bends",

  "Twists",

  "Inversions",

  "Balance",

  "Hip Openers",

  "Relaxation",

];

const getList = (data) => {

  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.results)) return data.results;

  if (Array.isArray(data?.data)) return data.data;

  return [];

};

const textValue = (value) => {

  if (Array.isArray(value)) return value.join(" ");

  if (value && typeof value === "object") return Object.values(value).join(" ");

  return value == null ? "" : String(value);

};

function Yoga() {

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("sos");

  const [selectedFeeling, setSelectedFeeling] = useState("");

  const [sosRecommendations, setSosRecommendations] = useState([]);

  const [sosLoading, setSosLoading] = useState(false);

  const [sosError, setSosError] = useState("");

  const [cyclePhases, setCyclePhases] = useState([]);

  const [cycleLoading, setCycleLoading] = useState(true);

  const [cycleError, setCycleError] = useState("");

  const [asanas, setAsanas] = useState([]);

  const [asanasLoading, setAsanasLoading] = useState(true);

  const [asanaError, setAsanaError] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showAllAsanas, setShowAllAsanas] = useState(false);

  useEffect(() => {

    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean);

    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(

      (entries) => {

        const visible = entries

          .filter((entry) => entry.isIntersecting)

          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);

      },

      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] }

    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();

  }, []);

  useEffect(() => {

    const controller = new AbortController();

    async function loadAsanas() {

      try {

        setAsanasLoading(true);

        setAsanaError("");

        const response = await fetch(`${API_BASE}/asanas/`, { signal: controller.signal });

        if (!response.ok) throw new Error(`Asana request failed (${response.status})`);

        const data = await response.json();

        setAsanas(getList(data));

      } catch (error) {

        if (error.name !== "AbortError") {

          console.error("Asana API error:", error);

          setAsanaError("We couldn't load the asana library. Check your connection and try again.");

        }

      } finally {

        if (!controller.signal.aborted) setAsanasLoading(false);

      }

    }

    loadAsanas();

    return () => controller.abort();

  }, []);

  useEffect(() => {

    const controller = new AbortController();

    async function loadCyclePhases() {

      try {

        setCycleLoading(true);

        setCycleError("");

        const response = await fetch(`${API_BASE}/cycle-phases/`, { signal: controller.signal });

        if (!response.ok) throw new Error(`Cycle request failed (${response.status})`);

        const data = await response.json();

        setCyclePhases(getList(data));

      } catch (error) {

        if (error.name !== "AbortError") {

          console.error("Cycle API error:", error);

          setCycleError("Cycle practices couldn't be loaded right now.");

        }

      } finally {

        if (!controller.signal.aborted) setCycleLoading(false);

      }

    }

    loadCyclePhases();

    return () => controller.abort();

  }, []);

  const filteredAsanas = useMemo(() => {

    const query = searchTerm.trim().toLowerCase();

    return asanas.filter((asana) => {

      const searchableText = [

        asana.name,

        asana.sanskrit_name,

        asana.short_description,

        asana.description,

        asana.category,

        asana.focus_area,

        asana.benefits,

        asana.difficulty,

        asana.mood_tags,

      ].map(textValue).join(" ").toLowerCase();

      const matchesQuery = !query || searchableText.includes(query);

      const categoryText = `${textValue(asana.category)} ${textValue(asana.focus_area)}`.toLowerCase();

      const matchesCategory =

        selectedCategory === "All" ||

        categoryText.includes(selectedCategory.toLowerCase()) ||

        (selectedCategory === "Relaxation" && /relax|restor|calm|breath|meditat/i.test(searchableText)) ||

        (selectedCategory === "Hip Openers" && /hip|pigeon|butterfly|bound angle/i.test(searchableText)) ||

        (selectedCategory === "Balance" && /balance|tree|warrior iii|eagle/i.test(searchableText)) ||

        (selectedCategory === "Standing" && /standing|warrior|mountain|chair|triangle/i.test(searchableText)) ||

        (selectedCategory === "Seated" && /seated|sitting|staff|butterfly|bound angle/i.test(searchableText)) ||

        (selectedCategory === "Backbends" && /backbend|cobra|bridge|camel|wheel/i.test(searchableText)) ||

        (selectedCategory === "Forward Bends" && /forward bend|forward fold|fold|uttanasana/i.test(searchableText)) ||

        (selectedCategory === "Twists" && /twist|revolved|rotation/i.test(searchableText)) ||

        (selectedCategory === "Inversions" && /inversion|headstand|shoulderstand|legs.up.the.wall/i.test(searchableText));

      return matchesQuery && matchesCategory;

    });

  }, [asanas, searchTerm, selectedCategory]);

  const visibleAsanas = showAllAsanas ? filteredAsanas : filteredAsanas.slice(0, 6);

  const scrollToSection = (id) => {

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  };

  const getSOSRecommendations = async () => {

    if (!selectedFeeling || sosLoading) return;

    try {

      setSosLoading(true);

      setSosError("");

      setSosRecommendations([]);

      const response = await fetch(`${API_BASE}/sos/?mood=${encodeURIComponent(selectedFeeling)}`);

      if (!response.ok) throw new Error(`SOS request failed (${response.status})`);

      const data = await response.json();

      const recommendations = getList(data);

      setSosRecommendations(recommendations);

      if (recommendations.length === 0) setSosError("No matching practices were found. Try another feeling.");

    } catch (error) {

      console.error("SOS recommendation error:", error);

      setSosError("We couldn't create your practice right now. Please try again.");

    } finally {

      setSosLoading(false);

    }

  };

  const startCyclePractice = (phase) => {

    if (!phase?.slug) return;

    // CyclePractice can use this hash to scroll to its start control when it has id="start-practice".

    navigate(`/cycle-practice/${phase.slug}#start-practice`);

  };

  const retryAsanas = () => {

    setAsanaError("");

    setAsanasLoading(true);

    fetch(`${API_BASE}/asanas/`)

      .then((response) => {

        if (!response.ok) throw new Error(`Asana request failed (${response.status})`);

        return response.json();

      })

      .then((data) => setAsanas(getList(data)))

      .catch((error) => {

        console.error("Asana API error:", error);

        setAsanaError("We couldn't load the asana library. Check your connection and try again.");

      })

      .finally(() => setAsanasLoading(false));

  };

  return (

    <main className="min-h-screen bg-[#f7f8f4] text-slate-800">

      <Navbar />

      {/* Compact hero and in-page navigation */}

      <section className="px-4 pb-5 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm">

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:p-10">

            <div>

              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">

                FLOWSTATE · YOGA

              </span>

              <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">

                Find your balance, one practice at a time.

              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">

                Choose a quick reset, explore cycle-aware movement, or discover your next asana.

              </p>

              <button

                type="button"

                onClick={() => scrollToSection("sos")}

                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"

              >

                Find my practice <span className="ml-2">↗</span>

              </button>

            </div>

            <div className="rounded-3xl bg-[#edf5e9] p-5 sm:p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">A gentle reminder</p>

              <p className="mt-3 text-xl font-medium leading-7 text-slate-800">Your practice should meet you where you are.</p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">

                <span className="rounded-full bg-white px-3 py-2">Mind</span>

                <span className="rounded-full bg-white px-3 py-2">Body</span>

                <span className="rounded-full bg-white px-3 py-2">Breath</span>

              </div>

            </div>

          </div>

          <nav aria-label="Yoga sections" className="border-t border-slate-100 px-4 py-3 sm:px-6">

            <div className="flex gap-2 overflow-x-auto pb-1">

              {navItems.map((item) => (

                <button

                  key={item.id}

                  type="button"

                  onClick={() => scrollToSection(item.id)}

                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${activeSection === item.id

                    ? "bg-emerald-800 text-white"

                    : "bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900"

                    }`}

                >

                  <span aria-hidden="true">{item.icon}</span>{item.label}

                </button>

              ))}

            </div>

          </nav>

        </div>

      </section>

      {/* SOS Reset */}

      <section id="sos" className="scroll-mt-28 px-4 py-5 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm lg:grid-cols-[0.8fr_1.2fr]">

          <div className="bg-emerald-900 p-6 text-white sm:p-8">

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">01 · Quick reset</span>

            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">How are you feeling?</h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-50">

              Pick the feeling that fits best. We’ll find relevant poses from your asana library.

            </p>

          </div>

          <div className="p-5 sm:p-7">

            <div className="grid gap-2 sm:grid-cols-2">

              {feelings.map((feeling) => (

                <button

                  key={feeling.value}

                  type="button"

                  aria-pressed={selectedFeeling === feeling.value}

                  onClick={() => {

                    setSelectedFeeling(feeling.value);

                    setSosRecommendations([]);

                    setSosError("");

                  }}

                  className={`rounded-2xl border p-3.5 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${selectedFeeling === feeling.value

                    ? "border-emerald-600 bg-emerald-50"

                    : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"

                    }`}

                >

                  <span className="flex items-center gap-3">

                    <span className="text-xl" aria-hidden="true">{feeling.icon}</span>

                    <span className="min-w-0 flex-1">

                      <span className="block text-sm font-semibold text-slate-800">{feeling.title}</span>

                      <span className="mt-0.5 block text-xs text-slate-500">{feeling.text}</span>

                    </span>

                    {selectedFeeling === feeling.value && <span className="text-emerald-800">✓</span>}

                  </span>

                </button>

              ))}

            </div>

            <button

              type="button"

              onClick={getSOSRecommendations}

              disabled={!selectedFeeling || sosLoading}

              className="mt-4 w-full rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"

            >

              {sosLoading ? "Finding practices…" : "Find my reset →"}

            </button>

            {sosError && <p role="alert" className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">{sosError}</p>}

            {sosLoading && <p role="status" className="mt-3 text-sm text-slate-500">Loading recommendations…</p>}

            {!sosLoading && sosRecommendations.length > 0 && (

              <div className="mt-5 border-t border-slate-100 pt-5">

                <div className="mb-3 flex items-center justify-between gap-3">

                  <h3 className="font-semibold text-slate-900">Your suggested poses</h3>

                  <span className="text-xs text-slate-500">{sosRecommendations.length} found</span>

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  {sosRecommendations.map((asana) => (

                    <Link

                      key={asana.id}

                      to={`/asanas/${asana.id}`}

                      className="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50/50"

                    >

                      <p className="text-xs text-emerald-800">{asana.sanskrit_name || "Yoga asana"}</p>

                      <p className="mt-1 font-semibold text-slate-900">{asana.name}</p>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{asana.short_description || asana.description}</p>

                      <span className="mt-3 inline-block text-xs font-semibold text-emerald-800">View pose →</span>

                    </Link>

                  ))}

                </div>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* Cycle-aware practice: selecting a phase starts that phase route directly */}

      <section id="cycle" className="scroll-mt-28 px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">02 · Cycle-aware practice</p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Move with your cycle.</h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">Choose a phase to open its practice directly.</p>

          </div>

          {cycleLoading ? (

            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500">Loading cycle phases…</div>

          ) : cycleError ? (

            <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">{cycleError}</div>

          ) : cyclePhases.length === 0 ? (

            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500">No cycle phases are available yet.</div>

          ) : (

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {cyclePhases.map((phase) => {

                const ui = cycleUI[phase.slug] || { icon: "🌿", phase: "CYCLE PHASE" };

                const recommendations = (phase.recommendations || [])

                  .filter((recommendation) => recommendation.is_active !== false)

                  .slice(0, 2);

                return (

                  <button

                    key={phase.id ?? phase.slug}

                    type="button"

                    onClick={() => startCyclePractice(phase)}

                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"

                  >

                    <span className="flex items-center justify-between">

                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-2xl">{ui.icon}</span>

                      <span className="text-[10px] font-semibold tracking-[0.12em] text-slate-400">{ui.phase}</span>

                    </span>

                    <span className="mt-4 block text-lg font-semibold capitalize text-slate-900">{phase.name || phase.slug}</span>

                    <span className="mt-1 block text-xs font-medium text-emerald-800">{phase.energy_context || phase.intensity || "Move at your own pace"}</span>

                    <span className="mt-3 block line-clamp-2 text-sm leading-5 text-slate-500">{phase.practice_style || phase.description || "Explore a practice for this phase."}</span>

                    {recommendations.length > 0 && (

                      <span className="mt-3 block text-xs leading-5 text-slate-500">

                        {recommendations.map((item) => item.asana?.name || item.asana_name).filter(Boolean).join(" · ")}

                      </span>

                    )}

                    <span className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-emerald-800">

                      Open practice <span className="transition group-hover:translate-x-1">↗</span>

                    </span>

                  </button>

                );

              })}

            </div>

          )}

          <p className="mt-3 text-xs leading-5 text-slate-500">Cycle experiences vary. Choose the movement that feels comfortable for you.</p>

        </div>

      </section>

      {/* Deep Dive */}

      <section id="deep-dive" className="scroll-mt-28 px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">03 · Focused practice</p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Go deeper into what you need.</h2>

            </div>

            <button

              type="button"

              onClick={() => navigate("/deep-dive")}

              className="inline-flex min-h-10 items-center justify-center self-start rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 sm:self-auto"

            >

              Explore Deep Dive ↗

            </button>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {deepDiveFocuses.map((focus) => (

              <button

                key={focus.slug}

                type="button"

                onClick={() => navigate(`/deep-dive?focus=${encodeURIComponent(focus.slug)}`)}

                className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"

              >

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">{focus.icon}</span>

                <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800">{focus.category}</span>

                <span className="mt-1 block font-semibold text-slate-900">{focus.title}</span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">{focus.description}</span>

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* Daily practice */}

      <section id="daily" className="scroll-mt-28 px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] bg-[#eaf3e5] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">04 · Daily practice</p>

            <h2 className="mt-2 text-2xl font-semibold text-slate-900">A little movement goes a long way.</h2>

            <p className="mt-2 text-sm text-slate-600">Choose a duration and explore the asana library.</p>

          </div>

          <div className="flex flex-wrap gap-2">

            {[10, 20, 30].map((minutes) => (

              <button

                key={minutes}

                type="button"

                onClick={() => {

                  setSearchInput("");

                  setSearchTerm("");

                  setSelectedCategory("All");

                  scrollToSection("asanas");

                }}

                className="rounded-full border border-white bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-900"

                aria-label={`Explore asanas for a ${minutes} minute practice`}

              >

                {minutes} min

              </button>

            ))}

            <button

              type="button"

              onClick={() => scrollToSection("asanas")}

              className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"

            >

              Browse asanas →

            </button>

          </div>

        </div>

      </section>

      {/* Working Asana Encyclopedia */}

      <section id="asanas" className="scroll-mt-28 px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">05 · Explore & learn</p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Asana Encyclopedia</h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Search poses by name, Sanskrit name, category, focus area, or benefit.</p>

            </div>

            <span className="text-sm text-slate-500">

              {asanasLoading ? "Loading poses…" : `${filteredAsanas.length} ${filteredAsanas.length === 1 ? "pose" : "poses"}`}

            </span>

          </div>

          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <form

              className="flex flex-col gap-2 sm:flex-row"

              onSubmit={(event) => {

                event.preventDefault();

                setSearchTerm(searchInput);

                setShowAllAsanas(true);

              }}

            >

              <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">

                <span aria-hidden="true">⌕</span>

                <input

                  type="search"

                  value={searchInput}

                  onChange={(event) => {

                    setSearchInput(event.target.value);

                    setSearchTerm(event.target.value);

                    setShowAllAsanas(false);

                  }}

                  placeholder="Search asanas, benefits, Sanskrit names…"

                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"

                  aria-label="Search asanas"

                />

                {searchInput && (

                  <button

                    type="button"

                    onClick={() => {

                      setSearchInput("");

                      setSearchTerm("");

                    }}

                    className="text-xs font-medium text-slate-500 hover:text-emerald-800"

                  >

                    Clear

                  </button>

                )}

              </label>

              <button type="submit" className="min-h-12 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900">

                Search poses

              </button>

            </form>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Filter asanas by category">

              {categories.map((category) => (

                <button

                  key={category}

                  type="button"

                  aria-pressed={selectedCategory === category}

                  onClick={() => {

                    setSelectedCategory(category);

                    setShowAllAsanas(false);

                  }}

                  className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition ${selectedCategory === category

                    ? "bg-emerald-800 text-white"

                    : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900"

                    }`}

                >

                  {category}

                </button>

              ))}

            </div>

          </div>

          <div className="mt-5">

            {asanasLoading ? (

              <div role="status" className="rounded-2xl border border-slate-100 bg-white p-10 text-center text-sm text-slate-500">Loading your asana encyclopedia…</div>

            ) : asanaError ? (

              <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">

                <p className="text-sm text-amber-900">{asanaError}</p>

                <button type="button" onClick={retryAsanas} className="mt-3 rounded-full bg-emerald-800 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-900">Try again</button>

              </div>

            ) : filteredAsanas.length === 0 ? (

              <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center">

                <p className="text-lg font-semibold text-slate-800">No poses found</p>

                <p className="mt-1 text-sm text-slate-500">Try a different search or select “All”.</p>

                <button

                  type="button"

                  onClick={() => {

                    setSearchInput("");

                    setSearchTerm("");

                    setSelectedCategory("All");

                  }}

                  className="mt-4 rounded-full bg-emerald-800 px-4 py-2 text-xs font-semibold text-white"

                >

                  Clear filters

                </button>

              </div>

            ) : (

              <>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {visibleAsanas.map((asana) => (

                    <article key={asana.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">

                      <Link to={`/asanas/${asana.id}`} className="block focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">

                        <div className="relative h-40 overflow-hidden bg-[#edf5e9]">

                          {getAsanaImage(asana) && (
                            <img
                              src={getAsanaImage(asana)}

                              alt={asana.name ? `${asana.name} yoga pose` : "Yoga pose"}

                              loading="lazy"

                              className="h-full w-full object-contain object-center"

                              onError={(event) => {

                                event.currentTarget.style.display = "none";

                                event.currentTarget.nextElementSibling?.classList.remove("hidden");

                              }}

                            />

                          )}

                          <div

                            className={`h-full w-full items-center justify-center text-5xl ${getAsanaImage(asana) ? "hidden" : "flex"

                              }`}

                            aria-hidden="true"

                          >

                            🧘

                          </div>

                          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-emerald-900">

                            {asana.difficulty || "All levels"}

                          </span>

                        </div>

                        <div className="p-4">

                          <p className="text-xs font-medium text-emerald-800">

                            {asana.sanskrit_name || "Yoga practice"}

                          </p>

                          <h3 className="mt-1 text-lg font-semibold text-slate-900">{asana.name || "Untitled asana"}</h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{asana.short_description || asana.description || "Open this pose to explore its guidance and benefits."}</p>

                          <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">

                            <span>{asana.category || asana.focus_area || "Asana"}</span>

                            <span className="font-semibold text-emerald-800">View details ↗</span>

                          </div>

                        </div>

                      </Link>

                    </article>

                  ))}

                </div>

                {filteredAsanas.length > 6 && (

                  <div className="mt-5 text-center">

                    <button

                      type="button"

                      onClick={() => setShowAllAsanas((value) => !value)}

                      className="rounded-full border border-emerald-800 px-5 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"

                    >

                      {showAllAsanas ? "Show fewer poses" : `View all ${filteredAsanas.length} poses`}

                    </button>

                  </div>

                )}

              </>

            )}

          </div>

        </div>

      </section>

      {/* Programs section preserved: content and actions are intentionally not redesigned. */}

      <section id="programs" className="scroll-mt-28 px-4 py-7 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-5">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">Guided practice</p>

            <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Popular Yoga Programs</h2>

            <p className="mt-2 text-sm text-slate-500">Structured practices for different goals and schedules.</p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">


            {programs.map((program) => (
              <article
                key={program.title}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-40 overflow-hidden bg-emerald-50">
                  <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                  
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      {program.type}
                    </span>

                    <span className="text-xs text-slate-500">
                      {program.duration}
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {program.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {program.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
                  >
                    Start Program
                  </button>
                </div>
              </article>
            ))}

          </div>

        </div>

      </section>

      {/* Short safety note instead of several repetitive content blocks */}

      <section className="px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-5 sm:flex-row sm:items-start">

          <span className="text-2xl" aria-hidden="true">🛡️</span>

          <div>

            <h2 className="font-semibold text-slate-900">Practice with care</h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">

              Move within a comfortable range, modify or skip any pose that does not feel right, and seek qualified guidance when a practice may not be appropriate for you.

            </p>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}

export default Yoga;