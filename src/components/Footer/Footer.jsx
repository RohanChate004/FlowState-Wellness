function Footer() {
  return (
    <footer className="mt-16 bg-green-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>

            <a
              href="/"
              className="inline-flex items-center gap-3"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
                🌿
              </div>

              <span className="text-2xl font-bold">
                <span className="text-white">
                  Flow
                </span>
                <span className="text-green-400">
                  State
                </span>
              </span>

            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-green-100">
              Find your balance. Feel your best.
              Build healthier habits for your mind and body,
              one day at a time.
            </p>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300">
              Quick Links
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

              <a
                href="/"
                className="text-green-100 transition hover:text-white"
              >
                Home
              </a>

              <a
                href="/dashboard"
                className="text-green-100 transition hover:text-white"
              >
                Dashboard
              </a>

              <a
                href="/yoga"
                className="text-green-100 transition hover:text-white"
              >
                Yoga
              </a>

              <a
                href="/meditation"
                className="text-green-100 transition hover:text-white"
              >
                Meditation
              </a>

              <a
                href="/knowledge-hub"
                className="text-green-100 transition hover:text-white"
              >
                Knowledge Hub
              </a>

              <a
                href="/ai-wellness"
                className="text-green-100 transition hover:text-white"
              >
                AI Wellness
              </a>

              <a
                href="/contact"
                className="text-green-100 transition hover:text-white"
              >
                Contact
              </a>

            </div>

          </div>


          {/* Wellness Message */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300">
              Your Wellness Journey
            </h3>

            <p className="mt-4 text-sm leading-6 text-green-100">
              Take a few minutes each day to move,
              breathe, reflect, and reconnect with yourself.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-green-100">
              🌱 Small steps. Meaningful change.
            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6">

          <div className="flex flex-col gap-3 text-sm text-green-200 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 FlowState. All rights reserved.
            </p>

            <p>
              Built for a healthier mind & body 🌿
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;