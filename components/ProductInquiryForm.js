"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Button, Field } from "@/components/UI";
import { Emblem } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import {
  INQUIRY_AREAS,
  INQUIRY_ENGAGEMENT_MODELS,
  PRODUCT_CATEGORIES,
} from "@/lib/validators";

const initialValues = {
  name: "",
  company: "",
  area: "",
  engagementModel: "",
  details: "",
  budget: "",
  quantity: "",
  destination: "",
};

const legacyModelValues = {
  "trade-with-us": "import-support",
  "back-a-product": "product-profit-sharing",
  "grow-with-us": "investor-shareholder",
};

function validateInquiry(values, accountEmail) {
  const nextErrors = {};
  if (values.name.trim().length < 2) nextErrors.name = "Please enter your full name.";
  else if (values.name.trim().length > 100) nextErrors.name = "Name is too long.";
  if (!accountEmail) nextErrors.contact = "Your account must have a valid email address.";
  if (!INQUIRY_AREAS.includes(values.area)) {
    nextErrors.area = "Choose a product category or service area.";
  }
  if (!INQUIRY_ENGAGEMENT_MODELS.some((model) => model.value === values.engagementModel)) {
    nextErrors.engagementModel = "Choose an engagement model.";
  }
  if (values.details.trim().length < 10) {
    nextErrors.details = "Please describe your requirement (at least 10 characters).";
  } else if (values.details.trim().length > 3000) {
    nextErrors.details = "Your description is too long (3000 characters max).";
  }
  if (values.company.trim().length > 120) nextErrors.company = "Company name is too long.";
  if (values.budget.trim().length > 100) nextErrors.budget = "Budget is too long.";
  if (values.quantity.trim().length > 100) nextErrors.quantity = "Quantity is too long.";
  if (values.destination.trim().length > 120) nextErrors.destination = "Destination is too long.";
  return nextErrors;
}

function getInquiryReturnPath(values) {
  const params = new URLSearchParams();
  if (values.area) {
    const key =
      PRODUCT_CATEGORIES.includes(values.area) ||
      values.area === "Sodium Dithionite (Rangkat)"
        ? "category"
        : "service";
    params.set(key, values.area);
  }
  if (values.engagementModel) params.set("engagement", values.engagementModel);
  const query = params.toString();
  return `/inquiry${query ? `?${query}` : ""}`;
}

export default function ProductInquiryForm() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [nameEdited, setNameEdited] = useState(false);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const name = nameEdited ? values.name : values.name || user?.name || "";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const area = params.get("category") || params.get("service");
    const requestedModel = params.get("engagement");
    const engagementModel = legacyModelValues[requestedModel] || requestedModel;

    setValues((current) => ({
      ...current,
      ...(INQUIRY_AREAS.includes(area) ? { area } : {}),
      ...(INQUIRY_ENGAGEMENT_MODELS.some((model) => model.value === engagementModel)
        ? { engagementModel }
        : {}),
    }));
  }, []);

  useEffect(() => {
    if (user?.name && !nameEdited) {
      setValues((current) => ({ ...current, name: current.name || user.name }));
    }
  }, [nameEdited, user?.name]);

  const onChange = (event) => {
    const { name: fieldName, value } = event.target;
    if (fieldName === "name") setNameEdited(true);
    setValues((current) => ({ ...current, [fieldName]: value }));
    setErrors((current) => ({ ...current, [fieldName]: undefined }));
    setFeedback(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateInquiry({ ...values, name }, user?.email);
    setErrors(nextErrors);
    setFeedback(null);
    if (Object.keys(nextErrors).length) return;

    const selectedModel = INQUIRY_ENGAGEMENT_MODELS.find(
      (model) => model.value === values.engagementModel
    );
    const message = [
      `Inquiry area: ${values.area}`,
      `Engagement model: ${selectedModel.label}`,
      values.company.trim() ? `Company / Organization: ${values.company.trim()}` : "",
      `Requirement: ${values.details.trim()}`,
      values.budget.trim() ? `Estimated budget: ${values.budget.trim()}` : "",
      values.quantity.trim() ? `Quantity: ${values.quantity.trim()}` : "",
      values.destination.trim() ? `Destination: ${values.destination.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: user.email,
          subject: values.area,
          message,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors((current) => ({ ...current, ...(result.errors || {}) }));
        setFeedback({
          type: "error",
          message: result.message || "Unable to submit your inquiry. Please try again.",
        });
        return;
      }
      setFeedback({
        type: "success",
        message: "Your inquiry was submitted and linked to your account.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Unable to submit your inquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div
        role="status"
        className="flex min-h-64 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100"
      >
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-maroon-100 border-t-maroon-700" />
        <span className="sr-only">Checking your account...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    const returnTo = getInquiryReturnPath(values);
    return (
      <Reveal>
        <div className="rounded-xl bg-white p-6 text-center shadow-lg ring-1 ring-slate-100 sm:p-8">
          <Emblem className="mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-extrabold text-navy-800">
            Submit a Product &amp; Trade Inquiry
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            Log in or create an account to submit a detailed request. Inquiries
            sent while signed in are linked to your account so you can follow
            the conversation in your portal.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={`/login?from=${encodeURIComponent(returnTo)}`}>Log in</Button>
            <Link
              href={`/signup?from=${encodeURIComponent(returnTo)}`}
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
    <Reveal>
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <Emblem className="h-12 w-12" />
          <h2 className="mt-3 text-xl font-extrabold text-navy-800">
            Product &amp; Trade Inquiry
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Share a product or service area, engagement model, and the details
            needed for our team to review your request.
          </p>
        </div>

        <div className="space-y-4">
          <Field
            label="Full Name *"
            id="inquiry-name"
            name="name"
            value={name}
            onChange={onChange}
            error={errors.name}
            autoComplete="name"
            maxLength={100}
            required
          />
          <Field
            label="Company / Organization (optional)"
            id="inquiry-company"
            name="company"
            value={values.company}
            onChange={onChange}
            error={errors.company}
            autoComplete="organization"
            maxLength={120}
          />
          <Field
            label="Product Category or Service Area *"
            id="inquiry-area"
            error={errors.area}
          >
            {(className) => (
              <select
                id="inquiry-area"
                name="area"
                value={values.area}
                onChange={onChange}
                className={className}
                required
              >
                <option value="">Select a category or service</option>
                <optgroup label="Product Categories">
                  {INQUIRY_AREAS.filter(
                    (area) =>
                      PRODUCT_CATEGORIES.includes(area) ||
                      area === "Sodium Dithionite (Rangkat)"
                  ).map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Services & Participation">
                  {INQUIRY_AREAS.filter(
                    (area) =>
                      !PRODUCT_CATEGORIES.includes(area) &&
                      area !== "Sodium Dithionite (Rangkat)"
                  ).map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </optgroup>
              </select>
            )}
          </Field>
          <Field
            label="Engagement Model *"
            id="inquiry-engagement"
            error={errors.engagementModel}
          >
            {(className) => (
              <select
                id="inquiry-engagement"
                name="engagementModel"
                value={values.engagementModel}
                onChange={onChange}
                className={className}
                required
              >
                <option value="">Select an engagement model</option>
                {INQUIRY_ENGAGEMENT_MODELS.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field
            label="Tell Us About Your Requirement *"
            id="inquiry-details"
            error={errors.details}
          >
            {(className) => (
              <textarea
                id="inquiry-details"
                name="details"
                rows={5}
                value={values.details}
                onChange={onChange}
                placeholder="Product specifications, sourcing needs, investment interest, or other relevant details"
                className={className}
                maxLength={3000}
                required
              />
            )}
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Estimated Budget (optional)"
              id="inquiry-budget"
              name="budget"
              value={values.budget}
              onChange={onChange}
              error={errors.budget}
              maxLength={100}
              placeholder="Currency and approximate amount"
            />
            <Field
              label="Quantity (optional)"
              id="inquiry-quantity"
              name="quantity"
              value={values.quantity}
              onChange={onChange}
              error={errors.quantity}
              maxLength={100}
              placeholder="Estimated quantity"
            />
          </div>
          <Field
            label="Destination (optional)"
            id="inquiry-destination"
            name="destination"
            value={values.destination}
            onChange={onChange}
            error={errors.destination}
            maxLength={120}
            placeholder="City or country"
          />
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Investment and trade carry risk; returns are not guaranteed. Any
          engagement requires written terms. Read our{" "}
          <Link href="/legal#terms" className="underline hover:text-maroon-700">
            Terms
          </Link>{" "}
          and{" "}
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
            {feedback.type === "success" && (
              <>
                {" "}
                <Link
                  href="/account"
                  className="font-semibold underline underline-offset-2"
                >
                  View your account
                </Link>
              </>
            )}
          </p>
        )}
        {errors.contact && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {errors.contact}
          </p>
        )}
        <Button type="submit" disabled={submitting} className="mt-5 w-full">
          {submitting ? "Submitting Inquiry..." : "Submit Inquiry"}
        </Button>
      </form>
    </Reveal>
  );
}
