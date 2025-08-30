import { Percent } from 'lucide-react';

export default function BreakdownTable({ numbers, formatCurrency }) {
  const Row = ({ label, value, hint, bold }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 items-center py-2">
      <div className="col-span-1 text-sm text-slate-700">{label}</div>
      <div className={`col-span-1 sm:col-span-2 text-right text-sm ${bold ? 'font-semibold text-slate-900' : 'text-slate-800'}`}>{value}</div>
      {hint ? <div className="col-span-2 text-xs text-slate-500 mt-1 sm:col-span-3">{hint}</div> : null}
    </div>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-semibold">Detailed Breakdown</h3>
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <Percent className="h-4 w-4" />
          <span>All rates are adjustable</span>
        </div>
      </div>
      <div className="divide-y divide-slate-200">
        <Row label="Gross Commission" value={formatCurrency(numbers.grossCommission)} />
        <Row label={`Your Side (${numbers.yourSidePct}% of gross)`} value={formatCurrency(numbers.yourSideGross)} />
        <Row label={`Referral Fee (${numbers.referralPct}%)`} value={`- ${formatCurrency(numbers.referralFee)}`} />
        <Row label={`Your Split (${numbers.agentSplitPct}% of post-referral)`} value={formatCurrency(numbers.agentSplitAmount)} />
        <Row label={`Transaction Fee`} value={`- ${formatCurrency(numbers.transactionFee)}`} />
        <Row label={`Marketing Expenses`} value={`- ${formatCurrency(numbers.marketingExpenses)}`} />
        <Row label={`Pre-Tax Net`} value={formatCurrency(numbers.preTaxNet)} />
        <Row label={`Taxes (${numbers.taxPct}%)`} value={`- ${formatCurrency(numbers.taxes)}`} />
        <Row label="Estimated Take-Home" value={formatCurrency(numbers.takeHome)} bold />
      </div>
    </div>
  );
}
