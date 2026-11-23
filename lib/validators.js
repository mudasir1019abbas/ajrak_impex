// Validation shared by the browser forms and the API routes, so both always
// agree. Each validator returns an object of { field: message } ({} = valid).

export const GENERAL_CONTACT_SUBJECTS = [
  "General Question",
  "Business Registration & Consultancy",
  "Partnership",
  "Other",
];

export const PRODUCT_CATEGORIES = [
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
];

export const INQUIRY_SERVICE_AREAS = [
  "Global Trade",
  "Business Registration & Compliance",
  "Business & Foreign Consultancy",
  "Business Development & Innovation",
];

export const INQUIRY_AREAS = [
  ...PRODUCT_CATEGORIES,
  "Sodium Dithionite (Rangkat)",
  ...INQUIRY_SERVICE_AREAS,
  "Investor / Shareholder Participation",
];

export const INQUIRY_ENGAGEMENT_MODELS = [
  {
    value: "import-support",
    label: "Import support (sourcing, logistics, and customs clearance)",
  },
  {
    value: "product-profit-sharing",
    label: "Product-based profit-sharing investment",
  },
  {
    value: "investor-shareholder",
    label: "Investor or shareholder participation",
  },
];

export const CONTACT_SUBJECTS = [
  ...GENERAL_CONTACT_SUBJECTS,
  "General inquiry",
  ...INQUIRY_AREAS,
  "Consultation Request",
  "Ajrak textiles",
  "Import / Export",
  "Logistics quote",
  "Partnership",
  "Product Inquiry",
  ...INQUIRY_SERVICE_AREAS,
].filter((subject, index, subjects) => subjects.indexOf(subject) === index);

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const str = (v) => (typeof v === "string" ? v : "");

export function validateLogin(v) {
  const e = {};
  if (!EMAIL_RE.test(str(v.email)) || str(v.email).length > 254) e.email = "Enter a valid email address.";
  if (str(v.password).length < 6) e.password = "Password must be at least 6 characters.";
  else if (str(v.password).length > 128) e.password = "Password is too long.";
  return e;
}

export function validateRegister(v) {
  const e = {};
  if (str(v.name).trim().length < 2) e.name = "Please enter your full name.";
  else if (str(v.name).trim().length > 80) e.name = "Name is too long.";
  if (!EMAIL_RE.test(str(v.email)) || str(v.email).length > 254) e.email = "Enter a valid email address.";
  if (str(v.password).length < 8) e.password = "Use at least 8 characters.";
  else if (str(v.password).length > 128) e.password = "Password is too long.";
  return e;
}

export function validateContact(v) {
  const e = {};
  if (str(v.name).trim().length < 2) e.name = "Please enter your full name.";
  else if (str(v.name).trim().length > 100) e.name = "Name is too long.";
  const email = str(v.email).trim();
  const phone = str(v.phone).trim();
  if (!email && !phone) e.contact = "Enter an email or phone / WhatsApp number.";
  if (email && (!EMAIL_RE.test(email) || email.length > 254)) {
    e.email = "Enter a valid email address.";
  }
  if (
    phone &&
    (phone.length > 32 ||
      !/^[+\d\s().-]+$/.test(phone) ||
      phone.replace(/\D/g, "").length < 7 ||
      phone.replace(/\D/g, "").length > 15)
  ) {
    e.phone = "Enter a valid phone / WhatsApp number.";
  }
  if (!CONTACT_SUBJECTS.includes(str(v.subject).trim())) e.subject = "Choose a subject.";
  if (str(v.message).trim().length < 10) e.message = "Message should be at least 10 characters.";
  else if (str(v.message).trim().length > 5000) e.message = "Message is too long (5000 characters max).";
  return e;
}
