import { ShieldCheck, Award, Globe, Container, Plane, FileCheck, Truck, Leaf, Scissors } from "../components/Icons.jsx";
import ajrak from "../assests/images/ajrak-images.jpg";
import shawls from "../assests/images/ajrak-image2.jpg";
import cotonBales from "../assests/images/coton-bales.jpg";
import spices from "../assests/images/spics.jpg";
import stoles from "../assests/images/stoles.jpg";
import bedding from "../assests/images/bedding.jpg";
import driedFruits from "../assests/images/dried.webp";
import rice from "../assests/images/rice.jpg";
import historyBuilding from "../assests/images/history/history1.png";
import historyFamily from "../assests/images/history/history2.png";
import historyTeam from "../assests/images/history/history3.png";
import currentOwners from "../assests/images/history/owner.jpg";
// Put your photos in /public/images using these file names (or edit the paths here).
export const nav = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Global Trade", to: "/global-trade" },
  {
    label: "Resources",
    children: [
      { label: "Case Studies", to: "/services#case-studies" },
      { label: "Product Catalog", to: "/services#catalog" },
      { label: "Certifications", to: "/about#values" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const promises = [
  { icon: ShieldCheck, title: "Reliability", text: "On-time shipments and transparent tracking, every time." },
  { icon: Award, title: "Quality", text: "Inspected goods and authentic, hand-finished Ajrak textiles." },
  { icon: Globe, title: "Global Reach", text: "Trade lanes connecting Pakistan with buyers worldwide." },
];

export const logistics = [
  { icon: Container, label: "Container Shipping" },
  { icon: Plane, label: "Air Freight" },
  { icon: FileCheck, label: "Customs Clearance" },
];

export const supplyChain = ["Sourcing", "Inspection", "Packing", "Shipping", "Delivery"];

export const catalog = [
  { name: "Ajrak Fabric", img: ajrak },
  { name: "Printed Shawls", img: shawls},
  { name: "Cotton Bales", img:cotonBales },
  { name: "Spices", img: spices},
  { name: "Block-Print Stoles", img:stoles},
  { name: "Traditional Bedding", img: bedding},
  { name: "Dried Fruits", img: driedFruits },
  { name: "Rice & Grains", img: rice },
];

export const caseStudies = [
  { title: "Textile Export to Europe", text: "Delivered 40 containers of Ajrak fabrics with full customs support.", img: "/images/case-1.jpg" },
  { title: "Agricultural Supply Chain", text: "Cold-chain handling for dried fruits and spices across three continents.", img: "/images/case-2.jpg" },
  { title: "Retail Partnership", text: "Curated heritage collections for a growing boutique retail network.", img: "/images/case-3.jpg" },
];

export const timeline = [
  { year: "1955 - 1965", title: "Humble Beginnings", text: "A small trading shop in Karachi dealing in hand-block-printed cloth.", img: historyBuilding },
  { year: "1965 - 1992", title: "Growing Trust", text: "Expanded into regional wholesale and built lasting supplier ties.", img: historyFamily },
  { year: "1993 - 2019", title: "Going Global", text: "First container exports and a dedicated logistics team.", img: historyTeam },
  { year: "2020 - 2021", title: "Modern Trade", text: "Digital operations, compliance systems and new product lines.", img: historyTeam },
  { year: "Today", title: "Second Generation", text: "Family-led, internationally minded, still rooted in tradition.", img: currentOwners },
];

export const values = [
  { icon: Award, title: "Integrity", text: "Honest dealings and clear paperwork." },
  { icon: Leaf, title: "Sustainability", text: "Natural dyes and responsible sourcing." },
  { icon: Scissors, title: "Craftsmanship", text: "Respect for artisans and their heritage." },
  { icon: Truck, title: "Service", text: "Door-to-door support for every order." },
];

export const certifications = ["ISO 9001 Quality Management", "Chamber of Commerce Member", "Customs Registered Exporter", "Export Promotion Bureau Registered"];

export const tradeLanes = [
  { region: "Europe", detail: "UK, Germany, Italy, Netherlands", share: 38 },
  { region: "Middle East", detail: "UAE, Saudi Arabia, Qatar", share: 27 },
  { region: "North America", detail: "USA, Canada", share: 21 },
  { region: "Asia Pacific", detail: "China, Malaysia, Australia", share: 14 },
];

export const posts = [
  { title: "The Story Behind Authentic Ajrak", date: "12 Oct 2026", tag: "Heritage", text: "From indigo vats to resist-printed patterns: how a Sindhi tradition is made." },
  { title: "Choosing Between Sea and Air Freight", date: "28 Sep 2026", tag: "Logistics", text: "A practical guide to cost, speed and risk for first-time exporters." },
  { title: "Customs Clearance Checklist", date: "09 Sep 2026", tag: "Compliance", text: "The documents you need ready before your shipment reaches port." },
  { title: "Why Natural Dyes Matter to Buyers", date: "21 Aug 2026", tag: "Textiles", text: "Quality, sustainability and the premium on traditional colour." },
  { title: "Packing Textiles for Long Voyages", date: "02 Aug 2026", tag: "Logistics", text: "Moisture control and packing standards that protect fabric in transit." },
  { title: "Pakistan's Export Outlook", date: "15 Jul 2026", tag: "Trade", text: "Where demand for Pakistani goods is growing in the year ahead." },
];

export const contactInfo = {
  address: "125 Samnistan Road, Karachi, Pakistan",
  phones: ["+92 300 000 0000", "+92 21 000 0000"],
  emails: ["sales@ajrakimpex.com", "info@ajrakimpex.com"],
};
