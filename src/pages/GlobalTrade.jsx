import Reveal from "../components/Reveal.jsx";
import ImageBox from "../components/ImageBox.jsx";
import { Button, PageHero, SectionTitle } from "../components/UI.jsx";
import { tradeLanes, promises } from "../data/content.js";

export default function GlobalTrade() {
  return (
    <>
      <PageHero title="Global Trade" text="Connecting Pakistan's heritage and harvests with buyers on every continent." />

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal direction="left">
            <ImageBox src="/images/port.jpg" alt="Container port" label="Container port" className="h-72 w-full rounded-xl shadow-lg sm:h-96" />
          </Reveal>
          <Reveal direction="right">
            <h2 className="text-2xl font-extrabold text-navy-800">Trade lanes we serve</h2>
            <span className="mt-2 block h-1 w-14 rounded bg-maroon-700" />
            <div className="mt-6 space-y-5">
              {tradeLanes.map((l) => (
                <div key={l.region}>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-navy-800">{l.region} <span className="font-normal text-slate-500">- {l.detail}</span></span>
                    <span className="font-bold text-maroon-700">{l.share}%</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full origin-left animate-grow rounded-full bg-gradient-to-r from-maroon-700 to-navy-700" style={{ width: `${l.share * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Why buyers choose us" />
          <div className="grid gap-6 sm:grid-cols-3">
            {promises.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 120} direction="zoom">
                <div className="h-full rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Icon className="mx-auto h-10 w-10 text-maroon-700" />
                  <h3 className="mt-3 font-bold text-navy-800">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Button to="/contact">Start a Shipment Inquiry</Button></div>
        </div>
      </section>
    </>
  );
}
