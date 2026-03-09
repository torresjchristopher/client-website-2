import BrandWordmark from './BrandWordmark';

interface FooterProps {
  isDark?: boolean;
}

export default function Footer({ isDark = false }: FooterProps) {
  const containerClass = isDark
    ? 'border-white/15 bg-transparent text-white'
    : 'border-stone-200 bg-transparent text-stone-800';
  const mutedClass = isDark
    ? 'text-white/70 hover:text-emerald-300'
    : 'text-stone-500 hover:text-emerald-700';

  return (
    <footer className={`mt-20 border-t ${containerClass}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className={`text-[0.65rem] uppercase tracking-[0.4em] ${isDark ? 'text-white/55' : 'text-stone-500'}`}>
              SweetPear
            </span>
            <BrandWordmark className="text-3xl" subtle />
          </div>

          <div className="flex items-center gap-6 text-[0.7rem] uppercase tracking-[0.32em]">
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={mutedClass}
            >
              TikTok
            </a>
            <a
              href="mailto:contact@sweetpear.com"
              className={mutedClass}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
