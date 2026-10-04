import API_BASE_URL from "../../services/api";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [wellness, setWellness] = useState(null);
  const [meditationStats, setMeditationStats] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [sleepHours, setSleepHours] = useState("");
  const [waterCups, setWaterCups] = useState("");

  const [savingWellness, setSavingWellness] = useState(false);
  const [wellnessMessage, setWellnessMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // AUTH
  // ============================================================

  const accessToken = localStorage.getItem("accessToken");

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };

  // ============================================================
  // FETCH DASHBOARD DATA
  // ============================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        setLoading(true);
        setError("");

        const [
          userResponse,
          wellnessResponse,
          meditationResponse,
          historyResponse,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/api/me/`, {
            headers,
          }),

          fetch(`${API_BASE_URL}/api/wellness/`, {
            headers,
          }),

          fetch(`${API_BASE_URL}/api/meditation/stats/`, {
            headers,
          }),

          fetch(`${API_BASE_URL}/api/activity-history/`, {
            headers,
          }),
        ]);

        // --------------------------------------------------------
        // USER
        // --------------------------------------------------------

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }

        // --------------------------------------------------------
        // WELLNESS
        // --------------------------------------------------------

        if (wellnessResponse.ok) {
          const wellnessData =
            await wellnessResponse.json();

          setWellness(wellnessData);

          setSleepHours(
            wellnessData.sleep_hours ?? ""
          );

          setWaterCups(
            wellnessData.water_cups ?? ""
          );
        }
        
        // --------------------------------------------------------
        // MEDITATION
        // --------------------------------------------------------

        if (meditationResponse.ok) {
          const meditationData =
            await meditationResponse.json();

          setMeditationStats(meditationData);
        }

        // --------------------------------------------------------
        // ACTIVITY HISTORY
        // --------------------------------------------------------

        if (historyResponse.ok) {
          const historyData =
            await historyResponse.json();

          setActivityHistory(
            Array.isArray(historyData)
              ? historyData
              : historyData.history || []
          );
        }
      } catch (err) {
        console.error(
          "Dashboard error:",
          err
        );

        setError(
          "Unable to load your dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // ============================================================
  // SAVE WELLNESS
  // ============================================================

  const handleSaveWellness = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSavingWellness(true);
      setWellnessMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/wellness/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sleep_hours: Number(sleepHours) || 0,
            water_cups: Number(waterCups) || 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to save wellness data."
        );
      }

      setWellness(data);
      setSleepHours(data.sleep_hours ?? "");
      setWaterCups(data.water_cups ?? "");
      setWellnessMessage("Wellness updated successfully.");

      const historyResponse = await fetch(
        `${API_BASE_URL}/api/activity-history/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();

        setActivityHistory(
          Array.isArray(historyData)
            ? historyData
            : historyData.history || []
        );
      }
    } catch (err) {
      console.error("Wellness update error:", err);
      setWellnessMessage(
        err.message || "Unable to save wellness data."
      );
    } finally {
      setSavingWellness(false);
    }
  };

  // ============================================================
  // HISTORY MAP
  // ============================================================

  const historyMap = useMemo(() => {
    const map = {};

    activityHistory.forEach((item) => {
      map[item.date] = item;
    });

    return map;
  }, [activityHistory]);

  // ============================================================
  // ACTIVITY TOTAL
  // ============================================================

  const getActivityTotal = (activity) => {
    if (!activity) {
      return 0;
    }

    return Number(
      activity.total_activities || 0
    );
  };

  // ============================================================
  // ACTIVITY LEVEL
  // ============================================================

  const getActivityLevel = (activity) => {
    const total = getActivityTotal(activity);

    if (total === 0) {
      return 0;
    }

    if (total === 1) {
      return 1;
    }

    if (total <= 3) {
      return 2;
    }

    return 3;
  };

  // ============================================================
  // ACTIVITY STYLE
  // ============================================================

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

  // ============================================================
  // DATE HELPERS
  // ============================================================

  const createDateKey = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getRelativeDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const selectedDate = new Date(
      `${dateString}T00:00:00`
    );

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const difference = Math.floor(
      (today - selectedDate) /
      (1000 * 60 * 60 * 24)
    );

    if (difference === 0) {
      return "Today";
    }

    if (difference === 1) {
      return "Yesterday";
    }

    if (
      difference > 1 &&
      difference < 7
    ) {
      return `${difference} days ago`;
    }

    return formatDate(dateString);
  };

  // ============================================================
  // ACTIVITY CALENDAR
  // ============================================================

  const activityCalendar = useMemo(() => {
    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    /*
     * Start from Sunday.
     * 12 weeks = 84 days.
     */

    const startDate = new Date(today);

    startDate.setDate(
      today.getDate() -
      today.getDay() -
      77
    );

    const weeks = [];

    for (
      let week = 0;
      week < 12;
      week++
    ) {
      const currentWeek = [];

      for (
        let day = 0;
        day < 7;
        day++
      ) {
        const currentDate =
          new Date(startDate);

        currentDate.setDate(
          startDate.getDate() +
          week * 7 +
          day
        );

        const dateKey =
          createDateKey(
            currentDate
          );

        currentWeek.push({
          date: dateKey,
          activity:
            historyMap[dateKey] ||
            null,
          isFuture:
            currentDate > today,
        });
      }

      weeks.push(currentWeek);
    }

    return weeks;
  }, [historyMap]);

  // ============================================================
  // MONTH LABELS
  // ============================================================

  const monthLabels = useMemo(() => {
    const labels = [];

    activityCalendar.forEach(
      (week, index) => {
        const firstDay =
          week[0]?.date;

        if (!firstDay) {
          return;
        }

        const date = new Date(
          `${firstDay}T00:00:00`
        );

        const month =
          date.toLocaleDateString(
            "en-IN",
            {
              month: "short",
            }
          );

        /*
         * Only show a month label when
         * the month changes.
         */

        if (
          index === 0 ||
          new Date(
            `${activityCalendar[index - 1][0].date}T00:00:00`
          ).getMonth() !== date.getMonth()
        ) {
          labels.push({
            index,
            label: month,
          });
        }
      }
    );

    return labels;
  }, [activityCalendar]);

  // ============================================================
  // ACTIVITY STATS
  // ============================================================

  const activeDays = activityHistory.filter(
    (item) =>
      getActivityTotal(item) > 0
  ).length;

  const totalActivities =
    activityHistory.reduce(
      (total, item) =>
        total +
        getActivityTotal(item),
      0
    );

  const totalYogaSessions =
    activityHistory.reduce(
      (total, item) =>
        total +
        Number(
          item.yoga_sessions || 0
        ),
      0
    );

  const totalMeditationSessions =
    activityHistory.reduce(
      (total, item) =>
        total +
        Number(
          item.meditation_sessions ||
          0
        ),
      0
    );

  // ============================================================
  // RECENT ACTIVITY
  // ============================================================

  const recentActivities = useMemo(() => {
    return [...activityHistory]
      .filter(
        (item) =>
          getActivityTotal(item) > 0
      )
      .sort(
        (a, b) =>
          new Date(
            `${b.date}T00:00:00`
          ) -
          new Date(
            `${a.date}T00:00:00`
          )
      )
      .slice(0, 5);
  }, [activityHistory]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8f5]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
              🌿
            </div>

            <p className="mt-4 text-sm font-medium text-gray-600">
              Loading your FlowState...
            </p>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ============================================================
  // MAIN DASHBOARD
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-gray-900">

      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-10">

        <div className="mx-auto max-w-7xl">

          {/* ==================================================
              HEADER
          =================================================== */}

          <section className="mb-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
                  Your FlowState
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Welcome back
                  {user?.name
                    ? `, ${user.name}`
                    : ""}
                  .
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Keep moving, breathing, and
                  checking in with yourself.
                  Your progress lives here.
                </p>

              </div>

              <button
                onClick={handleLogout}
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Logout
              </button>

            </div>

          </section>

          {/* ==================================================
              ERROR
          =================================================== */}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ==================================================
              QUICK STATS
          =================================================== */}

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Total Activities */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Total Activity
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {totalActivities}
                  </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-xl">
                  🌱
                </div>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                Saved wellness activities
              </p>

            </div>

            {/* Active Days */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Active Days
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {activeDays}
                  </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-xl">
                  📅
                </div>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                Days with recorded activity
              </p>

            </div>

            {/* Yoga */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Yoga
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {totalYogaSessions}
                  </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-xl">
                  🧘
                </div>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                Completed yoga practices
              </p>

            </div>

            {/* Meditation */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Meditation
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {totalMeditationSessions}
                  </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-xl">
                  🧘‍♂️
                </div>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                Completed meditation sessions
              </p>

            </div>

          </section>

          {/* ==================================================
              ACTIVITY HISTORY
          =================================================== */}

          <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-7">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Activity History
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Your wellness journey
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Every practice you complete becomes part
                  of your personal history.
                </p>

              </div>

              <div className="text-xs text-gray-400">
                Last 12 weeks
              </div>

            </div>

            {/* Calendar */}

            <div className="mt-7 overflow-x-auto pb-2">

              <div className="min-w-180">

                {/* Month labels */}

                <div className="ml-8 flex h-6">

                  {monthLabels.map(
                    (item) => (
                      <div
                        key={`${item.label}-${item.index}`}
                        className="text-[10px] font-medium text-gray-400"
                        style={{
                          width: `${100 / 12}%`,
                          paddingLeft:
                            item.index === 0
                              ? 0
                              : 4,
                        }}
                      >
                        {item.label}
                      </div>
                    )
                  )}

                </div>

                <div className="flex">

                  {/* Weekday labels */}

                  <div className="mr-2 grid w-6 grid-rows-7 gap-1.5 text-[9px] text-gray-400">

                    <span></span>

                    <span>Mon</span>

                    <span></span>

                    <span>Wed</span>

                    <span></span>

                    <span>Fri</span>

                    <span></span>

                  </div>

                  {/* Activity columns */}

                  <div className="flex gap-1.5">

                    {activityCalendar.map(
                      (week, weekIndex) => (
                        <div
                          key={weekIndex}
                          className="grid grid-rows-7 gap-1.5"
                        >

                          {week.map(
                            (day) => {
                              const level =
                                getActivityLevel(
                                  day.activity
                                );

                              const total =
                                getActivityTotal(
                                  day.activity
                                );

                              return (
                                <button
                                  key={day.date}
                                  type="button"
                                  disabled={
                                    day.isFuture
                                  }
                                  title={
                                    day.isFuture
                                      ? `${formatDate(
                                        day.date
                                      )} — Future`
                                      : `${formatDate(
                                        day.date
                                      )} — ${total} ${total ===
                                        1
                                        ? "activity"
                                        : "activities"
                                      }`
                                  }
                                  onClick={() =>
                                    !day.isFuture &&
                                    setSelectedDay(
                                      day.date
                                    )
                                  }
                                  className={`h-3.5 w-3.5 rounded-[3px] border transition ${day.isFuture
                                      ? "cursor-default border-gray-100 bg-gray-50"
                                      : getActivityClasses(
                                        level
                                      )
                                    } ${selectedDay ===
                                      day.date
                                      ? "ring-2 ring-green-700 ring-offset-1"
                                      : ""
                                    }`}
                                />
                              );
                            }
                          )}

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* Legend */}

                <div className="mt-5 flex items-center justify-end gap-2 text-[10px] text-gray-400">

                  <span>Less</span>

                  <span className="h-3.5 w-3.5 rounded-[3px] border border-gray-200 bg-gray-100"></span>

                  <span className="h-3.5 w-3.5 rounded-[3px] border border-green-200 bg-green-100"></span>

                  <span className="h-3.5 w-3.5 rounded-[3px] border border-green-300 bg-green-300"></span>

                  <span className="h-3.5 w-3.5 rounded-[3px] border border-green-600 bg-green-600"></span>

                  <span>More</span>

                </div>

              </div>

            </div>

            {/* =================================================
                SELECTED DAY
            ================================================== */}

            {selectedDay && (
              <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      {getRelativeDate(
                        selectedDay
                      )}
                    </p>

                    <h3 className="mt-1 text-lg font-bold">
                      {formatDate(
                        selectedDay
                      )}
                    </h3>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedDay(null)
                    }
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                  >
                    Close
                  </button>

                </div>

                {historyMap[
                  selectedDay
                ] ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">

                    <div className="rounded-2xl bg-white p-4">

                      <p className="text-xs text-gray-400">
                        Yoga
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {
                          historyMap[
                            selectedDay
                          ].yoga_sessions || 0
                        }
                      </p>

                      <p className="text-[11px] text-gray-500">
                        practices
                      </p>

                    </div>

                    <div className="rounded-2xl bg-white p-4">

                      <p className="text-xs text-gray-400">
                        Meditation
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {
                          historyMap[
                            selectedDay
                          ].meditation_sessions ||
                          0
                        }
                      </p>

                      <p className="text-[11px] text-gray-500">
                        sessions
                      </p>

                    </div>

                    <div className="rounded-2xl bg-white p-4">

                      <p className="text-xs text-gray-400">
                        Total Activity
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {
                          historyMap[
                            selectedDay
                          ].total_activities ||
                          0
                        }
                      </p>

                      <p className="text-[11px] text-gray-500">
                        activities
                      </p>

                    </div>

                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-500">
                    No activity recorded on this day.
                  </p>
                )}

              </div>
            )}

          </section>

          {/* ==================================================
              WELLNESS SNAPSHOT
          =================================================== */}

          <section className="mt-6 grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:col-span-2">

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Today
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Your wellness snapshot
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Record today's sleep and water. FlowState
                  calculates your activity and streak automatically.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-indigo-50 p-5">
                  <div className="mb-4 text-2xl">😴</div>

                  <label
                    htmlFor="sleep-hours"
                    className="text-sm font-semibold text-indigo-700"
                  >
                    Sleep
                  </label>

                  <div className="mt-3 flex items-center gap-3">
                    <input
                      id="sleep-hours"
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={sleepHours}
                      onChange={(e) => setSleepHours(e.target.value)}
                      className="w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-lg font-bold outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="0"
                    />

                    <span className="text-sm font-medium text-gray-500">
                      hrs
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-cyan-50 p-5">
                  <div className="mb-4 text-2xl">💧</div>

                  <label
                    htmlFor="water-cups"
                    className="text-sm font-semibold text-cyan-700"
                  >
                    Water
                  </label>

                  <div className="mt-3 flex items-center gap-3">
                    <input
                      id="water-cups"
                      type="number"
                      min="0"
                      max="50"
                      step="1"
                      value={waterCups}
                      onChange={(e) => setWaterCups(e.target.value)}
                      className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-lg font-bold outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
                      placeholder="0"
                    />

                    <span className="text-sm font-medium text-gray-500">
                      cups
                    </span>
                  </div>
                </div>

              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-orange-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-orange-700">
                        Streak
                      </p>

                      <p className="mt-1 text-2xl font-bold text-gray-900">
                        {wellness?.streak_days ?? 0}
                        <span className="ml-1 text-sm font-medium text-gray-500">
                          days
                        </span>
                      </p>
                    </div>

                    <div className="text-2xl">🔥</div>
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Automatically calculated from completed practices.
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-700">
                        Today's activity
                      </p>

                      <p className="mt-1 text-2xl font-bold text-gray-900">
                        {wellness?.sessions ?? 0}
                        <span className="ml-1 text-sm font-medium text-gray-500">
                          sessions
                        </span>
                      </p>
                    </div>

                    <div className="text-2xl">🧘</div>
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Yoga + meditation completed today.
                  </p>
                </div>

              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-400">
                  Sleep and water are saved to your account.
                </p>

                <button
                  type="button"
                  onClick={handleSaveWellness}
                  disabled={savingWellness}
                  className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingWellness
                    ? "Saving..."
                    : "Save Today's Wellness"}
                </button>
              </div>

              {wellnessMessage && (
                <div
                  className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                    wellnessMessage.includes("successfully")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {wellnessMessage}
                </div>
              )}

            </div>

            <div className="rounded-3xl bg-gray-900 p-6 text-white shadow-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-green-300">
                Wellness Score
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Today's balance
              </h2>

              <div className="mt-8 flex items-center justify-center">
                <div
                  className="flex h-36 w-36 items-center justify-center rounded-full border-10 border-green-700"
                  style={{ borderTopColor: "rgb(74 222 128)" }}
                >
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

              <div className="mt-7">
                <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-green-400 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        Number(wellness?.wellness_score || 0),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-5 text-center text-sm leading-6 text-gray-400">
                Sleep, hydration, and completed practices
                contribute to today's score.
              </p>

            </div>

          </section>

          {/* ==================================================
              MEDITATION PROGRESS
          =================================================== */}

          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-7">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Meditation
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Your meditation journey
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/meditation")
                }
                className="text-sm font-semibold text-green-700 hover:text-green-800"
              >
                Practice meditation →
              </button>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-stone-50 p-5">

                <p className="text-xs text-gray-400">
                  Sessions
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {
                    meditationStats?.total_sessions ||
                    totalMeditationSessions ||
                    0
                  }
                </p>

              </div>

              <div className="rounded-2xl bg-stone-50 p-5">

                <p className="text-xs text-gray-400">
                  Total minutes
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {
                    meditationStats?.total_minutes ||
                    0
                  }
                </p>

              </div>

              <div className="rounded-2xl bg-stone-50 p-5">

                <p className="text-xs text-gray-400">
                  Last session
                </p>

                <p className="mt-2 text-sm font-bold">
                  {meditationStats?.last_session
                    ? formatDate(
                      meditationStats
                        .last_session
                        .completed_at
                        ?.split("T")[0]
                    )
                    : "No sessions yet"}
                </p>

              </div>

            </div>

          </section>

          {/* ==================================================
              RECENT ACTIVITY
          =================================================== */}

          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-7">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Recent Activity
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Your latest progress
              </h2>

            </div>

            {recentActivities.length ===
              0 ? (
              <div className="mt-6 rounded-2xl bg-stone-50 p-8 text-center">

                <div className="text-4xl">
                  🌱
                </div>

                <h3 className="mt-3 font-bold">
                  Your journey starts here
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Complete a yoga or meditation practice
                  and it will appear here.
                </p>

              </div>
            ) : (
              <div className="mt-5 divide-y divide-gray-100">

                {recentActivities.map(
                  (activity) => (
                    <button
                      key={activity.date}
                      type="button"
                      onClick={() =>
                        setSelectedDay(
                          activity.date
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 py-4 text-left transition hover:bg-stone-50"
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className={`h-3 w-3 rounded-full ${getActivityClasses(
                            getActivityLevel(
                              activity
                            )
                          )}`}
                        />

                        <div>

                          <p className="text-sm font-semibold">
                            {getRelativeDate(
                              activity.date
                            )}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {Number(
                              activity.yoga_sessions ||
                              0
                            )}{" "}
                            yoga ·{" "}
                            {Number(
                              activity.meditation_sessions ||
                              0
                            )}{" "}
                            meditation
                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p className="text-sm font-bold">
                          {getActivityTotal(
                            activity
                          )}
                        </p>

                        <p className="text-[10px] text-gray-400">
                          {getActivityTotal(
                            activity
                          ) === 1
                            ? "activity"
                            : "activities"}
                        </p>

                      </div>

                    </button>
                  )
                )}

              </div>
            )}

          </section>

          {/* ==================================================
              EXPLORE
          =================================================== */}

          <section className="mt-6 pb-8">

            <div className="mb-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Explore
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Continue your FlowState
              </h2>

            </div>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Yoga */}

              <button
                type="button"
                onClick={() =>
                  navigate("/yoga")
                }
                className="group rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-2xl">
                  🧘
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Yoga
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Move, stretch, recover, and find a practice
                  that matches how you feel.
                </p>

                <p className="mt-4 text-xs font-semibold text-green-700">
                  Explore Yoga →
                </p>

              </button>

              {/* Meditation */}

              <button
                type="button"
                onClick={() =>
                  navigate("/meditation")
                }
                className="group rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-2xl">
                  🌿
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Meditation
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Slow down, breathe, and create space for
                  mental clarity.
                </p>

                <p className="mt-4 text-xs font-semibold text-green-700">
                  Start Meditation →
                </p>

              </button>

              {/* Knowledge Hub */}

              <button
                type="button"
                onClick={() =>
                  navigate("/knowledge-hub")
                }
                className="group rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-2xl">
                  📚
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Knowledge Hub
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Learn about yoga foundations, practices,
                  philosophy, and wellness.
                </p>

                <p className="mt-4 text-xs font-semibold text-green-700">
                  Learn More →
                </p>

              </button>

            </div>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Dashboard;