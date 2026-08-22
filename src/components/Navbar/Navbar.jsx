import { useState } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const location = useLocation();

  // Apply the special dark theme only inside Knowledge Hub
  const isKnowledgeHub = location.pathname.startsWith("/knowledge-hub");

  const navLinkClass = isKnowledgeHub
    ? "text-slate-300 hover:text-amber-300 transition duration-300"
    : "text-gray-700 hover:text-green-600 transition";

  return (
    <nav
      className={
        isKnowledgeHub
          ? "sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl"
          : "sticky top-0 z-50 border-b border-gray-100 bg-white"
      }
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div
              className={
                isKnowledgeHub
                  ? "flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 shadow-[0_0_25px_rgba(251,191,36,0.08)]"
                  : "flex h-9 w-9 items-center justify-center rounded-xl bg-green-50"
              }
            >
              <span className="text-xl">🌿</span>
            </div>

            <span className="text-2xl font-bold tracking-tight">
              <span
                className={
                  isKnowledgeHub ? "text-white" : "text-gray-900"
                }
              >
                Flow
              </span>

              <span
                className={
                  isKnowledgeHub ? "text-amber-300" : "text-green-600"
                }
              >
                State
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="/" className={navLinkClass}>
              Home
            </a>

            {isLoggedIn && (
              <a href="/dashboard" className={navLinkClass}>
                Dashboard
              </a>
            )}

            <a href="/yoga" className={navLinkClass}>
              Yoga
            </a>

            <a href="/meditation" className={navLinkClass}>
              Meditation
            </a>

            <a
              href="/knowledge-hub"
              className={
                isKnowledgeHub
                  ? "rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.06)] transition hover:bg-amber-300/15"
                  : navLinkClass
              }
            >
              Knowledge Hub
            </a>

            <a href="/ai-wellness" className={navLinkClass}>
              AI Wellness
            </a>

            <a href="/contact" className={navLinkClass}>
              Contact
            </a>
          </div>

          {/* Desktop Buttons */}
          {!isLoggedIn && (
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="/login"
                className={
                  isKnowledgeHub
                    ? "rounded-xl border border-amber-300/30 px-5 py-2.5 font-medium text-amber-200 transition hover:bg-amber-300/10"
                    : "rounded-xl border border-green-600 px-5 py-2.5 font-medium text-green-700 transition hover:bg-green-50"
                }
              >
                Login
              </a>

              <a
                href="/signup"
                className={
                  isKnowledgeHub
                    ? "rounded-xl bg-linear-to-r from-amber-300 to-yellow-500 px-5 py-2.5 font-medium text-[#1a1205] transition hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]"
                    : "rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
                }
              >
                Sign Up
              </a>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={
              isKnowledgeHub
                ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-amber-200"
                : "flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-xl"
            }
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            className={
              isKnowledgeHub
                ? "border-t border-white/10 py-5 md:hidden"
                : "border-t border-gray-100 py-5 md:hidden"
            }
          >
            <div className="flex flex-col gap-1">
              <a
                href="/"
                className={
                  isKnowledgeHub
                    ? "rounded-lg px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-amber-200"
                    : "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>

              {isLoggedIn && (
                <a
                  href="/dashboard"
                  className={
                    isKnowledgeHub
                      ? "rounded-lg px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-amber-200"
                      : "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </a>
              )}

              <a
                href="/yoga"
                className={
                  isKnowledgeHub
                    ? "rounded-lg px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-amber-200"
                    : "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                }
                onClick={() => setMenuOpen(false)}
              >
                Yoga
              </a>

              <a
                href="/meditation"
                className={
                  isKnowledgeHub
                    ? "rounded-lg px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-amber-200"
                    : "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                }
                onClick={() => setMenuOpen(false)}
              >
                Meditation
              </a>

              <a
                href="/knowledge-hub"
                className={
                  isKnowledgeHub
                    ? "rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 font-medium text-amber-200"
                    : "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                }
                onClick={() => setMenuOpen(false)}
              >
                Knowledge Hub
              </a>

              <a
                href="/ai-wellness"
                className={
                  isKnowledgeHub
                    ? "rounded-lg px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-amber-200"
                    : "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                }
                onClick={() => setMenuOpen(false)}
              >
                AI Wellness
              </a>

              <a
                href="/contact"
                className={
                  isKnowledgeHub
                    ? "rounded-lg px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-amber-200"
                    : "rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                }
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>

              {/* Mobile Buttons */}
              {!isLoggedIn && (
                <div className="flex gap-3 pt-4">
                  <a
                    href="/login"
                    className={
                      isKnowledgeHub
                        ? "rounded-xl border border-amber-300/30 px-5 py-2.5 font-medium text-amber-200"
                        : "rounded-xl border border-green-600 px-5 py-2.5 font-medium text-green-700"
                    }
                  >
                    Login
                  </a>

                  <a
                    href="/signup"
                    className={
                      isKnowledgeHub
                        ? "flex-1 rounded-xl bg-linear-to-r from-amber-300 to-yellow-500 px-4 py-3 text-center font-medium text-[#1a1205]"
                        : "flex-1 rounded-xl bg-green-600 px-4 py-3 text-center font-medium text-white"
                    }
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

