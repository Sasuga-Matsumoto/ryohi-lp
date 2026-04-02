import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import ScheduleButton from '@/src/components/ScheduleButton';
import ThanksPageView from '@/src/components/ThanksPageView';

export const metadata: Metadata = {
  title: 'お問い合わせありがとうございます | PLEX 出張旅費制度',
  robots: 'noindex, nofollow',
};

export default function ThanksContactPage() {
  return (
    <>
      <ThanksPageView formType="contact" />
      <Header variant="thanks-contact" />
      <section className="thanks-section">
        <div className="thanks-inner fade-up">
          <div className="thanks-card">
            <div className="thanks-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>

            <h1 className="thanks-title">お問い合わせありがとうございます</h1>

            <p className="thanks-message">PLEX出張旅費制度は、出張日当の仕組みを活用して<br />社長の手取りアップと企業のコスト削減を同時に実現するサービスです。</p>

            <div className="thanks-schedule">
              <p className="thanks-schedule-text">お問い合わせ内容を踏まえて、30分程度でご説明します</p>
              <ScheduleButton label="空き日程を見る" formType="contact" />
            </div>

            <div className="thanks-divider"></div>

            <div className="thanks-features">
              <div className="thanks-feature-item">
                <div className="thanks-feature-number">0<span style={{ fontSize: '0.9rem' }}>円</span></div>
                <div className="thanks-feature-label">初期費用</div>
              </div>
              <div className="thanks-feature-item">
                <div className="thanks-feature-number"><span style={{ fontSize: '0.9rem' }}>月</span>1<span style={{ fontSize: '0.9rem' }}>回</span></div>
                <div className="thanks-feature-label">承認のみ</div>
              </div>
              <div className="thanks-feature-item">
                <div className="thanks-feature-number">100<span style={{ fontSize: '0.9rem' }}>%</span></div>
                <div className="thanks-feature-label">否認リスク保証</div>
              </div>
            </div>

            <div className="thanks-divider"></div>

            <div className="thanks-steps">
              <div className="thanks-steps-label">Next Steps</div>
              <div className="thanks-step">
                <div className="thanks-step-num">1</div>
                <div className="thanks-step-content">
                  <div className="thanks-step-title">お電話でヒアリング</div>
                  <div className="thanks-step-desc">翌営業日</div>
                </div>
              </div>
              <div className="thanks-step">
                <div className="thanks-step-num">2</div>
                <div className="thanks-step-content">
                  <div className="thanks-step-title">30分程度のオンライン説明</div>
                  <div className="thanks-step-desc">サービスの全体像と削減シミュレーションをご案内</div>
                </div>
              </div>
              <div className="thanks-step">
                <div className="thanks-step-num">3</div>
                <div className="thanks-step-content">
                  <div className="thanks-step-title">導入サポート</div>
                  <div className="thanks-step-desc">最短4週間で運用開始</div>
                </div>
              </div>
            </div>

            <div className="thanks-notice">
              <div className="thanks-notice-item">
                <span className="thanks-notice-icon">&#x1F4DE;</span>
                <span>翌営業日に担当者からお電話いたします。お問い合わせ内容について詳しくご案内いたします。</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
