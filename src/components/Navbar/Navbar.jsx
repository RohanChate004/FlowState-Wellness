import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const navLinkClass =
    "text-gray-700 hover:text-green-600 transition";

  const mobileLinkClass =
    "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
              <span className="text-xl">🌿</span>
            </div>

            <span className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Flow</span>
              <span className="text-green-600">State</span>
            </span>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden items-center gap-8 md:flex">

            <Link to="/" className={navLinkClass}>
              Home
            </Link>

            {isLoggedIn && (
              <Link to="/dashboard" className={navLinkClass}>
                Dashboard
              </Link>
            )}

            <Link to="/yoga" className={navLinkClass}>
              Yoga
            </Link>

            <Link to="/meditation" className={navLinkClass}>
              Meditation
            </Link>

            {/* Knowledge Hub */}
            <Link
              to="/knowledge-hub"
              className={navLinkClass}
            >
              Knowledge Hub
            </Link>

            <Link to="/ai-wellness" className={navLinkClass}>
              AI Wellness
            </Link>

            <Link to="/contact" className={navLinkClass}>
              Contact
            </Link>
          </div>

          {/* ================= DESKTOP BUTTONS ================= */}
          {!isLoggedIn && (
            <div className="hidden items-center gap-3 md:flex">

              <Link
                to="/login"
                className="rounded-xl border border-green-600 px-5 py-2.5 font-medium text-green-700 transition hover:bg-green-50"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
              >
                Sign Up
              </Link>

            </div>
          )}

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-xl text-gray-700 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* ================= MOBILE NAVIGATION ================= */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-5 md:hidden">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/yoga"
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Yoga
              </Link>

              <Link
                to="/meditation"
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Meditation
              </Link>

              <Link
                to="/knowledge-hub"
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Knowledge Hub
              </Link>

              <Link
                to="/ai-wellness"
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                AI Wellness
              </Link>

              <Link
                to="/contact"
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>

              {/* ================= MOBILE BUTTONS ================= */}
              {!isLoggedIn && (
                <div className="flex gap-3 pt-4">

                  <Link
                    to="/login"
                    className="rounded-xl border border-green-600 px-5 py-2.5 font-medium text-green-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-center font-medium text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>

                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;