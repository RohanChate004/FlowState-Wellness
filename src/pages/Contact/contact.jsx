import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#f5faf7]">

        {/* ================= HERO ================= */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">

            <div className="max-w-3xl mx-auto text-center">

              <p className="text-green-600 font-semibold text-sm uppercase tracking-[0.15em]">
                Get In Touch
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 tracking-tight">
                We'd Love to Hear From You
              </h1>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-5">
                Have a question, feedback, or something you'd like
                to share? Connect with the FlowState team.
              </p>

            </div>

          </div>
        </section>


        {/* ================= CONTACT CONTENT ================= */}
        <section className="pb-20 md:pb-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

              {/* ================= LEFT SIDE ================= */}
              <div className="bg-white border border-gray-100 rounded-3xl p-7 md:p-9 shadow-sm">

                <p className="text-green-600 font-semibold text-sm uppercase tracking-[0.15em]">
                  Contact FlowState
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
                  Let's Connect
                </h2>

                <p className="text-gray-500 leading-relaxed mt-4">
                  Whether you have a question about FlowState,
                  want to share feedback, or need help using the
                  platform, we'd be happy to hear from you.
                </p>


                {/* Email */}
                <div className="flex items-start gap-4 mt-8">

                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                    📧
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Reach out to us with your questions or feedback.
                    </p>
                  </div>

                </div>


                {/* Feedback */}
                <div className="flex items-start gap-4 mt-6">

                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                    💬
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Feedback & Support
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Share your experience and help us improve FlowState.
                    </p>
                  </div>

                </div>


                {/* Wellness */}
                <div className="flex items-start gap-4 mt-6">

                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                    🌿
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      We're Listening
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Your questions and suggestions help shape the platform.
                    </p>
                  </div>

                </div>

              </div>


              {/* ================= RIGHT SIDE FORM ================= */}
              <div className="bg-white border border-gray-100 rounded-3xl p-7 md:p-9 shadow-sm">

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Send Us a Message
                </h2>

                <p className="text-gray-500 text-sm mt-3">
                  Fill in the form below and tell us how we can help.
                </p>


                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                >

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>


                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>


                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this about?"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>


                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Write your message..."
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition resize-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>


                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-sm"
                  >
                    Send Message →
                  </button>

                </form>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Contact;