import API_BASE_URL from "../../services/api";
import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // Complete Google Login
  // --------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleSuccess = params.get("google");

    if (googleSuccess !== "success") {
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/google/token/`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.detail || "Google login could not be completed."
          );
          return;
        }

        // Save JWT tokens
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // Remove ?google=success from URL
        window.history.replaceState({}, "", "/login");

        // Go to dashboard
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Google login error:", error);

        setError(
          "Unable to complete Google login. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    completeGoogleLogin();
  }, []);

  // --------------------------------------------------
  // Normal Email + Password Login
  // --------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Frontend validation
    if (email.trim() === "" && password.trim() === "") {
      setError("Please enter your email and password.");
      return;
    }

    if (email.trim() === "") {
      setError("Please enter your email.");
      return;
    }

    if (password.trim() === "") {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Login failed
      if (!response.ok) {
        if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else {
          setError("Invalid email or password.");
        }

        return;
      }

      // Login successful
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please make sure Django is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Google Login
  // --------------------------------------------------
  const handleGoogleLogin = () => {
  setError("");
  setSuccess("");
  setLoading(true);

  window.location.href =
    `${API_BASE_URL}/accounts/google/login/`;
};

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* FlowState Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center">
              <span className="text-3xl">🌿</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-gray-900">Flow</span>
            <span className="text-green-600">State</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Find your balance. Feel your best.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue your wellness journey.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
              {success}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-green-600 font-medium hover:text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-sm text-green-600 font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border border-gray-200 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {/* Google Logo */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.4 3.62v3.01h3.89c2.28-2.1 3.55-5.2 3.55-8.66z"
              />

              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.89-3.01c-1.07.72-2.43 1.15-4.05 1.15-3.12 0-5.77-2.11-6.72-4.95H1.26v3.1A12 12 0 0 0 12 24z"
              />

              <path
                fill="#FBBC05"
                d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28v-3.1H1.26A12 12 0 0 0 0 12c0 1.93.46 3.76 1.26 5.38l4.02-3.1z"
              />

              <path
                fill="#EA4335"
                d="M12 4.77c1.77 0 3.36.61 4.61 1.8l3.45-3.45C17.95 1.11 15.24 0 12 0A12 12 0 0 0 1.26 6.62l4.02 3.1C6.23 6.88 8.88 4.77 12 4.77z"
              />
            </svg>

            <span>Continue with Google</span>
          </button>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Don't have an account?{" "}

            <a
              href="/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Create Account
            </a>
          </p>

        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Your wellness journey starts here 🌿
        </p>

      </div>
    </div>
  );
}

export default Login;