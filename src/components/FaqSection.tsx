'use client';
import { useState, useRef, useCallback } from 'react';
import FadeIn from './FadeIn';

const faqs = [
  { q: 'Q. 社長の作業はどれくらいかかりますか？', a: '月1回、出張ログの確認・承認をしていただくだけです。所要時間は約15分。カレンダーから出張を自動検知し、帳票もすべて自動生成するため、それ以外の作業は発生しません。' },
  { q: 'Q. 導入にどれくらい時間がかかりますか？', a: '最短4週間で運用開始できます。ヒアリング・設計に1〜2週間、規程整備に1〜2週間、システム設定に1週間が目安です。' },
  { q: 'Q. 一人社長でも利用できますか？', a: 'はい。ただし、出張旅費制度は全従業員に適用する形で作成する必要があります。役員のみの会社でも規程のドラフトは対応可能です。' },
  { q: 'Q. どのカレンダーアプリに対応していますか？', a: '現在はGoogle Calendarに対応しています。OAuth認証で読み取り権限を設定するだけで、以降は自動で出張データを取得します。' },
  { q: 'Q. 顧問税理士との連携は必要ですか？', a: '日当の支給は経費精算として処理するため、給与計算への影響はありません。仕訳データCSVを会計ソフトにインポートするだけなので、特別な連携は不要です。事前の情報共有は推奨しています。' },
  { q: 'Q. 会計ソフトとの連携はどうなりますか？', a: '毎月、仕訳データCSVを自動生成します。お使いの会計ソフトにインポートするだけで処理が完了します。給与システムの変更は一切不要です。' },
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
