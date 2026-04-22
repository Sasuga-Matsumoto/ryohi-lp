import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import DownloadForm from '@/src/components/DownloadForm';
import FormStartTracker from '@/src/components/FormStartTracker';

export const metadata: Metadata = {
  title: '資料ダウンロード | PLEX 出張旅費制度',
  description: 'PLEX出張旅費制度のサービス資料をダウンロードいただけます。出張旅費制度の概要、手取りアップの仕組み、削減額の概算例、導入フローをご案内します。',
};

export default function DownloadPage() {
  return (
    <>
      <Header variant="download" />
      <FormStartTracker formType="download" />
      <DownloadForm />
    </>
  );
}
