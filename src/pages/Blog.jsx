import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { PageHero } from "../components/UI.jsx";
import { posts } from "../data/content.js";
import { Arrow } from "../components/Icons.jsx";
import { Link } from "react-router-dom";

export default function Blog() {
  const tags = ["All", ...new Set(posts.map((p) => p.tag))];
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? posts : posts.filter((p) => p.tag === tag);

  return (
    <>
      <PageHero title="Blog" text="News, guides and stories from the world of Ajrak and global trade." />
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition duration-300 ${
                  tag === t ? "bg-maroon-700 text-white shadow" : "bg-slate-100 text-slate-700 hover:bg-maroon-50 hover:text-maroon-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 100}>
                <article className="group flex h-full flex-col rounded-xl p-6 shadow ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-maroon-50 px-3 py-1 font-semibold text-maroon-700">{p.tag}</span>
                    <time className="text-slate-500">{p.date}</time>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-navy-800 transition-colors group-hover:text-maroon-700">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{p.text}</p>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-maroon-700 transition-all duration-300 group-hover:gap-3"
                  >
                    Read more <Arrow className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
