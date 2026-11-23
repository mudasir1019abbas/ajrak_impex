import Link from "next/link";
import { PageHero } from "@/components/UI";

export const metadata = {
  title: "Legal FAQs",
  description:
    "Quick legal and compliance information about Ajrak Impex International, its engagement models, privacy practices, and risk disclosures.",
};

const quickSummary = {
  intro:
    "Ajrak Impex International (SMC-Private) Limited is a single-member company registered in Pakistan with its head office in Karachi (Gulshan-e-Hadeed Phase 2) and a branch office in Khairpur.",
  points: [
    {
      label: "Leadership & Nominee",
      text: "Zulfiqar Ali Shah serves as sole director and shareholder, with Ms. Sindhu Abbasi acting as statutory company nominee under Pakistani company law.",
    },
    {
      label: "Registration References",
      text: "Published SECP references are Reg. No. K399826 and PP/REG/INC No. 0360593; FBR NTN/tax status and KCCI membership details are available upon request.",
    },
    {
      label: "Engagement & Risk",
      text: "Import support, product-based profit-sharing investments, and investor/shareholder participation require written agreements, carry market and trade risks without guaranteed profits, and fall under Pakistani law and Karachi court jurisdiction.",
    },
  ],
};

const faqs = [
  {
    question: "What engagement models does Ajrak Impex offer?",
    intro: "Ajrak Impex outlines three models under Terms and Conditions:",
    points: [
      "Import support (sourcing, logistics, and customs clearance)",
      "Product-based investment with profit sharing",
      "Investor or shareholder participation",
    ],
    closing:
      "Each engagement requires a separate written agreement before work or investment begins, and participants must be at least 18 years old and legally able to enter a contract.",
    reference: { label: "Terms and Conditions", href: "/legal#terms" },
  },
  {
    question: "How are orders, payments, shipping, and returns handled?",
    points: [
      {
        label: "Orders & Confirmations",
        text: "Prices and availability can change without notice; an order or engagement is confirmed only when confirmed in writing (including via email or WhatsApp), with payment terms set in the quotation or agreement.",
      },
      {
        label: "Shipping & Customs",
        text: "Delivery timelines are estimates. Delays from carriers, customs, or regulatory requirements are outside the company's control, and duties, taxes, and clearance charges follow the agreement.",
      },
      {
        label: "Returns & Refunds",
        text: "Damaged or incorrect goods should be reported within 7 days of delivery with photos; repair, replacement, or refund is at the company's discretion subject to the agreement.",
      },
    ],
    reference: { label: "Terms and Conditions", href: "/legal#terms" },
  },
  {
    question: "How is personal data collected, used, and protected?",
    intro:
      "Under the Privacy Policy, Ajrak Impex collects contact and inquiry details (such as name, phone number, email, city, and order or investment details) along with basic website usage data (such as device type and pages visited) and cookies.",
    points: [
      {
        label: "Usage & Sharing",
        text: "Information is used to handle inquiries, orders, shipping/clearance, agreements, site improvements, and optional updates. Data is not sold and is shared only as needed with couriers, clearing agents, payment providers, and professional advisers.",
      },
      {
        label: "Your Rights",
        text: "Visitors can request access, correction, or deletion of their data, or opt out of marketing messages, by contacting",
        contacts: {
          email: "ajrakimpex@gmail.com",
          phone: "+92-300-5310821",
        },
      },
    ],
    reference: { label: "Privacy Policy", href: "/legal#privacy" },
  },
  {
    question: "Are profits guaranteed, and which laws govern disputes?",
    paragraphs: [
      "No. The Risk Disclaimer states that importing, trading, and investing carry risk—affected by market demand, pricing, currency movements, shipping conditions, and regulatory changes—and profits are not guaranteed (investors may lose part or all of their invested amount).",
      "Website content is general guidance rather than financial, legal, or tax advice. Terms are governed by the laws of Pakistan, with disputes under the jurisdiction of the courts of Karachi.",
    ],
    reference: { label: "Risk Disclaimer", href: "/legal#risk" },
  },
];

function FaqPoint({ point }) {
  if (typeof point === "string") {
    return <li>{point}</li>;
  }

  return (
    <li>
      <strong className="font-semibold text-navy-800">{point.label}:</strong>{" "}
      {point.text}
      {point.contacts && (
        <>
          {" "}
          <a
            className="font-medium text-maroon-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700"
            href={`mailto:${point.contacts.email}`}
          >
            {point.contacts.email}
          </a>{" "}
          (or calling{" "}
          <a
            className="font-medium text-maroon-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700"
            href={`tel:${point.contacts.phone.replaceAll("-", "")}`}
          >
            {point.contacts.phone}
          </a>
          )
        </>
      )}
    </li>
  );
}

function FaqItem({ faq, index }) {
  const answerId = `legal-faq-answer-${index + 1}`;

  return (
    <details className="rounded-xl border border-slate-200 bg-white">
      <summary
        aria-controls={answerId}
        className="cursor-pointer rounded-xl p-5 text-base font-bold leading-6 text-navy-800 marker:text-maroon-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-maroon-700 sm:p-6"
      >
        {faq.question}
      </summary>
      <div
        id={answerId}
        className="space-y-4 border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:px-6 sm:pb-6"
      >
        {faq.intro && <p>{faq.intro}</p>}
        {faq.points && (
          <ul className="list-disc space-y-2 pl-5">
            {faq.points.map((point) => (
              <FaqPoint key={typeof point === "string" ? point : point.label} point={point} />
            ))}
          </ul>
        )}
        {faq.closing && <p>{faq.closing}</p>}
        {faq.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          See the{" "}
          <Link
            className="font-semibold text-maroon-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700"
            href={faq.reference.href}
          >
            {faq.reference.label}
          </Link>
          .
        </p>
      </div>
    </details>
  );
}

export default function LegalFaqs() {
  return (
    <>
      <PageHero
        title="Legal FAQs"
        text="A quick guide to company information, engagement terms, privacy, and trade risk."
      />
      <div className="bg-white">
        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
          <section aria-labelledby="legal-summary-title">
            <div className="rounded-xl border border-slate-200 border-l-4 border-l-maroon-700 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">
                Company information
              </p>
              <h2
                id="legal-summary-title"
                className="mt-2 text-2xl font-extrabold text-navy-800"
              >
                Legal & Compliance Quick Summary
              </h2>
              <p className="mt-4 leading-7 text-slate-600">{quickSummary.intro}</p>
              <ul className="mt-5 space-y-4">
                {quickSummary.points.map((point) => (
                  <li key={point.label} className="leading-7 text-slate-600">
                    <strong className="font-semibold text-navy-800">
                      {point.label}:
                    </strong>{" "}
                    {point.text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="legal-faqs-title">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-700">
                Helpful answers
              </p>
              <h2
                id="legal-faqs-title"
                className="mt-2 text-2xl font-extrabold text-navy-800 sm:text-3xl"
              >
                Frequently Asked Questions (Legal & Compliance)
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Expand a question to read more. For complete policy terms, use
                the linked sections of our Legal Info page.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FaqItem key={faq.question} faq={faq} index={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
