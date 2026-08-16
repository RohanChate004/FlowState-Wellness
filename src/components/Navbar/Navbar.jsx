import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">

            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>

            <span className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Flow</span>
              <span className="text-green-600">State</span>
            </span>

          </a>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

{/* Home */}
<a
  href="/"
  className="text-gray-700 hover:text-green-600 transition"
>
  Home
</a>

           {isLoggedIn && (
  <a
    href="/dashboard"
    className="text-gray-700 hover:text-green-600 transition"
  >
    Dashboard
  </a>
)}

            <a
              href="/yoga"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Yoga
            </a>

            <a
              href="/meditation"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Meditation
            </a>

            <a
              href="/knowledge-hub"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Knowledge Hub
            </a>

            <a
              href="/ai-wellness"
              className="text-gray-700 hover:text-green-600 transition"
            >
              AI Wellness
            </a>

            <a
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Contact
            </a>

          </div>


          {/* Desktop Buttons */}
          {!isLoggedIn && (
  <div className="hidden md:flex items-center gap-3">

    <a
      href="/login"
      className="px-5 py-2.5 rounded-xl border border-green-600 text-green-700 font-medium hover:bg-green-50 transition"
    >
      Login
    </a>

    <a
      href="/signup"
      className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
    >
      Sign Up
    </a>

  </div>
)}


          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-5">

            <div className="flex flex-col gap-1">

            {isLoggedIn && (
              <a
                href="/"
                className="px-4 py-3 rounded-lg text-green-700 bg-green-50 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </a>
            )}
              <a
                href="/yoga"
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                Yoga
              </a>

              <a
                href="/meditation"
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                Meditation
              </a>

              <a
                href="/knowledge-hub"
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                Knowledge Hub
              </a>

              <a
                href="/ai-wellness"
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                AI Wellness
              </a>

              <a
                href="/contact"
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>


              {/* Mobile Buttons */}
              {!isLoggedIn && (
  <div className="flex gap-3 pt-3">

    <a
      href="/login"
      className="px-5 py-2.5 rounded-xl border border-green-600 text-green-700 font-medium hover:bg-green-50 transition"
    >
      Login
    </a>

    <a
      href="/signup"
      className="flex-1 text-center px-4 py-3 rounded-xl bg-green-600 text-white font-medium"
      onClick={() => setMenuOpen(false)}
    >
      Sign Up
    </a>

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