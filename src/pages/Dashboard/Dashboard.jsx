import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wellness, setWellness] = useState(null);
  const [meditationStats, setMeditationStats] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/me/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch user information.");
        }

        const data = await response.json();
        setUser(data);

        const wellnessResponse = await fetch(
          "http://127.0.0.1:8000/api/wellness/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!wellnessResponse.ok) {
          throw new Error("Unable to fetch wellness information.");
        }

        const wellnessData = await wellnessResponse.json();

        setWellness(wellnessData);

        const meditationResponse = await fetch(
          "http://127.0.0.1:8000/api/meditation/stats/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!meditationResponse.ok) {
          throw new Error("Unable to fetch meditation statistics.");
        }

        const meditationData = await meditationResponse.json();

        setMeditationStats(meditationData);

      } catch (error) {
        console.error("Dashboard user error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
            🌿
          </div>

          <p className="text-sm font-medium text-gray-500">
            Preparing your wellness space...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Welcome Hero */}
          <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-br from-green-700 via-green-600 to-emerald-500 p-6 text-white shadow-lg sm:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
                  🌿 Your wellness space
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Welcome, {user?.name || "User"} 👋
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-green-50 sm:text-base">
                  Take a moment for yourself today. Small steps toward
                  better wellness can create meaningful change over time.
                </p>

                <p className="mt-4 text-sm text-green-100">
                  {user?.email}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">

                <div className="hidden h-32 w-32 items-center justify-center rounded-full bg-white/10 text-6xl backdrop-blur-sm md:flex">
                  🌱
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Log out
                </button>

              </div>

            </div>
          </section>


          {/* Daily Wellness Overview */}
          <section className="mb-8">

            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Daily Wellness Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                A quick look at today's wellness activity.
              </p>
            </div>


            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Sessions */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                    🧘
                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    TODAY
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Sessions
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {wellness?.sessions ?? 0}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Sessions completed
                </p>
              </div>


              {/* Sleep */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                    😴
                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    REST
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Sleep
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {wellness?.sleep_hours ?? 0}{" "} <span className="text-base font-medium">hrs</span>
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Last night's sleep
                </p>
              </div>


              {/* Water */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-xl">
                    💧
                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    HYDRATION
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Water
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {wellness?.water_cups ?? 0}{" "} <span className="text-base font-medium">cups</span>
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Today's hydration
                </p>
              </div>


              {/* Streak */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
                    🔥
                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    CONSISTENCY
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Streak
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {wellness?.streak_days ?? 0}{" "} <span className="text-base font-medium">days</span>
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Keep your momentum going
                </p>
              </div>

            </div>
          </section>


          {/* Wellness Score */}
          <section className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              <div className="max-w-xl">

                <div className="mb-3 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  WELLNESS INSIGHT
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Your Wellness Score
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Your score will eventually combine your daily wellness
                  activities into one simple picture of your progress.
                </p>

                <p className="mt-4 text-sm font-medium text-green-600">
                  🌱 Keep building small, healthy habits.
                </p>

              </div>


              <div className="flex items-center gap-5">

                <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-green-100 bg-green-50">

                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      0
                    </p>

                    <p className="text-xs font-medium text-gray-400">
                      / 100
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* Daily Routine */}
          <section className="mb-8">

            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Today's Routine
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                A gentle starting point for your day.
              </p>
            </div>


            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

              {/* Morning Yoga */}
              <div className="flex flex-col gap-4 p-5 transition hover:bg-green-50/40 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-xl">
                    🧘
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Morning Yoga
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Start your day with gentle movement.
                    </p>
                  </div>

                </div>

                <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  10 min
                </span>

              </div>


              {/* Meditation */}
              <div className="flex flex-col gap-4 border-t border-gray-100 p-5 transition hover:bg-blue-50/40 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                    🧠
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Meditation
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Take a quiet moment to reset your mind.
                    </p>
                  </div>

                </div>

                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  5 min
                </span>

              </div>


              {/* Breathing */}
              <div className="flex flex-col gap-4 border-t border-gray-100 p-5 transition hover:bg-purple-50/40 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-xl">
                    🌬️
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Breathing Exercise
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Slow down and focus on your breathing.
                    </p>
                  </div>

                </div>

                <span className="w-fit rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  5 min
                </span>

              </div>

            </div>

          </section>

          {/* MEDITATION PROGRESS */}
          <section className="mb-8 overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
            <div className="border-b border-green-100 bg-green-50/50 px-6 py-5 sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide text-green-700 shadow-sm">
                    MEDITATION PROGRESS
                  </span>

                  <h2 className="mt-3 text-2xl font-bold text-gray-800">
                    Your Meditation Journey
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    A simple look at the calm moments you&apos;ve completed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/meditation")}
                  className="inline-flex items-center justify-center rounded-full bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
                >
                  Start Meditation →
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">

              {/* Total Sessions */}
              <div className="rounded-2xl border border-green-100 bg-green-50/40 p-5">
                <p className="text-sm font-medium text-gray-500">
                  Total Sessions
                </p>

                <p className="mt-2 text-3xl font-bold text-green-700">
                  {meditationStats?.total_sessions ?? 0}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Completed meditation sessions
                </p>
              </div>

              {/* Total Minutes */}
              <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
                <p className="text-sm font-medium text-gray-500">
                  Total Minutes
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-700">
                  {meditationStats?.total_minutes ?? 0}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Time spent in meditation
                </p>
              </div>

              {/* Last Session */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <p className="text-sm font-medium text-gray-500">
                  Last Session
                </p>

                {meditationStats?.last_session ? (
                  <>
                    <p className="mt-2 text-lg font-bold text-gray-800">
                      {meditationStats.last_session.session_type_display}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {meditationStats.last_session.duration_minutes} minutes
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-lg font-bold text-gray-800">
                      No session yet
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Start your first meditation
                    </p>
                  </>
                )}
              </div>

            </div>
          </section>


          {/* Main Feature Cards */}
          <section>

            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Explore Your Wellness
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your wellness journey, all in one place.
              </p>
            </div>


            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {/* Yoga */}
              <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-xl transition group-hover:scale-105">
                    🧘
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                    Coming Soon
                  </span>

                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Yoga
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Explore yoga activities designed to support movement,
                  flexibility, and physical recovery.
                </p>

                <div className="mt-5 flex items-center text-sm font-semibold text-green-600">
                  Explore Yoga
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>


              {/* Meditation */}
              <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl transition group-hover:scale-105">
                    🧠
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                    Coming Soon
                  </span>

                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Meditation
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create moments of calm with guided meditation and
                  breathing practices.
                </p>

                <div className="mt-5 flex items-center text-sm font-semibold text-blue-600">
                  Explore Meditation
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>


              {/* Progress */}
              <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl transition group-hover:scale-105">
                    📈
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                    Coming Soon
                  </span>

                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Progress
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Track your wellness habits, consistency, and long-term
                  progress.
                </p>

                <div className="mt-5 flex items-center text-sm font-semibold text-orange-600">
                  View Progress
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>


              {/* Wellness */}
              <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl transition group-hover:scale-105">
                    🌱
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                    Coming Soon
                  </span>

                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Wellness
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Build a balanced daily routine for your mental and
                  physical well-being.
                </p>

                <div className="mt-5 flex items-center text-sm font-semibold text-emerald-600">
                  Explore Wellness
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>

            </div>

          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;