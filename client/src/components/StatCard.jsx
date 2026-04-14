function StatCard({ title, value, subtitle, trend }) {
    const trendColor = trend?.startsWith("+") ? "text-emerald-600" : "text-rose-600";
  
    return (
      <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-slate-500">{subtitle}</p>
          {trend ? <span className={`text-xs font-semibold ${trendColor}`}>{trend}</span> : null}
        </div>
      </article>
    );
  }
  
  export default StatCard;
  