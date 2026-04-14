function BentoStatCard({ icon, iconWrapClassName, badge, label, value, rightSlot }) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={iconWrapClassName}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {rightSlot ?? (
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{badge}</span>
        )}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">{label}</p>
        <h3 className="text-4xl font-extrabold text-on-surface">{value}</h3>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <section>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Impact Overview</h2>
        <p className="text-on-surface-variant text-lg">Real-time humanitarian management and issue tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <BentoStatCard
          icon="emergency"
          iconWrapClassName="p-3 bg-primary-fixed text-primary rounded-xl"
          badge="+12.5%"
          label="Total Issues"
          value="2,842"
        />
        <BentoStatCard
          icon="assignment"
          iconWrapClassName="p-3 bg-secondary-fixed text-secondary rounded-xl"
          badge="High Load"
          label="Active Tasks"
          value="156"
        />
        <BentoStatCard
          icon="check_circle"
          iconWrapClassName="p-3 bg-tertiary-fixed text-tertiary rounded-xl"
          badge="+84%"
          label="Tasks Completed"
          value="1,208"
        />
        <BentoStatCard
          icon="group"
          iconWrapClassName="p-3 bg-primary-fixed text-primary rounded-xl"
          label="Active Volunteers"
          value="845"
          rightSlot={
            <div className="flex -space-x-2">
              <img
                alt=""
                className="h-6 w-6 rounded-full ring-2 ring-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPbtBdgOovSXvUWx-2DMv1P00bt9g-yqnGuU84aKCTm86Wes1_fp3GlOnNuT6tCU_FI1z3XRykK24_6LmMU5wqS__8RDyvqskDbycHWW5FH8pQI0QGpIOQLEkeaYOEui3cj8u7qIjXmsCdB7Dp5EoK2ceL-LEHrqW5SnSvIH0EDC_3bKApjodpvsxXSvfgnFbUg5EdFEK5_SP0v7LXPOaLWVYyGFaZhSXSnaTyrxgFIkFPIibxvqNDb5BQ5YGiRyhrXKBPwzJFox4"
              />
              <img
                alt=""
                className="h-6 w-6 rounded-full ring-2 ring-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmzx-uCIPQmLY3-rlMP_HxQJl-dspQyxP0qP_toiYe7BLhwargpt3qmYauGctYT5LpSOsVNCg2Ngc7NcWajdh3bzg7OZvuNk3DnNMxAhUf29_jAkHeldCeeETS2H2uqwHKPKfir2H6cybxtkpqAto7MXV-dQBcCq-7dta4aWb2ntWmZDBOe6VihL6YRuapwkDHm5e_Va6aaxlu2kGY14vvCa_qi_9BGCLIhPqt-S3V24FzYvayCcNeu4eGEhye6jhGxgO0bfMee9M"
              />
              <div className="h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                +12
              </div>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-8 border border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold text-on-surface tracking-tight">Issue Trends</h4>
              <p className="text-sm text-on-surface-variant">Reported cases over the last 30 days</p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-xl">
              <button className="px-4 py-1.5 text-xs font-bold bg-white text-primary rounded-lg shadow-sm" type="button">
                30 Days
              </button>
              <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant" type="button">
                90 Days
              </button>
            </div>
          </div>

          <div className="h-72 relative flex items-end gap-2 w-full pt-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-b border-slate-100 h-1/4" />
              <div className="w-full border-b border-slate-100 h-1/4" />
              <div className="w-full border-b border-slate-100 h-1/4" />
              <div className="w-full h-1/4" />
            </div>
            {[
              45, 62, 55, 75, 42, 85, 95, 80, 60, 40, 52, 45
            ].map((h, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-t-lg transition-all hover:bg-primary/20 ${idx === 6 ? "bg-primary/30 hover:bg-primary/40 border-t-2 border-primary" : idx === 3 || idx === 7 ? "bg-primary/20 hover:bg-primary/30" : "bg-primary/10"
                  }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-2">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-slate-50 flex flex-col">
          <h4 className="text-xl font-bold text-on-surface tracking-tight mb-6">Issue Categories</h4>
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e1e0ff"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#4648d4"
                strokeDasharray="45, 100"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#8127cf"
                strokeDasharray="25, 100"
                strokeDashoffset="-45"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#00628d"
                strokeDasharray="30, 100"
                strokeDashoffset="-70"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-on-surface">12</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Types</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Medical Aid", color: "bg-primary", pct: "45%" },
              { label: "Sanitation", color: "bg-secondary", pct: "25%" },
              { label: "Education", color: "bg-tertiary", pct: "30%" }
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${row.color}`} />
                  <span className="text-sm font-medium text-on-surface">{row.label}</span>
                </div>
                <span className="text-sm font-bold text-on-surface">{row.pct}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-50 relative">
          <div className="p-8 absolute top-0 left-0 z-10 pointer-events-none">
            <h4 className="text-xl font-bold text-on-surface tracking-tight mb-1">Hotspot Heatmap</h4>
            <p className="text-sm text-on-surface-variant mb-4">Global intervention density</p>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur p-2 rounded-lg w-fit shadow-sm border border-slate-100 pointer-events-auto">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">6 High Intensity zones</span>
            </div>
          </div>

          <div className="w-full h-96 bg-slate-200 relative overflow-hidden group">
            <img
              alt="Map view"
              className="w-full h-full object-cover filter grayscale opacity-40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUrYg3riqWnktEA4w97ImUCj1LtJjLBGVuVvBYBUpO4AB4pza1JjspqpB3WtQkWCAjpGH_P7hkvwQQdQbXth_J-9NVlQtTtL1ZwIaqtCEhxac2jIXm2auWbtrax1WDY_8xzz5P0XMQQJjilUs6EUdNnCyOtQqUohCouPCoa1bI95H0GwQVKzDfgRxqJitGd_cddg8-E5x0A5Dw9dKL8LWLVD0ORoMOOvmHdFYGP3FHcIPuwA1yc2mrMFut1oRSD3PayVjw4zj8BfQ"
            />
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-2/3 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-red-500/30 rounded-full blur-2xl" />

            <div className="absolute top-1/3 left-1/4 group/pin">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-8 w-8 bg-primary/20 rounded-full animate-ping" />
                <div className="h-4 w-4 bg-primary rounded-full border-2 border-white shadow-lg" />
                <div className="absolute bottom-full mb-2 bg-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-bold opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                  Nairobi Cluster: 124 Issues
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 group/pin">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-8 w-8 bg-red-400/20 rounded-full animate-ping" />
                <div className="h-4 w-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
                <div className="absolute bottom-full mb-2 bg-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-bold opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                  Mumbai Hotspot: 432 Issues
                </div>
              </div>
            </div>
            <div className="absolute bottom-1/3 left-3/4 group/pin">
              <div className="relative flex items-center justify-center">
                <div className="h-4 w-4 bg-primary rounded-full border-2 border-white shadow-lg" />
                <div className="absolute bottom-full mb-2 bg-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-bold opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                  Manila Hub: 89 Issues
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 max-w-xs">
            <h5 className="text-xs font-extrabold text-on-surface uppercase mb-2">Live Activity Feed</h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <p className="text-[10px] leading-tight text-on-surface-variant">
                  <span className="font-bold text-on-surface">Clinic Support</span> task completed in Zone 4B by Sarah J.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                <p className="text-[10px] leading-tight text-on-surface-variant">
                  <span className="font-bold text-on-surface">New Issue</span> reported: Water shortage in Southern Sector.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;