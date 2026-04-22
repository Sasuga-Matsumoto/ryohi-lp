import TrackedLink from '@/src/components/TrackedLink';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="inner">
        <div className="hero-label">PLEX TRAVEL EXPENSE</div>
        <h1 className="hero-title">社長の手取りを100万円増やす<br />新しい税金対策</h1>
        <div className="hero-sub-pitch">
          <span>手取りUP</span>
          <span>リスクケア</span>
          <span>手間なし</span>
        </div>
        <div className="cta-group">
          <TrackedLink href="/download/" className="btn btn-primary" eventParams={{ form_type: 'download', cta_location: 'hero' }}>まずは無料で資料請求</TrackedLink>
        </div>
        <div className="hero-note">※ 月額報酬100万円・月10回出張の場合の試算です</div>
      </div>
    </section>
  );
}
