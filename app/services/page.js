import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PageHero, SectionTitle, Button } from "@/components/UI";
import { Arrow, ShieldCheck, Globe, Award } from "@/components/Icons";
import { serviceDivisions, services } from "@/data/services";

export const metadata = {
  title: "Our Services",
  description: "Business registration, consultancy, global trade and development services coordinated through Ajrak Impex International.",
};

const divisionIcons = [ShieldCheck, Globe, Award];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Business Services"
        text="Ajrak Impex International facilitates access to business services through a professional network of relevant service providers."
      />
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Three core divisions"
            title="Support for Your Business Journey"
            subtitle="Start with the area that matches your requirement. We coordinate the initial review and relevant next steps."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {serviceDivisions.map((division, index) => {
              const Icon = divisionIcons[index];
              const count = services.filter((service) => service.division === division.slug).length;
              return (
                <Reveal key={division.slug} delay={index * 100}>
                  <article className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-50 text-maroon-700">
                      <Icon className="h-7 w-7" />
                    </span>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-maroon-700">{count} services</p>
                    <h2 className="mt-2 text-xl font-extrabold text-navy-800">{division.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{division.description}</p>
                    <Button href={`/services/${division.slug}`} className="mt-5 self-start">
                      Explore Division <Arrow className="h-4 w-4" />
                    </Button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="All Services" subtitle="Select a service for an overview of the support available." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-bold text-navy-800 group-hover:text-maroon-700">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.overview}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-maroon-700">
                  View service <Arrow className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
