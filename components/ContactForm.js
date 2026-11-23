"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Button, Field } from "@/components/UI";
import { Emblem } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

const INQUIRY_CATEGORIES = [
  "Machinery",
  "Electronic Items",
  "Gaming Gadgets",
  "Other Gadgets",
  "Mobile Accessories",
  "Toys",
  "Sleeping and Traveling Items",
  "Shoes",
  "Home Décor",
  "Kitchen Accessories",
  "Jewelry",
  "Industrial Chemicals",
  "Sodium Dithionite (Rangkat)",
  "Other",
];

const WHATSAPP_NUMBER = "923005310821";
const OFFICIAL_EMAIL = "ajrakimpex@gmail.com";
const initial = {
  name: "",
  company: "",
  category: "",
  itemDetails: "",
  quantity: "",
  destination: "",
};

const validateInquiry = (values) => {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!values.company.trim()) errors.company = "Please enter your company name.";
  if (!INQUIRY_CATEGORIES.includes(values.category)) errors.category = "Choose a product category.";
  if (values.itemDetails.trim().length < 5) errors.itemDetails = "Describe the item or specification.";
  if (!values.quantity.trim()) errors.quantity = "Please enter the required quantity.";
  if (!values.destination.trim()) errors.destination = "Please enter the destination.";
  return errors;
};

export default function ContactForm() {
  const { isAuthenticated, loading, user } = useAuth();
  const [values, setValues] = useState(initial);
  const [nameEdited, setNameEdited] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const nameValue = nameEdited ? values.name : values.name || user?.name || "";

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category && INQUIRY_CATEGORIES.includes(category)) {
      setValues((current) => ({ ...current, category }));
    }
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setNameEdited(true);
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = validateInquiry({ ...values, name: nameValue });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("Please complete all required fields.");
      return false;
    }
    setStatus("");
    return true;
  };

  const buildMessage = () =>
    [
      "Hello Ajrak Impex,",
      "",
      "I would like to make a product inquiry:",
      `Name: ${nameValue.trim()}`,
      `Company: ${values.company.trim()}`,
      `Product Category: ${values.category}`,
      `Item Details: ${values.itemDetails.trim()}`,
      `Quantity: ${values.quantity.trim()}`,
      `Destination: ${values.destination.trim()}`,
    ].join("\n");

  const sendOnWhatsApp = () => {
    if (!validate()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sendByEmail = () => {
    if (!validate()) return;
    const subject = `Product Inquiry - ${values.category} - ${values.company.trim()}`;
    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  };

  if (loading) {
    return (
      <Reveal direction="left" className="flex min-h-80 items-center justify-center rounded-xl bg-white shadow-lg ring-1 ring-slate-100">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-maroon-100 border-t-maroon-700" />
      </Reveal>
    );
  }

  if (!isAuthenticated) {
    const returnTo = values.category
      ? `/contact?category=${encodeURIComponent(values.category)}`
      : "/contact";

    return (
      <Reveal direction="left">
        <div className="rounded-xl bg-white p-6 text-center shadow-lg ring-1 ring-slate-100 sm:p-8">
          <Emblem className="mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-extrabold text-navy-800">Product Inquiry</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
            Please log in or create an account to submit a product inquiry.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={`/login?from=${encodeURIComponent(returnTo)}`}>Log in</Button>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-md border border-maroon-700 px-5 py-2.5 text-sm font-semibold text-maroon-700 transition hover:bg-maroon-50"
            >
              Create account
            </Link>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal direction="left">
      <form onSubmit={(event) => event.preventDefault()} noValidate className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8">
        <div className="mb-5 flex flex-col items-center">
          <Emblem className="h-12 w-12" />
          <h2 className="mt-2 text-xl font-extrabold text-navy-800">PRODUCT INQUIRY</h2>
          <p className="mt-2 text-center text-sm text-slate-500">Complete the details, then choose WhatsApp or email.</p>
        </div>

        <div className="space-y-4">
          <Field label="Name" id="name" name="name" value={nameValue} onChange={onChange} error={errors.name} placeholder="Your name" autoComplete="name" />
          <Field label="Company" id="company" name="company" value={values.company} onChange={onChange} error={errors.company} placeholder="Your company name" autoComplete="organization" />
          <Field label="Product Category" id="category" error={errors.category}>
            {(cls) => (
              <select id="category" name="category" value={values.category} onChange={onChange} className={cls}>
                <option value="">Select a category</option>
                {INQUIRY_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Item Details" id="itemDetails" error={errors.itemDetails}>
            {(cls) => (
              <textarea id="itemDetails" name="itemDetails" rows={4} value={values.itemDetails} onChange={onChange} placeholder="Model, grade, specification, packing, or other details" className={cls} />
            )}
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Quantity" id="quantity" name="quantity" value={values.quantity} onChange={onChange} error={errors.quantity} placeholder="e.g. 100 cartons" />
            <Field label="Destination" id="destination" name="destination" value={values.destination} onChange={onChange} error={errors.destination} placeholder="City or country" />
          </div>
        </div>

        {status && (
          <p role="alert" className="mt-4 animate-fade-up rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{status}</p>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={sendOnWhatsApp} className="w-full sm:flex-1">
            Send on WhatsApp
          </Button>
          <Button type="button" variant="outline" onClick={sendByEmail} className="w-full sm:flex-1">
            Send by Email
          </Button>
        </div>
      </form>
    </Reveal>
  );
}
