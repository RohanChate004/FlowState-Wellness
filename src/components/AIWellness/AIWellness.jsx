function AIWellness() {
  return (
    <section className="bg-[#f5faf7] py-20 md:py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — AI CHAT */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 md:p-7 shadow-sm">

            {/* Chat Header */}
            <div className="flex items-center justify-between pb-5 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-xl">
                  🤖
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    AI Wellness Coach
                  </h3>

                  <p className="text-xs text-green-600 mt-0.5">
                    ● Online
                  </p>
                </div>

              </div>

              <span className="text-xs text-gray-400">
                Preview
              </span>

            </div>


            {/* Chat Messages */}
            <div className="space-y-4 py-6">

              {/* AI */}
              <div className="flex items-start gap-2">

                <div className="bg-green-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">

                  <p className="text-sm text-gray-700">
                    How are you feeling today? 🌿
                  </p>

                </div>

              </div>


              {/* User */}
              <div className="flex justify-end">

                <div className="bg-green-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">

                  <p className="text-sm">
                    I'm feeling a little stressed.
                  </p>

                </div>

              </div>


              {/* AI */}
              <div className="flex items-start gap-2">

                <div className="bg-green-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">

                  <p className="text-sm text-gray-700 leading-relaxed">
                    I understand. Let's take a small step together.
                    Try a 5-minute breathing exercise. 🧘
                  </p>

                </div>

              </div>

            </div>


            {/* Fake Input */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">

              <span className="flex-1 text-sm text-gray-400">
                Type your message...
              </span>

              <button className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition">
                →
              </button>

            </div>

          </div>


          {/* RIGHT — INFORMATION */}
          <div>

            <p className="text-green-600 font-semibold text-sm uppercase tracking-[0.15em]">
              AI Powered
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 leading-tight tracking-tight">

              Your Personal{" "}

              <span className="text-green-600">
                AI Wellness Coach
              </span>

            </h2>

            <p className="text-gray-500 text-base md:text-lg mt-5 leading-relaxed max-w-xl">

              Get personalized support for your mental well-being
              and physical health. FlowState helps you understand
              your needs and build healthier daily habits.

            </p>


            {/* Benefits */}
            <div className="space-y-4 mt-7">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  ✓
                </div>

                <span className="text-gray-700">
                  Personalized wellness guidance
                </span>

              </div>


              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  ✓
                </div>

                <span className="text-gray-700">
                  Mood and wellness tracking
                </span>

              </div>


              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  ✓
                </div>

                <span className="text-gray-700">
                  Mind + body wellness support
                </span>

              </div>

            </div>


            {/* CTA */}
            <a
              href="/ai-wellness"
              className="inline-flex items-center justify-center mt-8 bg-green-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-sm"
            >
              Try AI Wellness →
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AIWellness;