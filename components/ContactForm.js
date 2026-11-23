"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Button, Field } from "@/components/UI";
import {
  GENERAL_CONTACT_SUBJECTS,
  validateContact,
} from "@/lib/validators";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subject: "General Question",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({
      ...current,
      [name]: undefined,
      ...(name === "email" || name === "phone" ? { contact: undefined } : {}),
    }));
    setFeedback(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setFeedback(null);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        setFeedback({
          type: "error",
          message: result.message || "Unable to send your message. Please try again.",
        });
        return;
      }

      setValues(initialValues);
      setFeedback({
        type: "success",
        message: result.message || "Your message has been received.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Unable to send your message. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Reveal direction="left">
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8"
      >
        <h2 className="text-xl font-extrabold text-navy-800">Send Us a Message</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Send general questions, partnership notes, or office inquiries here.
          For a specific product quote or investment request, visit our{" "}
          <Link
            href="/inquiry"
            className="font-semibold text-maroon-700 underline"
          >
            Product &amp; Trade Inquiry
          </Link>{" "}
          page.
        </p>

        <div className="mt-6 space-y-4">
          <Field
            label="Full Name *"
            id="contact-name"
            name="name"
            value={values.name}
            onChange={onChange}
            error={errors.name}
            placeholder="Your full name"
            autoComplete="name"
            required
            maxLength={100}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Email"
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              error={errors.email}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={!!errors.email || !!errors.contact}
              aria-describedby={errors.contact ? "contact-method-error" : "contact-method-help"}
            />
            <Field
              label="Phone / WhatsApp"
              id="contact-phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={onChange}
              error={errors.phone}
              placeholder="+92 300 0000000"
              autoComplete="tel"
              maxLength={32}
              aria-invalid={!!errors.phone || !!errors.contact}
              aria-describedby={errors.contact ? "contact-method-error" : "contact-method-help"}
            />
          </div>
          <p id="contact-method-help" className="-mt-2 text-xs text-slate-500">
            Provide at least one valid email address or phone / WhatsApp number.
          </p>
          {errors.contact && (
            <p id="contact-method-error" role="alert" className="-mt-2 text-sm text-red-600">
              {errors.contact}
            </p>
          )}

          <Field label="Subject / Topic *" id="contact-subject" error={errors.subject}>
            {(className) => (
              <select
                id="contact-subject"
                name="subject"
                value={values.subject}
                onChange={onChange}
                className={className}
                required
              >
                {GENERAL_CONTACT_SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field label="Message *" id="contact-message" error={errors.message}>
            {(className) => (
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={onChange}
                placeholder="How can we help?"
                className={className}
                required
                maxLength={5000}
              />
            )}
          </Field>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          By sending this message, you acknowledge our{" "}
          <Link href="/legal#terms" className="underline hover:text-maroon-700">
            Terms
          </Link>
          ,{" "}
          <Link href="/legal#privacy" className="underline hover:text-maroon-700">
            Privacy Policy
          </Link>
          , and{" "}
          <Link href="/legal#risk" className="underline hover:text-maroon-700">
            Risk Disclaimer
          </Link>
          .
        </p>

        {feedback && (
          <p
            role={feedback.type === "error" ? "alert" : "status"}
            className={`mt-4 rounded-md px-3 py-2 text-sm ${
              feedback.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-800"
            }`}
          >
            {feedback.message}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="mt-5 w-full">
          {submitting ? "Sending Message..." : "Send Message"}
        </Button>
      </form>
    </Reveal>
  );
}
