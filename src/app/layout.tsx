import type { Metadata } from 'next';
import Script from 'next/script';
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
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MWSK9GM8');
        `}</Script>
        <Script id="gtm-ab" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PVHHML82');
        `}</Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MWSK9GM8" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVHHML82" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <UtmCapture />
        {children}
        <Footer />
      </body>
    </html>
  );
}
