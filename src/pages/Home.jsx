import { Link } from "react-router-dom";
import ImageBox from "../components/ImageBox.jsx";
import Reveal from "../components/Reveal.jsx";
import { Button, SectionTitle } from "../components/UI.jsx";
import { Emblem } from "../components/Logo.jsx";
import { promises, logistics, supplyChain, catalog, caseStudies } from "../data/content.js";
import { Arrow } from "../components/Icons.jsx";
import homeAjrak from "../assests/images/home-ajrak.jpg";
import containers from "../assests/images/shipping-containers.jpg";
import handShake from "../assests/images/hand-shake.jpg";
function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-800">
      <div className="mx-auto grid max-w-7xl gap-1 sm:gap-2 lg:grid-cols-12 lg:px-0">
        {/* Left container image (desktop) */}
        <ImageBox
          src={containers}
          alt="Stacked shipping containers"
          label="Shipping containers"
          className="hidden h-full min-h-[420px] w-full animate-fade-in lg:col-span-3 lg:block"
        />

        {/* Centre message */}
        <div className="relative flex min-h-[420px] flex-col items-center justify-center px-6 py-5 text-center lg:col-span-5 lg:min-h-[460px]">
          <Emblem className="mb-6 h-24 w-24 animate-float sm:h-28 sm:w-28" />
          <h1 className="animate-fade-up text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            Global Trade,
            <br className="hidden sm:block" /> Distinguished by Heritage.
          </h1>
          <p className="mt-4 max-w-md animate-fade-up text-white/80 [animation-delay:200ms]">
            Reliable Ajrak textiles &amp; general trade from Pakistan to the world.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 animate-fade-up [animation-delay:400ms]">
            <Button to="/services" className="animate-pulse-ring">Explore Products</Button>
            <Button to="/services" className="px-14 border-white text-white" variant="outline">Services</Button>
          </div>
        </div>

        {/* Right stacked images */}
        <div className="grid animate-slide-left gap-0.1 grid-rows-2  lg:col-span-4 lg:grid-cols-1">
          <ImageBox src={homeAjrak} alt="Hands holding Ajrak cloth" label="Ajrak textile" className="h-44 w-full sm:h-56 lg:h-[228px]" />
          <ImageBox src={handShake} alt="Business handshake" label="Trusted partnerships" className="h-44 w-full sm:h-56 lg:h-[228px]" />
        </div>
      </div>
    </section>
  );
}

function PromiseSection() {
  return (
    <section className="ajrak-pattern py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Our Promise" />
        <div className="grid gap-6 sm:grid-cols-3">
          {promises.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120} direction="zoom">
              <div className="group h-full rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon-50 text-maroon-700 transition duration-500 group-hover:rotate-[360deg] group-hover:bg-maroon-700 group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-800">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <Reveal direction="left">
          <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">1) Global Logistics &amp; Supply Chain</h2>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {logistics.map(({ icon: Icon, label }) => (
              <div key={label} className="group rounded-lg p-3 transition duration-300 hover:-translate-y-1 hover:bg-maroon-50">
                <Icon className="mx-auto h-10 w-10 text-maroon-700 transition-transform duration-300 group-hover:scale-110" />
                <p className="mt-2 text-sm font-semibold text-navy-800">{label}</p>
              </div>
            ))}
          </div>
          <Button to="/services" className="mt-6">Explore Our Services <Arrow className="h-4 w-4" /></Button>
        </Reveal>

        <Reveal direction="right">
          <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">2) Cultural Exports</h2>
          <p className="mt-1 text-sm text-slate-600">A curated catalog of Ajrak fabrics, traditional wear and exports.</p>
          <div className="mt-5 grid items-center gap-4 sm:grid-cols-2">
            <ol className="space-y-2">
              {supplyChain.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm font-medium text-navy-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon-700 text-xs font-bold text-white">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            {/* Animated truck on the road */}
            <div className="relative h-36 overflow-hidden rounded-lg bg-gradient-to-b from-sky-100 to-amber-50">
              <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-600" />
              <div className="absolute inset-x-0 bottom-[18px] border-t-2 border-dashed border-white/80" />
              <div className="absolute bottom-8 left-0 w-full animate-drive text-maroon-700">
                <svg viewBox="0 0 64 32" className="h-12 w-24" aria-hidden="true">
                  <rect x="2" y="6" width="38" height="18" rx="2" fill="#7a1c2a" />
                  <path d="M40 12h12l8 8v4H40z" fill="#14294f" />
                  <circle cx="14" cy="26" r="4" fill="#1f2937" /><circle cx="48" cy="26" r="4" fill="#1f2937" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Catalog() {
  return (
    <section id="catalog" className="bg-slate-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Our products" title="Featured Catalog" subtitle="Heritage textiles and general trade goods, sourced directly and shipped worldwide." />
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
  );
}

function CaseStudies() {
  return (
    <section id="case-studies" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Proven results" title="Case Studies" subtitle="Past projects with global businesses and agricultural suppliers." />
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="overflow-hidden">
                  <ImageBox src={c.img} alt={c.title} className="h-44 w-full transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-navy-800">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{c.text}</p>
                  <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-maroon-700 transition-all hover:gap-2">
                    Case Studies <Arrow className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <PromiseSection />
      <ServicesPreview />
      <Catalog />
      <CaseStudies />
      <section className="ajrak-pattern-dark py-14 text-center text-white">
        <Reveal className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to trade with heritage you can trust?</h2>
          <p className="mt-3 text-white/75">Tell us what you need to import or export and we will get back within one business day.</p>
          <Button to="/contact" variant="light" className="mt-6">Contact Us <Arrow className="h-4 w-4" /></Button>
        </Reveal>
      </section>
    </>
  );
}
