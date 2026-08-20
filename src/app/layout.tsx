import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookingProvider } from '@/context/BookingContext';

export const metadata: Metadata = {
  title: 'RESERVE Detailing — Luxury Automotive Atelier | Miami, FL',
  description: 'South Florida’s premier automotive detailing, paint correction, and ceramic protection studio. 222 SW 7th St, Miami, FL. Rated 4.9 ★★★★★ from 2,949+ reviews.',
  keywords: [
    'Car Detailing Miami',
    'Luxury Auto Detailing',
    'Paint Correction Miami',
    'Ceramic Coating Miami',
    'XPEL PPF Miami',
    'Porsche Detailing Miami',
    'Exotic Car Detailing',
    'Reserve Detailing'
  ],
  authors: [{ name: 'RESERVE Detailing' }],
  openGraph: {
    title: 'RESERVE Detailing — The Art of the Finish',
    description: 'Bespoke automotive detailing, paint correction, ceramic coatings, and XPEL PPF in Miami, Florida.',
    url: 'https://reservedetailing.com',
    siteName: 'RESERVE Detailing',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'RESERVE Detailing Miami Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RESERVE Detailing — Luxury Automotive Atelier',
    description: 'Premium automotive detailing, protection and restoration in Miami, FL.',
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoBodyShop',
  name: 'RESERVE Detailing',
  image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
  telephone: '+1-786-642-9018',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '222 SW 7th St',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    postalCode: '33130',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.7674,
    longitude: -80.1983
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2949'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00'
    }
  ],
  priceRange: '$$$'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-graphite-950 text-white min-h-screen flex flex-col antialiased selection:bg-champagne-400 selection:text-black">
        <BookingProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
