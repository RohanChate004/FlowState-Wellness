import API_BASE_URL from "../../services/api";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [wellness, setWellness] = useState(null);
  const [meditationStats, setMeditationStats] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  /* --------------------------------------------------
     LOGOUT
  -------------------------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };

  /* --------------------------------------------------
     FETCH DASHBOARD DATA
  -------------------------------------------------- */

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const [
          userResponse,
          wellnessResponse,
          meditationResponse,
          historyResponse,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/api/me/`, {
            headers: authHeaders,
          }),

          fetch(`${API_BASE_URL}/api/wellness/`, {
            headers: authHeaders,
          }),

          fetch(`${API_BASE_URL}/api/meditation/stats/`, {
            headers: authHeaders,
          }),

          fetch(`${API_BASE_URL}/api/activity-history/`, {
            headers: authHeaders,
          }),
        ]);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }

        if (wellnessResponse.ok) {
          const wellnessData = await wellnessResponse.json();
          setWellness(wellnessData);
        }

        if (meditationResponse.ok) {
          const meditationData = await meditationResponse.json();
          setMeditationStats(meditationData);
        }

        if (historyResponse.ok) {
          const historyData = await historyResponse.json();

          /*
            Supports both:
            { history: [...] }
            and
            [...]
          */

          setActivityHistory(
            Array.isArray(historyData)
              ? historyData
              : historyData.history || []
          );
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* --------------------------------------------------
     ACTIVITY HELPERS
  -------------------------------------------------- */

  const getActivityLevel = (activity) => {
    if (!activity) return 0;

    const total =
      Number(activity.total_activities || 0) +
      Number(activity.sessions || 0) +
      Number(activity.meditation_sessions || 0);

    if (total === 0) return 0;
    if (total === 1) return 1;
    if (total <= 3) return 2;

    return 3;
  };

  const getActivityClasses = (level) => {
    switch (level) {
      case 1:
        return "bg-green-100 border-green-200";

      case 2:
        return "bg-green-300 border-green-300";

      case 3:
        return "bg-green-600 border-green-600";

      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRelativeDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const difference = Math.floor(
      (today - date) / (1000 * 60 * 60 * 24)
    );

    if (difference === 0) return "Today";
    if (difference === 1) return "Yesterday";

    return formatDate(dateString);
  };

  /* --------------------------------------------------
     LAST 12 WEEKS ACTIVITY
  -------------------------------------------------- */

  const activityCalendar = useMemo(() => {
    const historyMap = {};

    activityHistory.forEach((item) => {
      historyMap[item.date] = item;
    });

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    /*
      Start from Sunday 11 weeks ago.
      This gives us approximately 12 weeks.
    */

    const startDate = new Date(today);

    startDate.setDate(
      today.getDate() - today.getDay() - 77
    );

    const weeks = [];

    for (let week = 0; week < 12; week++) {
      const currentWeek = [];

      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);

        currentDate.setDate(
          startDate.getDate() + week * 7 + day
        );

        const year = currentDate.getFullYear();

        const month = String(
          currentDate.getMonth() + 1
        ).padStart(2, "0");

        const date = String(
          currentDate.getDate()
        ).padStart(2, "0");

        const dateKey = `${year}-${month}-${date}`;

        currentWeek.push({
          date: dateKey,
          activity: historyMap[dateKey] || null,
        });
      }

      weeks.push(currentWeek);
    }

    return weeks;
  }, [activityHistory]);

  /* --------------------------------------------------
     ACTIVITY TOTALS
  -------------------------------------------------- */

  const activeDays = activityHistory.filter(
    (item) =>
      Number(item.total_activities || 0) > 0 ||
      Number(item.sessions || 0) > 0 ||
      Number(item.meditation_sessions || 0) > 0
  ).length;

  const totalActivities = activityHistory.reduce(
    (total, item) =>
      total +
      Number(item.total_activities || 0),
    0
  );

  /* --------------------------------------------------
     LOADING
  -------------------------------------------------- */

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

  /* --------------------------------------------------
     DASHBOARD
  -------------------------------------------------- */

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f8f5]">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* ============================================
              HEADER
          ============================================ */}

          <section className="mb-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="mb-2 text-sm font-medium text-green-700">
                  YOUR FLOWSTATE
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Welcome back, {user?.name || "User"} 👋
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Keep taking small steps. Your progress is built one
                  mindful day at a time.
                </p>

              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-fit rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Log out
              </button>

            </div>

          </section>


          {/* ============================================
              QUICK STATS
          ============================================ */}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Today's Sessions */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                  🧘
                </div>

                <span className="text-[11px] font-semibold tracking-wider text-gray-400">
                  TODAY
                </span>

              </div>

              <p className="text-sm text-gray-500">
                Sessions
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {wellness?.sessions ?? 0}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Completed today
              </p>

            </div>


            {/* Meditation */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                  🧠
                </div>

                <span className="text-[11px] font-semibold tracking-wider text-gray-400">
                  MEDITATION
                </span>

              </div>

              <p className="text-sm text-gray-500">
                Total Sessions
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {meditationStats?.total_sessions ?? 0}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Lifetime sessions
              </p>

            </div>


            {/* Active Days */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-lg">
                  🔥
                </div>

                <span className="text-[11px] font-semibold tracking-wider text-gray-400">
                  CONSISTENCY
                </span>

              </div>

              <p className="text-sm text-gray-500">
                Active Days
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {activeDays}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Days with activity
              </p>

            </div>


            {/* Wellness Score */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  🌱
                </div>

                <span className="text-[11px] font-semibold tracking-wider text-gray-400">
                  SCORE
                </span>

              </div>

              <p className="text-sm text-gray-500">
                Wellness Score
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {wellness?.wellness_score ?? 0}
                <span className="ml-1 text-sm font-medium text-gray-400">
                  /100
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Today's wellness
              </p>

            </div>

          </section>


          {/* ============================================
              GITHUB STYLE ACTIVITY
          ============================================ */}

          <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-5 sm:p-7">

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-green-600"></span>

                  <p className="text-xs font-bold tracking-widest text-green-700">
                    ACTIVITY HISTORY
                  </p>

                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Your wellness journey
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Every square represents a day in your FlowState journey.
                </p>

              </div>

              <div className="text-sm text-gray-500">

                <span className="font-semibold text-gray-800">
                  {totalActivities}
                </span>{" "}
                activities recorded

              </div>

            </div>


            {/* Calendar */}

            <div className="overflow-x-auto pb-2">

              <div className="min-w-[720px]">

                {/* Month labels */}

                <div className="mb-2 ml-9 flex justify-between pr-1 text-[11px] font-medium text-gray-400">

                  <span>12 weeks ago</span>
                  <span>8 weeks ago</span>
                  <span>4 weeks ago</span>
                  <span>Today</span>

                </div>


                <div className="flex gap-2">

                  {/* Weekday labels */}

                  <div className="flex w-7 flex-col justify-between py-1 text-[10px] text-gray-400">

                    <span>Sun</span>
                    <span>Tue</span>
                    <span>Thu</span>
                    <span>Sat</span>

                  </div>


                  {/* Activity grid */}

                  <div className="flex flex-1 gap-1.5">

                    {activityCalendar.map((week, weekIndex) => (

                      <div
                        key={weekIndex}
                        className="flex flex-1 flex-col gap-1.5"
                      >

                        {week.map((day) => {

                          const level = getActivityLevel(
                            day.activity
                          );

                          return (
                            <div
                              key={day.date}
                              title={
                                day.activity
                                  ? `${formatDate(day.date)} • ${
                                      day.activity.total_activities ||
                                      0
                                    } activities`
                                  : `${formatDate(day.date)} • No activity`
                              }
                              className={`h-4 w-full min-w-[12px] rounded-[3px] border ${getActivityClasses(
                                level
                              )}`}
                            />
                          );

                        })}

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>


            {/* Legend */}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

              <div className="flex items-center gap-2 text-xs text-gray-400">

                <span>Less</span>

                <span className="h-3 w-3 rounded-[3px] border border-gray-200 bg-gray-100"></span>

                <span className="h-3 w-3 rounded-[3px] border border-green-200 bg-green-100"></span>

                <span className="h-3 w-3 rounded-[3px] bg-green-300"></span>

                <span className="h-3 w-3 rounded-[3px] bg-green-600"></span>

                <span>More</span>

              </div>

              <p className="text-xs text-gray-400">
                Activity is saved to your account
              </p>

            </div>

          </section>


          {/* ============================================
              TODAY'S WELLNESS
          ============================================ */}

          <section className="mb-8 grid gap-6 lg:grid-cols-3">

            {/* Wellness card */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 lg:col-span-2">

              <div className="mb-6">

                <p className="text-xs font-bold tracking-widest text-green-700">
                  TODAY
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Your wellness snapshot
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  A simple view of the habits you recorded today.
                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-3">

                {/* Sleep */}

                <div className="rounded-2xl bg-indigo-50 p-5">

                  <div className="mb-4 text-xl">
                    😴
                  </div>

                  <p className="text-sm font-medium text-indigo-700">
                    Sleep
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {wellness?.sleep_hours ?? 0}
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      hrs
                    </span>
                  </p>

                </div>


                {/* Water */}

                <div className="rounded-2xl bg-cyan-50 p-5">

                  <div className="mb-4 text-xl">
                    💧
                  </div>

                  <p className="text-sm font-medium text-cyan-700">
                    Water
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {wellness?.water_cups ?? 0}
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      cups
                    </span>
                  </p>

                </div>


                {/* Streak */}

                <div className="rounded-2xl bg-orange-50 p-5">

                  <div className="mb-4 text-xl">
                    🔥
                  </div>

                  <p className="text-sm font-medium text-orange-700">
                    Streak
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {wellness?.streak_days ?? 0}
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      days
                    </span>
                  </p>

                </div>

              </div>

            </div>


            {/* Score */}

            <div className="rounded-3xl border border-gray-200 bg-gray-900 p-6 text-white">

              <p className="text-xs font-bold tracking-widest text-green-300">
                WELLNESS SCORE
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Today's balance
              </h2>

              <div className="mt-8 flex items-center justify-center">

                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-green-700">

                  <div className="text-center">

                    <p className="text-4xl font-bold">
                      {wellness?.wellness_score ?? 0}
                    </p>

                    <p className="text-xs text-gray-400">
                      out of 100
                    </p>

                  </div>

                </div>

              </div>

              <p className="mt-6 text-center text-sm leading-6 text-gray-400">
                Your daily score can grow as you build consistent wellness
                habits.
              </p>

            </div>

          </section>


          {/* ============================================
              MEDITATION PROGRESS
          ============================================ */}

          <section className="mb-8 rounded-3xl border border-gray-200 bg-white overflow-hidden">

            <div className="border-b border-gray-100 px-6 py-6 sm:px-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-bold tracking-widest text-green-700">
                    MEDITATION
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    Your meditation journey
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    A record of the calm moments you've completed.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => navigate("/meditation")}
                  className="w-fit rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Start Meditation →
                </button>

              </div>

            </div>


            <div className="grid gap-px bg-gray-100 sm:grid-cols-3">

              <div className="bg-white p-6">

                <p className="text-sm text-gray-500">
                  Total sessions
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {meditationStats?.total_sessions ?? 0}
                </p>

              </div>


              <div className="bg-white p-6">

                <p className="text-sm text-gray-500">
                  Total minutes
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {meditationStats?.total_minutes ?? 0}
                </p>

              </div>


              <div className="bg-white p-6">

                <p className="text-sm text-gray-500">
                  Last session
                </p>

                {meditationStats?.last_session ? (
                  <>
                    <p className="mt-2 font-bold text-gray-900">
                      {meditationStats.last_session.session_type_display}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {
                        meditationStats.last_session
                          .duration_minutes
                      }{" "}
                      minutes
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 font-bold text-gray-900">
                      No session yet
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Start your first session
                    </p>
                  </>
                )}

              </div>

            </div>

          </section>


          {/* ============================================
              RECENT ACTIVITY
          ============================================ */}

          <section className="mb-8">

            <div className="mb-4">

              <p className="text-xs font-bold tracking-widest text-green-700">
                RECENT ACTIVITY
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Keep an eye on your journey
              </h2>

            </div>


            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">

              {activityHistory.length > 0 ? (

                activityHistory
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.date) -
                      new Date(a.date)
                  )
                  .slice(0, 6)
                  .map((activity) => (

                    <div
                      key={activity.date}
                      className="flex items-center justify-between border-b border-gray-100 p-5 last:border-b-0"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-lg">
                          {Number(
                            activity.meditation_sessions || 0
                          ) > 0
                            ? "🧠"
                            : Number(
                                activity.sessions || 0
                              ) > 0
                            ? "🧘"
                            : "🌱"}
                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">
                            {Number(
                              activity.meditation_sessions || 0
                            ) > 0
                              ? "Meditation completed"
                              : Number(
                                  activity.sessions || 0
                                ) > 0
                              ? "Wellness session completed"
                              : "Wellness activity recorded"}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {getRelativeDate(activity.date)}
                          </p>

                        </div>

                      </div>


                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        {activity.total_activities || 0}{" "}
                        activity
                        {Number(
                          activity.total_activities || 0
                        ) === 1
                          ? ""
                          : "ies"}
                      </span>

                    </div>

                  ))

              ) : (

                <div className="p-10 text-center">

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl">
                    🌱
                  </div>

                  <h3 className="font-semibold text-gray-800">
                    Your journey starts here
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Complete a yoga, meditation, or wellness activity
                    and your progress will appear here.
                  </p>

                </div>

              )}

            </div>

          </section>


          {/* ============================================
              EXPLORE
          ============================================ */}

          <section className="pb-4">

            <div className="mb-4">

              <p className="text-xs font-bold tracking-widest text-green-700">
                EXPLORE
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Continue your practice
              </h2>

            </div>


            <div className="grid gap-4 md:grid-cols-3">

              {/* Yoga */}

              <button
                type="button"
                onClick={() => navigate("/yoga")}
                className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-green-200 hover:shadow-md"
              >

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">
                  🧘
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Yoga
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Explore movement, recovery, cycle-aware practice,
                  and mindful yoga sessions.
                </p>

                <p className="mt-4 text-sm font-semibold text-green-700">
                  Explore Yoga →
                </p>

              </button>


              {/* Meditation */}

              <button
                type="button"
                onClick={() => navigate("/meditation")}
                className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-blue-200 hover:shadow-md"
              >

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  🧠
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Meditation
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create a quiet moment with guided meditation and
                  breathing practices.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-700">
                  Start Meditation →
                </p>

              </button>


              {/* Knowledge */}

              <button
                type="button"
                onClick={() => navigate("/knowledge-hub")}
                className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition hover:border-amber-200 hover:shadow-md"
              >

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-xl">
                  📚
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Knowledge Hub
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Learn about yoga foundations, practices, philosophy,
                  lifestyle, and wellness.
                </p>

                <p className="mt-4 text-sm font-semibold text-amber-700">
                  Learn More →
                </p>

              </button>

            </div>

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Dashboard;