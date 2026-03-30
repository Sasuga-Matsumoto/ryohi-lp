import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/src/components/Footer';
import UtmCapture from '@/src/components/UtmCapture';

export const metadata: Metadata = {
  title: 'PLEX 出張旅費規程 | 社長の手取りを100万円増やす新しい税金対策',
  description: 'PLEX出張旅費規程は、出張日当の仕組みを活用して社長の手取りアップと企業のコスト削減を同時に実現するBPOサービスです。',
  other: {
    'theme-color': '#1E3A8A',
  },
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/favicon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="facebook-domain-verification" content="qp16n1m37br1iia69vrl6w8mimhe47" />
        {/* GTM placeholder - replace with actual container ID */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <UtmCapture />
        {children}
        <Footer />
      </body>
    </html>
  );
}
