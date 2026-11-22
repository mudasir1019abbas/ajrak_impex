import Link from "next/link";
import ImageBox from "@/components/ImageBox";
import Reveal from "@/components/Reveal";
import { Button, SectionTitle } from "@/components/UI";
import { Arrow, Award, Globe, ShieldCheck, Truck } from "@/components/Icons";
import ImpactStats from "@/components/ImpactStats";
import productCategories from "@/data/products";
import { shippingContainers } from "@/data/images";

const paths = [
  {
    title: "Business Registration & Compliance",
    text: "Coordinate company, tax, trademark and statutory registration requirements with relevant professionals.",
    action: "Explore Registration",
    to: "/services/business-registration",
  },
  {
    title: "Business & Foreign Consultancy",
    text: "Plan import and export, sourcing, purchasing, visas and other cross-border requirements.",
    action: "Explore Consultancy",
    to: "/services/business-foreign-consultancy",
  },
  {
    title: "Business Development & Innovation",
    text: "Develop business ideas, improve existing operations and build practical capabilities.",
    action: "Explore Development",
    to: "/services/business-development",
  },
];

const reasons = [
  { icon: Award, title: "Affordable", text: "Global trends at fair prices." },
  {
    icon: ShieldCheck,
    title: "Quality-checked",
    text: "Products reviewed before they reach you.",
  },
  {
    icon: Globe,
    title: "Beginner-friendly",
    text: "Step-by-step guidance, with no jargon.",
  },
  {
    icon: Truck,
    title: "Transparent",
    text: "Clear terms and straightforward communication.",
  },
];

const steps = [
  { title: "Inquiry", text: "Send the product, quantity, and destination." },
  { title: "Quotation", text: "Confirm the supplier, price, and lead time." },
  { title: "Order", text: "Agree on terms and payment in writing." },
  { title: "Shipping", text: "Arrange freight and trade documentation." },
  { title: "Delivery", text: "Complete customs clearance and handover." },
];

const branchSocialLinks = [
  {
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029Vb9tRqY05MUdmvrAg10L",
  },
  { label: "Facebook", href: "https://www.facebook.com/ajrakimpex1" },
  { label: "Instagram", href: "https://www.instagram.com/ajrakimpex" },
  { label: "TikTok", href: "https://www.tiktok.com/@ajrakimpex1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ajrakimpex" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden text-white">
        <div className="mx-auto grid min-[769px]:grid-cols-2">
          <div
            id="bg-issue"
            className="bg-navy-700 containers-background animate-fade-up flex flex-col justify-center px-4 py-14 sm:px-6 md:py-20 lg:px-8"
            style={{ "--hero-image": `url("${shippingContainers.src}")` }}
          >
            <p
              id="bussiness-goal"
              className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold uppercase tracking-[0.25em] text-white/70"
            >
              {["Ajrak", "Impex", "International"].map((word) => (
                <span key={word} className="inline-flex items-center gap-2">
                  <span>{word}</span>
                </span>
              ))}
            </p>
            <h1 className="tex-centermt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Trade Between Pakistan, China and the Middle East, <br />
              Handled End to End.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-7 text-white/80">
              Ajrak Impex sources and ships machinery, electronics, consumer
              goods, and industrial chemicals for buyers and sellers in
              Pakistan, with paperwork, freight, and clearance managed from its
              Karachi office.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contact"
                className="min-h-12 w-full px-6 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800 sm:w-auto"
              >
                Send a Trade Inquiry <Arrow className="h-4 w-4" />
              </Button>
              <Button
                href="#trade-routes"
                variant="light"
                className="min-h-12 w-full px-6 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800 sm:w-auto"
              >
                Explore Trade Routes <Arrow className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative hidden min-h-72 animate-fade-up min-[769px]:block sm:min-h-96 md:min-h-full">
            <ImageBox
              src={shippingContainers}
              alt="Shipping containers"
              priority
              sizes="50vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <ImpactStats />

      <section id="trade-routes" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Our trade routes"
            title="Trade between Pakistan, China and the Middle East, handled end to end."
            subtitle="Ajrak Impex sources and ships machinery, electronics, consumer goods, and industrial chemicals for buyers and sellers in Pakistan, with paperwork, freight, and clearance managed from its Karachi office."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-xl bg-navy-800 p-6 text-white shadow-sm sm:p-8">
                <Globe className="h-9 w-9 text-white/80" />
                <h3 className="mt-4 text-2xl font-extrabold">
                  China to Pakistan
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-white/85">
                  <li>
                    Direct sourcing from manufacturers and wholesale markets.
                  </li>
                  <li>
                    Machinery, electronics, gadgets, toys, footwear, and home
                    goods.
                  </li>
                  <li>Quotations according to required quantities.</li>
                </ul>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="h-full rounded-xl bg-maroon-700 p-6 text-white shadow-sm sm:p-8">
                <Truck className="h-9 w-9 text-white/80" />
                <h3 className="mt-4 text-2xl font-extrabold">
                  Middle East and Pakistan
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-white/85">
                  <li>
                    Trade with Gulf and regional partners in both directions.
                  </li>
                  <li>Consumer items, jewelry, and chemicals.</li>
                  <li>Documentation prepared for shipments.</li>
                </ul>
              </article>
            </Reveal>
          </div>
          <div className="mt-7 text-center">
            <Button href="/contact">
              Discuss a Trade Inquiry <Arrow className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section id="khairpur-branch" className="ajrak-pattern py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">
              Khairpur Mirs Branch
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-800">
              Supporting Local Businesses and New Ideas
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The new branch supports new business ideas and existing
              businesses, including e-commerce and online businesses. It aims to
              help small businesses, vendors, investors, and young talent
              explore opportunities for business growth and scaling.
            </p>
            <p className="mt-5 font-semibold text-navy-800">
              Follow our channels for information and updates:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {branchSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-navy-800/20 bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition hover:border-maroon-700 hover:text-maroon-700"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal
            direction="right"
            className="flex flex-col justify-center rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"
          >
            <h3 className="text-xl font-extrabold text-navy-800">
              Growing With the Community
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li>Developing new business ideas.</li>
              <li>Supporting existing businesses and vendors.</li>
              <li>Encouraging e-commerce and online business.</li>
              <li>
                Connecting small businesses, investors, and young talent with
                growth opportunities.
              </li>
            </ul>
            <Button href="/contact" className="mt-6 self-start">
              Contact Our Team <Arrow className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Explore our range"
            title="Products for Every Need"
            subtitle="Explore machinery, electronics, gaming gadgets, accessories, toys, travel items, footwear, home goods, kitchen products, jewelry and industrial chemicals."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {productCategories.map((product, index) => (
              <Reveal key={product.title} delay={index * 80} direction="zoom">
                <Link
                  href="/products"
                  className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageBox
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="h-full w-full transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="px-3 py-3 text-left font-bold text-navy-800 group-hover:text-maroon-700">
                    {product.title}
                  </h3>
                  <p className="px-4 pb-4 text-left text-sm leading-5 text-slate-600">
                    {product.description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Button href="/products" variant="outline">
              View All Categories <Arrow className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <section className="ajrak-pattern py-14" id="layers-to-work">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Find your starting point"
            title="Three Ways to Grow With Us"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {paths.map((path, index) => (
              <Reveal key={path.title} delay={index * 100}>
                <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <p className="text-sm font-bold uppercase tracking-wider text-maroon-700">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-navy-800">
                    {path.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {path.text}
                  </p>
                  <Button href={path.to} className="mt-5 self-start">
                    {path.action} <Arrow className="h-4 w-4" />
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="A clear way forward"
            title="Built for Beginners. Backed by Process."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 80}>
                <div className="h-full rounded-xl bg-slate-50 p-5 text-center ring-1 ring-slate-100">
                  <Icon className="mx-auto h-9 w-9 text-maroon-700" />
                  <h3 className="mt-3 font-bold text-navy-800">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Our trade process"
            title="How We Work"
            subtitle="A clear five-step flow from your initial enquiry to final delivery."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <li className="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-700 font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-bold text-navy-800">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-7 text-center">
            <Button href="/how-we-work" variant="outline">
              View the Full Process <Arrow className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal direction="left">
            <h2 className="text-2xl font-extrabold text-navy-800 sm:text-3xl">
              Made for Young, Ambitious Minds
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Fresh graduates, early-career professionals, and first-time
              entrepreneurs. If you&apos;re curious about trade and ready to
              learn, you belong here.
            </p>
          </Reveal>
          <Reveal
            direction="right"
            className="rounded-xl bg-maroon-50 p-6 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">
              Our story
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-800">
              Rooted in Sindh. Built for the World.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Our name comes from Ajrak, a symbol of Sindh&apos;s craftsmanship
              and pride. Like it, we connect tradition with the modern world,
              and open global trade to a new generation.
            </p>
            <Button href="/about" variant="outline" className="mt-5">
              Read Our Story <Arrow className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="ajrak-pattern-dark py-14 text-center text-white">
        <Reveal className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Ready to Begin?
          </h2>
          <p className="mt-3 text-white/75">
            Your first step into global trade is a single message away.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:ajrakimpex@gmail.com"
              className="inline-flex items-center rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-navy-800"
            >
              Send an Email
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
