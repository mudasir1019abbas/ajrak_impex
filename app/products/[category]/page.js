import { notFound } from "next/navigation";
import ImageBox from "@/components/ImageBox";
import Reveal from "@/components/Reveal";
import { Arrow, Container, FileCheck, Globe, Truck } from "@/components/Icons";
import { Button, PageHero, SectionTitle } from "@/components/UI";
import productCategories from "@/data/products";

const tradeSteps = [
  ["Inquiry", "Share the product, specifications, quantity, and destination."],
  ["Quotation", "Review sourcing options, pricing, lead time, and applicable terms."],
  ["Order", "Confirm the order and responsibilities in writing before proceeding."],
  ["Shipping", "Coordinate freight and prepare the required trade documentation."],
  ["Delivery", "Coordinate customs-clearance steps and delivery arrangements."],
];

export function generateStaticParams() {
  return productCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = productCategories.find((item) => item.slug === slug);

  return category
    ? {
        title: category.title,
        description: category.overview,
      }
    : {};
}

export default async function ProductCategoryPage({ params }) {
  const { category: slug } = await params;
  const category = productCategories.find((item) => item.slug === slug);

  if (!category) notFound();

  const inquiryHref = `/inquiry?category=${encodeURIComponent(category.title)}`;

  return (
    <>
      <PageHero title={category.title} text={category.description} />

      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">
              Category overview
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-800 sm:text-3xl">
              Sourcing for your business
            </h2>
            <p className="mt-4 leading-7 text-slate-600">{category.overview}</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Product specifications, availability, pricing, and minimum quantities are confirmed for each inquiry.
            </p>
            <Button href={inquiryHref} className="mt-6">
              Request a Trade Quotation <Arrow className="h-4 w-4" />
            </Button>
          </Reveal>

          <Reveal direction="right" className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 shadow-sm">
              <ImageBox
                src={category.image}
                alt={category.alt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                fill
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ajrak-pattern py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Product range"
            title={`Explore ${category.title}`}
            subtitle="Examples to help define your requirement. Availability and specifications are confirmed before quotation."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <article
                key={product.title}
                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <ImageBox
                    src={product.image}
                    alt={product.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="min-h-14 px-4 py-4 font-bold leading-6 text-navy-800">
                  {product.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-50 text-maroon-700">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-navy-800">Trade corridors & logistics</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{category.corridor}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-maroon-700" />Freight planning for the agreed route</li>
              <li className="flex gap-2"><FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-maroon-700" />Import and shipment documentation coordination</li>
              <li className="flex gap-2"><Container className="mt-0.5 h-4 w-4 shrink-0 text-maroon-700" />Customs-clearance coordination through Karachi</li>
            </ul>
          </article>

          <article className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:p-6">
            <h2 className="text-lg font-bold text-navy-800">A good fit for</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              We work with buyers to clarify their specifications, quantities, and market requirements.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {category.buyerFit.map((buyer) => (
                <li key={buyer} className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                  {buyer}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="ajrak-pattern py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="How it works"
            title="From inquiry to delivery"
            subtitle="A clear five-step process keeps product requirements, costs, and responsibilities aligned."
          />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {tradeSteps.map(([title, description], index) => (
              <li key={title} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-maroon-700">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 font-bold text-navy-800">{title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={inquiryHref}>
              Ask About {category.title} <Arrow className="h-4 w-4" />
            </Button>
            <Button href="/products" variant="outline">Browse All Categories</Button>
          </div>
        </div>
      </section>
    </>
  );
}
