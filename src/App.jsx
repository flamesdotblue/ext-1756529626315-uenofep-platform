import { useMemo, useState } from 'react';
import Header from './components/Header';
import CommissionForm from './components/CommissionForm';
import SummaryCards from './components/SummaryCards';
import BreakdownTable from './components/BreakdownTable';

function formatCurrency(value) {
  if (!isFinite(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value || 0);
}

function clampNumber(value, min = 0, max = Number.POSITIVE_INFINITY) {
  const n = Number(value);
  if (!isFinite(n)) return min;
  return Math.min(Math.max(n, min), max);
}

export default function App() {
  const [inputs, setInputs] = useState({
    salePrice: 600000,
    totalCommissionPct: 6,
    yourSidePct: 50,
    agentSplitPct: 80,
    referralPct: 0,
    transactionFee: 0,
    marketingExpenses: 250,
    taxPct: 25,
  });

  const numbers = useMemo(() => {
    const salePrice = clampNumber(inputs.salePrice, 0);
    const totalCommissionPct = clampNumber(inputs.totalCommissionPct, 0, 100);
    const yourSidePct = clampNumber(inputs.yourSidePct, 0, 100);
    const agentSplitPct = clampNumber(inputs.agentSplitPct, 0, 100);
    const referralPct = clampNumber(inputs.referralPct, 0, 100);
    const transactionFee = clampNumber(inputs.transactionFee, 0);
    const marketingExpenses = clampNumber(inputs.marketingExpenses, 0);
    const taxPct = clampNumber(inputs.taxPct, 0, 100);

    const grossCommission = salePrice * (totalCommissionPct / 100);
    const yourSideGross = grossCommission * (yourSidePct / 100);

    const referralFee = yourSideGross * (referralPct / 100);
    const afterReferral = yourSideGross - referralFee;

    const agentSplitAmount = afterReferral * (agentSplitPct / 100);

    const preTaxNet = Math.max(agentSplitAmount - transactionFee - marketingExpenses, 0);
    const taxes = preTaxNet * (taxPct / 100);
    const takeHome = Math.max(preTaxNet - taxes, 0);

    return {
      salePrice,
      totalCommissionPct,
      yourSidePct,
      agentSplitPct,
      referralPct,
      transactionFee,
      marketingExpenses,
      taxPct,
      grossCommission,
      yourSideGross,
      referralFee,
      afterReferral,
      agentSplitAmount,
      preTaxNet,
      taxes,
      takeHome,
    };
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <section className="lg:col-span-2">
            <CommissionForm values={inputs} onChange={setInputs} />
          </section>
          <section className="lg:col-span-3 space-y-8">
            <SummaryCards
              gross={numbers.grossCommission}
              sideGross={numbers.yourSideGross}
              takeHome={numbers.takeHome}
              formatCurrency={formatCurrency}
            />
            <BreakdownTable numbers={numbers} formatCurrency={formatCurrency} />
          </section>
        </div>
      </main>
    </div>
  );
}
