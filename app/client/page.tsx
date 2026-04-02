import Link from 'next/link';
import { cookies } from 'next/headers';
import BrandWordmark from '@/components/BrandWordmark';
import ClientAccessForm from '@/components/ClientAccessForm';
import ClientStudio from '@/components/ClientStudio';
import { CLIENT_ACCESS_COOKIE, CLIENT_ACCESS_VALUE } from '@/lib/clientAccess';

export default async function ClientPage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get(CLIENT_ACCESS_COOKIE)?.value === CLIENT_ACCESS_VALUE;

  if (hasAccess) {
    return <ClientStudio />;
  }

  return (
    <div className="min-h-screen bg-[#fff7f5] text-stone-900">
      <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(380px,460px)] lg:gap-16 lg:px-12">
        <section className="max-w-2xl">
          <Link
            href="/"
            className="text-[0.7rem] uppercase tracking-[0.32em] text-stone-500 transition hover:text-red-700"
          >
            Back to SweetPear
          </Link>

          <p className="mt-10 text-[0.68rem] uppercase tracking-[0.38em] text-red-600">
            SweetPear client tab
          </p>
          <BrandWordmark variant="hero" className="mt-5 text-[3.2rem] sm:text-[4.4rem]" />
          <h1 className="mt-8 text-4xl font-light tracking-tight sm:text-5xl">
            A private upload studio for new artwork and checkout-ready listings.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600">
            Once unlocked, the client tab lets you add artwork images, pricing, and descriptions
            that feed directly into the storefront gallery and purchase flow.
          </p>
        </section>

        <ClientAccessForm />
      </main>
    </div>
  );
}
