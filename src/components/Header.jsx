import { Home, Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Real Estate Commission Calculator</h1>
              <p className="text-xs sm:text-sm text-slate-600">Estimate gross, splits, fees, and your final take-home.</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-700">
            <Calculator className="h-5 w-5" />
            <span className="text-sm">For Realtors</span>
          </div>
        </div>
      </div>
    </header>
  );
}
