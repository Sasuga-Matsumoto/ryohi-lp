import FadeIn from './FadeIn';
import TrackedLink from '@/src/components/TrackedLink';

export default function FinalCtaSection() {
  return (
    <section className="final-cta" id="contact">
      <FadeIn className="inner">
        <h2>まずはお気軽にお問い合わせください</h2>
        <p>出張回数や報酬額に応じた具体的な削減効果を、専任担当者がご案内いたします</p>
        <div className="cta-group">
          <TrackedLink href="/contact/" className="btn btn-outline-blue hero-contact" eventParams={{ form_type: 'contact', cta_location: 'final_cta' }}>お問い合わせ</TrackedLink>
        </div>
      </FadeIn>
    </section>
  );
}
