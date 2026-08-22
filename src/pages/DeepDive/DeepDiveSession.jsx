import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const sessions = {
  1: {
    title: "Full Body Mobility",
    category: "Mobility",
    duration: "30 min",
    difficulty: "Beginner",
    description:
      "A slower full-body practice focused on mobility, comfortable movement, and body awareness.",

    benefits: [
      "Improve everyday movement",
      "Increase body awareness",
      "Release stiffness",
      "Support comfortable mobility",
    ],

    sequence: [
      {
        name: "Cat-Cow",
        sanskritName: "Marjaryasana – Bitilasana",
        instruction:
          "Begin on your hands and knees with your wrists below your shoulders and knees below your hips. As you inhale, gently lift your chest and tailbone into Cow Pose. As you exhale, round your spine and draw your chin slightly toward your chest into Cat Pose.",
        breathing:
          "Inhale as you move into Cow Pose and exhale as you round into Cat Pose.",
        benefit:
          "Helps improve spinal mobility, body awareness, and gentle movement through the back.",
        modification:
          "Move slowly and keep the range of motion comfortable. You do not need to create a deep arch or round.",
      },
      {
        name: "Child's Pose",
        sanskritName: "Balasana",
        instruction:
          "From hands and knees, gently move your hips back toward your heels and allow your torso to rest forward. Extend your arms in front of you or place them alongside your body.",
        breathing:
          "Take slow, comfortable breaths and allow your body to soften with each exhale.",
        benefit:
          "Encourages relaxation and gently releases tension in the back, shoulders, and hips.",
        modification:
          "Place a cushion or folded blanket under your hips, chest, or forehead for extra support.",
      },
      {
        name: "Low Lunge",
        sanskritName: "Anjaneyasana",
        instruction:
          "Step one foot forward between your hands and gently lower the opposite knee toward the floor. Keep your torso comfortably upright and allow the hips to move forward gradually.",
        breathing:
          "Inhale to lengthen through the spine and exhale as you gently settle into the stretch.",
        benefit:
          "Helps open the hip flexors and encourages comfortable movement through the hips and legs.",
        modification:
          "Place padding under the back knee or keep your hands on the floor for additional support.",
      },
      {
        name: "Downward Facing Dog",
        sanskritName: "Adho Mukha Svanasana",
        instruction:
          "From hands and knees, lift your hips upward and back, creating an inverted V shape. Press gently through your hands and allow your heels to move toward the floor without forcing them down.",
        breathing:
          "Breathe steadily and keep the neck relaxed between your upper arms.",
        benefit:
          "Encourages movement through the shoulders, spine, hamstrings, and calves.",
        modification:
          "Bend your knees generously if your hamstrings feel tight or if this creates more comfort in your back.",
      },
      {
        name: "Seated Forward Fold",
        sanskritName: "Paschimottanasana",
        instruction:
          "Sit with your legs extended comfortably in front of you. Lengthen through your spine and gently fold forward from the hips, reaching only as far as feels comfortable.",
        breathing:
          "Inhale to create length through the spine and exhale as you gently relax forward.",
        benefit:
          "Encourages flexibility through the back of the body and supports a slower, calming finish.",
        modification:
          "Bend your knees or use a strap around your feet instead of forcing the forward fold.",
      },
    ],
  },

  2: {
    title: "Strength & Stability Flow",
    category: "Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    description:
      "Build strength, balance, and stability through a connected and mindful yoga flow.",

    benefits: [
      "Build body strength",
      "Improve balance",
      "Increase stability",
      "Develop body control",
    ],

    sequence: [
      {
        name: "Mountain Pose",
        sanskritName: "Tadasana",
        instruction:
          "Stand with your feet comfortably grounded. Lengthen through your spine, relax your shoulders, and allow your arms to rest naturally beside your body.",
        breathing:
          "Take slow, steady breaths while feeling both feet connected to the floor.",
        benefit:
          "Develops body awareness, posture, balance, and a stable foundation for movement.",
        modification:
          "Stand with your feet slightly apart if balancing with feet together feels uncomfortable.",
      },
      {
        name: "Chair Pose",
        sanskritName: "Utkatasana",
        instruction:
          "From standing, bend your knees and shift your hips slightly back as if sitting into a chair. Keep your chest comfortably lifted and raise your arms if it feels appropriate.",
        breathing:
          "Maintain slow, controlled breathing while keeping the movement steady.",
        benefit:
          "Builds strength and stability through the legs and encourages core engagement.",
        modification:
          "Do not bend as deeply. You can also keep your hands together at your chest.",
      },
      {
        name: "Warrior II",
        sanskritName: "Virabhadrasana II",
        instruction:
          "Step your feet wide apart and turn one foot outward. Bend the front knee comfortably while extending both arms to the sides. Keep your torso upright and gaze over the front hand.",
        breathing:
          "Breathe slowly and maintain a steady, grounded position.",
        benefit:
          "Builds leg strength, balance, stability, and awareness of body alignment.",
        modification:
          "Reduce the bend in the front knee or shorten your stance if needed.",
      },
      {
        name: "Plank",
        sanskritName: "Phalakasana",
        instruction:
          "Place your hands below your shoulders and extend your legs behind you. Create a long line through your body while gently engaging your core.",
        breathing:
          "Keep your breath steady and avoid holding it during the pose.",
        benefit:
          "Develops strength through the shoulders, arms, core, and overall body stability.",
        modification:
          "Lower your knees to the floor while maintaining a comfortable alignment.",
      },
      {
        name: "Bridge Pose",
        sanskritName: "Setu Bandhasana",
        instruction:
          "Lie on your back with your knees bent and feet comfortably on the floor. Press gently through your feet and lift your hips to a comfortable height.",
        breathing:
          "Inhale as you prepare and breathe steadily while holding the position.",
        benefit:
          "Strengthens the legs and back body while encouraging gentle opening through the front of the hips.",
        modification:
          "Lift your hips only slightly or place a yoga block or cushion beneath the sacrum for supported practice.",
      },
    ],
  },

  3: {
    title: "Deep Flexibility Practice",
    category: "Flexibility",
    duration: "60 min",
    difficulty: "Intermediate",
    description:
      "Take your time exploring longer stretches and mindful flexibility work.",

    benefits: [
      "Improve flexibility",
      "Release muscle tension",
      "Increase range of movement",
      "Encourage mindful stretching",
    ],

    sequence: [
      {
        name: "Butterfly Pose",
        sanskritName: "Baddha Konasana",
        instruction:
          "Sit comfortably and bring the soles of your feet together. Allow your knees to relax outward naturally while keeping your spine comfortably long.",
        breathing:
          "Take slow breaths and allow the hips to soften gradually without pushing the knees downward.",
        benefit:
          "Encourages gentle mobility through the hips and inner thighs.",
        modification:
          "Sit on a cushion or place blocks beneath your knees for support.",
      },
      {
        name: "Low Lunge",
        sanskritName: "Anjaneyasana",
        instruction:
          "Step one foot forward and lower the opposite knee toward the floor. Slowly explore a comfortable stretch through the front of the back hip.",
        breathing:
          "Inhale to lengthen your spine and exhale as you gently settle into the position.",
        benefit:
          "Helps release tightness around the hip flexors and supports lower-body mobility.",
        modification:
          "Keep your hands on blocks or the floor and use padding under the back knee.",
      },
      {
        name: "Pigeon Pose",
        sanskritName: "Eka Pada Rajakapotasana",
        instruction:
          "Bring one leg forward with the knee bent and extend the other leg behind you. Keep your hips supported and gradually lower your torso only as far as feels comfortable.",
        breathing:
          "Use slow, relaxed breathing and avoid forcing your body deeper into the stretch.",
        benefit:
          "Encourages deeper awareness and mobility around the hips and glutes.",
        modification:
          "Place a cushion or yoga block beneath the hip of the bent leg for support.",
      },
      {
        name: "Seated Forward Fold",
        sanskritName: "Paschimottanasana",
        instruction:
          "Sit with your legs extended forward. Lengthen through your spine and slowly fold from your hips without forcing your body toward your legs.",
        breathing:
          "Inhale to lengthen and exhale to gently relax into the position.",
        benefit:
          "Encourages flexibility through the hamstrings and the entire back body.",
        modification:
          "Keep your knees bent or use a strap around your feet.",
      },
      {
        name: "Supine Twist",
        sanskritName: "Supta Matsyendrasana",
        instruction:
          "Lie on your back and bring your knees toward your chest. Slowly allow both knees to move toward one side while keeping your shoulders comfortably grounded.",
        breathing:
          "Take slow breaths and allow your body to relax naturally into the twist.",
        benefit:
          "Encourages gentle spinal mobility and provides a calming finish to the practice.",
        modification:
          "Place a cushion or yoga block underneath your knees for support.",
      },
    ],
  },
};

function DeepDiveSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isPracticing, setIsPracticing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const session = sessions[id];

  if (!session) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
          <div className="text-5xl">🌿</div>

          <h1 className="mt-4 text-2xl font-bold">
            Session not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This Deep Dive session is not available.
          </p>

          <button
            onClick={() => navigate("/deep-dive")}
            className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Deep Dive
          </button>
        </div>
      </div>
    );
  }

  const currentPose = session.sequence[currentStep];

  const progress =
    ((currentStep + 1) / session.sequence.length) * 100;

  const startPractice = () => {
    setIsPracticing(true);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const nextStep = () => {
    if (currentStep < session.sequence.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const completePractice = () => {
    setIsCompleted(true);
    setIsPracticing(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">

          <button
            onClick={() => navigate("/deep-dive")}
            className="text-sm font-semibold text-green-700"
          >
            ← Back to Deep Dive
          </button>

          {/* HERO */}

          <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">

              <div className="p-8">

                <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  {session.category}
                </span>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  {session.title}
                </h1>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {session.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-gray-50 px-4 py-2 text-xs text-gray-600">
                    ⏱ {session.duration}
                  </span>

                  <span className="rounded-full bg-gray-50 px-4 py-2 text-xs text-gray-600">
                    🧘 {session.difficulty}
                  </span>
                </div>

                <button
                  onClick={startPractice}
                  className="mt-7 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  {isPracticing
                    ? "Practice in Progress"
                    : "Start Practice →"}
                </button>

              </div>

              <div className="flex items-center bg-green-50 p-8">

                <div className="rounded-3xl bg-white p-6 shadow-sm">

                  <div className="text-4xl">🧘</div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-green-700">
                    Practice Focus
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Move with intention.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Take your time and adapt the practice
                    to your own comfort and ability.
                  </p>

                </div>

              </div>
            </div>
          </section>

          {/* ACTIVE PRACTICE MODE */}

          {isPracticing && (
            <section className="mt-8 overflow-hidden rounded-3xl bg-green-50 p-6 shadow-sm ring-1 ring-green-100 sm:p-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                    Practice in Progress
                  </span>

                  <h2 className="mt-2 text-2xl font-bold">
                    {currentPose.name}
                  </h2>
                </div>

                <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-green-700 shadow-sm">
                  Step {currentStep + 1} of {session.sequence.length}
                </span>

              </div>

              {/* PROGRESS BAR */}

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-green-700 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* CURRENT POSE */}

              <div className="mt-8 rounded-3xl bg-white p-6 sm:p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                  🧘
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-green-700">
                  Current Movement
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {currentPose.name}
                </h3>

                <p className="mt-1 text-sm font-medium italic text-green-700">
                  {currentPose.sanskritName}
                </p>

                <div className="mt-6 space-y-5">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      How to practice
                    </p>

                    <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
                      {currentPose.instruction}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div className="rounded-2xl bg-green-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                        🌬 Breathing
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {currentPose.breathing}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-stone-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                        ✨ Benefits
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {currentPose.benefit}
                      </p>
                    </div>

                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                      🌿 Modification
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {currentPose.modification}
                    </p>
                  </div>

                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

                  <button
                    onClick={previousStep}
                    disabled={currentStep === 0}
                    className={`rounded-full px-6 py-3 text-sm font-semibold transition ${currentStep === 0
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    ← Previous
                  </button>

                  {currentStep ===
                    session.sequence.length - 1 ? (
                    <button
                      onClick={completePractice}
                      className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                      Complete Practice ✓
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                      Next Movement →
                    </button>
                  )}

                </div>

              </div>

            </section>
          )}

          {/* COMPLETION MESSAGE */}

          {isCompleted && (
            <section className="mt-8 rounded-3xl bg-green-50 p-8 text-center ring-1 ring-green-100">

              <div className="text-5xl">🎉</div>

              <h2 className="mt-4 text-2xl font-bold">
                Practice completed!
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Great work. Take a moment to notice how your
                body and mind feel after your practice.
              </p>

              <button
                onClick={() => navigate("/deep-dive")}
                className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Explore More Practices →
              </button>

            </section>
          )}

          {/* BENEFITS */}

          <section className="mt-8">

            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Why this practice
            </span>

            <h2 className="mt-2 text-2xl font-bold">
              What you may explore
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {session.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-700">
                    ✓
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    {benefit}
                  </p>
                </div>
              ))}

            </div>
          </section>

          {/* SEQUENCE */}

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

            <div className="flex items-center justify-between">

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Session Flow
                </span>

                <h2 className="mt-2 text-2xl font-bold">
                  Your practice sequence
                </h2>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                {session.sequence.length} movements
              </span>

            </div>

            <div className="mt-6 space-y-3">

              {session.sequence.map((movement, index) => (
                <div
                  key={movement.name}
                  className={`flex items-center gap-4 rounded-2xl p-4 transition ${isPracticing && currentStep === index
                    ? "bg-green-50 ring-1 ring-green-200"
                    : "bg-stone-50"
                    }`}
                >

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-sm ${isPracticing && currentStep === index
                      ? "bg-green-700 text-white"
                      : "bg-white text-green-700"
                      }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {movement.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium italic text-green-700">
                      {movement.sanskritName}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {movement.instruction}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default DeepDiveSession;