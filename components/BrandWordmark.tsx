const LETTERS = "SweetPear".split("");
const FONT_CLASSES = ["font-great-vibes", "font-pinyon-script"];
const COLOR_CLASSES = ["text-emerald-600", "text-lime-500", "text-emerald-500", "text-teal-500"];

interface BrandWordmarkProps {
  className?: string;
  subtle?: boolean;
}

export default function BrandWordmark({
  className = "",
  subtle = false,
}: BrandWordmarkProps) {
  return (
    <span
      aria-label="SweetPear"
      className={[
        "inline-flex flex-wrap items-baseline gap-[0.02em] leading-none",
        subtle ? "brand-sparkle--subtle" : "brand-sparkle",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {LETTERS.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={[
            "inline-block",
            FONT_CLASSES[index % FONT_CLASSES.length],
            COLOR_CLASSES[index % COLOR_CLASSES.length],
          ].join(" ")}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
