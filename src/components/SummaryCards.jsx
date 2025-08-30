import { DollarSign } from 'lucide-react';

function Card({ title, value, accent = 'from-emerald-500 to-emerald-600' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-600">{title}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      </div>
      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${accent} text-white flex items-center justify-center`}>
        <DollarSign className="h-5 w-5" />
      </div>
    </div>
  );
}

export default function SummaryCards({ gross, sideGross, takeHome, formatCurrency }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Gross Commission" value={formatCurrency(gross)} accent="from-slate-700 to-slate-900" />
      <Card title="Your Side (Gross)" value={formatCurrency(sideGross)} accent="from-indigo-500 to-indigo-600" />
      <Card title="Estimated Take-Home" value={formatCurrency(takeHome)} accent="from-emerald-500 to-emerald-600" />
    </div>
  );
}
