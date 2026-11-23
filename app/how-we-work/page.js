import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import { Button, PageHero, SectionTitle } from "@/components/UI";

export const metadata = {
  title: "How We Work",
  description: "Learn Ajrak Impex International's five-step trade process from inquiry and quotation to delivery.",
};

const steps = [
  {
    title: "Inquiry",
    text: "The customer sends the product, quantity, and destination.",
    detail: "Share the product name or specification, required quantity, preferred packing, and destination country. We use these details to confirm the sourcing route and prepare the next step.",
  },
  {
    title: "Quotation",
    text: "Supplier, price, and lead time are confirmed.",
    detail: "We coordinate supplier and price details, clarify the available quantity, and confirm the expected lead time. Special specifications or delivery requirements are discussed before the order is confirmed.",
  },
  {
    title: "Order",
    text: "Terms and payment are agreed upon in writing.",
    detail: "Commercial terms, product details, quantity, payment conditions, and delivery arrangements are documented and agreed upon in writing before shipment planning begins.",
  },
  {
    title: "Shipping",
    text: "Freight and import/export documentation are arranged.",
    detail: "The shipment is prepared with the agreed freight method and required import/export paperwork. Documentation is coordinated for the origin, transit, and destination requirements.",
  },
  {
    title: "Delivery",
    text: "Customs clearance and handover are completed.",
    detail: "The shipment moves through customs clearance and the agreed delivery process. After clearance and handover are completed, the goods are made available to the customer at the confirmed location.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        title="How We Work"
        text="A clear, documented trade process from first inquiry to final handover."
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Our trade process"
            title="Five Steps From Inquiry to Delivery"
            subtitle="Each stage is confirmed and documented so that product, commercial, shipping, and delivery details remain clear."
          />

          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80} direction="zoom">
                <li className="h-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-700 text-lg font-bold text-white shadow-md">
                    {index + 1}
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-maroon-700">Step {index + 1}</p>
                  <h2 className="mt-2 text-xl font-extrabold text-navy-800">{step.title}</h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-navy-800">{step.text}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.15fr_1fr] md:items-center lg:px-8">
          <Reveal direction="left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">Start an enquiry</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-800">Tell Us What You Need</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Send the product, quantity, destination, and any packaging or timing requirements. Our team will guide you through quotation, documentation, shipment, and delivery.
            </p>
          </Reveal>
          <Reveal direction="right" className="rounded-xl bg-navy-800 p-6 text-white shadow-lg sm:p-8">
            <h3 className="text-xl font-bold">Prepare Your Inquiry</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-white/80">
              <li>Product name or specifications</li>
              <li>Required quantity and packing</li>
              <li>Destination country or port</li>
              <li>Preferred timing and special requirements</li>
            </ul>
            <Button href="/inquiry" variant="light" className="mt-6 w-full">
              Submit an Inquiry <Arrow className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
