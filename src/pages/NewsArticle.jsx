import { Link, useParams } from "react-router-dom";
import { Arrow } from "../components/Icons.jsx";
import { PageHero } from "../components/UI.jsx";
import { newsArticles } from "../data/content.js";
import NotFound from "./NotFound.jsx";

export default function NewsArticle() {
  const { slug } = useParams();
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) return <NotFound />;

  return (
    <>
      <PageHero title={article.title} text={article.text} />
      <article className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <span className="rounded-full bg-maroon-50 px-3 py-1 text-sm font-semibold text-maroon-700">{article.tag}</span>
            <time className="text-sm text-slate-500">{article.date}</time>
          </div>

          <div className="space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-navy-800">{section.heading}</h2>
                <div className="mt-3 space-y-4 leading-7 text-slate-600">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <Link
            to="/news"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-maroon-700 transition hover:gap-3"
          >
            <Arrow className="h-4 w-4 rotate-180" />
            Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
