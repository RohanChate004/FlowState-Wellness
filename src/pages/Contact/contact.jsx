import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary success state.
    // We'll connect this to Django in the next step.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#f5faf7]">
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-600">
                Get In Touch
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                We'd Love to Hear From You
              </h1>

              <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
                Have a question, feedback, or something you'd like
                to share? Connect with the FlowState team.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

              {/* Contact information */}
              <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-600">
                  Contact FlowState
                </p>

                <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
                  Let's Connect
                </h2>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Whether you have a question about FlowState,
                  want to share feedback, or need help using the
                  platform, we'd be happy to hear from you.
                </p>

                {[
                  {
                    icon: "📧",
                    title: "Email",
                    description:
                      "Reach out to us with your questions or feedback.",
                  },
                  {
                    icon: "💬",
                    title: "Feedback & Support",
                    description:
                      "Share your experience and help us improve FlowState.",
                  },
                  {
                    icon: "🌿",
                    title: "We're Listening",
                    description:
                      "Your questions and suggestions help shape the platform.",
                  },
                ].map((item) => (
                  <div key={item.title} className="mt-7 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback form */}
              <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">
                {submitted ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                      💚
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-gray-900 md:text-3xl">
                      Thank You for Sharing!
                    </h2>

                    <p className="mt-4 max-w-md leading-relaxed text-gray-600">
                      Your voice matters to us. Every suggestion and
                      every kind word helps FlowState grow into a
                      more supportive wellness space.
                    </p>

                    <p className="mt-4 font-medium text-green-700">
                      Keep taking small steps toward a healthier,
                      happier you. 🌿
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-7 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      Send Us a Message
                    </h2>

                    <p className="mt-3 text-sm text-gray-500">
                      Tell us how we can help or make FlowState better.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          maxLength={100}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          maxLength={254}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this about?"
                          required
                          maxLength={200}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your message..."
                          required
                          maxLength={5000}
                          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700"
                      >
                        Send Message →
                      </button>
                    </form>
                  </>
                )}
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
