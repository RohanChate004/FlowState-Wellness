import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { articles, categories } from "./knowledgeData";

const ArticlePage = () => {
  const { slug } = useParams();

  // Find current article
  const article = articles.find((item) => item.slug === slug);

  // Article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white">
        <Navbar />

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="text-5xl">📖</div>

          <h1 className="mt-5 text-3xl font-bold">
            Article not found
          </h1>

          <p className="mt-3 max-w-md text-slate-400">
            The article you are looking for is not available yet.
          </p>

          <Link
            to="/knowledge-hub"
            className="mt-6 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-[#1a1205] transition hover:bg-amber-200"
          >
            Back to Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  // Find article category
  const category = categories.find(
    (item) => item.id === article.category
  );

  // Related articles from same category
  const relatedArticles = articles
    .filter(
      (item) =>
        item.category === article.category &&
        item.slug !== article.slug
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <Navbar />

      {/* ARTICLE HERO */}
      <section className="relative overflow-hidden border-b border-white/6 px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-[10%] h-72 w-72 rounded-full bg-amber-400/6 blur-[140px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Back */}
          <Link
            to={`/knowledge-hub/${article.category}`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-amber-200"
          >
            ← Back to {category?.title || "Category"}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] text-3xl">
              {article.icon}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-amber-300/15 bg-amber-300/6 px-3 py-1 text-xs text-amber-200">
                {category?.title || "Knowledge"}
              </span>

              <span className="text-sm text-slate-500">
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              {article.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-4 py-14 sm:px-6 lg:px-10">
        <article className="mx-auto max-w-3xl">
          {article.content.map((section, index) => (
            <motion.section
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="mb-10"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-300/15 bg-amber-300/5 text-xs text-amber-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                    {section.heading}
                  </h2>

                  <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">
                    {section.text}
                  </p>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Article end */}
          <div className="mt-4 rounded-2xl border border-amber-300/12 bg-linear-to-br from-amber-300/6 to-transparent p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-amber-300/70">
              Continue Learning
            </p>

            <h3 className="mt-3 text-xl font-semibold text-white">
              Knowledge grows through curiosity.
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-400">
              Explore more topics and continue discovering the ideas and
              practices behind yoga.
            </p>

            <Link
              to="/knowledge-hub"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition hover:text-amber-200"
            >
              Explore Knowledge Hub →
            </Link>
          </div>
        </article>
      </section>

      {/* RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-white/6 px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-300/70">
                  Keep Exploring
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Related articles
                </h2>
              </div>

              <Link
                to={`/knowledge-hub/${article.category}`}
                className="hidden text-sm text-slate-400 transition hover:text-amber-200 sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {relatedArticles.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <Link
                    to={`/knowledge-hub/article/${item.slug}`}
                    className="group block h-full rounded-2xl border border-white/8 bg-white/2.5 p-5 transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-300/6 text-lg">
                        {item.icon}
                      </div>

                      <span className="text-xs text-slate-500">
                        {item.readTime}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white group-hover:text-amber-200">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>

                    <div className="mt-4 text-sm text-amber-300">
                      Read article →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/6 px-4 py-8 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-5xl">
          <p>© 2026 FlowState · Ancient wisdom · Modern exploration</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticlePage;