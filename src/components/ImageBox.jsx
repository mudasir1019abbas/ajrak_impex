import { useState } from "react";

// Shows an image from /public/images. If the file is missing, a branded
// ajrak-pattern placeholder is shown instead so the layout never breaks.
export default function ImageBox({ src, alt, className = "", label }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`ajrak-pattern flex items-center justify-center bg-maroon-50 text-center text-xs font-medium text-maroon-700/70 ${className}`}
      >
        {label || alt}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
