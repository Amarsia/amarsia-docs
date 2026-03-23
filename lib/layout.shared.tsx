import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

const LOGO_LIGHT = 'https://storage.googleapis.com/amarsia-assets/amarsia-black.webp';
const LOGO_DARK = 'https://storage.googleapis.com/amarsia-assets/amarsia-white.webp';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {/* Light mode logo */}
          <Image
            src={LOGO_LIGHT}
            alt="Amarsia"
            width={110}
            height={28}
            priority
            className="dark:hidden"
            style={{ objectFit: 'contain' }}
          />
          {/* Dark mode logo */}
          <Image
            src={LOGO_DARK}
            alt="Amarsia"
            width={110}
            height={28}
            priority
            className="hidden dark:block"
            style={{ objectFit: 'contain' }}
          />
        </>
      ),
    },
    links: [
      {
        text: 'Documentation',
        url: '/',
        active: 'nested-url',
      },
      {
        text: 'API Reference',
        url: '/api-reference',
        active: 'nested-url',
      },
    ],
    githubUrl: 'https://github.com/amarsia',
  };
}
