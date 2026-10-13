import '@fontsource-variable/bricolage-grotesque/opsz.css';
import './globals.css';
import AnalyticsTracker from '../components/AnalyticsTracker';
import { SITE_URL } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Flores Gardening | Thoughtful Garden Care in Cardiff & the Vale',
    template: '%s | Flores Gardening',
  },
  description: 'Female-led, wildlife-friendly garden maintenance, pruning, planting and garden clearances across Cardiff and the Vale of Glamorgan.',
  applicationName: 'Flores Gardening',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Flores Gardening',
    title: 'Flores Gardening | Thoughtful Garden Care in Cardiff & the Vale',
    description: 'Friendly, ecological garden care for homes across Cardiff and the Vale of Glamorgan.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/logo-mark-96.png', apple: '/logo-mark-96.png' },
};

export const viewport = { themeColor: '#e5ecdf' };

export default function RootLayout({ children }) {
  return <html lang="en-GB"><body><AnalyticsTracker />{children}</body></html>;
}
