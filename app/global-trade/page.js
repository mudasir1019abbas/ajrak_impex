import Reveal from "@/components/Reveal";
import { Button, PageHero, SectionTitle } from "@/components/UI";
import { Arrow, Globe, Container, Plane, FileCheck, Truck } from "@/components/Icons";

export const metadata = {
  title: "Global Trade",
  description: "Import, export, sourcing, purchasing and trade facilitation support through Ajrak Impex International.",
};

const areas = [
  { icon: Plane, title: "Import Consultancy", text: "Plan product selection, supplier communication, shipment and import requirements." },
  { icon: Globe, title: "Export Consultancy", text: "Prepare export enquiries around market research, documentation and buyer communication." },
  { icon: Container, title: "Global Sourcing", text: "Define product specifications and coordinate suitable supplier quotations." },
  { icon: FileCheck, title: "International Purchasing", text: "Organise purchasing requirements, commercial terms and logistics follow-up." },
  { icon: Truck, title: "Trade Facilitation", text: "Coordinate introductions to logistics and professional service providers for the next step." },
  { icon: Globe, title: "Business Opportunities", text: "Discuss emerging product or market opportunities and practical entry requirements." },
];

export default function GlobalTradePage() {
  return (
    <>
      <PageHero
        title="Global Trade"
        text="Practical coordination for import, export, sourcing and international business opportunities."
      />
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Connect local ambition with global markets"
            title="Trade Services"
            subtitle="Ajrak Impex facilitates trade enquiries through a professional network of relevant service providers."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 80}>
                <article className="h-full rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-50 text-maroon-700">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 text-lg font-bold text-navy-800">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal direction="left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">A coordinated process</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-800">From Trade Question to Clear Next Step</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Share the product, destination, quantity or service needed. We help organise the initial review and coordinate relevant providers.
            </p>
          </Reveal>
          <Reveal direction="right" className="rounded-xl bg-navy-800 p-7 text-white shadow-lg">
            <ol className="space-y-5">
              {["Describe your trade requirement", "Review requirements and documents", "Coordinate relevant professionals", "Receive an update and next-step plan"].map((step, index) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon-700 font-bold">{index + 1}</span>
                  <span className="font-semibold">{step}</span>
                </li>
              ))}
            </ol>
            <Button href="/contact" variant="light" className="mt-6 w-full">Submit a Trade Inquiry <Arrow className="h-4 w-4" /></Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
