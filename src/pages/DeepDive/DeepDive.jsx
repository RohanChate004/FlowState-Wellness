import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const categories = [
  {
    id: "mobility",
    icon: "🤸",
    title: "Mobility",
    description: "Improve movement, range, and body awareness.",
  },
  {
    id: "strength",
    icon: "💪",
    title: "Strength",
    description: "Build stability and strength through yoga.",
  },
  {
    id: "flexibility",
    icon: "🌿",
    title: "Flexibility",
    description: "Slow down and explore deeper stretches.",
  },
  {
    id: "recovery",
    icon: "🧘",
    title: "Recovery",
    description: "Gentle movement to help your body recover.",
  },
  {
    id: "breathwork",
    icon: "🌬️",
    title: "Breathwork",
    description: "Reconnect with your breath and calm your mind.",
  },
];

const sessions = [
  {
    id: 1,
    title: "Full Body Mobility",
    category: "Mobility",
    duration: "30 min",
    difficulty: "Beginner",
    description:
      "A slower full-body practice focused on mobility and comfortable movement.",
  },
  {
    id: 2,
    title: "Strength & Stability Flow",
    category: "Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    description:
      "Build strength, balance, and stability through a connected yoga flow.",
  },
  {
    id: 3,
    title: "Deep Flexibility Practice",
    category: "Flexibility",
    duration: "60 min",
    difficulty: "Intermediate",
    description:
      "Take your time exploring longer stretches and mindful flexibility work.",
  },
  {
    id: 4,
    title: "Gentle Recovery Flow",
    category: "Recovery",
    duration: "30 min",
    difficulty: "Beginner",
    description:
      "A gentle practice focused on slowing down, releasing tension, and recovery.",
  },
  {
    id: 5,
    title: "Calm Breath Practice",
    category: "Breathwork",
    duration: "20 min",
    difficulty: "Beginner",
    description:
      "A mindful breathing practice to help you slow down and reconnect.",
  },
];

function DeepDive() {
  const { focus } = useParams();

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const filteredSessions =
    selectedCategory === "all"
      ? sessions
      : sessions.filter(
          (session) =>
            session.category.toLowerCase() ===
            selectedCategory
        );

  const focusTitles = {
    "stress-calm": "Stress & Calm",
    "back-body-relief": "Back & Body Relief",
    "energy-focus": "Energy & Focus",
    "better-sleep": "Better Sleep",
  };

  const selectedFocusTitle =
    focusTitles[focus] || "Deep Dive";

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      <Navbar />

      {/* HERO */}

      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">

            <div>
              <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                🌿 FlowState Deep Dive
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {selectedFocusTitle}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                Explore focused yoga practices designed to give
                more time, attention, and intention to your
                current wellness goal.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "20+ min",
                  "Guided practice",
                  "Move at your pace",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full rounded-3xl bg-green-50 p-6">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  🧘
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-green-700">
                  Your Focus
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  More time. More intention.
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Choose a practice that supports what matters
                  to you right now.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Choose Your Practice
            </span>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              What do you want to explore?
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {categories.map((category) => {
              const isSelected =
                selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      isSelected ? "all" : category.id
                    )
                  }
                  className={`rounded-3xl border p-5 text-left transition ${
                    isSelected
                      ? "border-green-400 bg-green-50 shadow-md"
                      : "border-gray-100 bg-white hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                  }`}
                >
                  <span className="text-3xl">
                    {category.icon}
                  </span>

                  <h3 className="mt-4 font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {category.description}
                  </p>

                  <p className="mt-4 text-xs font-semibold text-green-700">
                    {isSelected
                      ? "Selected ✓"
                      : "Explore →"}
                  </p>
                </button>
              );
            })}

          </div>
        </div>
      </section>

      {/* SESSIONS */}

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Guided Sessions
              </span>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Choose your practice.
              </h2>
            </div>

            {selectedCategory !== "all" && (
              <button
                onClick={() =>
                  setSelectedCategory("all")
                }
                className="text-sm font-semibold text-green-700"
              >
                Show all sessions →
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    {session.category}
                  </span>

                  <span className="text-xs text-gray-400">
                    {session.duration}
                  </span>

                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {session.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {session.description}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="rounded-full bg-gray-50 px-3 py-1.5 text-xs text-gray-500">
                    {session.difficulty}
                  </span>

                  <Link
                    to={`/deep-dive/session/${session.id}`}
                    className="rounded-full bg-green-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-800"
                  >
                    Explore →
                  </Link>

                </div>
              </div>
            ))}

          </div>

          {filteredSessions.length === 0 && (
            <div className="mt-6 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
              <div className="text-3xl">🌿</div>

              <h3 className="mt-3 font-bold">
                More sessions coming soon.
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try another practice focus.
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default DeepDive;