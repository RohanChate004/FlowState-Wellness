import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CyclePractice() {
  const { slug } = useParams();

  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCyclePhase() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://127.0.0.1:8000/api/yoga/cycle-phases/${slug}/`
        );

        if (!response.ok) {
          throw new Error("Unable to load cycle practice.");
        }

        const data = await response.json();
        setPhase(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCyclePhase();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-sm font-medium text-gray-500">
          Preparing your practice...
        </p>
      </div>
    );
  }

  if (error || !phase) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
        <p className="text-lg font-semibold text-gray-900">
          {error || "Cycle practice not found."}
        </p>

        <Link
          to="/yoga"
          className="mt-4 text-sm font-semibold text-green-700 hover:text-green-800"
        >
          ← Back to Yoga
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">

        <Link
          to="/yoga"
          className="inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800"
        >
          ← Back to Yoga
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

          <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            🌙 Cycle Practice
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {phase.title}
          </h1>

          {phase.energy && (
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {phase.energy}
            </p>
          )}

          <div className="mt-6 rounded-2xl bg-green-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Your Practice Style
            </p>

            <p className="mt-2 text-xl font-bold text-gray-900">
              {phase.practice_style || "A balanced FlowState practice"}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Recommended Asanas
            </h2>

            {phase.recommendations?.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {phase.recommendations.map((item, index) => {
                  const asana = item.asana;

                  return (
                    <Link
                      key={item.id || index}
                      to={`/asanas/${asana.id}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50"
                    >
                      <p className="text-xs font-semibold text-green-700">
                        {index + 1}. Recommended
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-gray-900">
                        {asana.name}
                      </h3>

                      {asana.sanskrit_name && (
                        <p className="mt-1 text-sm text-gray-500">
                          {asana.sanskrit_name}
                        </p>
                      )}

                      <p className="mt-3 text-xs font-semibold text-gray-500">
                        View Asana Details →
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-500">
                No asanas have been added to this practice yet.
              </p>
            )}
          </div>

          {phase.safety_guidance && (
            <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <h2 className="font-bold text-gray-900">
                🌿 Practice Guidance
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {phase.safety_guidance}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CyclePractice;