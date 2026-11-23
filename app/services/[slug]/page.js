import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Button, PageHero, SectionTitle } from "@/components/UI";
import { Arrow } from "@/components/Icons";
import { serviceDivisions, services, getServiceBySlug, getServicesByDivision } from "@/data/services";

export function generateStaticParams() {
  return [
    ...serviceDivisions.map((division) => ({ slug: division.slug })),
    ...services.map((service) => ({ slug: service.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const division = serviceDivisions.find((item) => item.slug === slug);
  const service = getServiceBySlug(slug);
  const title = division?.title || service?.title || "Services";
  return {
    title,
    description: division?.description || service?.overview,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const division = serviceDivisions.find((item) => item.slug === slug);
  const service = getServiceBySlug(slug);
  if (!division && !service) notFound();

  if (division) {
    const divisionServices = getServicesByDivision(division.slug);
    return (
      <>
        <PageHero title={division.title} text={division.description} />
        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Available Services" subtitle="Choose a service to review its overview and process." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {divisionServices.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70}>
                  <article className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-navy-800">{item.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{item.overview}</p>
                    <Link href={`/services/${item.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-maroon-700">
                      View details <Arrow className="h-4 w-4" />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="ajrak-pattern py-12 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-2xl font-extrabold text-navy-800">Need guidance on this division?</h2>
            <p className="mt-3 text-slate-600">Share your requirement and the relevant team will explain the next steps.</p>
            <Button href={`/inquiry?service=${encodeURIComponent(division.title)}`} className="mt-5">Request a Consultation <Arrow className="h-4 w-4" /></Button>
          </div>
        </section>
      </>
    );
  }

  const divisionForService = serviceDivisions.find((item) => item.slug === service.division);
  return (
    <>
      <PageHero title={service.title} text={service.overview} />
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
          <div className="space-y-10">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon-700">{divisionForService?.title}</p>
              <h2 className="mt-3 text-2xl font-extrabold text-navy-800">Overview</h2>
              <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-extrabold text-navy-800">Benefits</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="rounded-lg bg-maroon-50 px-4 py-3 text-sm font-semibold text-navy-800">{benefit}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-extrabold text-navy-800">Service Process</h2>
              <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                {service.process.map((step, index) => (
                  <li key={step} className="rounded-xl border border-slate-100 p-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-maroon-700 text-sm font-bold text-white">{index + 1}</span>
                    <p className="mt-3 font-semibold text-navy-800">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <aside className="h-fit rounded-xl bg-navy-800 p-6 text-white shadow-lg">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Consultation</p>
            <h2 className="mt-2 text-xl font-extrabold">Discuss this service</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">Tell us what you need and we will help identify the appropriate next step.</p>
            <Button href={`/inquiry?service=${encodeURIComponent(divisionForService?.title || service.title)}`} variant="light" className="mt-5 w-full">Send an Inquiry <Arrow className="h-4 w-4" /></Button>
            <a href="https://wa.me/923005310821" target="_blank" rel="noreferrer" className="mt-3 block text-center text-sm font-semibold text-white underline">
              Chat on WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
