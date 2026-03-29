import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import DownloadForm from '@/src/components/DownloadForm';

export const metadata: Metadata = {
  title: '資料ダウンロード | PLEX 出張旅費規程',
  description: 'PLEX出張旅費規程のサービス資料をダウンロードいただけます。出張旅費規程の概要、手取りアップの仕組み、削減額の概算例をご確認ください。',
};

export default function DownloadPage() {
  return (
    <>
      <Header variant="download" />
      <DownloadForm />
    </>
  );
}
