import { Percent, DollarSign } from 'lucide-react';

export default function CommissionForm({ values, onChange }) {
  const update = (key, val) => {
    onChange({ ...values, [key]: val === '' ? '' : Number(val) });
  };

  const Input = ({ label, id, icon: Icon, suffix, min = 0, step = 'any', value, onValue, placeholder }) => (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /> : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-slate-300 bg-white pr-12 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 ${Icon ? 'pl-9' : 'pl-3'}`}
          value={value}
          onChange={(e) => onValue(e.target.value)}
        />
        {suffix ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm select-none">{suffix}</span>
        ) : null}
      </div>
    </label>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-semibold mb-4">Deal Inputs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Sale Price"
          id="salePrice"
          icon={DollarSign}
          value={values.salePrice}
          onValue={(v) => update('salePrice', v)}
          min={0}
          step={1000}
          suffix="$"
          placeholder="e.g. 600000"
        />
        <Input
          label="Total Commission %"
          id="totalCommissionPct"
          icon={Percent}
          value={values.totalCommissionPct}
          onValue={(v) => update('totalCommissionPct', v)}
          min={0}
          step={0.1}
          suffix="%"
          placeholder="e.g. 6"
        />
        <Input
          label="Your Side Share %"
          id="yourSidePct"
          icon={Percent}
          value={values.yourSidePct}
          onValue={(v) => update('yourSidePct', v)}
          min={0}
          step={1}
          suffix="%"
          placeholder="Buyer/Seller side typically 50%"
        />
        <Input
          label="Your Split with Brokerage %"
          id="agentSplitPct"
          icon={Percent}
          value={values.agentSplitPct}
          onValue={(v) => update('agentSplitPct', v)}
          min={0}
          step={1}
          suffix="%"
          placeholder="You keep this % of your side"
        />
        <Input
          label="Referral Fee % (of your side)"
          id="referralPct"
          icon={Percent}
          value={values.referralPct}
          onValue={(v) => update('referralPct', v)}
          min={0}
          step={0.5}
          suffix="%"
          placeholder="0 if none"
        />
        <Input
          label="Transaction Fee ($)"
          id="transactionFee"
          icon={DollarSign}
          value={values.transactionFee}
          onValue={(v) => update('transactionFee', v)}
          min={0}
          step={25}
          suffix="$"
          placeholder="e.g. 395"
        />
        <Input
          label="Marketing Expenses ($)"
          id="marketingExpenses"
          icon={DollarSign}
          value={values.marketingExpenses}
          onValue={(v) => update('marketingExpenses', v)}
          min={0}
          step={25}
          suffix="$"
          placeholder="Photography, staging, etc."
        />
        <Input
          label="Estimated Taxes %"
          id="taxPct"
          icon={Percent}
          value={values.taxPct}
          onValue={(v) => update('taxPct', v)}
          min={0}
          step={1}
          suffix="%"
          placeholder="Effective combined rate"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            onChange({
              salePrice: 600000,
              totalCommissionPct: 6,
              yourSidePct: 50,
              agentSplitPct: 80,
              referralPct: 0,
              transactionFee: 0,
              marketingExpenses: 250,
              taxPct: 25,
            })
          }
          className="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50"
        >
          Reset to Example
        </button>
        <p className="text-xs text-slate-500">Numbers update instantly as you type.</p>
      </div>
    </div>
  );
}
