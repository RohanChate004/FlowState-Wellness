import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { articles, categories } from "./knowledgeData";

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Find current category
  const category = categories.find(
    (item) => item.id === categoryId
  );

  // Find articles belonging to this category
  const categoryArticles = articles.filter(
    (article) => article.category === categoryId
  );

  // If category doesn't exist
  if (!category) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white">
        <Navbar />

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="text-5xl">🔍</div>

          <h1 className="mt-5 text-3xl font-bold">
            Category not found
          </h1>

          <p className="mt-3 text-slate-400">
            The knowledge category you are looking for does not exist.
          </p>

          <Link
            to="/knowledge-hub"
            className="mt-6 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-[#1a1205]"
          >
            Back to Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/6 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-[10%] h-72 w-72 rounded-full bg-amber-400/6 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Back button */}
          <Link
            to="/knowledge-hub"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-amber-200"
          >
            ← Back to Knowledge Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 max-w-3xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] text-3xl">
              {category.icon}
            </div>

            <span className="mt-6 block text-sm font-medium uppercase tracking-[0.25em] text-amber-300/70">
              Knowledge Category
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {category.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              {category.description}
            </p>

            <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-slate-400">
              {categoryArticles.length} article
              {categoryArticles.length !== 1 ? "s" : ""} to explore
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/70">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Articles in this category
            </h2>
          </motion.div>

          {categoryArticles.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {categoryArticles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <Link
                    to={`/knowledge-hub/article/${article.slug}`}
                    className="group block h-full rounded-2xl border border-white/8 bg-white/2.5 p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-300/6 text-xl">
                        {article.icon}
                      </div>

                      <span className="rounded-full border border-white/8 px-3 py-1 text-xs text-slate-500">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white transition group-hover:text-amber-200">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {article.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-amber-300">
                      Read article

                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/2 p-8 text-center">
              <div className="text-4xl">📚</div>

              <h3 className="mt-4 text-xl font-semibold">
                Articles coming soon
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                We are building content for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* EXPLORE OTHER CATEGORIES */}
      <section className="border-t border-white/6 px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold">
            Explore other categories
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories
              .filter((item) => item.id !== categoryId)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/knowledge-hub/${item.id}`}
                  className="rounded-xl border border-white/8 bg-white/2.5 px-4 py-3 text-sm text-slate-400 transition hover:border-amber-300/25 hover:text-amber-200"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;