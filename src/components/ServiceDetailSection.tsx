import FadeIn from './FadeIn';
import TrackedLink from '@/src/components/TrackedLink';

const services = [
  { num: '01', title: '旅費制度の整備', desc: '規程をパッケージでご提供。専門知識は不要。', delay: 0 },
  { num: '02', title: '決議書類の作成', desc: '取締役会議事録・決定書のドラフトを自動生成。押印するだけ。', delay: 1 },
  { num: '03', title: 'カレンダー連携', desc: 'Google Calendarから出張予定を自動取得。初回の許可クリックのみ。', delay: 2 },
  { num: '04', title: '出張判定・日当計算', desc: '毎月の出張を自動検知し、日当額を自動計算。判定はすべてPLEX側。', delay: 0 },
  { num: '05', title: '帳票生成', desc: '仕訳CSV・振込CSVを毎月自動生成。会計ソフトにそのままインポート。', delay: 1 },
  { num: '06', title: '税務調査対応', desc: '出張ログの証拠保管を自動化。税務調査に必要な書類をいつでも出力可能。', delay: 2 },
];

export default function ServiceDetailSection() {
  return (
    <section className="section service-detail" id="service">
      <div className="inner">
        <FadeIn className="section-center">
          <div className="section-label">SERVICE</div>
          <h2 className="section-title">導入から運用まで、網羅的にサポート</h2>
          <p className="section-desc">規程整備、カレンダー連携、月次の帳票生成まで、必要な雛形と仕組みをPLEXが提供します。</p>
        </FadeIn>

        <div className="service-grid">
          {services.map((s) => (
            <FadeIn key={s.num} delay={s.delay}>
              <div className="service-card">
                <div className="service-card-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mid-cta">
          <div className="cta-group">
            <TrackedLink href="/download/" className="btn btn-primary" eventParams={{ form_type: 'download', cta_location: 'service_detail' }}>まずは無料で資料請求</TrackedLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
