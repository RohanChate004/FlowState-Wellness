function Stats() {
  const stats = [
    {
      icon: "🌿",
      number: "250K+",
      label: "Sessions Completed",
    },
    {
      icon: "✓",
      number: "98%",
      label: "User Satisfaction",
    },
    {
      icon: "☀️",
      number: "40+",
      label: "Yoga Practices",
    },
    {
      icon: "🤖",
      number: "24/7",
      label: "AI Wellness Support",
    },
  ];

  return (
    <section className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-5 md:p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >

              {/* Icon */}
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-green-50 flex items-center justify-center text-lg">
                {stat.icon}
              </div>

              {/* Number */}
              <h3 className="text-2xl md:text-3xl font-bold text-green-600">
                {stat.number}
              </h3>

              {/* Label */}
              <p className="mt-1 text-sm md:text-base text-gray-500">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;