// Small inline SVG icon set (stroke icons, inherit currentColor).
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

const make = (paths) =>
  function Icon({ className = "h-8 w-8" }) {
    return (
      <svg {...base} className={className} aria-hidden="true">
        {paths}
      </svg>
    );
  };

const makeBrand = (paths) =>
  function BrandIcon({ className = "h-8 w-8" }) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        {paths}
      </svg>
    );
  };

export const ShieldCheck = make(<><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5L16 9.5" /></>);
export const Award = make(<><circle cx="12" cy="9" r="5" /><path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5L15 13.5" /></>);
export const Globe = make(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 2.6 2.8 15.4 0 18M12 3c-2.8 2.6-2.8 15.4 0 18" /></>);
export const Container = make(<><rect x="3" y="6" width="18" height="12" rx="1" /><path d="M7 6v12M11 6v12M15 6v12M19 6v12" /></>);
export const Plane = make(<path d="M21 4s-2-.5-4 1.5L13 9.5 5 8l-1.5 1.5L9 12l-2.5 3H4l-1 1 3 1 1 3 1-1v-2.5l3-2.5 2.5 5.5L18 19l-1.5-8 4-4C21.5 6 21 4 21 4z" />);
export const FileCheck = make(<><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5M9 14l2 2 4-4" /></>);
export const Truck = make(<><path d="M2 6h11v10H2zM13 9h4l3 3v4h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></>);
export const MapPin = make(<><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>);
export const Phone = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>);
export const Menu = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const Close = make(<path d="M6 6l12 12M18 6L6 18" />);
export const ChevronDown = make(<path d="M6 9l6 6 6-6" />);
export const Arrow = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const Eye = make(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>);
export const User = make(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></>);
export const Leaf = make(<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19l8-8" />);
export const Scissors = make(<><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8 8l12 10M8 16L20 6" /></>);

// Simple brand glyphs for social links
export const Facebook = make(<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />);
export const WhatsApp = make(<><path d="M20.5 11.5a8.5 8.5 0 01-12.6 7.4L3 20l1.1-4.7A8.5 8.5 0 1120.5 11.5z" /><path d="M8.2 7.7c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.8 1.9c.1.3 0 .5-.2.7l-.7.8c.8 1.5 2 2.7 3.5 3.5l.8-.7c.2-.2.4-.3.7-.2l1.9.8c.3.1.4.3.4.5v.6c0 .3 0 .6-.6.9-.5.3-1.1.5-1.8.3-1.3-.3-3.2-1.2-4.8-2.8-1.6-1.6-2.5-3.5-2.8-4.8-.2-.7 0-1.3.8-1.3z" /></>);
export const Instagram = make(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" /></>);
export const TikTok = makeBrand(
  <path d="M16.8 2.3h-3.6v12.9a2.9 2.9 0 1 1-2.9-2.9c.4 0 .8.1 1.1.2V8.8a7 7 0 1 0 5.4 6.8V9.1a9.1 9.1 0 0 0 5 1.5V6.9a5.3 5.3 0 0 1-5-4.6Z" />,
);
export const LinkedIn = makeBrand(
  <>
    <circle cx="6.3" cy="6.2" r="2" />
    <path d="M4.6 9.3H8V20H4.6zM10 9.3h3.3v1.5a4 4 0 0 1 3.5-1.8c3.2 0 3.9 2.1 3.9 4.9V20h-3.4v-5.4c0-1.5 0-3-1.9-3s-2.1 1.5-2.1 2.9V20H10z" />
  </>,
);
