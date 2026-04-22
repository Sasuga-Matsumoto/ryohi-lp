import FadeIn from './FadeIn';
import TrackedLink from '@/src/components/TrackedLink';

const services = [
  { num: '01', title: '出張旅費規程', desc: '制度の目的設定・全体設計を含む規程ドラフトをご提供。', delay: 0 },
  { num: '02', title: '決議書類', desc: '取締役会議事録・決定書など決議書類のドラフトをご提供。', delay: 1 },
  { num: '03', title: '各種届出', desc: '意見書・各種届出書類のドラフトと提出フローをご提供。', delay: 2 },
  { num: '04', title: '日当額・出張定義', desc: '日当額・出張定義・支給対象の設計例を複数ご提供。', delay: 0 },
  { num: '05', title: '月次運用フロー', desc: '月次精算・日当支払・仕訳処理の運用フロー雛形をご提供。', delay: 1 },
  { num: '06', title: '証拠保管', desc: '保管が必要な証拠書類の一覧と保管フォーマットをご提供。', delay: 2 },
];

export default function ServiceDetailSection() {
  return (
    <section className="section service-detail" id="service">
      <div className="inner">
        <FadeIn className="section-center">
          <div className="section-label">SERVICE</div>
          <h2 className="section-title">導入から運用まで、網羅的にサポート</h2>
          <p className="section-desc">規程整備、決議書類、各種届出、月次運用、証拠保管まで、必要な雛形一式をPLEXがご提供します。</p>
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
