import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import { Button, PageHero } from "@/components/UI";

export const metadata = {
  title: "Our Team",
  description: "Meet the leadership and company nominee of Ajrak Impex International.",
};

const coreTeam = [
  {
    name: "Zulfiqar Ali Shah",
    role: "Founder and Director",
    details: [
      "Sole director and shareholder.",
      "Oversees company operations, trade, supplier and buyer relationships, and business management.",
    ],
  },
  {
    name: "Ms. Sindhu Abbasi",
    role: "Company Nominee",
    details: [
      "Nominee of the single-member company, as required under Pakistan's company law.",
    ],
  },
];

export default function Team() {
  return (
    <>
      <PageHero
        title="Our Team"
        text="Meet the people responsible for leading and supporting Ajrak Impex International."
      />

      <section id="core-team" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-maroon-700">
              Leadership
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-800">
              Core Team
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              The company’s leadership and nominee roles supporting its
              single-member company structure.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {coreTeam.map((member, index) => (
              <Reveal key={member.name} delay={index * 80}>
                <article className="h-full rounded-xl bg-slate-50 p-6 ring-1 ring-slate-100 sm:p-8">
                  <p className="text-sm font-bold uppercase tracking-wide text-maroon-700">
                    {member.role}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-navy-800">
                    {member.name}
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                    {member.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-700"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h3 className="font-bold text-navy-800">Legal & compliance</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Review the company structure, published registration references,
                and legal contact information.
              </p>
            </div>
            <Button
              href="/legal#company-information"
              className="mt-4 shrink-0 sm:mt-0"
            >
              Legal Team <Arrow className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="ajrak-pattern py-14">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-maroon-700">
            Let’s connect
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy-800 sm:text-3xl">
            Have a question for our team?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Get in touch and we’ll help direct your enquiry to the right place.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">
              Contact Us <Arrow className="h-4 w-4" />
            </Button>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-maroon-700 px-5 py-2.5 text-sm font-semibold text-maroon-700 transition hover:bg-maroon-700 hover:text-white"
            >
              Explore Careers
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
