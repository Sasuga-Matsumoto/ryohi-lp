import FadeIn from './FadeIn';
import TrackedLink from '@/src/components/TrackedLink';

export default function MeritSection() {
  return (
    <section className="section merit" id="merit">
      <div className="inner">
        <FadeIn className="section-center">
          <div className="section-label">MERIT</div>
          <h2 className="section-title">社長にも会社にも大きなメリット</h2>
        </FadeIn>

        <div className="merit-grid" style={{ marginTop: '36px' }}>
          <FadeIn delay={1}>
            <div className="merit-block-label">社長のメリット</div>
            <div className="merit-card card-employee">
              <h3>報酬の一部を出張日当に組み替えるだけ。<br />手取りが年間100万円アップ。</h3>
              <p>社長の月額報酬の一部を出張日当に組み替えます。受取総額は変わりませんが、日当部分は所得税・住民税・社会保険料がかかりません。その分だけ、手取りが増えます。</p>
            </div>
          </FadeIn>
          <FadeIn delay={2}>
            <div className="merit-block-label">会社のメリット</div>
            <div className="merit-card card-company">
              <h3>社保の会社負担削減＋消費税控除。<br />追加コストゼロで導入可能。</h3>
              <p>出張日当は社会保険料の算定対象外のため、会社負担分も削減されます。さらに、旅費交通費として損金算入でき、消費税の仕入税額控除も適用されます。</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mid-cta">
          <div className="cta-group">
            <TrackedLink href="/download/" className="btn btn-primary" eventParams={{ form_type: 'download', cta_location: 'merit' }}>まずは無料で資料請求</TrackedLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
