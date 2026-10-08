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

  const [videoStarted, setVideoStarted] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);

  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");

  const [imageError, setImageError] = useState(false);


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
  // HELPERS
  // ============================================================

  const formatDuration = (seconds) => {
    if (!seconds) return "Flexible";

    if (seconds < 60) {
      return `${seconds} sec`;
    }

    return `${Math.floor(seconds / 60)} min`;
  };

  const splitContent = (content) => {
    if (!content) return [];

    return content
      .split(/\n+/)
      .map((item) =>
        item
          .trim()
          .replace(/^\d+[\.\)]\s*/, "")
          .replace(/^[-•]\s*/, "")
      )
      .filter(Boolean);
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
      asana.video &&
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
      <div className="min-h-screen bg-[#f7f8f4]">
        <Navbar />

        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
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
      <div className="min-h-screen bg-[#f7f8f4]">
        <Navbar />

        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="rounded-[28px] bg-white p-10 shadow-sm ring-1 ring-gray-100">
            <div className="text-5xl">
              🧘
            </div>

            <h1 className="mt-4 text-2xl font-bold">
              Asana not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't find this yoga practice.
            </p>

            <Link
              to="/yoga"
              className="mt-6 inline-block rounded-full bg-[#376b52] px-6 py-3 text-sm font-semibold text-white"
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

  const mediaUrl = (url) => {
    if (!url) return null;

    return url.startsWith("http")
      ? url
      : `${API_BASE_URL}${url}`;
  };

  const imageUrl = mediaUrl(asana.image);
  const videoUrl = mediaUrl(asana.video);


  const showImage =
    imageUrl && !imageError;

  const muscles = splitContent(
    asana.key_muscles
  );

  const steps = splitContent(
    asana.step_by_step
  );

  const alignmentTips = splitContent(
    asana.alignment_tips
  );

  const precautions = splitContent(
    asana.precautions ||
    asana.contraindications
  );

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f7f8f4] text-[#26332c]">

      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:py-8">

        <div className="mx-auto max-w-6xl">

          {/* BACK */}

          <Link
            to="/yoga"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#376b52] hover:text-[#28513d]"
          >
            ← Back to Yoga
          </Link>


          {/* ====================================================
              HERO
          ==================================================== */}

          <section className="mt-5 overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-[#e5e9e2]">

            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">

              {/* IMAGE */}

              <div className="relative h-75 bg-[#e8efe7] lg:h-105 lg:self-start">

                {showImage ? (
                  <img
                    src={imageUrl}
                    alt={asana.name}
                    className="h-full w-full object-cover"
                    onError={() =>
                      setImageError(true)
                    }
                  />

                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-7xl">
                      🧘
                    </span>
                  </div>
                )}

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">

                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#376b52] shadow-sm">
                    {asana.difficulty}
                  </span>

                  {asana.category && (
                    <span className="rounded-full bg-[#26332c]/85 px-3 py-1.5 text-xs font-medium text-white">
                      {asana.category}
                    </span>
                  )}

                </div>

              </div>


              {/* INFORMATION */}

              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#376b52]">
                  {asana.sanskrit_name ||
                    "Yoga Practice"}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {asana.name}
                </h1>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {asana.short_description}
                </p>


                {/* QUICK INFO */}

                <div className="mt-7 grid grid-cols-3 gap-2">

                  <InfoCard
                    label="Duration"
                    value={formatDuration(
                      asana.duration_seconds
                    )}
                  />

                  <InfoCard
                    label="Focus"
                    value={
                      asana.focus_area ||
                      "General"
                    }
                  />

                  <InfoCard
                    label="Energy"
                    value={
                      asana.energy_level ||
                      "Moderate"
                    }
                  />

                </div>


                <button
                  type="button"
                  onClick={handleStartPractice}
                  className="mt-7 w-full rounded-full bg-[#376b52] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d5944] sm:w-fit"
                >
                  Start {asana.name} →
                </button>

              </div>

            </div>

          </section>


          {/* ====================================================
              BENEFITS + MUSCLES
          ==================================================== */}

          <section className="mt-4 grid gap-4 lg:grid-cols-2">

            {/* BENEFITS */}

            <InfoSection
              eyebrow="Why practice"
              title="Benefits"
            >
              <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                {asana.benefits}
              </p>
            </InfoSection>


            {/* MUSCLES */}

            {muscles.length > 0 && (
              <InfoSection
                eyebrow="Body focus"
                title="Key Muscles"
              >

                <div className="flex flex-wrap gap-2">

                  {muscles.map(
                    (muscle, index) => (
                      <span
                        key={`${muscle}-${index}`}
                        className="rounded-full bg-[#edf4ed] px-3 py-2 text-xs font-semibold text-[#376b52]"
                      >
                        {muscle}
                      </span>
                    )
                  )}

                </div>

              </InfoSection>
            )}

          </section>


          {/* ====================================================
              STEP BY STEP
          ==================================================== */}

          {steps.length > 0 && (
            <section className="mt-4 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#e5e9e2] sm:p-7">

              <SectionTitle
                eyebrow="Practice guide"
                title="How to Practice"
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {steps.map(
                  (step, index) => (
                    <div
                      key={`${step}-${index}`}
                      className="flex gap-4 rounded-2xl bg-[#f7f8f4] p-4"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#376b52] text-xs font-bold text-white">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-gray-600">
                        {step}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>
          )}


          {/* FALLBACK OLD INSTRUCTIONS */}

          {steps.length === 0 &&
            asana.instructions && (
              <InfoSection
                eyebrow="Practice guide"
                title="How to Practice"
              >
                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                  {asana.instructions}
                </p>
              </InfoSection>
            )}


          {/* ====================================================
              ALIGNMENT
          ==================================================== */}

          {alignmentTips.length > 0 && (
            <section className="mt-4 rounded-[30px] border border-[#dbe8da] bg-[#edf4ed] p-5 sm:p-7">

              <SectionTitle
                eyebrow="Body awareness"
                title="Alignment Tips"
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {alignmentTips.map(
                  (tip, index) => (
                    <div
                      key={`${tip}-${index}`}
                      className="rounded-2xl bg-white/80 p-4"
                    >

                      <p className="text-sm leading-6 text-gray-600">

                        <span className="mr-2 font-semibold text-[#376b52]">
                          {index + 1}.
                        </span>

                        {tip}

                      </p>

                    </div>
                  )
                )}

              </div>

            </section>
          )}


          {/* ====================================================
              GUIDED PRACTICE
          ==================================================== */}

          <section
            id="guided-practice"
            className="mt-4 overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-[#e5e9e2]"
          >

            <div className="p-5 sm:p-7">

              <div className="flex flex-wrap items-start justify-between gap-4">

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#376b52]">
                    Guided Practice
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Watch & Practice
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Complete the guided video before saving your practice.
                  </p>

                </div>

                {videoCompleted && (
                  <span className="rounded-full bg-[#e4f1e5] px-3 py-1.5 text-xs font-semibold text-[#376b52]">
                    ✓ Video Completed
                  </span>
                )}

              </div>

            </div>


            {/* VIDEO */}

            {videoUrl ? (
              <div className="bg-[#f3f5f1] px-4 py-5 sm:px-7">
                <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-black shadow-sm">
                  <video
                    className="aspect-video h-full w-full"
                    controls
                    playsInline
                    preload="metadata"
                    src={videoUrl}
                    onPlay={() => {
                      setVideoStarted(true);
                    }}
                    onEnded={() => {
                      setVideoCompleted(true);
                      setCompletionMessage(
                        "Practice complete. You can now save it."
                      );
                    }}
                  />
                </div>
              </div>

            ) : (

              <div className="bg-[#f7f8f4] px-6 py-12 text-center">

                <div className="text-4xl">
                  🎥
                </div>

                <p className="mt-3 text-sm font-semibold">
                  Guided video coming soon
                </p>

              </div>

            )}


            {/* PROGRESS */}

            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 p-4">

              <ProgressStep
                number="1"
                label="Start"
                active={videoStarted}
              />

              <ProgressStep
                number="2"
                label="Complete"
                active={videoCompleted}
              />

              <ProgressStep
                number="3"
                label="Save"
                active={completed}
              />

            </div>

          </section>


          {/* ====================================================
              MODIFICATIONS + PRECAUTIONS
          ==================================================== */}

          <section className="mt-4 grid gap-4 lg:grid-cols-2">

            {asana.modifications && (
              <InfoSection
                eyebrow="Make it comfortable"
                title="Modifications"
              >
                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                  {asana.modifications}
                </p>
              </InfoSection>
            )}


            {precautions.length > 0 && (
              <section className="rounded-[30px] border border-amber-100 bg-[#fffaf0] p-5 sm:p-7">

                <SectionTitle
                  eyebrow="Practice safely"
                  title="Precautions"
                />

                <div className="mt-5 space-y-3">

                  {precautions.map(
                    (item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex gap-3"
                      >

                        <span className="mt-0.5 text-sm">
                          ⚠️
                        </span>

                        <p className="text-sm leading-6 text-gray-600">
                          {item}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

          </section>


          {/* ====================================================
              SAVE PRACTICE
          ==================================================== */}

          <section className="mt-4 rounded-[30px] bg-[#376b52] p-5 text-white shadow-sm sm:p-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green-100">
                  FlowState Journey
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {completed
                    ? "Practice Saved ✓"
                    : "Finished your practice?"}
                </h2>

                <p className="mt-2 max-w-xl text-xs leading-5 text-green-50">
                  {completed
                    ? "This practice has been added to your wellness history."
                    : videoCompleted
                      ? "Your guided practice is complete. Save it to your journey."
                      : "Finish the guided video to unlock saving."}
                </p>

              </div>


              {completed ? (

                <div className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#376b52]">
                  ✓ Saved
                </div>

              ) : (

                <button
                  type="button"
                  onClick={
                    handleCompletePractice
                  }
                  disabled={
                    completing ||
                    (asana.video &&
                      !videoCompleted)
                  }
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${completing ||
                    (asana.video &&
                      !videoCompleted)
                    ? "cursor-not-allowed bg-white/30 text-white/70"
                    : "bg-white text-[#376b52] hover:bg-green-50"
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
              <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-xs text-green-50">
                {completionMessage}
              </p>
            )}

          </section>


          {/* BOTTOM */}

          <div className="py-8">

            <Link
              to="/yoga"
              className="text-sm font-semibold text-[#376b52] hover:text-[#28513d]"
            >
              ← Explore more asanas
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}


// ============================================================
// SMALL COMPONENTS
// ============================================================

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#f2f6f0] p-3">

      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-semibold text-[#26332c]">
        {value}
      </p>

    </div>
  );
}


function InfoSection({
  eyebrow,
  title,
  children,
}) {
  return (
    <section className="rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#e5e9e2] sm:p-7">

      <SectionTitle
        eyebrow={eyebrow}
        title={title}
      />

      <div className="mt-5">
        {children}
      </div>

    </section>
  );
}


function SectionTitle({
  eyebrow,
  title,
}) {
  return (
    <div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#376b52]">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-bold text-[#26332c]">
        {title}
      </h2>

    </div>
  );
}


function ProgressStep({
  number,
  label,
  active,
}) {
  return (
    <div
      className={`rounded-2xl p-3 text-center ${active
        ? "bg-[#edf4ed]"
        : "bg-gray-50"
        }`}
    >

      <p
        className={`text-xs font-semibold ${active
          ? "text-[#376b52]"
          : "text-gray-500"
          }`}
      >
        {active ? "✓" : number}
      </p>

      <p className="mt-1 text-[11px] text-gray-500">
        {label}
      </p>

    </div>
  );
}


export default AsanaDetails;