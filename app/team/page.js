import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import { Button, PageHero } from "@/components/UI";

export const metadata = {
  title: "Our Team",
  description: "Meet the leadership and teams supporting Ajrak Impex International.",
};

const placeholderAvatar = "/images/illustrations/team-placeholder-avatar.svg";
const placeholderAvatarAlt = "Monogram avatar for a team member to be announced";

const teamSections = [
  {
    id: "leadership",
    anchorAlias: "core-team",
    eyebrow: "Leadership",
    title: "Founder & Executive Leadership",
    subtitle:
      "The core leadership and statutory nominee guiding company vision, governance, and global partnerships.",
    members: [
      {
        name: "Zulfiqar Ali Shah",
        role: "Founder and Director",
        avatar: "/images/illustrations/director-avatar.svg",
        avatarAlt: "Monogram avatar for Zulfiqar Ali Shah",
        details: [
          "Sole director and shareholder.",
          "Oversees company operations, trade, supplier and buyer relationships, and business management.",
        ],
      },
      {
        name: "Ms. Sindhu Abbasi",
        role: "Company Nominee",
        avatar: "/images/illustrations/nominee-avatar.svg",
        avatarAlt: "Monogram avatar for Ms. Sindhu Abbasi",
        details: [
          "Nominee of the single-member company, as required under Pakistan's company law.",
        ],
      },
    ],
  },
  {
    id: "sales-team",
    eyebrow: "Commercial & Sourcing",
    title: "Trade & Sales Team",
    subtitle:
      "Specialists managing international sourcing, supplier vetting, and buyer relations across global markets.",
    members: [
      {
        name: "To be announced",
        role: "Import & Export Operations Lead",
        avatar: placeholderAvatar,
        avatarAlt: placeholderAvatarAlt,
        details: [
          "Manages cross-border freight logistics, customs clearance, and supplier coordination.",
          "Oversees quality inspection across core product categories.",
        ],
      },
      {
        name: "To be announced",
        role: "B2B Sales & Client Relations Manager",
        avatar: placeholderAvatar,
        avatarAlt: placeholderAvatarAlt,
        details: [
          "Handles international buyer inquiries, custom sourcing requests, and order fulfillment.",
          "Supports new investors and trade partners with onboarding.",
        ],
      },
    ],
  },
  {
    id: "consultancy-team",
    eyebrow: "Advisory & Governance",
    title: "Consultancy & Legal Team",
    subtitle:
      "Advisors ensuring regulatory compliance, business registration, and smooth trade documentation.",
    members: [
      {
        name: "To be announced",
        role: "Corporate & Legal Advisor",
        avatar: placeholderAvatar,
        avatarAlt: placeholderAvatarAlt,
        details: [
          "Oversees SECP/FBR compliance, trade licensing, and contract verification.",
          "Advises on single-member company governance and statutory filings.",
        ],
      },
      {
        name: "To be announced",
        role: "Foreign Trade Consultant",
        avatar: placeholderAvatar,
        avatarAlt: placeholderAvatarAlt,
        details: [
          "Guides young professionals and investors through international market entry.",
          "Advises on import compliance.",
        ],
      },
    ],
    legalCallout: true,
  },
  {
    id: "it-team",
    eyebrow: "Technology",
    title: "IT & Digital Systems Team",
    subtitle:
      "Building and maintaining our digital trade platform, client portals, and data infrastructure.",
    members: [
      {
        name: "To be announced",
        role: "Full-Stack Web Developer / IT Lead",
        avatar: placeholderAvatar,
        avatarAlt: placeholderAvatarAlt,
        details: [
          "Develops and maintains the Ajrak Impex web platform, authentication flows, and system security.",
          "Manages digital infrastructure and internal trade tools.",
        ],
      },
      {
        name: "To be announced",
        role: "Digital Catalog & Product Specialist",
        avatar: placeholderAvatar,
        avatarAlt: placeholderAvatarAlt,
        details: [
          "Manages online product catalogs and technical listings.",
          "Supports digital outreach channels.",
        ],
      },
    ],
  },
];

function TeamMemberCard({ member, index }) {
  return (
    <Reveal delay={index * 80}>
      <article className="h-full rounded-xl bg-slate-50 p-6 ring-1 ring-slate-100 sm:p-8">
        <div className="flex min-w-0 items-center gap-4">
          <Image
            src={member.avatar}
            alt={member.avatarAlt}
            width={96}
            height={96}
            sizes="96px"
            className="h-20 w-20 shrink-0 rounded-xl ring-1 ring-slate-200 sm:h-24 sm:w-24"
          />
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-wide text-maroon-700">
              {member.role}
            </p>
            <h3 className="mt-2 break-words text-xl font-extrabold text-navy-800 sm:text-2xl">
              {member.name}
            </h3>
          </div>
        </div>
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
  );
}

function TeamSection({
  id,
  anchorAlias,
  eyebrow,
  title,
  subtitle,
  members,
  legalCallout,
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 bg-white py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {anchorAlias && (
          <span id={anchorAlias} className="block h-0 scroll-mt-24" aria-hidden="true" />
        )}
        <Reveal className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-maroon-700">
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="mt-2 text-3xl font-extrabold text-navy-800">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            {subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {members.map((member, index) => (
            <TeamMemberCard
              key={`${member.name}-${member.role}`}
              member={member}
              index={index}
            />
          ))}
        </div>

        {legalCallout && (
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
              Legal Info <Arrow className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Team() {
  return (
    <>
      <PageHero
        title="Our Team"
        text="Meet the people responsible for leading and supporting Ajrak Impex International."
      />

      {teamSections.map((section) => (
        <TeamSection key={section.id} {...section} />
      ))}

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
