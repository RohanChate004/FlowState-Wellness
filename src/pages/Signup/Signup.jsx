import { useState } from "react";

function Signup() {
  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Terms
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Clear old messages
    setError("");
    setSuccess("");

    // Frontend validation
    if (name.trim() === "") {
      setError("Please enter your full name.");
      return;
    }

    if (email.trim() === "") {
      setError("Please enter your email.");
      return;
    }

    if (password.trim() === "") {
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (confirmPassword.trim() === "") {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    // Start loading
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Django returned an error
      if (!response.ok) {
        if (data.email) {
          setError(data.email[0]);
        } else if (data.password) {
          setError(data.password[0]);
        } else if (data.name) {
          setError(data.name[0]);
        } else {
          setError("Unable to create account. Please try again.");
        }

        return;
      }

      // Account created successfully
      setSuccess("Account created successfully! Redirecting to login...");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);

      // Go to login after 1.5 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error) {
      console.error("Signup error:", error);

      setError(
        "Unable to connect to the server. Please make sure Django is running."
      );
    } finally {
      setLoading(false);
    }
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
            Start your wellness journey.
          </p>

        </div>


        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Heading */}
          <div className="mb-7">

            <h2 className="text-2xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join FlowState and take care of your mind and body.
            </p>

          </div>


          {/* Error Message */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}


          {/* Success Message */}
          {success && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
              {success}
            </div>
          )}


          {/* Signup Form */}
          <form onSubmit={handleSignup}>

            {/* Full Name */}
            <div className="mb-5">

              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>


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
            <div className="mb-5">

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
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-green-600 font-medium hover:text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* Confirm Password */}
            <div className="mb-6">

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>


            {/* Terms */}
            <div className="flex items-start gap-2 mb-6">

              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setError("");
                }}
                className="mt-1 accent-green-600"
              />

              <label
                htmlFor="terms"
                className="text-sm text-gray-500"
              >
                I agree to the FlowState terms and privacy policy.
              </label>

            </div>


            {/* Create Account */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>


          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-7">

            Already have an account?{" "}

            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
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

export default Signup;