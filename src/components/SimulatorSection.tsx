'use client';
import { useState, useRef } from 'react';
import FadeIn from './FadeIn';
import TrackedLink from '@/src/components/TrackedLink';

function getEarnedIncome(annualIncome: number) {
  if (annualIncome <= 0) return 0;
  let v: number;
  if (annualIncome <= 1900000) v = annualIncome - 650000;
  else if (annualIncome <= 3600000) v = annualIncome * 0.7 - 80000;
  else if (annualIncome <= 6600000) v = annualIncome * 0.8 - 440000;
  else if (annualIncome <= 8500000) v = annualIncome * 0.9 - 1100000;
  else v = annualIncome - 1950000;
  return Math.max(0, v);
}

function getMarginalTaxRate(annualIncome: number): number {
  const earned = getEarnedIncome(annualIncome);
  if (earned <= 1949000) return 0.05;
  if (earned <= 3299000) return 0.10;
  if (earned <= 6949000) return 0.20;
  if (earned <= 8999000) return 0.23;
  if (earned <= 17999000) return 0.33;
  if (earned <= 39999000) return 0.40;
  return 0.45;
}

function formatNum(n: number) { return Math.round(n).toLocaleString('ja-JP'); }
function formatMan(n: number) { return (Math.round(n / 1000) / 10).toFixed(1); }

const DAILY_ALLOWANCE = 20000; // CEO domestic per diem

interface Results {
  ceoAnnualIncrease: string;
  companySaving: string;
  monthlyComp: string;
  monthlyCompAfter: string;
  monthlyAllowance: string;
  totalBefore: string;
  totalAfter: string;
  taxBefore: string;
  taxAfter: string;
  takeHomeBefore: string;
  takeHomeAfter: string;
  diffMonthly: string;
  diffAnnual: string;
}

export default function SimulatorSection() {
  const [salary, setSalary] = useState('1000000');
  const [trips, setTrips] = useState('10');
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const monthlyComp = parseInt(salary, 10);
    const tripCount = parseInt(trips, 10);
    const monthlyAllowance = tripCount * DAILY_ALLOWANCE;
    const annualConversion = monthlyAllowance * 12;

    // Before: full salary
    const annualBefore = monthlyComp * 12;
    const marginalRate = getMarginalTaxRate(annualBefore);

    // Simplified calculation based on business plan methodology:
    // Savings = conversion amount * (income tax rate + resident tax 10% + health insurance 10% + consumption tax 10/110)
    const incomeTaxSaving = annualConversion * marginalRate;
    const residentTaxSaving = annualConversion * 0.10;
    const healthInsPersonal = annualConversion * 0.05;
    const healthInsCompany = annualConversion * 0.05;
    const consumptionTax = annualConversion * (10 / 110);

    const ceoAnnualIncrease = incomeTaxSaving + residentTaxSaving + healthInsPersonal;
    const companySaving = healthInsCompany + consumptionTax;

    // Monthly breakdown
    const monthlyTaxBefore = monthlyComp * (marginalRate + 0.10 + 0.05); // income + resident + health personal
    const monthlyCompAfter = monthlyComp - monthlyAllowance;
    const monthlyTaxAfter = monthlyCompAfter * (marginalRate + 0.10 + 0.05);
    const takeHomeBefore = monthlyComp - monthlyTaxBefore;
    const takeHomeAfter = monthlyCompAfter - monthlyTaxAfter + monthlyAllowance;
    const monthlyDiff = takeHomeAfter - takeHomeBefore;

    setResults({
      ceoAnnualIncrease: '+' + formatNum(ceoAnnualIncrease),
      companySaving: '-' + formatNum(companySaving),
      monthlyComp: formatMan(monthlyComp) + '万円',
      monthlyCompAfter: formatMan(monthlyCompAfter) + '万円',
      monthlyAllowance: formatMan(monthlyAllowance) + '万円',
      totalBefore: formatMan(monthlyComp) + '万円',
      totalAfter: formatMan(monthlyComp) + '万円',
      taxBefore: formatMan(monthlyTaxBefore) + '万円',
      taxAfter: formatMan(monthlyTaxAfter) + '万円',
      takeHomeBefore: formatMan(takeHomeBefore) + '万円',
      takeHomeAfter: formatMan(takeHomeAfter) + '万円',
      diffMonthly: '+' + formatNum(monthlyDiff),
      diffAnnual: '+' + formatNum(ceoAnnualIncrease),
    });
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  return (
    <section className="section simulator" id="simulator">
      <div className="inner">
        <FadeIn className="section-center">
          <div className="section-label">SIMULATION</div>
          <h2 className="section-title">あなたの削減額をシミュレーション</h2>
          <p className="section-desc">月額報酬と出張回数を選択するだけで、年間の手取り増加額がわかります。</p>
        </FadeIn>

        <FadeIn>
          <div className="sim-form-card">
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--dark-blue)', marginBottom: '20px' }}>条件を入力してください</div>
            <div className="input-group">
              <label htmlFor="sim-salary">月額報酬（額面）</label>
              <select id="sim-salary" value={salary} onChange={e => setSalary(e.target.value)}>
                <option value="500000">50万円</option>
                <option value="600000">60万円</option>
                <option value="700000">70万円</option>
                <option value="800000">80万円</option>
                <option value="900000">90万円</option>
                <option value="1000000">100万円</option>
                <option value="1200000">120万円</option>
                <option value="1500000">150万円</option>
                <option value="2000000">200万円</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="sim-trips">月の出張回数<span style={{ fontWeight: 400, fontSize: '0.75rem', color: '#94A3B8', marginLeft: '6px' }}>※社外での打ち合わせを含む</span></label>
              <select id="sim-trips" value={trips} onChange={e => setTrips(e.target.value)}>
                <option value="5">5回</option>
                <option value="8">8回</option>
                <option value="10">10回</option>
                <option value="12">12回</option>
                <option value="15">15回</option>
                <option value="20">20回</option>
              </select>
            </div>
            <button className="calc-btn" onClick={calculate}>シミュレーションする</button>
            <div className="sim-notes">
              ※ 日当は1回20,000円（代表取締役・国内出張）で計算<br />
              ※ 所得税は限界税率で試算（概算値）<br />
              ※ 住民税10%、健保 労使各5%で試算
            </div>
          </div>
        </FadeIn>

        {results && (
          <div
            ref={resultsRef}
            style={{
              marginTop: '28px',
              opacity: showResults ? 1 : 0,
              transform: showResults ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <div className="sim-results-card">
              <div className="result-badge">シミュレーション結果</div>
              <div className="result-row">
                <div className="result-item">
                  <div className="r-label">社長の手取り増（年間）</div>
                  <div className="r-value"><span>{results.ceoAnnualIncrease}</span><span className="r-unit">円/年</span></div>
                </div>
                <div className="result-divider"></div>
                <div className="result-item">
                  <div className="r-label">会社の削減額（年間）</div>
                  <div className="r-value"><span>{results.companySaving}</span><span className="r-unit">円/年</span></div>
                </div>
              </div>
            </div>

            <div className="sim-breakdown-card">
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--dark-blue)', marginBottom: '16px' }}>月額内訳</div>
              <table className="breakdown-table">
                <thead>
                  <tr><th></th><th>利用前</th><th></th><th>利用後</th></tr>
                </thead>
                <tbody>
                  <tr><td>月額報酬</td><td>{results.monthlyComp}</td><td className="bd-arrow">&rarr;</td><td>{results.monthlyCompAfter}</td></tr>
                  <tr><td>出張日当（非課税）</td><td>0</td><td className="bd-arrow">&rarr;</td><td>{results.monthlyAllowance}</td></tr>
                  <tr><td>受取総額</td><td>{results.totalBefore}</td><td className="bd-arrow">&rarr;</td><td>{results.totalAfter}</td></tr>
                  <tr><td>税金・社保</td><td>{results.taxBefore}</td><td className="bd-arrow">&rarr;</td><td>{results.taxAfter}</td></tr>
                  <tr className="bd-total"><td>手取り</td><td>{results.takeHomeBefore}</td><td className="bd-arrow">&rarr;</td><td>{results.takeHomeAfter}</td></tr>
                </tbody>
              </table>
              <div className="bd-diff">月 <span>{results.diffMonthly}</span>円 / 年 <span>{results.diffAnnual}</span>円 手取りアップ</div>
            </div>
          </div>
        )}

        <FadeIn className="mid-cta">
          <div className="cta-group">
            <TrackedLink href="/contact/" className="btn btn-primary" eventParams={{ form_type: 'contact', cta_location: 'simulator' }}>まずは問い合わせする</TrackedLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
