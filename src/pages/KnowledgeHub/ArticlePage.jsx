import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { articles, categories } from "./knowledgeData";

const ArticlePage = () => {
  const { slug } = useParams();

  // Find current article
  const article = articles.find(
    (item) => item.slug === slug
  );

  // Article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8faf9] text-slate-800">
        <Navbar />

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">

          <div className="text-5xl">📖</div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Article not found
          </h1>

          <p className="mt-2 max-w-md text-slate-500">
            The article you are looking for is not available yet.
          </p>

          <Link
            to="/knowledge-hub"
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            ← Back to Knowledge Hub
          </Link>

        </div>
      </div>
    );
  }

  // Find article category
  const category = categories.find(
    (item) => item.id === article.category
  );

  // Related articles
  const relatedArticles = articles
    .filter(
      (item) =>
        item.category === article.category &&
        item.slug !== article.slug
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800">
      <Navbar />

      {/* =====================================================
          ARTICLE HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">

          {/* Back */}
          <Link
            to={`/knowledge-hub/${article.category}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
          >
            ← Back to {category?.title || "Category"}
          </Link>

          <div className="mt-7">

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-2xl">
              {article.icon}
            </div>

            {/* Category + read time */}
            <div className="mt-5 flex flex-wrap items-center gap-3">

              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                {category?.title || "Knowledge"}
              </span>

              <span className="text-sm text-slate-400">
                {article.readTime}
              </span>

            </div>

            {/* Title */}
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
              {article.description}
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLE CONTENT
      ====================================================== */}
      <section className="bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
        <article className="mx-auto max-w-3xl">

          {article.content.map((section, index) => (
            <section
              key={section.heading}
              className="mb-9"
            >
              <div className="flex items-start gap-4">

                {/* Number */}
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>

                  <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                    {section.heading}
                  </h2>

                  <p className="mt-3 text-base leading-8 text-slate-600 sm:text-lg">
                    {section.text}
                  </p>

                </div>

              </div>
            </section>
          ))}

          {/* Continue Learning */}
          <div className="mt-5 rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Continue Learning
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              Knowledge grows through curiosity.
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Explore more topics and continue discovering the ideas and
              practices behind yoga.
            </p>

            <Link
              to="/knowledge-hub"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Explore Knowledge Hub →
            </Link>

          </div>
        </article>
      </section>

      {/* =====================================================
          RELATED ARTICLES
      ====================================================== */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">

            <div className="flex items-end justify-between gap-4">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Keep Exploring
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Related articles
                </h2>
              </div>

              <Link
                to={`/knowledge-hub/${article.category}`}
                className="hidden text-sm text-slate-400 hover:text-emerald-600 sm:block"
              >
                View all →
              </Link>

            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">

              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  to={`/knowledge-hub/article/${item.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-lg">
                      {item.icon}
                    </div>

                    <span className="text-xs text-slate-400">
                      {item.readTime}
                    </span>

                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-4 text-sm text-emerald-600">
                    Read article →
                  </div>

                </Link>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-slate-200 bg-[#f8faf9] px-4 py-7 text-center text-sm text-slate-400">
        <p>
          © 2026 FlowState · Ancient wisdom · Modern exploration
        </p>
      </footer>
    </div>
  );
};

export default ArticlePage;