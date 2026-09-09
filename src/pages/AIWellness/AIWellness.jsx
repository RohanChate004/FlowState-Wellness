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
} from "react-icons/fa6";

const AIWellness = () => {
  const [selectedMood, setSelectedMood] = useState(null);

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
    if (!selectedMood) return;

    console.log("Selected mood:", selectedMood);

    // AI recommendation API will be connected here later.
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-amber-50 px-6 py-10 sm:px-10 lg:px-14">
          
          {/* Decorative elements */}
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

        {/* Mood Check-in */}
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

          {/* Mood Cards */}
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

          {/* Check-in Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              disabled={!selectedMood}
              onClick={handleCheckIn}
              className={`inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all ${
                selectedMood
                  ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700 hover:shadow-lg"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              }`}
            >
              <FaLeaf />
              Get My Recommendation
            </button>
          </div>
        </section>

        {/* Recommendation Placeholder */}
        <section className="mx-auto mt-14 max-w-5xl">
          <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <FaBrain className="text-2xl" />
              </div>

              <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Your personalized wellness session
              </span>

              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                Your recommendation will appear here
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Once the AI Wellness backend is connected, FlowState will
                analyze your mood, recent activity, and wellness history to
                select one suitable session for you.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
                  Mood
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
                  Recent Activity
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
                  Wellness History
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Information */}
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