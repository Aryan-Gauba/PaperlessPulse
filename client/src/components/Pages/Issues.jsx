const issueRows = [
    {
      title: "Water Supply Disruption",
      subtitle: "Reported via Mobile App #823",
      location: "Upper Nile Sector",
      category: { label: "Infrastructure", className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
      severity: { label: "Critical", className: "text-error", dot: "bg-error" },
      date: "Oct 24, 2023"
    },
    {
      title: "Medical Supply Shortage",
      subtitle: "Reported by Health Clinic A",
      location: "Central Camp 4",
      category: { label: "Healthcare", className: "bg-secondary-fixed text-on-secondary-fixed-variant" },
      severity: { label: "High", className: "text-orange-600", dot: "bg-orange-600" },
      date: "Oct 23, 2023"
    },
    {
      title: "Flooding at Eastern Gate",
      subtitle: "Automatic Sensor Alert",
      location: "East Perimeter",
      category: { label: "Environment", className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
      severity: { label: "Medium", className: "text-slate-500", dot: "bg-slate-400" },
      date: "Oct 23, 2023"
    },
    {
      title: "Classroom Desk Repairs",
      subtitle: "Teacher Submission",
      location: "Main Education Hub",
      category: { label: "Education", className: "bg-primary-fixed text-on-primary-fixed-variant" },
      severity: { label: "Low", className: "text-slate-400", dot: "bg-slate-300" },
      date: "Oct 22, 2023"
    },
    {
      title: "Emergency Power Outage",
      subtitle: "Critical Infrastructure Alert",
      location: "Western Power Grid",
      category: { label: "Utilities", className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
      severity: { label: "Critical", className: "text-error", dot: "bg-error" },
      date: "Oct 22, 2023"
    }
  ];
  
  function Issues() {
    return (
      <section>
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Critical Issues Feed</h2>
            <p className="text-on-surface-variant text-lg">Managing community impact through real-time resolution tracking.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col gap-1 min-w-[160px] outline outline-variant/10">
              <span className="uppercase tracking-widest text-on-surface-variant font-bold text-[10px]">Open Cases</span>
              <span className="text-3xl font-extrabold text-primary">124</span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col gap-1 min-w-[160px] outline outline-variant/10">
              <span className="uppercase tracking-widest text-on-surface-variant font-bold text-[10px]">Avg Response</span>
              <span className="text-3xl font-extrabold text-secondary">2.4h</span>
            </div>
          </div>
        </div>
  
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {[
            { icon: "location_on", label: "All Locations" },
            { icon: "category", label: "Category" },
            { icon: "priority_high", label: "Severity" }
          ].map((f) => (
            <button
              key={f.label}
              type="button"
              className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-sm">{f.icon}</span>
              <span className="text-sm font-semibold">{f.label}</span>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
            </button>
          ))}
  
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mr-2">Sort By</span>
            <button className="bg-white p-2 rounded-lg text-primary shadow-sm" type="button">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
            </button>
            <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low" type="button">
              <span className="material-symbols-outlined text-lg">arrow_upward</span>
            </button>
          </div>
        </div>
  
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm shadow-on-surface/5 border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Issue Title</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Location</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Severity</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Date Submitted</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {issueRows.map((row) => (
                <tr key={row.title} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-on-surface font-bold text-sm mb-0.5">{row.title}</span>
                      <span className="text-xs text-on-surface-variant">{row.subtitle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-on-surface-variant text-xs">map</span>
                      {row.location}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`${row.category.className} px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-tight`}>
                      {row.category.label}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`flex items-center gap-1.5 font-bold text-xs uppercase ${row.severity.className}`}>
                      <span className={`h-2 w-2 rounded-full ${row.severity.dot}`} />
                      {row.severity.label}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{row.date}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary font-bold text-xs hover:underline decoration-2 underline-offset-4" type="button">
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="px-6 py-4 bg-surface-container-low/20 flex items-center justify-between">
            <span className="text-xs font-medium text-on-surface-variant">Showing 1 to 5 of 124 entries</span>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors" type="button">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="px-3 py-1 bg-primary text-on-primary rounded-lg text-xs font-bold" type="button">
                1
              </button>
              <button className="px-3 py-1 hover:bg-surface-container-high rounded-lg text-xs font-bold" type="button">
                2
              </button>
              <button className="px-3 py-1 hover:bg-surface-container-high rounded-lg text-xs font-bold" type="button">
                3
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors" type="button">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
  
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">volunteer_activism</span>
              <h4 className="text-lg font-extrabold mb-2">Volunteer Dispatch</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                42 volunteers are currently nearby critical infrastructure zones. Assign them for rapid response.
              </p>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">analytics</span>
              <h4 className="text-lg font-extrabold mb-2">Trend Analysis</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Infrastructure issues have risen by 12% this week in the Northern Sector. Review mitigation plan.
              </p>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-secondary/5 rounded-full group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="bg-tertiary-container p-8 rounded-2xl text-on-tertiary relative overflow-hidden group">
            <div className="relative z-10">
              <span
                className="material-symbols-outlined text-tertiary-fixed text-4xl mb-4"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                auto_awesome
              </span>
              <h4 className="text-lg font-extrabold mb-2">AI Prioritization</h4>
              <p className="text-sm text-on-tertiary/80 leading-relaxed">
                Smart routing is active. 14 tickets have been automatically prioritized based on community impact scores.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Issues;
  