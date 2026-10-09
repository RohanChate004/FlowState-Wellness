import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import API_BASE_URL from "../../services/api";

import {
  FaBrain,
  FaBolt,
  FaFaceSmile,
  FaHeart,
  FaLeaf,
  FaMoon,
  FaPersonWalking,
  FaWind,
  FaPaperPlane,
  FaRobot,
  FaCircleCheck,
  FaBookOpen,
  FaArrowUpRightFromSquare,
  FaClock,
  FaRotate,
} from "react-icons/fa6";

const AIWellness = () => {
  const navigate = useNavigate();

  // =========================================================
  // AI CHAT STATE
  // =========================================================

  const [selectedMood, setSelectedMood] = useState("");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi! I'm your FlowState AI Coach. How are you feeling today? 🌿",
    },
  ]);

  const [recommendation, setRecommendation] = useState(null);
  const [action, setAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // =========================================================
  // DAILY ROUTINE STATE
  // =========================================================

  const [availableMinutes, setAvailableMinutes] = useState(30);
  const [dailyRoutine, setDailyRoutine] = useState(null);
  const [isRoutineLoading, setIsRoutineLoading] = useState(false);

  // =========================================================
  // AVAILABLE TIME OPTIONS
  // =========================================================

  const timeOptions = [10, 20, 30, 45, 60];

  // =========================================================
  // MOODS
  // =========================================================

  const moods = [
    {
      id: "stressed",
      label: "Stressed",
      icon: FaBrain,
    },
    {
      id: "anxious",
      label: "Anxious",
      icon: FaWind,
    },
    {
      id: "tired",
      label: "Tired",
      icon: FaMoon,
    },
    {
      id: "low-energy",
      label: "Low Energy",
      icon: FaBolt,
    },
    {
      id: "sore",
      label: "Sore",
      icon: FaPersonWalking,
    },
    {
      id: "calm",
      label: "Calm",
      icon: FaFaceSmile,
    },
  ];

  // =========================================================
  // SELECT MOOD
  // =========================================================

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);

    const moodLabel =
      moods.find((item) => item.id === mood)?.label || mood;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: `I'm feeling ${moodLabel.toLowerCase()}.`,
      },
    ]);

    setRecommendation(null);
    setAction(null);
  };

  // =========================================================
  // SEND AI MESSAGE
  // =========================================================

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && !selectedMood) {
      return;
    }

    const moodLabel =
      moods.find((item) => item.id === selectedMood)?.label ||
      selectedMood;

    const userText =
      trimmedMessage ||
      `I'm feeling ${
        moodLabel?.toLowerCase() || "not sure how I feel"
      }.`;

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userText,
      },
    ]);

    setMessage("");
    setRecommendation(null);
    setAction(null);
    setIsLoading(true);

    try {
      // -------------------------------------------------------
      // ACCESS TOKEN
      // -------------------------------------------------------

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Please log in to use FlowState AI.");
      }

      // -------------------------------------------------------
      // API REQUEST
      // -------------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/api/ai-wellness/chat/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },

          body: JSON.stringify({
            message: trimmedMessage,
            mood: selectedMood,
          }),
        }
      );

      // -------------------------------------------------------
      // SAFE RESPONSE PARSING
      // -------------------------------------------------------

      const responseText = await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (parseError) {
        console.error(
          "AI Wellness Invalid JSON:",
          responseText
        );

        throw new Error(
          "FlowState AI returned an unexpected response. Please try again."
        );
      }

      // -------------------------------------------------------
      // HTTP ERROR
      // -------------------------------------------------------

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Unable to connect to FlowState AI. (${response.status})`
        );
      }

      // -------------------------------------------------------
      // AI RESPONSE
      // -------------------------------------------------------

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text:
            data.reply ||
            "I'm here to help you take a small next step.",
        },
      ]);

      setRecommendation(data.recommendation || null);
      setAction(data.action || null);
    } catch (error) {
      console.error("AI Wellness Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text:
            error.message ||
            "Sorry, I couldn't connect to FlowState AI right now. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // GENERATE DAILY ROUTINE
  // =========================================================

  const getDailyRoutine = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setDailyRoutine({
        error: "Please log in to create your personalized routine.",
      });

      return;
    }

    setIsRoutineLoading(true);
    setDailyRoutine(null);

    try {
      console.log(
        "🔥 Generating routine for:",
        availableMinutes,
        "minutes"
      );

      const response = await fetch(
        `${API_BASE_URL}/api/ai-wellness/daily-routine/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },

          body: JSON.stringify({
            available_minutes: availableMinutes,
          }),
        }
      );

      const responseText = await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (parseError) {
        console.error(
          "Daily Routine JSON Error:",
          responseText
        );

        throw new Error(
          "The routine service returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Unable to create your routine. (${response.status})`
        );
      }

      console.log(
        "🔥 Daily Routine:",
        data
      );

      setDailyRoutine(data);
    } catch (error) {
      console.error(
        "Daily Routine Error:",
        error
      );

      setDailyRoutine({
        error:
          error.message ||
          "We couldn't create your routine right now. Please try again.",
      });
    } finally {
      setIsRoutineLoading(false);
    }
  };

  // =========================================================
  // HANDLE ACTION
  // =========================================================

  const handleAction = () => {
    if (!action) return;

    if (
      action.type === "internal" &&
      action.route
    ) {
      navigate(action.route);
      return;
    }

    if (
      action.type === "external" &&
      action.url
    ) {
      window.open(
        action.url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  // =========================================================
  // KEYBOARD
  // =========================================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (!isLoading) {
        handleSendMessage();
      }
    }
  };

  // =========================================================
  // ACTION ICON
  // =========================================================

  const getActionIcon = () => {
    if (!action) return FaCircleCheck;

    if (action.type === "external") {
      return FaArrowUpRightFromSquare;
    }

    if (
      action.route?.startsWith(
        "/knowledge-hub/article/"
      )
    ) {
      return FaBookOpen;
    }

    return FaCircleCheck;
  };

  // =========================================================
  // ROUTINE TOTAL
  // =========================================================

  const routineTotal =
    dailyRoutine?.routine?.reduce(
      (total, item) =>
        total + Number(item.duration || 0),
      0
    ) || 0;

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">

        {/* ===================================================
            PAGE INTRO
        =================================================== */}

        <section className="mb-7">

          <div className="max-w-3xl">

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              AI Wellness Coach

            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your personal wellness companion.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Talk with FlowState AI about how you feel and get
              simple, personalized steps for your mind and body.
            </p>

          </div>

        </section>

        {/* ===================================================
            AI CHAT
        =================================================== */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

          {/* CHAT HEADER */}

          <div className="border-b border-slate-100 bg-linear-to-r from-emerald-50/80 to-white px-5 py-5 sm:px-7">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                  <FaRobot className="text-lg" />
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="font-bold text-slate-900">
                      FlowState AI Coach
                    </h2>

                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                      AI
                    </span>

                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    Ready to listen

                  </div>

                </div>

              </div>

              <div className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-400 sm:block">
                Mind + Body
              </div>

            </div>

          </div>

          {/* CHAT BODY */}

          <div className="px-4 py-5 sm:px-7 sm:py-7">

            {/* QUICK MOODS */}

            <div className="mb-7">

              <div className="mb-3 flex items-center justify-between">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quick check-in
                </p>

                {selectedMood && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedMood("")
                    }
                    className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Clear
                  </button>
                )}

              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">

                {moods.map((mood) => {

                  const Icon = mood.icon;

                  const isSelected =
                    selectedMood === mood.id;

                  return (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() =>
                        handleMoodSelect(
                          mood.id
                        )
                      }
                      disabled={isLoading}
                      className={`
                        inline-flex shrink-0 items-center gap-2
                        rounded-xl border px-3.5 py-2.5
                        text-xs font-semibold transition
                        ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        }
                        ${
                          isLoading
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }
                      `}
                    >
                      <Icon />
                      {mood.label}
                    </button>
                  );

                })}

              </div>

            </div>

            {/* MESSAGES */}

            <div className="min-h-65 space-y-5">

              {messages.map((item) => (

                <div
                  key={item.id}
                  className={`flex ${
                    item.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {item.sender === "ai" && (
                    <div className="mr-2.5 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                      <FaRobot className="text-xs" />
                    </div>
                  )}

                  <div
                    className={`
                      max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[72%]
                      ${
                        item.sender === "user"
                          ? "rounded-br-md bg-emerald-600 text-white"
                          : item.error
                          ? "rounded-bl-md border border-red-100 bg-red-50 text-red-600"
                          : "rounded-bl-md border border-slate-100 bg-slate-50 text-slate-700"
                      }
                    `}
                  >
                    {item.text}
                  </div>

                </div>

              ))}

              {/* TYPING */}

              {isLoading && (
                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                    <FaRobot className="text-xs" />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-4 py-3">

                    <div className="flex items-center gap-1.5">

                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:150ms]" />

                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:300ms]" />

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* RECOMMENDATION */}

            {recommendation && (
              <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <FaLeaf />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-start justify-between gap-3">

                      <div>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                          Your next step
                        </p>

                        <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                          {recommendation.title}
                        </h3>

                      </div>

                      {recommendation.duration && (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                          {recommendation.duration} min
                        </span>
                      )}

                    </div>

                    {recommendation.type && (
                      <p className="mt-2 text-xs capitalize text-slate-500">
                        {recommendation.type.replace(
                          "_",
                          " "
                        )}
                      </p>
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* ACTION */}

            {action && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                      {(() => {
                        const Icon =
                          getActionIcon();

                        return <Icon />;
                      })()}

                    </div>

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Recommended next step
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-900">
                        {action.label}
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={handleAction}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700"
                  >
                    {action.label}

                    {action.type ===
                    "external" ? (
                      <FaArrowUpRightFromSquare />
                    ) : (
                      <FaCircleCheck />
                    )}
                  </button>

                </div>

              </div>
            )}

          </div>

          {/* CHAT INPUT */}

          <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5">

            <div className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-emerald-300">

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder="Tell FlowState how you're feeling..."
                rows={1}
                disabled={isLoading}
                className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={
                  handleSendMessage
                }
                disabled={
                  isLoading ||
                  (!message.trim() &&
                    !selectedMood)
                }
                className={`
                  flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition
                  ${
                    isLoading ||
                    (!message.trim() &&
                      !selectedMood)
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }
                `}
                aria-label="Send message"
              >
                <FaPaperPlane className="text-xs" />
              </button>

            </div>

            <p className="mt-2 text-center text-[10px] text-slate-400">
              FlowState AI provides wellness guidance, not medical diagnosis.
            </p>

          </div>

        </section>

        {/* ===================================================
            DAILY ROUTINE GENERATOR
        =================================================== */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

          {/* HEADER */}

          <div className="border-b border-slate-100 px-5 py-6 sm:px-7">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <FaLeaf className="text-lg" />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Create Your Personalized Daily Routine
                  </h2>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                    AI Powered
                  </span>

                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Tell us how much free time you have today.
                  FlowState AI will create a wellness plan that
                  fits exactly into that time.
                </p>

              </div>

            </div>

          </div>

          {/* TIME SELECTOR */}

          <div className="px-5 py-6 sm:px-7 sm:py-7">

            <div className="mb-4 flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                <FaClock />
              </div>

              <div>

                <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                  How much time can you give yourself today?
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Your activities will be planned within this time.
                </p>

              </div>

            </div>

            {/* TIME OPTIONS */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

              {timeOptions.map(
                (minutes) => {

                  const isSelected =
                    availableMinutes ===
                    minutes;

                  return (
                    <button
                      key={minutes}
                      type="button"
                      onClick={() => {
                        setAvailableMinutes(
                          minutes
                        );
                        setDailyRoutine(
                          null
                        );
                      }}
                      disabled={
                        isRoutineLoading
                      }
                      className={`
                        rounded-2xl border px-4 py-4 text-center transition
                        ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/50"
                        }
                      `}
                    >

                      <span
                        className={`block text-xl font-bold ${
                          isSelected
                            ? "text-emerald-700"
                            : "text-slate-900"
                        }`}
                      >
                        {minutes}
                      </span>

                      <span
                        className={`mt-1 block text-[10px] font-semibold uppercase tracking-wider ${
                          isSelected
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        minutes
                      </span>

                    </button>
                  );
                }
              )}

            </div>

            {/* SELECTED TIME */}

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-center">

              <p className="text-xs text-slate-500">
                Your available wellness time
              </p>

              <p className="mt-1 text-lg font-bold text-emerald-700">
                {availableMinutes} minutes
              </p>

            </div>

            {/* GENERATE BUTTON */}

            <div className="mt-5 flex justify-center">

              <button
                type="button"
                onClick={
                  getDailyRoutine
                }
                disabled={
                  isRoutineLoading
                }
                className="inline-flex min-w-55 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isRoutineLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating your routine...
                  </>
                ) : (
                  <>
                    <FaLeaf />
                    Generate My Routine
                  </>
                )}

              </button>

            </div>

          </div>

        </section>

        {/* ===================================================
            DAILY ROUTINE RESULT
        =================================================== */}

        {dailyRoutine && (
          <section className="mb-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

            {/* RESULT HEADER */}

            <div className="border-b border-slate-100 px-5 py-6 sm:px-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <FaLeaf className="text-lg" />
                  </div>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      AI Personalized Plan
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                      Your {availableMinutes}-Minute Wellness Plan
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Personalized using your recent FlowState wellness activity.
                    </p>

                  </div>

                </div>

                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                  ✓ Personalized for you
                </span>

              </div>

              {/* SUMMARY */}

              {dailyRoutine.summary &&
                !dailyRoutine.error && (
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">

                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-emerald-600">
                        <FaLeaf />
                      </div>

                      <p className="text-sm leading-6 text-slate-600">
                        {dailyRoutine.summary}
                      </p>

                    </div>

                  </div>
                )}

            </div>

            {/* ERROR */}

            {dailyRoutine.error ? (

              <div className="px-5 py-6 sm:px-7">

                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600">
                  {dailyRoutine.error}
                </div>

                <div className="mt-4 flex justify-center">

                  <button
                    type="button"
                    onClick={
                      getDailyRoutine
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <FaRotate />
                    Try Again
                  </button>

                </div>

              </div>

            ) : (

              <div className="px-4 py-5 sm:px-7 sm:py-7">

                {/* PLAN OVERVIEW */}

                <div className="mb-6 grid gap-3 sm:grid-cols-2">

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Available Time
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {availableMinutes} min
                    </p>

                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Activities
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {dailyRoutine.routine?.length || 0}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    ROUTINE TABLE
                ================================================= */}

                {dailyRoutine.routine?.length > 0 ? (

                  <div className="overflow-hidden rounded-2xl border border-slate-200">

                    {/* TABLE HEADER */}

                    <div className="hidden grid-cols-[1.2fr_110px_1.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:grid">

                      <span>Activity</span>

                      <span>Duration</span>

                      <span>Why this helps</span>

                    </div>

                    {/* ROUTINE ITEMS */}

                    {dailyRoutine.routine.map(
                      (item, index) => (

                        <div
                          key={`${item.activity}-${index}`}
                          className="border-b border-slate-100 px-5 py-5 last:border-b-0 sm:grid sm:grid-cols-[1.2fr_110px_1.8fr] sm:items-center sm:gap-4"
                        >

                          {/* ACTIVITY */}

                          <div>

                            <p className="text-sm font-bold text-slate-900 sm:text-base">
                              {item.activity}
                            </p>

                            <p className="mt-1 text-xs text-slate-400 sm:hidden">
                              Why: {item.reason}
                            </p>

                          </div>

                          {/* DURATION */}

                          <div className="mt-3 sm:mt-0">

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">

                              <FaClock className="text-[10px]" />

                              {item.duration} min

                            </span>

                          </div>

                          {/* REASON */}

                          <p className="hidden text-xs leading-5 text-slate-500 sm:block">
                            {item.reason}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                    No routine activities were returned. Please generate the routine again.
                  </div>

                )}

                {/* TOTAL */}

                {dailyRoutine.routine?.length > 0 && (

                  <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <FaCircleCheck />
                      </div>

                      <div>

                        <p className="text-sm font-bold text-emerald-800">
                          Total: {routineTotal} minutes
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {dailyRoutine.routine.length} activities • Built from your FlowState data
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={
                        getDailyRoutine
                      }
                      disabled={
                        isRoutineLoading
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-4 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
                    >
                      <FaRotate />
                      Adjust My Routine
                    </button>

                  </div>

                )}

              </div>

            )}

          </section>
        )}

        {/* ===================================================
            INFO CARDS
        =================================================== */}

        <section className="grid gap-4 sm:grid-cols-3">

          {/* PERSONALIZATION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FaBrain />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              Smart Personalization
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Uses your wellness activity and current situation
              to make recommendations more relevant.
            </p>

          </div>

          {/* YOUR TIME */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaClock />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              Fits Your Time
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Choose the amount of time you have and AI builds
              the routine around it.
            </p>

          </div>

          {/* MIND + BODY */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <FaHeart />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              Mind + Body
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Connects mental wellness with movement, recovery,
              breathing and meditation.
            </p>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
};

export default AIWellness;