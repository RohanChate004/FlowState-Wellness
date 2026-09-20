import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/fa6";

const AIWellness = () => {
  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && !selectedMood) {
      return;
    }

    const userText =
      trimmedMessage ||
      `I'm feeling ${
        moods.find((item) => item.id === selectedMood)?.label?.toLowerCase() ||
        selectedMood
      }.`;

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
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        "http://127.0.0.1:8000/api/ai-wellness/chat/",
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to connect to FlowState AI."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: data.reply || "I'm here to help you take a small next step.",
        },
      ]);

      setRecommendation(data.recommendation || null);
    } catch (error) {
      console.error("AI Wellness Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text:
            "Sorry, I couldn't connect to FlowState AI right now. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartPractice = () => {
    if (!recommendation) return;

    switch (recommendation.type) {
      case "meditation":
      case "breathing":
        navigate("/meditation");
        break;

      case "yoga":
        navigate("/yoga");
        break;

      case "deep_dive":
        navigate("/deep-dive");
        break;

      default:
        navigate("/yoga");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  
    return (
  <div className="min-h-screen bg-stone-50 text-slate-800">
    
    <Navbar />

    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">

        {/* HEADER */}
        <section className="mb-6 rounded-3xl border border-emerald-100 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaRobot />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-900">
                    FlowState AI Coach
                  </h1>

                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    AI
                  </span>
                </div>

                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </div>
              </div>

            </div>

            <span className="hidden text-xs text-slate-400 sm:block">
              Your wellness companion
            </span>

          </div>

          {/* CHAT AREA */}
          <div className="min-h-[430px] px-4 py-5 sm:px-6 sm:py-6">

            {/* QUICK MOODS */}
            <div className="mb-6">

              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Quick check-in
              </p>

              <div className="flex flex-wrap gap-2">

                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.id;

                  return (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() => handleMoodSelect(mood.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-600 text-white"
                          : "border-emerald-100 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100"
                      }`}
                    >
                      <Icon />
                      {mood.label}
                    </button>
                  );
                })}

              </div>
            </div>

            {/* CHAT MESSAGES */}
            <div className="space-y-4">

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
                    <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs text-emerald-600">
                      <FaRobot />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.sender === "user"
                        ? "rounded-br-md bg-emerald-600 text-white"
                        : item.error
                        ? "rounded-bl-md border border-red-100 bg-red-50 text-red-600"
                        : "rounded-bl-md bg-emerald-50 text-slate-700"
                    }`}
                  >
                    {item.text}
                  </div>

                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-xs text-emerald-600">
                    <FaRobot />
                  </div>

                  <div className="rounded-2xl rounded-bl-md bg-emerald-50 px-4 py-3">
                    <div className="flex items-center gap-1">
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
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FaLeaf />
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center justify-between gap-2">

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                          Your next step
                        </p>

                        <h2 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                          {recommendation.title}
                        </h2>
                      </div>

                      {recommendation.duration && (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {recommendation.duration} min
                        </span>
                      )}

                    </div>

                    <p className="mt-2 text-xs capitalize text-slate-500">
                      {recommendation.type?.replace("_", " ")}
                    </p>

                    <button
                      type="button"
                      onClick={handleStartPractice}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <FaCircleCheck />
                      Start Practice
                    </button>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* INPUT */}
          <div className="border-t border-slate-100 p-4 sm:p-5">

            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-emerald-300 focus-within:bg-white">

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell FlowState how you're feeling..."
                rows={1}
                className="max-h-24 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isLoading || (!message.trim() && !selectedMood)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  isLoading || (!message.trim() && !selectedMood)
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
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

        {/* FOOTER INFO */}
        <section className="grid gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <FaBrain className="text-emerald-600" />

            <h3 className="mt-2 text-sm font-semibold text-slate-900">
              Personalized
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Uses your current situation and available wellness activity.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <FaHeart className="text-emerald-600" />

            <h3 className="mt-2 text-sm font-semibold text-slate-900">
              Mind + Body
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Connects mental wellness with movement and recovery.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <FaLeaf className="text-emerald-600" />

            <h3 className="mt-2 text-sm font-semibold text-slate-900">
              One Clear Action
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Helps reduce choice overload with one suggested next step.
            </p>
          </div>

        </section>

      </main>
       <Footer />
    </div>
  );
};

export default AIWellness;