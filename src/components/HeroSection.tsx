import TrackedLink from '@/src/components/TrackedLink';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="inner">
        <div className="hero-label">PLEX TRAVEL EXPENSE</div>
        <h1 className="hero-title">社長の手取りを100万円増やす<br />新しい税金対策</h1>
        <div className="hero-sub-pitch">
          <span>初期費用 0円</span>
          <span>月1回承認のみ</span>
          <span>否認保証付き</span>
        </div>
        <div className="cta-group">
          <TrackedLink href="/contact/" className="btn btn-primary" eventParams={{ form_type: 'contact', cta_location: 'hero' }}>まずは問い合わせする</TrackedLink>
        </div>
        <div className="hero-note">※ 月額報酬100万円・月10回出張の場合の試算です</div>
      </div>
    </section>
  );
}
