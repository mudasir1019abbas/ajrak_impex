import Reveal from "@/components/Reveal";
import ProductCatalog from "@/components/ProductCatalog";
import { Button, PageHero, SectionTitle } from "@/components/UI";
import { Arrow, Container, FileCheck, Globe } from "@/components/Icons";
import productCategories from "@/data/products";

export const metadata = {
  title: "Products & Categories",
  description: "Browse machinery, electronics, gadgets, toys, footwear, home goods, jewelry and industrial chemicals.",
};

const support = [
  { icon: Globe, title: "Global sourcing", text: "Discuss product options, budgets and sourcing with our team." },
  { icon: Container, title: "Logistics", text: "Plan shipping around your order, timeline and destination." },
  { icon: FileCheck, title: "Customs guidance", text: "Get support understanding the paperwork and clearance steps involved." },
];

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Products"
        text="Explore our product range by category. Choose a category to see the products available for sourcing."
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Find what you need"
            title="Explore Our Categories"
            subtitle="Source machinery, electronics, gaming products, mobile accessories, toys, travel items, shoes, home goods, kitchen products, jewelry and industrial chemicals."
          />
          <ProductCatalog categories={productCategories} />
          <p className="mt-6 text-center text-sm text-slate-500">
            Product photos are illustrative. Product options, pricing and availability are confirmed with you before an order.
          </p>
          <div className="mt-7 text-center">
            <Button href="/contact">Ask About Our Products <Arrow className="h-4 w-4" /></Button>
          </div>
        </div>
      </section>

      <section id="sodium-dithionite" className="bg-navy-800 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center lg:px-8">
          <Reveal direction="left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">Featured Chemical Product</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Sodium Dithionite (Rangkat)</h2>
            <p className="mt-5 leading-7 text-white/80">
              Used in textile dyeing, discharge printing, stripping, and other industrial processes. We supply Pakistani textile and printing units with bulk packing available.
            </p>
            <ul className="mt-5 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              <li className="rounded-lg bg-white/10 px-4 py-3">Technical data available on request</li>
              <li className="rounded-lg bg-white/10 px-4 py-3">Safety Data Sheet available on request</li>
              <li className="rounded-lg bg-white/10 px-4 py-3">Bulk packing and supply planning</li>
              <li className="rounded-lg bg-white/10 px-4 py-3">Import documentation arranged by Ajrak Impex</li>
            </ul>
            <Button href="/contact?category=Industrial%20Chemicals" className="mt-7">Request Pricing &amp; Specifications <Arrow className="h-4 w-4" /></Button>
          </Reveal>
          <Reveal direction="right" className="rounded-xl border border-white/15 bg-white/10 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-white/60">Industrial Chemical Supply</p>
            <h3 className="mt-3 text-xl font-bold">For Textile and Printing Units</h3>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Enquire for quantity, packing requirements, current pricing, technical specifications and import documentation support.
            </p>
            <div className="mt-6 border-t border-white/15 pt-5 text-sm text-white/75">
              Supplied to Pakistani textile and printing units.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Support From First Step to Delivery" subtitle="Importing can feel complicated. We work through the key steps with you and explain what to expect." />
          <div className="grid gap-6 md:grid-cols-3">
            {support.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 100}>
                <article className="h-full rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
                  <Icon className="mx-auto h-11 w-11 text-maroon-700" />
                  <h3 className="mt-4 font-bold text-navy-800">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Button href="/contact">Discuss Your Requirements <Arrow className="h-4 w-4" /></Button>
          </div>
        </div>
      </section>
    </>
  );
}
