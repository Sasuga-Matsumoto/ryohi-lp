import FadeIn from './FadeIn';
import TrackedLink from '@/src/components/TrackedLink';

export default function PainSolutionSection() {
  return (
    <section className="section pain-solution" id="pain">
      <div className="inner">
        <FadeIn className="section-center">
          <div className="section-label">SOLUTION</div>
          <h2 className="section-title">こんなお悩みありませんか？</h2>
        </FadeIn>

        <FadeIn>
          <div className="pain-cards">
            <div className="pain-card">
              <div className="pain-icon">!</div>
              <p>法人税・所得税の負担が重いが<br />節税手段が限られている</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">!</div>
              <p>旅費制度を整備したいが<br />手間がかかりすぎて手が回らない</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">!</div>
              <p>節税を検討しても<br />リスクが曖昧で踏み切れない</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="solution-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </div>
        </FadeIn>

        <FadeIn className="section-center">
          <h3 className="section-title" style={{ fontSize: '1.3rem' }}>出張旅費制度のお悩みをPLEXが解決します</h3>
        </FadeIn>

        <FadeIn>
          <div className="solution-cards">
            <div className="solution-card">
              <div className="solution-num">01</div>
              <h4>非課税枠の出張日当で<br />手取りアップ</h4>
              <p>所得税法9条1項4号に基づく非課税所得。報酬の一部を日当に組み替えるだけで、所得税・住民税・社保が削減されます。</p>
            </div>
            <div className="solution-card">
              <div className="solution-num">02</div>
              <h4>規程整備から月次運用まで<br />フルサポート</h4>
              <p>制度設計、各種規程・届け出、運用フロー、証拠管理まで網羅的に雛形提供。</p>
            </div>
            <div className="solution-card">
              <div className="solution-num">03</div>
              <h4>複数リスクをケア</h4>
              <p>制度の目的設定、日当の設定背景など各種対策サンプルを提供。</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mid-cta">
          <div className="cta-group">
            <TrackedLink href="/download/" className="btn btn-primary" eventParams={{ form_type: 'download', cta_location: 'pain_solution' }}>まずは無料で資料請求</TrackedLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
