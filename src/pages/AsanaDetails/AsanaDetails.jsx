import API_BASE_URL from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function AsanaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asana, setAsana] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Practice completion states
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");

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

  const formatDuration = (seconds) => {
    if (!seconds) return "Flexible";

    if (seconds < 60) {
      return `${seconds} sec`;
    }

    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  // ============================================================
  // MARK PRACTICE AS COMPLETE
  // ============================================================

  const handleCompletePractice = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      setCompleting(true);
      setCompletionMessage("");

      /*
       * Convert the asana duration from seconds to minutes.
       * Minimum value is 1 minute because the backend expects
       * a positive integer.
       */
      const durationMinutes = Math.max(
        1,
        Math.ceil(Number(asana.duration_seconds || 60) / 60)
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
        console.error("Yoga session error:", data);

        throw new Error(
          data.detail ||
            "Unable to save your practice."
        );
      }

      setCompleted(true);
      setCompletionMessage(
        "Your practice has been saved to your FlowState journey."
      );
    } catch (err) {
      console.error("Complete practice error:", err);

      setCompletionMessage(
        err.message ||
          "Something went wrong while saving your practice."
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

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-sm text-gray-500">
            Loading asana...
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

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="rounded-3xl bg-white p-10 shadow-sm">
            <div className="text-5xl">
              🧘
            </div>

            <h1 className="mt-4 text-2xl font-bold">
              Asana not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't find the yoga pose you're looking for.
            </p>

            <Link
              to="/yoga"
              className="mt-6 inline-block rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              Back to Yoga
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          {/* =====================================================
              BACK
          ====================================================== */}

          <Link
            to="/yoga"
            className="inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800"
          >
            ← Back to Yoga
          </Link>

          {/* =====================================================
              MAIN CARD
          ====================================================== */}

          <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="grid lg:grid-cols-2">

              {/* Image */}

              <div className="relative min-h-80 bg-green-50 lg:min-h-130">

                {asana.image_url ? (
                  <img
                    src={asana.image_url}
                    alt={asana.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-80 items-center justify-center">
                    <div className="text-center">

                      <div className="text-7xl">
                        🧘
                      </div>

                      <p className="mt-3 text-sm font-medium text-green-700">
                        FlowState Yoga
                      </p>

                    </div>
                  </div>
                )}

                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-green-700 shadow-sm backdrop-blur-sm">
                  {asana.difficulty}
                </span>

              </div>

              {/* Information */}

              <div className="p-6 sm:p-8 lg:p-10">

                <p className="text-sm font-semibold text-green-700">
                  {asana.sanskrit_name}
                </p>

                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  {asana.name}
                </h1>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {asana.short_description}
                </p>

                {/* =================================================
                    GUIDED VIDEO
                ================================================== */}

                <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

                  <div className="border-b border-gray-100 p-6 sm:p-8">

                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      Guided Practice
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                      Watch & Practice
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Follow the practice at your own pace and stay within a comfortable range.
                    </p>

                  </div>

                  {asana.video_url ? (
                    <div className="aspect-video w-full bg-black">

                      {asana.video_type === "youtube" ? (
                        <iframe
                          src={asana.video_url}
                          title={`${asana.name} guided practice`}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={asana.video_url}
                          controls
                          className="h-full w-full"
                        >
                          Your browser does not support video playback.
                        </video>
                      )}

                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-gray-50">

                      <div className="px-6 text-center">

                        <div className="mb-3 text-4xl">
                          🎥
                        </div>

                        <h3 className="font-semibold text-gray-800">
                          Video coming soon
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          A guided video for this practice will be available soon.
                        </p>

                      </div>

                    </div>
                  )}

                </section>

                {/* =================================================
                    QUICK INFO
                ================================================== */}

                <div className="mt-6 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-xs text-gray-500">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {asana.category}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-xs text-gray-500">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {formatDuration(asana.duration_seconds)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-xs text-gray-500">
                      Difficulty
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {asana.difficulty}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-xs text-gray-500">
                      Focus Area
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {asana.focus_area || "General"}
                    </p>
                  </div>

                </div>

                {/* =================================================
                    BENEFITS
                ================================================== */}

                <div className="mt-7">

                  <h2 className="text-lg font-bold">
                    Benefits
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {asana.benefits}
                  </p>

                </div>

              </div>
            </div>
          </section>

          {/* =====================================================
              SECOND VIDEO
          ====================================================== */}

          {asana.video_url && (
            <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

              <div className="border-b border-gray-100 p-6 sm:p-8">

                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Guided Practice
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Watch & Practice
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Follow the movement at your own pace and stay within
                  a comfortable range.
                </p>

              </div>

              <div className="aspect-video w-full bg-black">

                {asana.video_type === "youtube" ? (
                  <iframe
                    src={asana.video_url}
                    title={`${asana.name} guided practice`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={asana.video_url}
                    controls
                    className="h-full w-full"
                  >
                    Your browser does not support video playback.
                  </video>
                )}

              </div>

            </section>
          )}

          {/* =====================================================
              PRACTICE INFORMATION
          ====================================================== */}

          <section className="mt-5 grid gap-5 lg:grid-cols-2">

            {/* Instructions */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  🧘
                </div>

                <h2 className="text-xl font-bold">
                  How to Practice
                </h2>

              </div>

              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                {asana.instructions}
              </p>

            </div>

            {/* Modifications */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  🔄
                </div>

                <h2 className="text-xl font-bold">
                  Modifications
                </h2>

              </div>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                {asana.modifications || "Choose a comfortable variation."}
              </p>

            </div>

          </section>

          {/* =====================================================
              MARK PRACTICE COMPLETE
          ====================================================== */}

          <section className="mt-5 overflow-hidden rounded-3xl bg-green-700 p-6 text-white shadow-sm sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-green-100">
                  Practice Complete
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Finished your practice?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-green-50">
                  Mark this practice as complete and FlowState will
                  save it to your personal wellness history.
                </p>

              </div>

              <div className="shrink-0">

                {completed ? (
                  <div className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700">
                    ✓ Practice Saved
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompletePractice}
                    disabled={completing}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {completing
                      ? "Saving..."
                      : "✓ Mark Practice Complete"}
                  </button>
                )}

              </div>

            </div>

            {completionMessage && (
              <div className="mt-5 rounded-2xl bg-white/10 px-4 py-3">

                <p className="text-sm text-green-50">
                  {completionMessage}
                </p>

              </div>
            )}

          </section>

          {/* =====================================================
              SAFETY
          ====================================================== */}

          <section className="mt-5 rounded-3xl border border-green-100 bg-green-50 p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <div className="text-2xl">
                🛡️
              </div>

              <div>

                <h2 className="font-bold">
                  Practice Safely
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {asana.contraindications ||
                    "Practice within your comfort level and stop if something feels wrong."}
                </p>

              </div>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default AsanaDetails;