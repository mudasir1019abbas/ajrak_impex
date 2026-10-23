import Reveal from "../components/Reveal.jsx";
import ImageBox from "../components/ImageBox.jsx";
import { Button, PageHero, SectionTitle } from "../components/UI.jsx";
import { Arrow, Container, FileCheck, Globe } from "../components/Icons.jsx";
import { ajrak, cottonBales, driedGoods, shippingContainers, stoles } from "../data/images/index.js";

const categories = [
  { title: "Fashion", text: "Explore styles and apparel selected for changing trends.", image: stoles },
  { title: "Accessories", text: "Discover accessories that add a distinctive touch.", image: ajrak },
  { title: "Gadgets", text: "Ask us about product options and current availability.", image: shippingContainers },
  { title: "Sports Gear", text: "Talk with our team about sourcing sports and activity products.", image: cottonBales },
  { title: "Snacks", text: "Explore snack products and ask about current selections.", image: driedGoods },
];

const support = [
  { icon: Globe, title: "Global sourcing", text: "Discuss product options, budgets and sourcing with our team." },
  { icon: Container, title: "Logistics", text: "Plan shipping around your order, timeline and destination." },
  { icon: FileCheck, title: "Customs guidance", text: "Get support understanding the paperwork and clearance steps involved." },
];

export default function Services() {
  return (
    <>
      <PageHero title="Products & Import Support" text="Explore product categories and get step-by-step help with your first import." />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Trends from around the world"
            title="Product Categories"
            subtitle="Fashion, accessories, gadgets, sports gear, snacks, and more. Product selections, prices and availability are confirmed with you before an order."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => (
              <Reveal key={category.title} delay={index * 70} direction="zoom">
                <article className="h-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                  <ImageBox src={category.image} alt="" className="aspect-[4/3] w-full" />
                  <div className="p-4">
                    <h3 className="font-bold text-navy-800">{category.title}</h3>
                    <p className="mt-2 text-sm leading-5 text-slate-600">{category.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-slate-500">Images are illustrative; contact us for current product options and pricing.</p>
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
            <Button to="/contact">Discuss Your Requirements <Arrow className="h-4 w-4" /></Button>
          </div>
        </div>
      </section>
    </>
  );
}
