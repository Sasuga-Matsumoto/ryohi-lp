import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import ContactForm from '@/src/components/ContactForm';
import FormStartTracker from '@/src/components/FormStartTracker';

export const metadata: Metadata = {
  title: 'お問い合わせ | PLEX 出張旅費制度',
  description: 'PLEX出張旅費制度へのお問い合わせはこちら。サービスに関するご質問・ご相談など、お気軽にお問い合わせください。',
};

export default function ContactPage() {
  return (
    <>
      <Header variant="contact" />
      <FormStartTracker formType="contact" />
      <ContactForm />
    </>
  );
}
