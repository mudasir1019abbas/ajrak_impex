import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import ImageBox from "../components/ImageBox.jsx";
import { Button, Field, PageHero } from "../components/UI.jsx";
import { Emblem } from "../components/Logo.jsx";
import { MapPin, Phone, Mail } from "../components/Icons.jsx";
import { contactInfo } from "../data/content.js";
import { contactService } from "../services/authService.js";

const initial = { name: "", email: "", subject: "", message: "" };
const subjects = ["General inquiry", "Ajrak textiles", "Import / Export", "Logistics quote", "Partnership"];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!v.subject) e.subject = "Choose a subject.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus({ type: "loading", text: "" });
    try {
      await contactService.send(values);
      setStatus({ type: "success", text: "Thank you! We'll reply within one business day." });
      setValues(initial);
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Something went wrong. Please try again." });
    }
  };

  return (
    <>
      <PageHero title="Contact Us" text="Tell us about your shipment or product needs - we're happy to help." />
      <section className="ajrak-pattern py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal direction="left">
            <form onSubmit={onSubmit} noValidate className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8">
              <div className="mb-5 flex flex-col items-center">
                <Emblem className="h-12 w-12" />
                <h2 className="mt-2 text-xl font-extrabold text-navy-800">CONTACT US</h2>
              </div>
              <div className="space-y-4">
                <Field label="Name" id="name" name="name" value={values.name} onChange={onChange} error={errors.name} placeholder="Your name" autoComplete="name" />
                <Field label="Email" id="email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} placeholder="you@company.com" autoComplete="email" />
                <Field label="Subject" id="subject" error={errors.subject}>
                  {(cls) => (
                    <select id="subject" name="subject" value={values.subject} onChange={onChange} className={cls}>
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Message" id="message" error={errors.message}>
                  {(cls) => (
                    <textarea id="message" name="message" rows={5} value={values.message} onChange={onChange} placeholder="How can we help?" className={cls} />
                  )}
                </Field>
              </div>

              {status.text && (
                <p role="status" className={`mt-4 animate-fade-up rounded-md px-3 py-2 text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {status.text}
                </p>
              )}

              <Button type="submit" disabled={status.type === "loading"} className="mt-5 w-full sm:w-auto">
                {status.type === "loading" ? "Sending..." : "Submit"}
              </Button>
            </form>
          </Reveal>

          <Reveal direction="right" className="space-y-6">
            <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-100">
              <iframe
                title="Office location in Karachi"
                src="https://www.openstreetmap.org/export/embed.html?bbox=66.9%2C24.78%2C67.2%2C24.95&layer=mapnik&marker=24.8607%2C67.0011"
                className="h-64 w-full sm:h-80"
                loading="lazy"
              />
            </div>
            <div className="grid gap-5 rounded-xl bg-white p-5 shadow-lg ring-1 ring-slate-100 sm:grid-cols-2">
              <ImageBox src="/images/office.jpg" alt="Our office" label="Our office" className="h-40 w-full rounded-lg sm:h-full" />
              <div>
                <h3 className="font-extrabold text-navy-800">Contact Info</h3>
                <ul className="mt-3 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-maroon-700" />{contactInfo.address}</li>
                  {contactInfo.phones.map((p) => (
                    <li key={p} className="flex gap-2"><Phone className="h-5 w-5 shrink-0 text-maroon-700" /><a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-maroon-700">{p}</a></li>
                  ))}
                  {contactInfo.emails.map((m) => (
                    <li key={m} className="flex gap-2"><Mail className="h-5 w-5 shrink-0 text-maroon-700" /><a href={`mailto:${m}`} className="break-all hover:text-maroon-700">{m}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
