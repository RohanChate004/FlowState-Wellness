import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

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

/* =========================================================
   MOODS
========================================================= */

const moods = [
    {
        id: "stressed",
        label: "Stressed",
        icon: FaCloudRain,
        iconClass: "text-sky-600",
        bgClass: "bg-sky-50",

        recommendation: {
            title: "A Gentle Reset",
            type: "Stress Relief",
            description:
                "Slow down, release some tension, and give yourself a quiet moment to reset.",
        },
    },

    {
        id: "anxious",
        label: "Anxious",
        icon: FaBrain,
        iconClass: "text-violet-600",
        bgClass: "bg-violet-50",

        recommendation: {
            title: "Back to the Breath",
            type: "Breath Awareness",
            description:
                "Use a gentle breathing practice to reconnect with the present moment.",
        },
    },

    {
        id: "low-energy",
        label: "Low Energy",
        icon: FaWaveSquare,
        iconClass: "text-amber-600",
        bgClass: "bg-amber-50",

        recommendation: {
            title: "Mindful Reset",
            type: "Mindfulness",
            description:
                "A short, grounding practice to refresh your attention without rushing.",
        },
    },

    {
        id: "focus",
        label: "Need Focus",
        icon: FaBullseye,
        iconClass: "text-emerald-700",
        bgClass: "bg-emerald-50",

        recommendation: {
            title: "Clearer Attention",
            type: "Focus & Clarity",
            description:
                "Settle distractions and prepare your mind for a more focused session.",
        },
    },

    {
        id: "good",
        label: "Feeling Good",
        icon: FaFaceSmile,
        iconClass: "text-yellow-500",
        bgClass: "bg-yellow-50",

        recommendation: {
            title: "Carry the Calm",
            type: "Loving-Kindness",
            description:
                "Build on how you feel with a gentle practice centered on kindness and gratitude.",
        },
    },

    {
        id: "sleep",
        label: "Better Sleep",
        icon: FaMoon,
        iconClass: "text-indigo-600",
        bgClass: "bg-indigo-50",

        recommendation: {
            title: "Evening Stillness",
            type: "Sleep Meditation",
            description:
                "Wind down slowly and create a calmer transition into rest.",
        },
    },
];

/* =========================================================
   MEDITATION PRACTICES
========================================================= */

const practices = [
    {
        title: "Mindfulness",
        description: "Be present in the moment.",
        icon: FaLeaf,
        className: "bg-lime-50 text-green-800",
    },

    {
        title: "Breath Awareness",
        description: "Connect with your breath.",
        icon: FaWind,
        className: "bg-sky-50 text-sky-800",
    },

    {
        title: "Stress Relief",
        description: "Let go of tension.",
        icon: FaWaveSquare,
        className: "bg-orange-50 text-orange-800",
    },

    {
        title: "Focus & Clarity",
        description: "Sharpen your attention.",
        icon: FaBullseye,
        className: "bg-cyan-50 text-cyan-800",
    },

    {
        title: "Sleep Meditation",
        description: "Rest deeper, sleep better.",
        icon: FaMoon,
        className: "bg-indigo-50 text-indigo-800",
    },

    {
        title: "Loving-Kindness",
        description: "Cultivate compassion.",
        icon: FaHeart,
        className: "bg-rose-50 text-rose-800",
    },
];

/* =========================================================
   SESSION DURATIONS
========================================================= */

const durations = [5, 10, 15, 20];

/* =========================================================
   SESSION DATA
========================================================= */

const sessions = {
    5: {
        title: "Quick Beginning",
        type: "Mindfulness Meditation",
        description:
            "A gentle introduction to meditation that helps you slow down, settle your mind, and reconnect with your breath.",
        seconds: 300,
    },
    10: {
        title: "A Calmer You",
        type: "Mindfulness Meditation",
        description:
            "A balanced meditation practice to help release mental tension and create a calmer state of mind.",
        seconds: 600,
    },
    15: {
        title: "Deeper Stillness",
        type: "Mindfulness Meditation",
        description:
            "A deeper practice designed to give you more time to settle your thoughts and experience stillness.",
        seconds: 900,
    },
    20: {
        title: "Extended Calm",
        type: "Mindfulness Meditation",
        description:
            "An extended meditation session for deeper relaxation, awareness, and a peaceful mental reset.",
        seconds: 1200,
    },
};

/* =========================================================
   HOW TO MEDITATE
========================================================= */

const steps = [
    [
        "01",
        "Find a quiet space",
        "Choose a place where you can be comfortable for a few minutes.",
    ],

    [
        "02",
        "Sit comfortably",
        "Let your body settle into a relaxed and supported position.",
    ],

    [
        "03",
        "Focus on your breath",
        "Notice each inhale and exhale without trying to change it.",
    ],

    [
        "04",
        "Observe your thoughts",
        "Let thoughts come and go without needing to follow them.",
    ],

    [
        "05",
        "Return gently",
        "When your attention wanders, calmly bring it back to your breath.",
    ],
];

/* =========================================================
   BENEFITS
========================================================= */

const benefits = [
    ["Reduces stress and anxiety", FaLeaf],
    ["Improves focus and productivity", FaBullseye],
    ["Supports better sleep", FaMoon],
    ["Builds emotional resilience", FaHeart],
];

/* =========================================================
   FORMAT TIME
========================================================= */


/* =========================================================
   MEDITATION COMPONENT
========================================================= */

function Meditation() {
    const [selectedMood, setSelectedMood] = useState("stressed");

    const [selectedDuration, setSelectedDuration] = useState(5);

    const [isPlaying, setIsPlaying] = useState(false);

    const [elapsed, setElapsed] = useState(0);

    const [sessionCompleted, setSessionCompleted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    const currentSession = sessions[selectedDuration];

    const selectedMoodData = useMemo(
        () =>
            moods.find((mood) => mood.id === selectedMood) ||
            moods[0],
        [selectedMood]
    );

    const saveMeditationSession = async () => {
        if (isSaving || saveMessage.includes("saved")) {
            return;
        }

        try {
            setIsSaving(true);
            setSaveMessage("");

            // Get JWT token from existing FlowState login
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                setSaveMessage("Please log in to save your meditation session.");
                return;
            }

            const response = await fetch(
                "http://127.0.0.1:8000/api/meditation/sessions/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },

                    body: JSON.stringify({
                        session_type: "mindfulness",
                        duration_minutes: selectedDuration,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                console.error("Meditation API error:", errorData);

                throw new Error("Failed to save meditation session.");
            }

            setSessionCompleted(true);
            setSaveMessage("Your meditation session has been saved ✓");

        } catch (error) {
            console.error("Meditation save error:", error);

            setSaveMessage(
                "Unable to save your session. Please try again."
            );

        } finally {
            setIsSaving(false);
        }
    };



    const getMeditationGuidance = () => {
        const type = currentSession.type;

        if (type === "Stress Relief") {
            return `Welcome to FlowState stress relief meditation.
Find a comfortable position and gently close your eyes.
Take a slow, deep breath in.
And slowly breathe out.
Let your shoulders relax and release any tension you are holding.
Notice your breath without trying to change it.
With every slow exhale, allow your body to soften.
If your thoughts become busy, gently return your attention to your breathing.
You are here in this moment. There is nothing you need to rush.
Simply breathe, relax, and give yourself permission to pause.`;
        }

        if (type === "Breath Awareness") {
            return `Welcome to FlowState breath awareness meditation.
Find a comfortable position and gently close your eyes.
Bring your attention to your natural breathing.
Slowly breathe in. And slowly breathe out.
Notice the movement of your breath.
You don't need to control your breathing. Simply observe it.
When your mind wanders, gently bring your attention back to your next breath.
Stay with the breath. Stay with this moment.`;
        }

        if (type === "Focus & Clarity") {
            return `Welcome to FlowState focus and clarity meditation.
Sit comfortably and allow your body to become still.
Take a slow breath in. And breathe out gently.
Let distractions become quieter.
Bring your attention to one thing: your breath.
Notice each inhale. Notice each exhale.
When your attention moves away, gently bring it back.
There is no need to judge yourself.
With each breath, allow your mind to become a little clearer and steadier.`;
        }

        if (type === "Sleep Meditation") {
            return `Welcome to FlowState sleep meditation.
Make yourself comfortable and allow your eyes to gently close.
Take a slow, easy breath in. And slowly breathe out.
Let your shoulders become heavy. Let your body settle.
There is nothing you need to solve right now.
Nothing you need to accomplish.
Allow your breathing to become soft and natural.
Let each exhale carry you toward deeper relaxation.
If thoughts appear, let them pass gently.
Return to the feeling of resting.
You are safe to slow down. You are safe to rest.`;
        }

        if (type === "Loving-Kindness") {
            return `Welcome to FlowState loving kindness meditation.
Find a comfortable position and gently close your eyes.
Take a slow breath in. And breathe out.
Bring a feeling of kindness toward yourself.
You deserve moments of peace and care.
Silently remind yourself: May I be calm. May I be peaceful. May I be well.
Now allow that kindness to gently extend toward someone you care about.
May they be calm. May they be peaceful. May they be well.
Take one more slow breath and simply rest in this feeling of kindness.`;
        }

        return `Welcome to FlowState mindfulness meditation.
Find a comfortable position and gently close your eyes.
Take a slow, deep breath in. And slowly breathe out.
Let your shoulders relax.
Bring your attention to your breath.
You don't need to change anything.
Simply notice each breath as it comes and goes.
If your mind wanders, gently bring your attention back to your breathing.
Stay present. Stay relaxed.
And allow yourself to enjoy this moment of stillness.`;
    };

    const speakMeditation = () => {
        if (!("speechSynthesis" in window)) {
            console.warn("Speech synthesis is not supported in this browser.");
            return;
        }

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(getMeditationGuidance());
        speech.rate = 0.85;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onend = () => setIsPlaying(false);
        speech.onerror = () => setIsPlaying(false);

        window.speechSynthesis.speak(speech);
    };

    const stopMeditationAudio = () => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    };

    const handlePlayPause = () => {
        if (!("speechSynthesis" in window)) {
            setIsPlaying((playing) => !playing);
            return;
        }

        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPlaying(false);
            return;
        }

        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPlaying(true);
            return;
        }

        setIsPlaying(true);
        speakMeditation();
    };

    /* =======================================================
       TIMER
    ======================================================= */

    useEffect(() => {
        if (!isPlaying) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setElapsed((current) => {
                if (current >= currentSession.seconds) {
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

    /* =======================================================
       PROGRESS
    ======================================================= */

    const progress = Math.min(
        (elapsed / currentSession.seconds) * 100,
        100
    );

    /* =======================================================
       MOOD SELECT
    ======================================================= */

    const handleMoodSelect = (moodId) => {
        setSelectedMood(moodId);

        window.setTimeout(() => {
            document
                .getElementById("recommended-session")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
        }, 50);
    };

    /* =======================================================
       START
    ======================================================= */

    const handleStart = () => {
        setElapsed(0);
        setSessionCompleted(false);
        setSaveMessage("");
        setIsPlaying(true);
        speakMeditation();
    };

    /* =======================================================
       SEEK
    ======================================================= */

    const seekBy = (amount) => {
        setElapsed((current) =>
            Math.min(
                Math.max(current + amount, 0),
                currentSession.seconds
            )
        );
    };

    /* =======================================================
       RENDER
    ======================================================= */

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-slate-800">

            {/* NAVBAR */}

            <Navbar />

            <main>

                {/* =================================================
            HERO
        ================================================= */}

                <section className="relative overflow-hidden border-b border-green-100 bg-linear-to-br from-[#f9fbf7] via-white to-[#edf5ee]">

                    <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

                        <div className="relative z-10">

                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-green-700">
                                Meditation
                            </p>

                            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
                                Find Stillness.

                                <span className="block text-green-800">
                                    Find Yourself.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                                Take a pause from the noise. Explore guided meditation
                                and breathing practices designed to create more calm,
                                clarity, and balance in your day.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">

                                <button
                                    type="button"
                                    onClick={handleStart}
                                    className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3.5 font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                                >
                                    Start Meditating
                                    <FaArrowRight className="text-sm" />
                                </button>

                                <a
                                    href="#practices"
                                    className="inline-flex items-center rounded-full border border-green-200 bg-white px-6 py-3.5 font-medium text-green-800 transition hover:bg-green-50"
                                >
                                    Explore Sessions
                                </a>

                            </div>

                        </div>

                        {/* HERO VISUAL */}

                        <div className="relative mx-auto h-90 w-full max-w-xl overflow-hidden rounded-4xl border border-white bg-linear-to-b from-[#f8efe1] via-[#e9f1e4] to-[#dcebdd] shadow-[0_20px_70px_rgba(47,94,70,0.12)] sm:h-100">

                            {/* Soft sunlight */}

                            <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-100/80 blur-3xl" />

                            <div className="absolute right-10 top-16 h-24 w-24 rounded-full bg-white/60 blur-2xl" />

                            {/* Distant mountains */}

                            <div className="absolute bottom-24 left-[-10%] h-40 w-[65%] rotate-[8deg] rounded-[50%] bg-[#c8d9ca]/70 blur-[1px]" />

                            <div className="absolute bottom-20 right-[-15%] h-48 w-[70%] rotate-[-10deg] rounded-[50%] bg-[#b8cfbd]/80 blur-[1px]" />

                            {/* Mountain highlight */}

                            <div className="absolute bottom-[36.25%] left-[20%] h-24 w-52 rotate-[8deg] rounded-[50%] bg-white/40 blur-xl" />

                            {/* Ground */}

                            <div className="absolute bottom-0 left-0 h-28 w-full bg-linear-to-t from-[#a8c5aa] to-transparent" />

                            {/* Ground shadow */}

                            <div className="absolute bottom-12 left-1/2 h-5 w-52 -translate-x-1/2 rounded-[50%] bg-[#759b7b]/30 blur-md" />

                            {/* Meditation figure */}

                            <div className="absolute bottom-132 -translate-x-1/2">

                                {/* Head */}

                                <div className="mx-auto h-12 w-12 rounded-full bg-[#40584b] shadow-sm" />

                                {/* Body */}

                                <div className="relative mx-auto -mt-0.5 h-24 w-24 rounded-t-[45%] rounded-b-[35%] bg-[#f5f0e7] shadow-sm">

                                    {/* Left arm */}

                                    <div className="absolute -left-710 h-5 w-12 rotate-[-18deg] rounded-full bg-[#f5f0e7]" />

                                    {/* Right arm */}

                                    <div className="absolute -right-7 w-12 rotate-18 rounded-full bg-[#f5f0e7]" />

                                </div>

                                {/* Crossed legs */}

                                <div className="relative mx-auto -mt-1.25 h-14 w-40">

                                    <div className="absolute left-0 top-2 h-7 w-24 rotate-12 rounded-full bg-[#ece5d9]" />

                                    <div className="absolute right-0 top-2 h-7 w-24 -rotate-12 rounded-full bg-[#ece5d9]" />

                                </div>

                            </div>

                            {/* Small plants */}

                            <div className="absolute bottom-5 left-7 text-4xl opacity-70">
                                🌿
                            </div>

                            <div className="absolute bottom-4 right-7 scale-x-[-1] text-4xl opacity-70">
                                🌿
                            </div>

                            {/* Quote */}

                            <div className="absolute left-1/2 top-7 w-[85%] -translate-x-1/2 text-center">

                                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                                    A moment for you
                                </p>

                                <p className="mx-auto mt-2 max-w-sm font-serif text-lg italic leading-6 text-slate-700 sm:text-xl">
                                    “Breathe in calm. Breathe out what you no longer need.”
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
            MOOD
        ================================================= */}

                <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                            Start with how you feel
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            How Are You Feeling Today?
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Choose a mood and we&apos;ll suggest a meditation for you.
                        </p>

                    </div>

                    <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                        {moods.map((mood) => {

                            const Icon = mood.icon;

                            const isSelected =
                                selectedMood === mood.id;

                            return (
                                <button
                                    key={mood.id}
                                    type="button"
                                    onClick={() =>
                                        handleMoodSelect(mood.id)
                                    }
                                    aria-pressed={isSelected}
                                    className={`rounded-2xl border p-5 text-center transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isSelected
                                        ? "border-green-500 bg-green-50 shadow-sm"
                                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-green-200 hover:shadow-sm"
                                        }`}
                                >

                                    <div
                                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${mood.bgClass}`}
                                    >
                                        <Icon
                                            className={`text-2xl ${mood.iconClass}`}
                                        />
                                    </div>

                                    <p className="mt-4 text-sm font-medium text-slate-800">
                                        {mood.label}
                                    </p>

                                </button>
                            );
                        })}

                    </div>

                    {/* RECOMMENDATION */}

                    {/* RECOMMENDATION */}

                    <div
                        id="recommended-session"
                        className="mx-auto mt-7 max-w-4xl overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm"
                    >
                        <div className="grid sm:grid-cols-[1fr_auto]">

                            {/* RECOMMENDATION CONTENT */}

                            <div className="p-6 sm:p-7">

                                {/* Label */}

                                <div className="flex items-center gap-2">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-700">
                                        <FaLeaf className="text-sm" />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-700">
                                            Your Suggestion
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Based on how you&apos;re feeling
                                        </p>
                                    </div>

                                </div>

                                {/* Recommendation */}

                                <div className="mt-5">

                                    <p className="text-sm font-medium text-green-700">
                                        {selectedMoodData.label}
                                    </p>

                                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                                        {selectedMoodData.recommendation.title}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        {selectedMoodData.recommendation.type}
                                    </p>

                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                                        {selectedMoodData.recommendation.description}
                                    </p>

                                </div>

                            </div>

                            {/* ACTION AREA */}

                            <div className="flex items-center border-t border-green-100 bg-green-50/50 p-6 sm:border-l sm:border-t-0 sm:p-7">

                                <button
                                    type="button"
                                    onClick={handleStart}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                                >
                                    Begin Session

                                    <FaArrowRight className="text-sm" />
                                </button>

                            </div>

                        </div>
                    </div>

                </section>

                {/* =================================================
            PRACTICES
        ================================================= */}

                <section
                    id="practices"
                    className="bg-white px-6 py-14 lg:px-8 lg:py-16"
                >

                    <div className="mx-auto max-w-7xl">

                        <div className="text-center">

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                                Explore
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                Meditation Practices
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                                Explore different types of meditation to support
                                your mind, body and everyday well-being.
                            </p>

                        </div>

                        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {practices.map((practice) => {

                                const Icon = practice.icon;

                                return (
                                    <button
                                        key={practice.title}
                                        type="button"
                                        onClick={handleStart}
                                        className="group rounded-3xl border border-slate-200 bg-[#FAFAF8] p-6 text-left transition hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-md"
                                    >

                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${practice.className}`}
                                        >
                                            <Icon className="text-2xl" />
                                        </div>

                                        <div className="mt-5 flex items-start justify-between gap-4">

                                            <div>

                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    {practice.title}
                                                </h3>

                                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                                    {practice.description}
                                                </p>

                                            </div>

                                            <FaArrowRight className="mt-1 text-sm text-green-700 transition group-hover:translate-x-1" />

                                        </div>

                                    </button>
                                );
                            })}

                        </div>

                    </div>

                </section>

                {/* =================================================
            DURATION
        ================================================= */}

                <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">

                    <div className="text-center">

                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                            Make it yours
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            Choose Your Session Length
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Start with a time that feels right for you.
                        </p>

                    </div>

                    <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">

                        {durations.map((duration) => {

                            const isSelected =
                                selectedDuration === duration;

                            return (
                                <button
                                    key={duration}
                                    type="button"
                                    onClick={() => {
                                        setSelectedDuration(duration);
                                        setElapsed(0);
                                        setIsPlaying(false);
                                        setSessionCompleted(false);
                                        setSaveMessage("");
                                        stopMeditationAudio();
                                    }}
                                    aria-pressed={isSelected}
                                    className={`rounded-2xl border px-4 py-4 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isSelected
                                        ? "border-green-700 bg-green-700 text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-800 hover:border-green-300 hover:bg-green-50"
                                        }`}
                                >

                                    <span className="block text-xl font-semibold">
                                        {duration === 20 ? "20+" : duration}
                                    </span>

                                    <span
                                        className={
                                            isSelected
                                                ? "text-sm text-green-50"
                                                : "text-sm text-slate-500"
                                        }
                                    >
                                        minutes
                                    </span>

                                </button>
                            );
                        })}

                    </div>

                </section>

                {/* =================================================
            PLAYER
        ================================================= */}

                <section
                    id="meditation-player"
                    className="px-6 pb-14 lg:px-8 lg:pb-16"
                >

                    <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                        <div className="grid lg:grid-cols-[280px_1fr_220px]">

                            {/* VISUAL */}

                            <div className="relative flex min-h-67.5 items-center justify-center overflow-hidden bg-linear-to-br from-[#e6f3e8] via-[#f4f4e8] to-[#f5eadb]">

                                {/* Soft background circles */}

                                <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/70 blur-2xl" />

                                <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-green-200/50 blur-3xl" />

                                {/* Decorative rings */}

                                <div className="absolute h-48 w-48 rounded-full border border-white/60" />

                                <div className="absolute h-36 w-36 rounded-full border border-white/70" />

                                {/* Meditation symbol */}

                                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white bg-white/80 text-5xl shadow-lg">

                                    🌿

                                </div>

                                {/* Bottom label */}

                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-medium text-green-800 backdrop-blur-sm">

                                    Take a moment to breathe

                                </div>

                            </div>

                            {/* PLAYER */}


                            <div className="relative p-6 sm:p-8">

                                {/* Small status */}

                                <div className="flex items-center justify-between gap-3">

                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                                        {currentSession.type}
                                    </p>

                                    <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-medium text-green-700">
                                        {selectedDuration} min session
                                    </span>

                                </div>

                                {/* Title */}

                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                                    {currentSession.title}
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                    {currentSession.description}
                                </p>


                                {/* Controls */}

                                <div className="mt-6 flex items-center justify-center gap-4 sm:justify-start sm:gap-5">

                                    {/* Rewind */}

                                    <button
                                        type="button"
                                        onClick={() => seekBy(-10)}
                                        aria-label="Rewind 10 seconds"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-slate-700 transition hover:border-green-300 hover:bg-green-50"
                                    >
                                        <FaBackward />
                                    </button>

                                    {/* Play / Pause */}

                                    <button
                                        type="button"
                                        onClick={handlePlayPause}
                                        aria-label={
                                            isPlaying
                                                ? "Pause meditation"
                                                : "Play meditation"
                                        }
                                        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white shadow-md transition hover:scale-105 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        {isPlaying ? (
                                            <FaPause />
                                        ) : (
                                            <FaPlay className="ml-1" />
                                        )}
                                    </button>

                                    {/* Forward */}

                                    <button
                                        type="button"
                                        onClick={() => seekBy(10)}
                                        aria-label="Forward 10 seconds"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-slate-700 transition hover:border-green-300 hover:bg-green-50"
                                    >
                                        <FaForward />
                                    </button>

                                    {/* Restart */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setElapsed(0);
                                            setIsPlaying(false);
                                            setSessionCompleted(false);
                                            setSaveMessage("");
                                        }}
                                        aria-label="Restart meditation"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-slate-700 transition hover:border-green-300 hover:bg-green-50"
                                    >
                                        <FaArrowRotateLeft />
                                    </button>

                                </div>

                                {/* Demo notice */}

                                <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">

                                    <FaVolumeHigh className="shrink-0 text-green-700" />

                                    <span>
                                        Guided voice is powered by your browser's built-in speech synthesis.
                                    </span>

                                </div>

                            </div>

                            {sessionCompleted && (
                                <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-green-800">
                                                Meditation complete ✓
                                            </p>

                                            <p className="mt-1 text-xs text-green-700">
                                                You completed your {selectedDuration}-minute session.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={saveMeditationSession}
                                            disabled={isSaving}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isSaving ? "Saving..." : "Save Session"}
                                            {!isSaving && <FaCheck />}
                                        </button>
                                    </div>

                                    {saveMessage && (
                                        <p className="mt-3 text-xs font-medium text-green-700">
                                            {saveMessage}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* FEATURES */}

                            <div className="border-t border-slate-200 bg-[#FAFAF8] p-6 lg:border-l lg:border-t-0">

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                                    Session includes
                                </p>

                                <div className="mt-6 space-y-5">

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <FaVolumeHigh />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-800">
                                                Guided Audio
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Gentle session guidance
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <FaWaveSquare />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-800">
                                                Soothing Voice
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Calm and simple instructions
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <FaWind />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-800">
                                                Breath Awareness
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Slow down and reconnect
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <FaCheck />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-800">
                                                Session Ready
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Choose your time and begin
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                </section>

                {/* =================================================
                 HOW TO + BENEFITS
                 ================================================= */}

                <section className="bg-white px-6 py-14 lg:px-8 lg:py-16">

                    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">

                        {/* HOW TO */}

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                                A simple guide
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                How to Meditate
                            </h2>

                            <p className="mt-3 text-slate-600">
                                A simple guide to get you started.
                            </p>

                            <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-[#FAFAF8]">

                                {steps.map(
                                    ([number, title, description]) => (
                                        <div
                                            key={number}
                                            className="grid gap-3 p-5 sm:grid-cols-[48px_1fr] sm:items-start sm:p-6"
                                        >

                                            <span className="text-sm font-semibold text-green-700">
                                                {number}
                                            </span>

                                            <div>

                                                <h3 className="font-semibold text-slate-900">
                                                    {title}
                                                </h3>

                                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                                    {description}
                                                </p>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                        {/* BENEFITS */}

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                                Why practice
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                The Benefits of Meditation
                            </h2>

                            <p className="mt-3 text-slate-600">
                                Small moments can support healthier everyday habits.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                                {benefits.map(([text, Icon]) => (

                                    <div
                                        key={text}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                                    >

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <Icon />
                                        </div>

                                        <p className="text-sm font-medium leading-6 text-slate-700">
                                            {text}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                     PROGRESS
                     ================================================= */}

                <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">

                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                                Keep going
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                Your Meditation Journey
                            </h2>

                            <p className="mt-3 max-w-md text-slate-600">
                                Track your progress and stay consistent with
                                small, meaningful sessions.
                            </p>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">

                            <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5">

                                <FaWaveSquare className="text-xl text-green-700" />

                                <p className="mt-4 text-2xl font-semibold text-slate-900">
                                    12
                                </p>

                                <p className="mt-1 text-sm text-slate-600">
                                    Sessions completed
                                </p>

                            </div>

                            <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5">

                                <FaClock className="text-xl text-green-700" />

                                <p className="mt-4 text-2xl font-semibold text-slate-900">
                                    120 min
                                </p>

                                <p className="mt-1 text-sm text-slate-600">
                                    Total meditation time
                                </p>

                            </div>

                            <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5">

                                <FaLeaf className="text-xl text-green-700" />

                                <p className="mt-4 text-2xl font-semibold text-slate-900">
                                    7 days
                                </p>

                                <p className="mt-1 text-sm text-slate-600">
                                    Current streak
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                  FINAL CTA
                ================================================= */}

                <section className="px-6 pb-16 lg:px-8">

                    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl border border-green-200 bg-linear-to-br from-[#e8f3e6] via-[#f4f7ee] to-[#e4f0e5] px-6 py-14 text-center sm:px-10 sm:py-16">

                        {/* Decorative leaves */}

                        <div className="pointer-events-none absolute -bottom-5 -left-2 text-6xl opacity-20">
                            🌿
                        </div>

                        <div className="pointer-events-none absolute -right-2 -top-4 scale-x-[-1] text-6xl opacity-20">
                            🌿
                        </div>

                        {/* CONTENT */}

                        <div className="relative z-10">

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                                Your next quiet moment
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                Ready to Begin?
                            </h2>

                            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                                Take a deep breath. A calmer, clearer and
                                brighter you is just a session away.
                            </p>

                            <button
                                type="button"
                                onClick={handleStart}
                                className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-700 px-7 py-3.5 font-medium text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Start Your Meditation

                                <FaArrowRight className="text-sm" />
                            </button>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </div>
    );
}

export default Meditation;