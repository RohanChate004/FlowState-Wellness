import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import stressedMusic from "../../audio/Stressed.mp3";
import anxiousMusic from "../../audio/Anxious.mp3";
import lowEnergyMusic from "../../audio/Low Energy.mp3";
import focusMusic from "../../audio/Need Focus.mp3";
import goodMoodMusic from "../../audio/Feeling Good.mp3";
import sleepMusic from "../../audio/Better Sleep.wav";
import {
  FaArrowRight,
  FaArrowRotateLeft,
  FaBackward,
  FaBrain,
  FaBullseye,
  FaCheck,
  FaClock,
  FaCloudRain,
  FaFaceSmile,
  FaForward,
  FaHeart,
  FaLeaf,
  FaMoon,
  FaPause,
  FaPlay,
  FaVolumeHigh,
  FaWaveSquare,
  FaWind,
} from "react-icons/fa6";

/* ---------------------------------------------------------
   MEDITATION OPTIONS
--------------------------------------------------------- */

const moods = [
  {
    id: "stressed",
    label: "Stressed",
    icon: FaCloudRain,
    iconClass: "text-sky-700",
    bgClass: "bg-sky-50",
    theme: {
      page: "bg-[#f4faf8]",
      hero: "from-[#edf8f5] via-white to-[#e2f4ef]",
      accent: "text-teal-800",
      button: "bg-teal-700 hover:bg-teal-800",
      selected: "border-teal-600 bg-teal-50",
      border: "border-teal-100",
      bar: "bg-teal-600",
      soft: "bg-teal-50",
    },
    instrument: {
      name: "Bansuri Flute",
      raga: "Raag Yaman",
      description: "The bansuri is a bamboo flute known for its breath-shaped tone, gentle resonance, and expressive pauses. In Indian classical music, its sound can bring a feeling of spaciousness to a quiet listening session.",
      listening: "Try a slow, unhurried Bansuri rendition of Raag Yaman, traditionally associated with the early evening.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85",
    },
    recommendation: {
      title: "A Gentle Reset",
      type: "Stress Relief",
      description: "Release tension and give yourself a quiet moment to reset.",
    },
  },
  {
    id: "anxious",
    label: "Anxious",
    icon: FaBrain,
    iconClass: "text-violet-700",
    bgClass: "bg-violet-50",
    theme: {
      page: "bg-[#f8f5fc]",
      hero: "from-[#f4edfb] via-white to-[#eae2f8]",
      accent: "text-violet-800",
      button: "bg-violet-700 hover:bg-violet-800",
      selected: "border-violet-600 bg-violet-50",
      border: "border-violet-100",
      bar: "bg-violet-600",
      soft: "bg-violet-50",
    },
    instrument: {
      name: "Tanpura Drone",
      raga: "Raag Darbari Kanada",
      description: "The tanpura is a long-necked Indian string instrument that sustains a rich, repeating drone. It provides a tonal foundation in Indian classical music rather than carrying a busy melody.",
      listening: "Try a soft tanpura drone or a slow alap in Raag Darbari Kanada, traditionally associated with late night. Raga associations are cultural listening guidance, not a medical treatment.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=85",
    },
    recommendation: {
      title: "Back to the Breath",
      type: "Breath Awareness",
      description: "Reconnect with the present moment, one breath at a time.",
    },
  },
  {
    id: "low-energy",
    label: "Low Energy",
    icon: FaWaveSquare,
    iconClass: "text-amber-700",
    bgClass: "bg-amber-50",
    theme: {
      page: "bg-[#fffaf1]",
      hero: "from-[#fff4df] via-white to-[#f8e8c7]",
      accent: "text-amber-800",
      button: "bg-amber-700 hover:bg-amber-800",
      selected: "border-amber-600 bg-amber-50",
      border: "border-amber-100",
      bar: "bg-amber-600",
      soft: "bg-amber-50",
    },
    instrument: {
      name: "Santoor",
      raga: "Raag Bhoopali",
      description: "The santoor is a hammered dulcimer with many strings, producing bright, bell-like notes. Its delicate ringing tone can add a light, refreshing character to an instrumental meditation.",
      listening: "Try a gentle santoor interpretation of Raag Bhoopali for an open, uplifting melodic mood.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=85",
    },
    recommendation: {
      title: "Mindful Reset",
      type: "Mindfulness",
      description: "Refresh your attention with a short, grounding practice.",
    },
  },
  {
    id: "focus",
    label: "Need Focus",
    icon: FaBullseye,
    iconClass: "text-emerald-700",
    bgClass: "bg-emerald-50",
    theme: {
      page: "bg-[#f2faf5]",
      hero: "from-[#e7f6ed] via-white to-[#d9efe2]",
      accent: "text-emerald-800",
      button: "bg-emerald-700 hover:bg-emerald-800",
      selected: "border-emerald-600 bg-emerald-50",
      border: "border-emerald-100",
      bar: "bg-emerald-600",
      soft: "bg-emerald-50",
    },
    instrument: {
      name: "Sitar",
      raga: "Raag Kafi",
      description: "The sitar is a plucked long-necked instrument recognised for its resonant strings, sympathetic-string shimmer, and expressive bends. Sparse phrases leave room for attention instead of competing with it.",
      listening: "Try a slow, lightly ornamented sitar alap in Raag Kafi for a steady listening backdrop.",
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1000&q=85",
    },
    recommendation: {
      title: "Clearer Attention",
      type: "Focus & Clarity",
      description: "Settle distractions and prepare for focused work.",
    },
  },
  {
    id: "good",
    label: "Feeling Good",
    icon: FaFaceSmile,
    iconClass: "text-yellow-700",
    bgClass: "bg-yellow-50",
    theme: {
      page: "bg-[#fffdf1]",
      hero: "from-[#fff9d9] via-white to-[#f8efbd]",
      accent: "text-yellow-800",
      button: "bg-yellow-700 hover:bg-yellow-800",
      selected: "border-yellow-600 bg-yellow-50",
      border: "border-yellow-100",
      bar: "bg-yellow-600",
      soft: "bg-yellow-50",
    },
    instrument: {
      name: "Bansuri + Santoor",
      raga: "Raag Desh",
      description: "The airy bansuri and sparkling santoor create a contrast between flowing breath and bright, ringing strings. Used gently, the pairing gives the soundscape a warm, celebratory feel.",
      listening: "Try a light instrumental rendition inspired by Raag Desh, often associated with tenderness and freshness.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85",
    },
    recommendation: {
      title: "Carry the Calm",
      type: "Loving-Kindness",
      description: "Build on this moment with kindness and gratitude.",
    },
  },
  {
    id: "sleep",
    label: "Better Sleep",
    icon: FaMoon,
    iconClass: "text-indigo-700",
    bgClass: "bg-indigo-50",
    theme: {
      page: "bg-[#f4f5ff]",
      hero: "from-[#e9ecff] via-white to-[#dfe3ff]",
      accent: "text-indigo-800",
      button: "bg-indigo-700 hover:bg-indigo-800",
      selected: "border-indigo-600 bg-indigo-50",
      border: "border-indigo-100",
      bar: "bg-indigo-600",
      soft: "bg-indigo-50",
    },
    instrument: {
      name: "Veena + Tanpura",
      raga: "Raag Bageshree",
      description: "The veena's rounded plucked notes pair naturally with the tanpura's continuous drone. Keep the arrangement slow and sparse, with no sharp percussion or sudden changes in volume.",
      listening: "Try a slow instrumental rendition of Raag Bageshree, traditionally associated with the night and a reflective mood.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=85",
    },
    recommendation: {
      title: "Evening Stillness",
      type: "Sleep Meditation",
      description: "Wind down gently and prepare your mind for rest.",
    },
  },
];

const meditationTracks = {
  stressed: stressedMusic,
  anxious: anxiousMusic,
  "low-energy": lowEnergyMusic,
  focus: focusMusic,
  good: goodMoodMusic,
  sleep: sleepMusic,
};

const durations = [5, 10, 15, 20];

const sessions = {
  5: {
    title: "Quick Beginning",
    description: "A short practice to settle your mind and reconnect with your breath.",
    seconds: 300,
  },
  10: {
    title: "A Calmer You",
    description: "Take a little more time to release tension and find steadiness.",
    seconds: 600,
  },
  15: {
    title: "Deeper Stillness",
    description: "Create space to observe your thoughts without following them.",
    seconds: 900,
  },
  20: {
    title: "Extended Calm",
    description: "A longer pause for awareness, relaxation, and reflection.",
    seconds: 1200,
  },
};

const steps = [
  ["01", "Find a quiet space", "Choose a comfortable place where you can pause."],
  ["02", "Sit comfortably", "Relax your shoulders and let your body settle."],
  ["03", "Notice your breath", "Observe each inhale and exhale without forcing it."],
  ["04", "Let thoughts pass", "You do not need to judge or follow every thought."],
  ["05", "Return gently", "When your mind wanders, bring your attention back."],
];

const benefits = [
  ["Supports stress management", FaLeaf],
  ["Encourages focus", FaBullseye],
  ["Creates a calmer bedtime routine", FaMoon],
  ["Builds mindful habits", FaHeart],
];

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};



/* ---------------------------------------------------------
   MEDITATION PAGE
--------------------------------------------------------- */

function Meditation() {
  const [selectedMood, setSelectedMood] = useState("stressed");
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [completedMinutes, setCompletedMinutes] = useState(0);
  const musicRef = useRef(null);

  const currentSession = sessions[selectedDuration];
  const selectedMoodData = useMemo(
    () => moods.find((mood) => mood.id === selectedMood) || moods[0],
    [selectedMood]
  );
  const currentType = selectedMoodData.recommendation.type;
  const theme = selectedMoodData.theme;
  const currentMusic = meditationTracks[selectedMood] || stressedMusic;
  const progress = Math.min((elapsed / currentSession.seconds) * 100, 100);
  const remaining = Math.max(currentSession.seconds - elapsed, 0);

  const stopMeditationAudio = () => {
    if (musicRef.current) {
      musicRef.current.pause();
    }
  };

  const playBackgroundMusic = () => {
    if (!musicEnabled || !musicRef.current) return;
    // Loop the selected instrumental track for the chosen session length.
    // The session timer pauses it exactly when the session finishes.
    musicRef.current.play().catch((error) => {
      console.warn("Background music could not start:", error);
    });
  };

  const pauseMeditation = () => {
    setIsPlaying(false);
    if (musicRef.current) musicRef.current.pause();
  };

  const handleStart = () => {
    stopMeditationAudio();
    setElapsed(0);
    setSessionCompleted(false);
    setSaveMessage("");
    setIsPlaying(true);
    if (musicRef.current) {
      musicRef.current.currentTime = 0;
      playBackgroundMusic();
    }
    document.getElementById("meditation-player")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseMeditation();
      return;
    }

    if (elapsed >= currentSession.seconds) {
      setElapsed(0);
      setSessionCompleted(false);
      setSaveMessage("");
    }

    setIsPlaying(true);
    playBackgroundMusic();
  };

  const resetSession = () => {
    stopMeditationAudio();
    setIsPlaying(false);
    setElapsed(0);
    setSessionCompleted(false);
    setSaveMessage("");
  };

  const seekBy = (amount) => {
    setElapsed((current) => {
      const next = Math.min(Math.max(current + amount, 0), currentSession.seconds);
      if (next < currentSession.seconds) setSessionCompleted(false);
      return next;
    });
  };

  const handleMoodSelect = (moodId) => {
    stopMeditationAudio();
    setIsPlaying(false);
    setSelectedMood(moodId);
    if (musicRef.current) musicRef.current.currentTime = 0;
    setSaveMessage("");
  };

  const handleDurationSelect = (duration) => {
    resetSession();
    setSelectedDuration(duration);
  };

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = window.setInterval(() => {
      setElapsed((current) => {
        if (current + 1 >= currentSession.seconds) {
          window.clearInterval(timer);
          setIsPlaying(false);
          setSessionCompleted(true);
          stopMeditationAudio();
          return currentSession.seconds;
        }
        return current + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPlaying, currentSession.seconds]);

  const saveMeditationSession = async () => {
    if (isSaving || saveMessage.toLowerCase().includes("saved")) return;

    try {
      setIsSaving(true);
      setSaveMessage("");
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setSaveMessage("Please log in to save your meditation session.");
        return;
      }

      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
      const response = await fetch(`${apiBaseUrl}/api/meditation/sessions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          session_type: "mindfulness",
          duration_minutes: selectedDuration,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Meditation API error:", errorData);
        throw new Error("Unable to save your session. Please try again.");
      }

      setSaveMessage("Your meditation session has been saved ✓");
      setCompletedSessions((count) => count + 1);
      setCompletedMinutes((minutes) => minutes + selectedDuration);
    } catch (error) {
      console.error("Meditation save error:", error);
      setSaveMessage(error.message || "Unable to save your session. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme.page} text-slate-800 transition-colors duration-500`}>
      <Navbar />
      <audio ref={musicRef} src={currentMusic} loop preload="metadata" aria-label={`${selectedMoodData.label} meditation instrumental`} />

      <main>
        {/* HERO */}
        <section className={`border-b ${theme.border} bg-gradient-to-br ${theme.hero} transition-colors duration-500`}>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.25em] ${theme.accent}`}>
                FlowState · Meditation
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Find Stillness.
                <span className={`block ${theme.accent}`}>Find Yourself.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                Take a pause from the noise. Choose a practice that fits how you feel and make room for a calmer moment.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className={`inline-flex items-center gap-2 rounded-full ${theme.button} px-6 py-3.5 font-medium text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2`}
                >
                  Start meditating <FaArrowRight className="text-sm" />
                </button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2"><FaClock className={`${theme.accent}`} /> 5–20 minute sessions</span>
                <span className="inline-flex items-center gap-2"><FaVolumeHigh className={`${theme.accent}`} /> Indian instrumental music</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl border ${theme.border} bg-[#edf5ee] shadow-[0_20px_60px_rgba(47,94,70,0.12)]`}>
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                  alt="A peaceful meditation practice"
                  loading="eager"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">A moment for you</p>
                  <p className="mt-2 max-w-sm font-serif text-xl italic leading-7 text-white sm:text-2xl">
                    “Breathe in calm. Breathe out what you no longer need.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOOD SELECTOR */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>Start with how you feel</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What do you need today?</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">Choose a mood to get a practice suggestion.</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {moods.map((mood) => {
              const Icon = mood.icon;
              const selected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => handleMoodSelect(mood.id)}
                  aria-pressed={selected}
                  className={`rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 ${
                    selected
                      ? "${theme.selected} shadow-sm"
                      : "border-slate-200 bg-white hover:${theme.border} hover:${theme.soft}"
                  }`}
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${mood.bgClass}`}>
                    <Icon className={`text-xl ${mood.iconClass}`} />
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-slate-800">{mood.label}</span>
                  {selected && <span className={`mt-1 block text-xs font-medium ${theme.accent}`}>Selected</span>}
                </button>
              );
            })}
          </div>

          <div id="recommended-session" className={`mt-5 overflow-hidden rounded-3xl border ${theme.border} bg-white shadow-sm`}>
            <div className="grid sm:grid-cols-[1fr_auto]">
              <div className="p-5 sm:p-7">
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${theme.accent}`}>
                  <FaLeaf /> Your suggested practice
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                  {selectedMoodData.recommendation.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{currentType}</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {selectedMoodData.recommendation.description}
                </p>
              </div>
              <div className={`flex items-center border-t ${theme.border} bg-green-50/60 p-5 sm:border-l sm:border-t-0 sm:p-7`}>
                <button
                  type="button"
                  onClick={handleStart}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full ${theme.button} px-5 py-3 font-medium text-white transition sm:w-auto`}
                >
                  Begin session <FaArrowRight className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SESSION LENGTH */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="text-center">
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>Make it yours</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Choose your session length</h2>
            <p className="mt-2 text-sm text-slate-600">Start with the time that feels right for you.</p>
          </div>
          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {durations.map((duration) => {
              const selected = selectedDuration === duration;
              return (
                <button
                  key={duration}
                  type="button"
                  onClick={() => handleDurationSelect(duration)}
                  aria-pressed={selected}
                  className={`rounded-2xl border px-4 py-4 transition focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 ${
                    selected
                      ? "border-green-700 bg-green-700 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-800 hover:border-green-300 hover:bg-green-50"
                  }`}
                >
                  <span className="block text-xl font-semibold">{duration}</span>
                  <span className={`text-sm ${selected ? "text-green-50" : "text-slate-500"}`}>minutes</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* PLAYER */}
        <section id="meditation-player" className="scroll-mt-6 px-4 pb-12 sm:px-6 lg:px-8 lg:pb-14">
          <div className={`mx-auto max-w-6xl overflow-hidden rounded-3xl border ${theme.border} bg-white shadow-sm`}>
            <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="relative flex min-h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#e6f3e8] via-[#f4f4e8] to-[#f5eadb] p-8 sm:min-h-64">
                <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/70 blur-2xl" />
                <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-green-200/50 blur-3xl" />
                <div className="absolute h-40 w-40 rounded-full border border-white/70 sm:h-48 sm:w-48" />
                <div className="absolute h-28 w-28 rounded-full border border-white/80 sm:h-36 sm:w-36" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white bg-white/80 text-4xl text-green-800 shadow-sm sm:h-28 sm:w-28 sm:text-5xl">
                  <FaLeaf />
                </div>
                <span className="absolute bottom-4 rounded-full border border-white/70 bg-white/70 px-3 py-2 text-xs font-medium text-green-800 backdrop-blur-sm">
                  Take a moment to breathe
                </span>
              </div>

              <div className="min-w-0 p-5 sm:p-7 lg:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.accent}`}>{currentType}</p>
                  <span className={`rounded-full bg-green-50 px-3 py-1 text-xs font-medium ${theme.accent}`}>{selectedDuration} min session</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{currentSession.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{currentSession.description}</p>

                <div className="mt-6 rounded-2xl bg-[#FAFAF8] p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-4xl">{formatTime(elapsed)}</span>
                    <span className="text-sm tabular-nums text-slate-500">−{formatTime(remaining)} left</span>
                  </div>
                  <div
                    className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"
                    role="progressbar"
                    aria-label="Meditation progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                  >
                    <div className="h-full rounded-full bg-green-700 transition-[width] duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
                    <button type="button" onClick={() => seekBy(-10)} aria-label="Rewind 10 seconds" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-green-300 hover:bg-green-50">
                      <FaBackward />
                    </button>
                    <button type="button" onClick={handlePlayPause} aria-label={isPlaying ? "Pause meditation" : "Play meditation"} className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2">
                      {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                    </button>
                    <button type="button" onClick={() => seekBy(10)} aria-label="Forward 10 seconds" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-green-300 hover:bg-green-50">
                      <FaForward />
                    </button>
                    <button type="button" onClick={resetSession} aria-label="Restart meditation" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-green-300 hover:bg-green-50">
                      <FaArrowRotateLeft />
                    </button>
                    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={musicEnabled}
                        onChange={(event) => {
                          const enabled = event.target.checked;
                          setMusicEnabled(enabled);
                          if (!enabled && musicRef.current) musicRef.current.pause();
                          if (enabled && isPlaying && musicRef.current) {
                            musicRef.current.play().catch((error) => {
                              console.warn("Background music could not start:", error);
                            });
                          }
                        }}
                        className="h-4 w-4 accent-green-700"
                      />
                      Instrumental music
                    </label>
                  </div>
                </div>

                {sessionCompleted && (
                  <div className={`mt-5 rounded-2xl border ${theme.border} bg-green-50 p-4`}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-green-800">Meditation complete ✓</p>
                        <p className={`mt-1 text-xs ${theme.accent}`}>You completed your {selectedDuration}-minute session.</p>
                      </div>
                      <button
                        type="button"
                        onClick={saveMeditationSession}
                        disabled={isSaving || saveMessage.toLowerCase().includes("saved")}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? "Saving..." : saveMessage.toLowerCase().includes("saved") ? "Saved" : "Save session"}
                        {!isSaving && <FaCheck />}
                      </button>
                    </div>
                    {saveMessage && <p role="status" className="mt-3 text-xs font-medium text-green-800">{saveMessage}</p>}
                  </div>
                )}

                {!sessionCompleted && saveMessage && <p role="status" className="mt-3 text-sm text-amber-700">{saveMessage}</p>}

                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
                  <FaVolumeHigh className={`mt-0.5 shrink-0 ${theme.accent}`} />
                  Your selected Indian instrumental track loops during the session and stops when the timer ends. Instrumental music plays for the selected session duration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GUIDE AND BENEFITS */}
        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>A simple guide</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How to meditate</h2>
              <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-[#FAFAF8]">
                {steps.map(([number, title, description]) => (
                  <div key={number} className="grid gap-2 p-4 sm:grid-cols-[44px_1fr] sm:gap-4 sm:p-5">
                    <span className={`text-sm font-semibold ${theme.accent}`}>{number}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{title}</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>Why practice</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Small moments matter</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">A regular pause can support a mindful daily routine.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {benefits.map(([text, Icon]) => (
                  <div key={text} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 ${theme.accent}`}><Icon /></span>
                    <p className="text-sm font-medium leading-5 text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL SESSION SUMMARY */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>Keep going</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Your meditation journey</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                This page shows sessions saved during the current visit. Your account history remains managed by the backend.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className={`rounded-2xl border ${theme.border} bg-green-50/70 p-5`}>
                <FaWaveSquare className={`text-xl ${theme.accent}`} />
                <p className="mt-3 text-2xl font-semibold text-slate-900">{completedSessions}</p>
                <p className="mt-1 text-sm text-slate-600">Saved this visit</p>
              </div>
              <div className={`rounded-2xl border ${theme.border} bg-green-50/70 p-5`}>
                <FaClock className={`text-xl ${theme.accent}`} />
                <p className="mt-3 text-2xl font-semibold text-slate-900">{completedMinutes} min</p>
                <p className="mt-1 text-sm text-slate-600">Saved minutes this visit</p>
              </div>
              <div className={`rounded-2xl border ${theme.border} bg-green-50/70 p-5`}>
                <FaLeaf className={`text-xl ${theme.accent}`} />
                <p className="mt-3 text-2xl font-semibold text-slate-900">{sessionCompleted ? "Ready" : "One breath"}</p>
                <p className="mt-1 text-sm text-slate-600">Your next step</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mx-auto max-w-7xl rounded-3xl border border-green-200 bg-gradient-to-br from-[#e8f3e6] via-[#f4f7ee] to-[#e4f0e5] px-5 py-10 text-center sm:px-10 sm:py-14">
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>Your next quiet moment</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Ready to begin?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">Choose how you feel, select a duration, and give yourself a few minutes of calm.</p>
            <button
              type="button"
              onClick={handleStart}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-700 px-7 py-3.5 font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
            >
              Start your meditation <FaArrowRight className="text-sm" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Meditation;
