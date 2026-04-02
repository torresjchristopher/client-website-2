const LETTERS = 'SweetPear'.split('');
const FONT_CLASSES = ['font-great-vibes', 'font-pinyon-script'];

type BrandWordmarkVariant = 'hero' | 'header' | 'footer';

interface BrandWordmarkProps {
  className?: string;
  subtle?: boolean;
  variant?: BrandWordmarkVariant;
}

export default function BrandWordmark({
  className = '',
  subtle = false,
  variant = 'hero',
}: BrandWordmarkProps) {
  return (
    <span
      aria-label="SweetPear"
      className={[
        'brand-wordmark',
        `brand-wordmark--${variant}`,
        subtle ? 'brand-wordmark--subtle' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {LETTERS.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={[
            'brand-wordmark__letter',
            FONT_CLASSES[index % FONT_CLASSES.length],
            `brand-wordmark__letter--${index % 4}`,
          ].join(' ')}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
