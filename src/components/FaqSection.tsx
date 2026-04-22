'use client';
import { useState, useRef, useCallback } from 'react';
import FadeIn from './FadeIn';

const faqs = [
  { q: 'Q. 社長の作業はどれくらいかかりますか？', a: '月次の運用は、出張ログの確認と、日当支払ファイル・仕訳データのアップロードのみです。導入時は、規程の承認、決議書類の確認、届出などを順次お願いしています。' },
  { q: 'Q. 導入にどれくらい時間がかかりますか？', a: '契約書提出から最短1週間で利用開始できます。規程の整備・決議に1週間〜1ヶ月、運用フロー確認に2週間程度が目安です。' },
  { q: 'Q. 顧問税理士との連携は必要ですか？', a: 'サービスのご利用にあたって、顧問税理士との特別な連携作業は不要です。会計ソフト向けのCSV雛形をご用意していますので、そちらの形式に沿ってご運用いただけます。導入時には、事前に顧問税理士への情報共有をおすすめしています。' },
  { q: 'Q. 会計ソフトとの連携はどうなりますか？', a: '会計ソフトにインポート可能なCSVの雛形（形式・項目設計）をご用意しています。雛形の形式に沿ってご運用いただくため、給与システム側の変更は不要です。' },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = useCallback((i: number) => {
    setActiveIndex(prev => prev === i ? null : i);
  }, []);

  return (
    <section className="section faq" id="faq">
      <div className="inner">
        <FadeIn className="section-center">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">よくあるご質問</h2>
        </FadeIn>

        <FadeIn>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${activeIndex === i ? ' active' : ''}`}>
                <button
                  className="faq-question"
                  aria-expanded={activeIndex === i}
                  aria-controls={`faq-a${i + 1}`}
                  onClick={() => toggle(i)}
                >
                  {faq.q}
                </button>
                <div
                  className="faq-answer"
                  id={`faq-a${i + 1}`}
                  role="region"
                  ref={el => { answerRefs.current[i] = el; }}
                  style={{ maxHeight: activeIndex === i ? `${answerRefs.current[i]?.scrollHeight || 200}px` : '0' }}
                >
                  <div className="faq-answer-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
