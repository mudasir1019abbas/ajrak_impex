import ImageBox from "../components/ImageBox.jsx";
import Reveal from "../components/Reveal.jsx";
import { PageHero, SectionTitle } from "../components/UI.jsx";
import { timeline, values, certifications } from "../data/content.js";
import { FileCheck } from "../components/Icons.jsx";
import owner from "../assests/images/history/owner.jpg";
export default function About() {
  return (
    <>
      <PageHero title="About Ajrak Impex" text="Seven decades of trading, built on trust, craft and family." />

      {/* Timeline: horizontal on lg, vertical on smaller screens */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Our journey" title="Our History" />
          <ol className="relative grid gap-8 border-l-2 border-maroon-700/30 pl-6 lg:grid-cols-5 lg:gap-4 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-8">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 120} className="relative">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-2 border-white bg-maroon-700 ring-2 ring-maroon-700/40 lg:-top-[41px] lg:left-1/2 lg:-translate-x-1/2" />
                <div className="group text-left lg:text-center">
                  <div className="overflow-hidden rounded-lg">
                    <ImageBox src={t.img} alt={t.title} className="h-28 w-full grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-maroon-700">{t.year}</p>
                  <h3 className="text-sm font-bold text-navy-800">{t.title}</h3>
                  <p className="mt-1 text-xs text-slate-600">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Our story + values/certifications */}
      <section className="ajrak-pattern py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <Reveal direction="left" className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-5">
              <div className="sm:col-span-2">
                <div className="ajrak-pattern-dark rounded-lg p-2">
                  <ImageBox src={owner} alt="Our founders" className="aspect-[4/5] w-full rounded" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <h2 className="text-2xl font-extrabold text-navy-800">Our Story</h2>
                <span className="mt-2 block h-1 w-14 rounded bg-maroon-700" />
                <p className="mt-4 text-slate-600">
                  Ajrak Impex International began as a modest family shop selling hand-block-printed cloth in Karachi. Over generations
                  we grew into a trusted trading house, carrying Sindh&apos;s Ajrak heritage and Pakistan&apos;s finest agricultural goods to buyers around the world.
                </p>
                <p className="mt-3 text-slate-600">
                  Today the second generation leads the company, combining deep respect for artisans with modern logistics,
                  clear documentation and honest relationships. Every shipment carries our name and our family&apos;s promise.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="space-y-8" >
            <div id="values">
              <h3 className="text-lg font-extrabold text-navy-800">Our Values</h3>
              <ul className="mt-3 space-y-3">
                {values.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:translate-x-1 hover:shadow-md">
                    <Icon className="h-7 w-7 shrink-0 text-maroon-700" />
                    <div>
                      <p className="text-sm font-bold text-navy-800">{title}</p>
                      <p className="text-xs text-slate-600">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-navy-800">Certifications</h3>
              <ul className="mt-3 space-y-2">
                {certifications.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-slate-700">
                    <FileCheck className="h-5 w-5 text-maroon-700" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
