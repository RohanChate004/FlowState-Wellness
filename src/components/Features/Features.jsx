import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Wellness",
      description: "Smart AI guidance for your mind and body.",
      route: "/ai-wellness",
    },
    {
      icon: "🧘",
      title: "Yoga Library",
      description: "Explore yoga practices with steps, benefits and videos.",
      route: "/yoga",
    },
    {
      icon: "🌿",
      title: "Meditation",
      description: "Guided meditation for stress relief, focus and sleep.",
      route: "/meditation",
    },
    {
      icon: "📖",
      title: "Knowledge Hub",
      description:
        "Learn about yoga, pranayama, mudra, mantra and wellness.",
      route: "/knowledge-hub",
    },
    {
      icon: "☀️",
      title: "Daily Routine",
      description:
        "Personalized routines that fit your lifestyle and goals.",
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description:
        "Track your wellness journey and celebrate your progress.",
      route: "/dashboard",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">

          <p className="text-green-600 font-semibold text-sm uppercase tracking-[0.15em]">
            Everything You Need
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            All-in-One Wellness Platform
          </h2>

          <p className="text-gray-500 mt-4 leading-relaxed">
            Everything you need to build a healthier mind,
            stronger body and balanced lifestyle.
          </p>

        </div>


        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-2xl group-hover:bg-green-100 transition-colors duration-300">
                {feature.icon}
              </div>


              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mt-6">
                {feature.title}
              </h3>


              {/* Description */}
              <p className="text-gray-500 leading-relaxed mt-3 min-h-[72px]">
                {feature.description}
              </p>


              {/* Explore */}
              {feature.route ? (
                <Link
                  to={feature.route}
                  className="inline-flex mt-5 text-green-600 font-semibold text-sm hover:text-green-700 transition"
                >
                  Explore →
                </Link>
              ) : (
                <span className="inline-flex mt-5 text-green-600 font-semibold text-sm">
                  Explore →
                </span>
              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;