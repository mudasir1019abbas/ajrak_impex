import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageBox from "../components/ImageBox.jsx";
import Reveal from "../components/Reveal.jsx";
import { Button, PageHero, SectionTitle } from "../components/UI.jsx";
import { logistics, supplyChain, catalog, caseStudies } from "../data/content.js";

export default function Services() {
  const { hash } = useLocation();

  // Scroll to #catalog / #case-studies when arriving from the Resources menu
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
  }, [hash]);

  return (
    <>
      <PageHero title="Our Services" text="End-to-end logistics and a curated catalog of cultural exports." />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="1) Global logistics" title="Logistics & Supply Chain" />
          <div className="grid gap-6 sm:grid-cols-3">
            {logistics.map(({ icon: Icon, label }, i) => (
              <Reveal key={label} delay={i * 120} direction="zoom">
                <div className="group h-full rounded-xl p-6 text-center shadow ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Icon className="mx-auto h-12 w-12 text-maroon-700 transition-transform duration-500 group-hover:scale-125" />
                  <h3 className="mt-3 font-bold text-navy-800">{label}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Reliable handling from origin to destination with tracking and full documentation.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <h3 className="mb-4 text-center text-lg font-bold text-navy-800">Our supply chain flow</h3>
            <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {supplyChain.map((s, i) => (
                <li key={s} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 rounded-lg border border-maroon-700/30 bg-maroon-50 px-4 py-3 text-center text-sm font-semibold text-maroon-800 transition duration-300 hover:bg-maroon-700 hover:text-white">
                    {s}
                  </div>
                  {i < supplyChain.length - 1 && <span className="hidden text-maroon-700 md:block" aria-hidden>&rarr;</span>}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="catalog" className="ajrak-pattern py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="2) Cultural exports" title="Product Catalog" subtitle="A curated range of Ajrak fabrics, traditional goods and agricultural exports." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {catalog.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 90} direction="zoom">
                <figure className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                  <div className="overflow-hidden">
                    <ImageBox src={c.img} alt={c.name} className="aspect-square w-full transition duration-500 group-hover:scale-110" />
                  </div>
                  <figcaption className="px-3 py-2 text-center text-sm font-semibold text-navy-800">{c.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Proven results" title="Case Studies" />
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <article className="group h-full overflow-hidden rounded-xl shadow ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="overflow-hidden">
                    <ImageBox src={c.img} alt={c.title} className="h-44 w-full transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-navy-800">{c.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{c.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/contact">Request a Quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
