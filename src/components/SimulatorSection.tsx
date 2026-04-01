'use client';
import { useState, useRef } from 'react';
import FadeIn from './FadeIn';
import TrackedLink from '@/src/components/TrackedLink';

/* ── 標準報酬月額テーブル（東京都）[標準報酬, 下限, 上限) ── */
const SMR_TABLE: [number, number, number][] = [
  [58000, 0, 63000],
  [68000, 63000, 73000],
  [78000, 73000, 83000],
  [88000, 83000, 93000],
  [98000, 93000, 101000],
  [104000, 101000, 107000],
  [110000, 107000, 114000],
  [118000, 114000, 122000],
  [126000, 122000, 130000],
  [134000, 130000, 138000],
  [142000, 138000, 146000],
  [150000, 146000, 155000],
  [160000, 155000, 165000],
  [170000, 165000, 175000],
  [180000, 175000, 185000],
  [190000, 185000, 195000],
  [200000, 195000, 210000],
  [220000, 210000, 230000],
  [240000, 230000, 250000],
  [260000, 250000, 270000],
  [280000, 270000, 290000],
  [300000, 290000, 310000],
  [320000, 310000, 330000],
  [340000, 330000, 350000],
  [360000, 350000, 370000],
  [380000, 370000, 395000],
  [410000, 395000, 425000],
  [440000, 425000, 455000],
  [470000, 455000, 485000],
  [500000, 485000, 515000],
  [530000, 515000, 545000],
  [560000, 545000, 575000],
  [590000, 575000, 605000],
  [620000, 605000, 635000],
  [650000, 635000, 665000],
  [680000, 665000, 695000],
  [710000, 695000, 730000],
  [750000, 730000, 770000],
  [790000, 770000, 810000],
  [830000, 810000, 855000],
  [880000, 855000, 905000],
  [930000, 905000, 955000],
  [980000, 955000, 1005000],
  [1030000, 1005000, 1055000],
  [1090000, 1055000, 1115000],
  [1150000, 1115000, 1175000],
  [1210000, 1175000, 1235000],
  [1270000, 1235000, 1295000],
  [1330000, 1295000, 1355000],
  [1390000, 1355000, Infinity],
];

function getStandardMonthly(salary: number): number {
  for (const [std, , hi] of SMR_TABLE) {
    if (salary < hi) return std;
  }
  return SMR_TABLE[SMR_TABLE.length - 1][0];
}

/* ── 社会保険料率 ── */
const HEALTH_RATE = 0.0991;      // 健康保険（東京都・全額）
const PENSION_RATE = 0.183;      // 厚生年金保険（全額）
const PENSION_CAP = 650000;      // 厚生年金 標準報酬月額上限
const EI_RATE = 0.006;           // 雇用保険（被保険者負担）

function getSocialInsurance(monthlySalary: number) {
  const std = getStandardMonthly(monthlySalary);
  const healthHalf = Math.round(std * HEALTH_RATE / 2);
  const pensionHalf = Math.round(Math.min(std, PENSION_CAP) * PENSION_RATE / 2);
  const employmentIns = Math.round(monthlySalary * EI_RATE);
  return { healthHalf, pensionHalf, employmentIns, total: healthHalf + pensionHalf + employmentIns };
}

/* ── 給与所得控除 ── */
function getEarnedIncome(annualIncome: number): number {
  if (annualIncome <= 0) return 0;
  let deduction: number;
  if (annualIncome <= 1900000) deduction = 650000;
  else if (annualIncome <= 3600000) deduction = annualIncome * 0.3 + 80000;
  else if (annualIncome <= 6600000) deduction = annualIncome * 0.2 + 440000;
  else if (annualIncome <= 8500000) deduction = annualIncome * 0.1 + 1100000;
  else deduction = 1950000;
  return Math.max(0, annualIncome - deduction);
}

/* ── 基礎控除（所得税・令和7年） ── */
function getBasicDeductionIT(earnedIncome: number): number {
  if (earnedIncome < 1320000) return 950000;
  if (earnedIncome < 3360000) return 880000;
  if (earnedIncome < 4890000) return 680000;
  if (earnedIncome < 6550000) return 630000;
  if (earnedIncome < 23500000) return 580000;
  if (earnedIncome < 24000000) return 480000;
  if (earnedIncome < 24500000) return 320000;
  if (earnedIncome < 25000000) return 160000;
  return 0;
}

const BASIC_DEDUCTION_RT = 430000; // 基礎控除（住民税）
const RT_RATE = 0.10;              // 住民税 所得割
const RT_FLAT = 5000;              // 住民税 均等割

/* ── 所得税（累進課税） ── */
function getIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let rate: number, deduction: number;
  if (taxableIncome <= 1949000) { rate = 0.05; deduction = 0; }
  else if (taxableIncome <= 3299000) { rate = 0.10; deduction = 97500; }
  else if (taxableIncome <= 6949000) { rate = 0.20; deduction = 427500; }
  else if (taxableIncome <= 8999000) { rate = 0.23; deduction = 636000; }
  else if (taxableIncome <= 17999000) { rate = 0.33; deduction = 1536000; }
  else if (taxableIncome <= 39999000) { rate = 0.40; deduction = 2796000; }
  else { rate = 0.45; deduction = 4796000; }
  return Math.round(taxableIncome * rate - deduction);
}

/* ── 年間手取り計算 ── */
function calcTakeHome(monthlySalary: number, monthlyAllowance: number) {
  const annualSalary = monthlySalary * 12;
  const si = getSocialInsurance(monthlySalary);
  const annualSI = si.total * 12;

  const earned = getEarnedIncome(annualSalary);
  const taxableIT = Math.max(0, earned - annualSI - getBasicDeductionIT(earned));
  const incomeTax = getIncomeTax(taxableIT);
  const taxableRT = Math.max(0, earned - annualSI - BASIC_DEDUCTION_RT);
  const residentTax = Math.round(taxableRT * RT_RATE) + RT_FLAT;

  const totalDeductions = annualSI + incomeTax + residentTax;
  const annualTakeHome = annualSalary - totalDeductions;
  const effectiveAnnual = annualTakeHome + monthlyAllowance * 12;

  return {
    monthlyDeductions: Math.round(totalDeductions / 12),
    monthlyTakeHome: Math.round(annualTakeHome / 12),
    effectiveMonthly: Math.round(effectiveAnnual / 12),
    effectiveAnnual,
    si,
  };
}

/* ── 表示ヘルパー ── */
function formatNum(n: number) { return Math.round(n).toLocaleString('ja-JP'); }
function formatMan(n: number) { return (Math.round(n / 1000) / 10).toFixed(1); }

const DAILY_ALLOWANCE = 20000;

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
    const afterSalary = monthlyComp - monthlyAllowance;

    const before = calcTakeHome(monthlyComp, 0);
    const after = calcTakeHome(afterSalary, monthlyAllowance);

    const ceoAnnualIncrease = after.effectiveAnnual - before.effectiveAnnual;

    // 会社コスト削減 = 雇用主社保折半差額 + 雇用保険事業主負担差額 + 消費税仕入税額控除
    const companySaving =
      (before.si.healthHalf - after.si.healthHalf) * 12 +
      (before.si.pensionHalf - after.si.pensionHalf) * 12 +
      (monthlyComp - afterSalary) * EI_RATE * 12 +
      Math.round(monthlyAllowance * 12 * 10 / 110);

    const monthlyDiff = after.effectiveMonthly - before.monthlyTakeHome;

    setResults({
      ceoAnnualIncrease: '+' + formatNum(ceoAnnualIncrease),
      companySaving: '-' + formatNum(companySaving),
      monthlyComp: formatMan(monthlyComp) + '万円',
      monthlyCompAfter: formatMan(afterSalary) + '万円',
      monthlyAllowance: formatMan(monthlyAllowance) + '万円',
      totalBefore: formatMan(monthlyComp) + '万円',
      totalAfter: formatMan(monthlyComp) + '万円',
      taxBefore: formatMan(before.monthlyDeductions) + '万円',
      taxAfter: formatMan(after.monthlyDeductions) + '万円',
      takeHomeBefore: formatMan(before.monthlyTakeHome) + '万円',
      takeHomeAfter: formatMan(after.effectiveMonthly) + '万円',
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
              ※ 社会保険料は東京都の標準報酬月額表に基づき算出（健保9.91%・厚年18.3%・雇用0.6%）<br />
              ※ 所得税は令和7年基礎控除を適用、住民税は所得割10%＋均等割で試算
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
                  <div className="r-label">会社のコスト削減額（年間）</div>
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
