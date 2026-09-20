function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "👤",
      title: "Create Your Account",
      description:
        "Create your FlowState account and begin your personalized wellness journey.",
    },
    {
      number: "02",
      icon: "💬",
      title: "Tell Us How You Feel",
      description:
        "Share your current mood, needs or wellness concerns with FlowState.",
    },
    {
      number: "03",
      icon: "🤖",
      title: "Get Your Guidance",
      description:
        "FlowState uses your input and wellness context to suggest a suitable practice.",
    },
    {
      number: "04",
      icon: "🌿",
      title: "Practice & Improve",
      description:
        "Follow your recommended practice and build healthier wellness habits over time.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">

          <p className="text-green-600 font-semibold text-sm uppercase tracking-[0.15em]">
            How It Works
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            Simple Steps to a Better You
          </h2>

          <p className="text-gray-500 mt-4 leading-relaxed">
            Start small, tell FlowState what you need and let
            personalized wellness guidance help you find your flow.
          </p>

        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-5">

          {steps.map((step, index) => (

            <div
              key={index}
              className="relative text-center"
            >

              {/* Step Number */}
              <p className="text-green-200 text-5xl md:text-6xl font-bold leading-none">
                {step.number}
              </p>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 mx-auto -mt-5 rounded-full bg-green-50 border-4 border-white shadow-sm flex items-center justify-center text-2xl">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mt-5">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Desktop Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[4.2rem] left-[calc(50%+3.5rem)] w-[calc(100%-7rem)] border-t border-dashed border-green-200">
                </div>
              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;