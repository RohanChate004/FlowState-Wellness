import { Link } from "react-router-dom";

function KnowledgeHub() {
  const categories = [
    {
      icon: "🧘",
      title: "Yoga",
      text: "Asanas, sequences and wellness practices.",
    },
    {
      icon: "🌿",
      title: "Meditation",
      text: "Calm your mind and improve inner balance.",
    },
    {
      icon: "🌬️",
      title: "Pranayama",
      text: "Breathing practices for energy and focus.",
    },
    {
      icon: "🤲",
      title: "Mudra",
      text: "Simple hand gestures for wellness.",
    },
    {
      icon: "🕉️",
      title: "Mantra",
      text: "Sacred sounds for peace and positivity.",
    },
    {
      icon: "☀️",
      title: "Dinacharya",
      text: "Daily routines for a balanced lifestyle.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">

          <p className="text-green-600 font-semibold text-sm uppercase tracking-[0.15em]">
            Explore & Learn
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            Knowledge Hub
          </h2>

          <p className="text-gray-500 mt-4 leading-relaxed">
            Discover simple and useful knowledge about yoga,
            meditation and holistic wellness.
          </p>

        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

          {categories.map((category, index) => (

            <Link
              to="/knowledge-hub"
              key={index}
              className="group bg-white border border-gray-100 rounded-3xl p-5 md:p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              {/* Icon */}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-green-50 flex items-center justify-center text-2xl group-hover:bg-green-100 transition-colors duration-300">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 mt-4">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {category.text}
              </p>

              {/* Small Arrow */}
              <div className="text-green-600 text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore →
              </div>

            </Link>

          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-10">

          <Link
            to="/knowledge-hub"
            className="inline-flex items-center justify-center border border-green-600 text-green-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-green-50 transition duration-300"
          >
            Explore Knowledge Hub →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default KnowledgeHub;