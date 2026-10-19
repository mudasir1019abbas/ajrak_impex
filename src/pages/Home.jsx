import { Link } from "react-router-dom";
import ImageBox from "../components/ImageBox.jsx";
import Reveal from "../components/Reveal.jsx";
import { Button, SectionTitle } from "../components/UI.jsx";
import { Arrow, Award, Globe, ShieldCheck, Truck } from "../components/Icons.jsx";
import stoles from "../assests/images/stoles.jpg";
import ajrak from "../assests/images/ajrak-image2.jpg";
import containers from "../assests/images/shipping-containers.jpg";
import cotton from "../assests/images/coton-bales.jpg";
import snacks from "../assests/images/dried.webp";
import homeAjrak from "../assests/images/home-ajrak.jpg";

const whatsappUrl = "https://wa.me/923005310821?text=Hello%20Ajrak%20Impex%2C%20I%27d%20like%20to%20start%20my%20trade%20journey.";

const productCategories = [
  { name: "Fashion", image: stoles },
  { name: "Accessories", image: ajrak },
  { name: "Gadgets", image: containers },
  { name: "Sports Gear", image: cotton },
  { name: "Snacks", image: snacks },
];

const paths = [
  {
    title: "Trade With Us",
    text: "Want to start importing? We guide you through sourcing, logistics, and customs clearance, so you can launch with confidence.",
    action: "Learn More",
  },
  {
    title: "Back a Product",
    text: "Choose from our existing products and share in the profit based on performance. Start with a budget that suits you.",
    action: "Explore Product Options",
    investment: true,
  },
  {
    title: "Grow With Us",
    text: "Become an investor or shareholder and help build a youth-focused trade platform from the ground up.",
    action: "Talk to Our Team",
    investment: true,
  },
];

const reasons = [
  { icon: Award, title: "Affordable", text: "Global trends at fair prices." },
  { icon: ShieldCheck, title: "Quality-checked", text: "Products reviewed before they reach you." },
  { icon: Globe, title: "Beginner-friendly", text: "Step-by-step guidance, with no jargon." },
  { icon: Truck, title: "Transparent", text: "Clear terms and straightforward communication." },
];

const steps = [
  { title: "Talk to us", text: "Tell us your goal and budget." },
  { title: "Choose your model", text: "Import, invest, or partner." },
  { title: "We get moving", text: "We work with you on sourcing, shipping, and clearance." },
  { title: "You grow", text: "Sell, earn, and expand at your own pace." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-800 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div className="animate-fade-up">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">Ajrak Impex International</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Global Trends.
              <br />
              Local Prices.
              <span className="mt-2 block text-2xl text-white/85 sm:text-3xl">Your Trade Journey Starts Here.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-7 text-white/80">
              Ajrak Impex helps young professionals import, invest, and grow in global trade, with no experience required.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/contact">Start Your Journey <Arrow className="h-4 w-4" /></Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-navy-800"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <Reveal direction="right">
            <ImageBox src={homeAjrak} alt="Ajrak textile, reflecting the heritage behind the company name" className="h-72 w-full rounded-2xl shadow-xl sm:h-96" />
          </Reveal>
        </div>
      </section>

      <section className="bg-maroon-700 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-4 py-4 text-center text-sm font-semibold sm:px-6 lg:px-8">
          <span>Registered Company</span>
          <span>Offices in Karachi &amp; Khairpur</span>
          <span>Beginner-Friendly</span>
          <span>Quality-Checked Products</span>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Explore the possibilities"
            title="What We Bring You"
            subtitle="Trendy products you won't find locally. Fashion, accessories, gadgets, sports gear, snacks, and more, sourced globally and priced for everyone."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {productCategories.map((product, index) => (
              <Reveal key={product.name} delay={index * 80} direction="zoom">
                <Link to="/products" className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
                  <ImageBox src={product.image} alt={product.name} className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105" />
                  <h3 className="px-3 py-3 text-center font-bold text-navy-800 group-hover:text-maroon-700">{product.name}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Find your starting point" title="Three Ways to Grow With Us" />
          <div className="grid gap-6 md:grid-cols-3">
            {paths.map((path, index) => (
              <Reveal key={path.title} delay={index * 100}>
                <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <p className="text-sm font-bold uppercase tracking-wider text-maroon-700">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-extrabold text-navy-800">{path.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{path.text}</p>
                  <Button to="/contact" className="mt-5 self-start">{path.action} <Arrow className="h-4 w-4" /></Button>
                  {path.investment && (
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      Investment involves risk. Returns depend on product and market performance and are not guaranteed.{" "}
                      <Link to="/legal#risk" className="font-semibold text-maroon-700 underline">Read the risk disclaimer</Link>.
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="A clear way forward" title="Built for Beginners. Backed by Process." />
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

      <section id="how-it-works" className="ajrak-pattern py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Simple From Start to Finish" />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <li className="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-700 font-bold text-white">{index + 1}</span>
                  <h3 className="mt-4 font-bold text-navy-800">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal direction="left">
            <h2 className="text-2xl font-extrabold text-navy-800 sm:text-3xl">Made for Young, Ambitious Minds</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Fresh graduates, early-career professionals, and first-time entrepreneurs. If you're curious about trade and ready to learn, you belong here.
            </p>
          </Reveal>
          <Reveal direction="right" className="rounded-xl bg-maroon-50 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">Our story</p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-800">Rooted in Sindh. Built for the World.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Our name comes from Ajrak, a symbol of Sindh's craftsmanship and pride. Like it, we connect tradition with the modern world, and open global trade to a new generation.
            </p>
            <Button to="/about" variant="outline" className="mt-5">Read Our Story <Arrow className="h-4 w-4" /></Button>
          </Reveal>
        </div>
      </section>

      <section className="ajrak-pattern-dark py-14 text-center text-white">
        <Reveal className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to Begin?</h2>
          <p className="mt-3 text-white/75">Your first step into global trade is a single message away.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-slate-100">
              Message Us on WhatsApp
            </a>
            <a href="mailto:ajrakimpex@gmail.com" className="inline-flex items-center rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-navy-800">
              Send an Email
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
