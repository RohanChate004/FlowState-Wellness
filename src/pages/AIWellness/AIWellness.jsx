import { useState } from "react";
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
} from "react-icons/fa6";

const AIWellness = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const moods = [
    {
      id: "stressed",
      label: "Stressed",
      description: "My mind feels overloaded",
      icon: FaBrain,
    },
    {
      id: "anxious",
      label: "Anxious",
      description: "I feel restless or worried",
      icon: FaWind,
    },
    {
      id: "tired",
      label: "Tired",
      description: "I need to slow down",
      icon: FaMoon,
    },
    {
      id: "low-energy",
      label: "Low Energy",
      description: "I need a gentle boost",
      icon: FaBolt,
    },
    {
      id: "sore",
      label: "Sore",
      description: "My body needs some relief",
      icon: FaPersonWalking,
    },
    {
      id: "calm",
      label: "Calm",
      description: "I feel balanced today",
      icon: FaFaceSmile,
    },
  ];

  const handleCheckIn = () => {
    if (!selectedMood && !message.trim()) return;

    console.log("Selected mood:", selectedMood);
    console.log("User message:", message);

    // OpenAI API will be connected through Django here.
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-amber-50 px-6 py-10 sm:px-10 lg:px-14">

          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-100/50 blur-3xl" />

          <div className="relative max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
              <FaHeart className="text-emerald-500" />
              AI Wellness
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Let FlowState understand
              <span className="block text-emerald-600">
                what you need today.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Tell us how you feel right now. FlowState will use your
              wellness information and activity history to help guide you
              toward a session that fits your moment.
            </p>

          </div>
        </section>

        {/* MOOD CHECK-IN */}
        <section className="mx-auto mt-10 max-w-5xl">

          <div className="text-center">

            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Step 01
            </span>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              How are you feeling right now?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Choose the feeling that best describes your current state.
              There is no right or wrong answer.
            </p>

          </div>

          {/* MOOD CARDS */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">

            {moods.map((mood) => {

              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;

              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`group rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-100"
                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                  }`}
                >

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                    }`}
                  >
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    {mood.label}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {mood.description}
                  </p>

                </button>
              );
            })}

          </div>

          {/* OR TEXT INPUT */}
          <div className="my-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-sm font-medium text-slate-400">
              OR TELL FLOWSTATE
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* AI CHAT INPUT */}
          <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaRobot />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-900">
                  Tell FlowState how you're feeling
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  You can describe anything about your current mood,
                  energy, stress, sleep, body or routine.
                </p>

              </div>

            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Example: I've been studying for hours and my mind feels tired. I also have some neck stiffness..."
              rows={4}
              className="mt-5 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />

            <div className="mt-4 flex justify-end">

              <button
                type="button"
                disabled={!selectedMood && !message.trim()}
                onClick={handleCheckIn}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  selectedMood || message.trim()
                    ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                <FaPaperPlane />
                Ask FlowState AI
              </button>

            </div>

          </div>

        </section>

        {/* AI RESPONSE */}
        <section className="mx-auto mt-14 max-w-5xl">

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <FaBrain className="text-2xl" />
              </div>

              <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                FlowState AI
              </span>

              {aiResponse ? (
                <>
                  <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                    Here's what I recommend
                  </h2>

                  <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-600">
                    {aiResponse}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                    Your AI response will appear here
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    Tell FlowState how you're feeling and our AI will
                    help you find a suitable next step.
                  </p>
                </>
              )}

            </div>

          </div>

        </section>

        {/* INFORMATION CARDS */}
        <section className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <FaBrain className="text-xl text-emerald-600" />

            <h3 className="mt-3 font-semibold text-slate-900">
              Personalized
            </h3>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Recommendations will consider your individual wellness journey.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <FaHeart className="text-xl text-emerald-600" />

            <h3 className="mt-3 font-semibold text-slate-900">
              Mind + Body
            </h3>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              FlowState connects mental wellness with physical recovery.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <FaLeaf className="text-xl text-emerald-600" />

            <h3 className="mt-3 font-semibold text-slate-900">
              One Clear Action
            </h3>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              The goal is to reduce choice overload and make the next step
              simple.
            </p>

          </div>

        </section>

      </main>
    </div>
  );
};

export default AIWellness;