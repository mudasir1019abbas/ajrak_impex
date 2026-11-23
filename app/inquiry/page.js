import Link from "next/link";
import ProductInquiryForm from "@/components/ProductInquiryForm";
import { PageHero } from "@/components/UI";

export const metadata = {
  title: "Submit an Inquiry",
  description:
    "Submit an account-linked product, sourcing, trade, or investment inquiry to Ajrak Impex International.",
};

export default function InquiryPage() {
  return (
    <>
      <PageHero
        title="Submit an Inquiry"
        text="Share a product requirement, sourcing need, engagement model, or budget. Detailed inquiries are linked to your account."
      />
      <section className="ajrak-pattern py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ProductInquiryForm />
          <p className="mt-6 text-center text-sm text-slate-600">
            Have a general question?{" "}
            <Link
              href="/contact"
              className="font-semibold text-maroon-700 underline"
            >
              Contact our team
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
