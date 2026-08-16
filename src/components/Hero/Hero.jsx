function Hero() {
  return (
    <section className="bg-[#f5faf7]">

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">


          {/* LEFT CONTENT */}
          <div>

            {/* Small Label */}
            <div className="flex items-center gap-2 mb-5">

              <span className="text-green-600">
                ✦
              </span>

              <span className="text-sm font-semibold text-green-700">
                AI-Powered Wellness
              </span>

            </div>


            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight">

              Find Your{" "}

              <span className="text-green-600">
                Flow.
              </span>

              <br />

              Heal Your Mind.

              <br />

              Strengthen Your Body.

            </h1>


            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-6 max-w-xl">

              FlowState is your all-in-one wellness platform for
              Yoga, Meditation and personalized routines.
              Build healthier habits and find your balance every day.

            </p>


            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <a
                href="/signup"
                className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-sm"
              >
                Start Your Journey →
              </a>


              <a
                href="/wellness-programs"
                className="inline-flex items-center justify-center border border-green-600 text-green-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-green-50 transition duration-300"
              >
                Explore Wellness
              </a>

            </div>


            {/* Trust Points */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-sm text-gray-500">

              <span>✓ AI Guided</span>

              <span>✓ Personalized</span>

              <span>✓ Yoga + Meditation</span>

            </div>

          </div>


          {/* RIGHT IMAGE */}
          <div className="relative">

            {/* Main Image */}
            <div className="rounded-[2rem] overflow-hidden border-8 border-white shadow-xl">

              <img
                // src="/hero-yoga.jpg"
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80"
                alt="Person practicing yoga"
                className="w-full h-[320px] sm:h-[400px] lg:h-[500px] object-cover"
              />

            </div>


            {/* AI Floating Card */}
            <div className="absolute top-6 -left-3 sm:-left-6 bg-white rounded-xl shadow-lg px-4 py-3">

              <p className="text-xs text-gray-400">
                AI Wellness
              </p>

              <p className="text-sm font-semibold text-gray-800">
                Your personal guide 🤖
              </p>

            </div>


            {/* Routine Floating Card */}
            <div className="absolute bottom-6 -right-3 sm:-right-6 bg-white rounded-xl shadow-lg px-4 py-3">

              <p className="text-xs text-gray-400">
                Daily Routine
              </p>

              <p className="text-sm font-semibold text-green-700">
                Stay consistent 🌿
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;