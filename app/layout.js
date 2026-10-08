import './globals.css';
import AnalyticsTracker from '../components/AnalyticsTracker';
export const metadata={title:'Flores — Garden maintenance, pruning & wildlife-friendly gardening',description:'Premium garden maintenance, specialist pruning, fruit tree care, planting and wildlife-friendly gardening.'};
export default function RootLayout({children}){return <html lang="en-GB"><body><AnalyticsTracker/>{children}</body></html>}
