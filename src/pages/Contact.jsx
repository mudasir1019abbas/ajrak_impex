import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
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
      <PageHero title="Contact Us" text="Tell us your goal, product interest, or budget. Our team will help you understand the next step." />
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
            <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8">
              <h2 className="text-xl font-extrabold text-navy-800">{contactInfo.company}</h2>
              <p className="mt-2 text-sm text-slate-500">{contactInfo.registration}</p>
              <h3 className="mt-6 font-bold text-navy-800">Our Offices</h3>
              <ul className="mt-3 space-y-4 text-sm text-slate-700">
                <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-maroon-700" /><span><strong>Head Office:</strong> {contactInfo.headOffice}</span></li>
                <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-maroon-700" /><span><strong>Branch Office:</strong> {contactInfo.branchOffice}</span></li>
                {contactInfo.phones.map((phone) => (
                  <li key={phone} className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-maroon-700" /><a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-maroon-700">{phone}</a></li>
                ))}
                {contactInfo.emails.map((email) => (
                  <li key={email} className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-maroon-700" /><a href={`mailto:${email}`} className="break-all hover:text-maroon-700">{email}</a></li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://wa.me/923005310821" target="_blank" rel="noreferrer" className="rounded-md bg-maroon-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-maroon-800">Chat on WhatsApp</a>
                <a href="https://www.facebook.com/Ajrakimpex" target="_blank" rel="noreferrer" className="rounded-md border border-maroon-700 px-4 py-2 text-sm font-semibold text-maroon-700 transition hover:bg-maroon-50">Facebook</a>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h3 className="font-bold text-navy-800">Careers</h3>
              <p className="mt-2 text-sm text-slate-600">Interested in working with us? Send your introduction and CV by email.</p>
              <a href="mailto:ajrakimpex@gmail.com?subject=Career%20enquiry" className="mt-3 inline-block text-sm font-semibold text-maroon-700 underline">Email us about careers</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
