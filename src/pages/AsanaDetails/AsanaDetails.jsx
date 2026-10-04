import API_BASE_URL from "../../services/api";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function AsanaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asana, setAsana] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [videoStarted, setVideoStarted] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);

  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");

  const [imageError, setImageError] = useState(false);

  const playerRef = useRef(null);

  // ============================================================
  // FETCH ASANA
  // ============================================================

  useEffect(() => {
    const fetchAsana = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/yoga/asanas/${id}/`
        );

        if (!response.ok) {
          throw new Error("Asana not found.");
        }

        const data = await response.json();
        setAsana(data);
      } catch (err) {
        console.error("Asana details error:", err);
        setError("Unable to load this asana.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsana();
  }, [id]);

  // ============================================================
  // YOUTUBE PLAYER
  // ============================================================

  useEffect(() => {
    if (!asana?.youtube_video_id) return;

    const loadYouTubeAPI = () => {
      return new Promise((resolve) => {
        if (window.YT?.Player) {
          resolve();
          return;
        }

        const existingScript = document.getElementById(
          "youtube-iframe-api"
        );

        if (existingScript) {
          const interval = setInterval(() => {
            if (window.YT?.Player) {
              clearInterval(interval);
              resolve();
            }
          }, 100);

          return;
        }

        const script = document.createElement("script");

        script.id = "youtube-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";

        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
          resolve();
        };
      });
    };

    let mounted = true;

    const createPlayer = async () => {
      await loadYouTubeAPI();

      if (!mounted || !window.YT?.Player) return;

      const playerElement = document.getElementById(
        "flowstate-youtube-player"
      );

      if (!playerElement) return;

      playerRef.current = new window.YT.Player(
        "flowstate-youtube-player",
        {
          videoId: asana.youtube_video_id,

          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },

          events: {
            onStateChange: (event) => {
              if (
                event.data ===
                window.YT.PlayerState.PLAYING
              ) {
                setVideoStarted(true);
              }

              if (
                event.data ===
                window.YT.PlayerState.ENDED
              ) {
                setVideoCompleted(true);

                setCompletionMessage(
                  "Practice complete. You can now save it."
                );
              }
            },
          },
        }
      );
    };

    createPlayer();

    return () => {
      mounted = false;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (err) {
          console.log("YouTube cleanup:", err);
        }

        playerRef.current = null;
      }
    };
  }, [asana?.youtube_video_id]);

  // ============================================================
  // DURATION
  // ============================================================

  const formatDuration = (seconds) => {
    if (!seconds) return "Flexible";

    if (seconds < 60) {
      return `${seconds} sec`;
    }

    return `${Math.floor(seconds / 60)} min`;
  };

  // ============================================================
  // START PRACTICE
  // ============================================================

  const handleStartPractice = () => {
    const section = document.getElementById(
      "guided-practice"
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // ============================================================
  // SAVE PRACTICE
  // ============================================================

  const handleCompletePractice = async () => {
    const accessToken = localStorage.getItem(
      "accessToken"
    );

    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (
      asana.youtube_video_id &&
      !videoCompleted
    ) {
      setCompletionMessage(
        "Please finish the guided video first."
      );

      const section = document.getElementById(
        "guided-practice"
      );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    try {
      setCompleting(true);
      setCompletionMessage("");

      const durationMinutes = Math.max(
        1,
        Math.ceil(
          Number(asana.duration_seconds || 60) / 60
        )
      );

      const response = await fetch(
        `${API_BASE_URL}/api/yoga/sessions/`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            asana: asana.id,
            duration_minutes: durationMinutes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to save your practice."
        );
      }

      setCompleted(true);

      setCompletionMessage(
        "Practice saved to your FlowState journey."
      );
    } catch (err) {
      console.error(
        "Complete practice error:",
        err
      );

      setCompletionMessage(
        err.message ||
          "Something went wrong while saving."
      );
    } finally {
      setCompleting(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />

        <div className="py-20 text-center">
          <p className="text-sm text-gray-500">
            Preparing your practice...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !asana) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />

        <div className="mx-auto max-w-3xl px-6 py-20 text-center">

          <div className="rounded-3xl bg-white p-10 shadow-sm">

            <div className="text-5xl">🧘</div>

            <h1 className="mt-4 text-2xl font-bold">
              Asana not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't find this yoga practice.
            </p>

            <Link
              to="/yoga"
              className="mt-6 inline-block rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white"
            >
              Back to Yoga
            </Link>

          </div>

        </div>
      </div>
    );
  }

  // ============================================================
  // IMAGE
  // ============================================================

  const youtubeThumbnail = asana.youtube_video_id
    ? `https://img.youtube.com/vi/${asana.youtube_video_id}/hqdefault.jpg`
    : null;

  const showImage =
    asana.image_url && !imageError;

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">

      <Navbar />

      <main className="px-4 py-7 sm:px-6">

        <div className="mx-auto max-w-5xl">

          {/* BACK */}

          <Link
            to="/yoga"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            ← Back to Yoga
          </Link>

          {/* ====================================================
              HERO
          ==================================================== */}

          <section className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

            <div className="grid lg:grid-cols-2">

              {/* IMAGE */}

              <div className="relative h-72 bg-green-50 sm:h-80 lg:h-full lg:min-h-[390px]">

                {showImage ? (
                  <img
                    src={asana.image_url}
                    alt={asana.name}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : youtubeThumbnail ? (
                  <img
                    src={youtubeThumbnail}
                    alt={`${asana.name} practice`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-7xl">🧘</span>
                  </div>
                )}

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
                  {asana.difficulty}
                </span>

              </div>

              {/* INFORMATION */}

              <div className="flex flex-col justify-center p-6 sm:p-8">

                <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                  {asana.sanskrit_name ||
                    "Yoga Practice"}
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                  {asana.name}
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {asana.short_description}
                </p>

                {/* INFO */}

                <div className="mt-5 grid grid-cols-2 gap-2">

                  <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-[11px] text-gray-500">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatDuration(
                        asana.duration_seconds
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-[11px] text-gray-500">
                      Focus
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {asana.focus_area ||
                        "General"}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleStartPractice}
                  className="mt-5 w-full rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 sm:w-fit"
                >
                  Start {asana.name} →
                </button>

              </div>

            </div>

          </section>

          {/* ====================================================
              BENEFITS
          ==================================================== */}

          <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

            <h2 className="text-lg font-bold">
              Benefits
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {asana.benefits}
            </p>

          </section>

          {/* ====================================================
              GUIDED PRACTICE
          ==================================================== */}

          <section
            id="guided-practice"
            className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100"
          >

            <div className="p-5 sm:p-6">

              <div className="flex items-center justify-between gap-3">

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-wider text-green-700">
                    Guided Practice
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Watch & Practice
                  </h2>

                </div>

                {videoCompleted && (
                  <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                    ✓ Completed
                  </span>
                )}

              </div>

              <p className="mt-2 text-sm text-gray-500">
                Follow the practice at your own pace.
              </p>

            </div>

            {asana.youtube_video_id ? (
              <div className="bg-stone-100 px-4 py-5">

                <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-black shadow-sm">

                  <div className="aspect-video">

                    <div
                      id="flowstate-youtube-player"
                      className="h-full w-full"
                    />

                  </div>

                </div>

                {asana.youtube_channel_name && (
                  <p className="mx-auto mt-3 max-w-2xl text-xs text-gray-500">
                    Guided by{" "}
                    <span className="font-medium">
                      {asana.youtube_channel_name}
                    </span>
                  </p>
                )}

              </div>
            ) : (
              <div className="bg-stone-50 px-6 py-12 text-center">

                <div className="text-4xl">🎥</div>

                <p className="mt-3 text-sm font-semibold">
                  Guided video coming soon
                </p>

              </div>
            )}

            {/* PROGRESS */}

            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 p-4">

              <div
                className={`rounded-xl p-3 text-center ${
                  videoStarted
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <p className="text-xs font-semibold">
                  {videoStarted ? "✓" : "1"}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Start
                </p>
              </div>

              <div
                className={`rounded-xl p-3 text-center ${
                  videoCompleted
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <p className="text-xs font-semibold">
                  {videoCompleted ? "✓" : "2"}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Complete
                </p>
              </div>

              <div
                className={`rounded-xl p-3 text-center ${
                  completed
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <p className="text-xs font-semibold">
                  {completed ? "✓" : "3"}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Save
                </p>
              </div>

            </div>

          </section>

          {/* ====================================================
              INSTRUCTIONS + MODIFICATIONS
          ==================================================== */}

          <section className="mt-4 grid gap-4 lg:grid-cols-2">

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

              <h2 className="text-lg font-bold">
                How to Practice
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
                {asana.instructions}
              </p>

            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

              <h2 className="text-lg font-bold">
                Modifications
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {asana.modifications ||
                  "Choose a comfortable variation according to your body."}
              </p>

            </div>

          </section>

          {/* ====================================================
              SAVE PRACTICE
          ==================================================== */}

          <section className="mt-4 rounded-3xl bg-green-700 p-5 text-white shadow-sm sm:p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-[11px] font-semibold uppercase tracking-wider text-green-100">
                  FlowState Journey
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {completed
                    ? "Practice Saved ✓"
                    : "Finished your practice?"}
                </h2>

                <p className="mt-1 text-xs leading-5 text-green-50">
                  {completed
                    ? "This practice has been added to your wellness history."
                    : videoCompleted
                    ? "Save this completed practice to your journey."
                    : "Finish the guided video to unlock saving."}
                </p>

              </div>

              {completed ? (
                <div className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-green-700">
                  ✓ Saved
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCompletePractice}
                  disabled={
                    completing ||
                    (asana.youtube_video_id &&
                      !videoCompleted)
                  }
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                    completing ||
                    (asana.youtube_video_id &&
                      !videoCompleted)
                      ? "cursor-not-allowed bg-white/40 text-white/70"
                      : "bg-white text-green-700 hover:bg-green-50"
                  }`}
                >
                  {completing
                    ? "Saving..."
                    : videoCompleted
                    ? "✓ Save Practice"
                    : "Complete Video First"}
                </button>
              )}

            </div>

            {completionMessage && (
              <p className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs text-green-50">
                {completionMessage}
              </p>
            )}

          </section>

          {/* ====================================================
              SAFETY
          ==================================================== */}

          <section className="mt-4 rounded-3xl border border-green-100 bg-green-50 p-5">

            <div className="flex gap-3">

              <span className="text-xl">
                🛡️
              </span>

              <div>

                <h2 className="text-sm font-bold">
                  Practice Safely
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  {asana.contraindications ||
                    "Practice within your comfort level and stop if something feels wrong."}
                </p>

              </div>

            </div>

          </section>

          {/* BOTTOM */}

          <div className="py-7">

            <Link
              to="/yoga"
              className="text-sm font-semibold text-green-700 hover:text-green-800"
            >
              ← Explore more asanas
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AsanaDetails;