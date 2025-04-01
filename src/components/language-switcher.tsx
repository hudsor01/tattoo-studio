'use client';

import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const switchToLocale = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => switchToLocale(locale === 'en' ? 'es' : 'en')}
      className="rounded-full"
      aria-label={locale === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      <Globe className="h-5 w-5" />
      <span className="ml-2 sr-only md:not-sr-only md:inline-block">
        {locale === 'en' ? 'Español' : 'English'}
      </span>
    </Button>
  );
}

export default LanguageSwitcher;
