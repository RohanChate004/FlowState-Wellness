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

  // Category not found
  if (!category) {
    return (
      <div className="min-h-screen bg-[#f8faf9] text-slate-800">
        <Navbar />

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="text-5xl">🔍</div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Category not found
          </h1>

          <p className="mt-2 max-w-md text-slate-500">
            The knowledge category you are looking for does not exist.
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

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">

          {/* Back */}
          <Link
            to="/knowledge-hub"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
          >
            ← Back to Knowledge Hub
          </Link>

          <div className="mt-7 max-w-3xl">

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-2xl">
              {category.icon}
            </div>

            <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Knowledge Category
            </span>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {category.title}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              {category.description}
            </p>

            <div className="mt-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
              {categoryArticles.length} article
              {categoryArticles.length !== 1 ? "s" : ""} to explore
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLES
      ====================================================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Articles in this category
            </h2>
          </div>

          {categoryArticles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">

              {categoryArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/knowledge-hub/article/${article.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-xl">
                      {article.icon}
                    </div>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-400">
                      {article.readTime}
                    </span>

                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-emerald-700">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {article.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600">
                    Read article →
                  </div>
                </Link>
              ))}

            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

              <div className="text-4xl">📚</div>

              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                Articles coming soon
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                We are building content for this category.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          OTHER CATEGORIES
      ====================================================== */}
      <section className="border-t border-slate-200 bg-white px-4 py-9 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">

          <h2 className="text-2xl font-bold text-slate-900">
            Explore other categories
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">

            {categories
              .filter((item) => item.id !== categoryId)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/knowledge-hub/${item.id}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <span className="mr-2">
                    {item.icon}
                  </span>

                  {item.title}
                </Link>
              ))}

          </div>
        </div>
      </section>

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

export default CategoryPage;