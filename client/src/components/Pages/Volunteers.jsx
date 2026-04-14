function Volunteers() {
    return (
      <section className="w-full">
        <div className="mb-12">
          <span className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-2 block">Network Overview</span>
          <h2 className="text-4xl font-extrabold text-on-surface -tracking-tight mb-4">Volunteers Management</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              1,284 ACTIVE GLOBALLY
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold">
              142 NEW THIS MONTH
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/15 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <img
                className="w-full h-full object-cover grayscale"
                alt=""
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAfF2Es4TvSJbc8H4vVkytLgW9YrHHdHSJO6uLGip350DVduTIu1HjSHY4qKE2Wg6OJH4DHhKSHDXPP5JbQRCYWsU0H8zwlwDljxlzA7TBecAN2KQpYxh-KUJbXYcS1N1Un6a5fh6tiG3xmo_yfqolc6_UhiPVawq21yieSkLfSyc-wI6pG3_gu9afsyVb5IN5uhYRnOO5_GxpPf6EJp2w7ENqg4TwLJMbMM9CktE8xme8eGY4Wsa4PMcM21h0pDDskURGDe3dZOs"
              />
            </div>
  
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                  auto_awesome
                </span>
                <span className="text-sm font-bold text-secondary tracking-wide">SMART SUGGESTION ENGINE</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface">Optimal Match Found</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Based on recent task completions and community feedback,{" "}
                <span className="font-bold text-primary">Alex Rivera</span> is perfectly suited for the{" "}
                <span className="italic text-tertiary">"Urban Forestry Workshop"</span> scheduled for next Tuesday.
              </p>
              <div className="flex items-center gap-4">
                <button
                  className="px-6 py-3 bg-impact-gradient text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                  type="button"
                >
                  Assign Immediately
                </button>
                <button
                  className="px-6 py-3 bg-surface-container-low text-on-surface-variant rounded-xl font-bold text-sm hover:bg-surface-container-high transition-colors"
                  type="button"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
  
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-secondary-container text-on-secondary-container rounded-2xl p-6 flex flex-col justify-between flex-1 relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase">Community Health</span>
                <div className="text-4xl font-extrabold my-2">98.4%</div>
                <p className="text-xs opacity-90">Retention rate over the last 90 days</p>
              </div>
              <div className="mt-4 h-12 w-full flex items-end gap-1 relative z-10">
                <div className="flex-1 bg-white/20 h-4 rounded-t-sm" />
                <div className="flex-1 bg-white/30 h-6 rounded-t-sm" />
                <div className="flex-1 bg-white/20 h-5 rounded-t-sm" />
                <div className="flex-1 bg-white/40 h-8 rounded-t-sm" />
                <div className="flex-1 bg-white/60 h-10 rounded-t-sm" />
                <div className="flex-1 bg-white h-12 rounded-t-sm" />
              </div>
            </div>
  
            <div className="bg-tertiary-container text-on-tertiary-container rounded-2xl p-6 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase">Impact Rating</span>
                <div className="text-4xl font-extrabold my-2">4.92</div>
              </div>
              <div className="flex -space-x-2">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAk1mk59kCFX_jhi6QVIhyig3JThVadaUnzTQpRFwA3hF1svCHEa5K6l18W_4c7cGR9_PIWQoKNpIFbwjKVk4tSeuFVt3uP7bhjuDk-IhdbLykP5US7igXbUmJJrjO1YAhgQbADUzxuLqKaxy1ULzl816sr28ugcr0ygbWTU9gecrDObjvJxMUHfkBpDFsEfHFaYGpbY0ujl0-lpnftBsmu7S9Zq3S1c22XpmdkSpyjS4WX8CA_mNHfjzY8hJg6E-DJPsrfktVtous",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCea0o6B_EjgSREmHJuzZSyp6pUz9r4aW14WFMFrfWPdAmQGiuSnVwrvOqw2jVr16kA5HUoodyhjKfGGjaljN9xifLXRM56R0Gr_GRhYedu-mEl94__jhn6VrLKZz2ef7AsxbmiqJYE3FT6y7S88IxlXV76J7QGOS8gZwj4xe_BR1yU4jn6iuAAQDP7amZeOdViS4fBttDuiCtsiKoG4VTR_U8AXQXR2W-dPO7pWI-fE-l8UF6IOSlhnF2JnSXLUfcFNQcg-H3G0w0",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDjFhMGcjZo-MU9cT7CGVLHkytvxVSuKo01co4ULEPmV0OjnhfNsa9-4YtfeGKPakh3doL2Hz4JPBrK4empb7UN58FdxlrXWE0pfaAevNjlBWATXY3vuDssCUM8PqDbEFAQQd3hQDqDngJj98Jg2xV5D0nn7GUe3SJj4i8KIvMLZOmbPi2Xf2-TogFqvKeV-619krVkYWei0HZ7zgbRS9y9rBxAjGwTJvXjHj-XeIRM2lfTlErZUclV5PR1opVbRDornOI47017z6Y"
                ].map((src) => (
                  <div key={src} className="w-8 h-8 rounded-full border-2 border-tertiary-container bg-slate-200 overflow-hidden">
                    <img className="w-full h-full rounded-full object-cover" alt="" src={src} />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-tertiary-container bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface">
                  +12
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-on-surface">Volunteer Directory</h3>
          <div className="flex gap-2">
            <button
              className="p-2 bg-surface-container-low rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined">tune</span>
            </button>
            <button
              className="p-2 bg-surface-container-low rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined">sort</span>
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 hover:shadow-xl hover:shadow-on-surface/5 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    alt="Alex Rivera"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV8Gsk1em9GaVHpzeejAFrLYWSyG6nOqHz4lLLLc_mhW-AsNCLrFgEJzS1P-dIG6SuB7V4XEtBUKajVRhYknwOIE2A_uDt8KxxK-xMSMbHQ5mnOEXODDHGfTLdmcF-C_xKy5ue0t2VLPKuWPT367QNXB5NUIItOeqEodwTmvn6ZCjlAlMm-uAHpiwfm6DRqDyW47aSJkyTzq-jwsIvoaPVGI4glu8qGIyjAoYX-zXCxAOZJWUYFY5PTEDkYuldSWzSYoX5iYnIbrI"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg">Alex Rivera</h4>
                  <p className="text-xs text-on-surface-variant">Senior Lead • Join 2021</p>
                </div>
              </div>
              <div className="px-2 py-1 bg-surface-container-low rounded text-[10px] font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  verified
                </span>
                TOP TIER
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Logistics", "Strategy", "Training"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-[10px] font-bold uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/5">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Tasks Done</span>
                <div className="text-xl font-extrabold text-on-surface">142</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Impact Rating</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-extrabold text-on-surface">4.9</span>
                  <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                    star
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-tertiary">
                <span>Progress to Ambassador</span>
                <span>92%</span>
              </div>
              <div className="h-2 w-full bg-tertiary-fixed rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: "92%" }} />
              </div>
            </div>
          </div>
  
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 hover:shadow-xl hover:shadow-on-surface/5 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    alt="Marcus Chen"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLdn6uNGGHcEulShsBP07GV3Gf4oXCeJ--rzIi9vKl_uEh0TIqbGmK9qL-4S45yhQS7ritJeME_c1oPvma0bygSxRm7gKyy2DW_MUvYiTbE2m7QazFfqRC5TUOG0puTcEmo9ANRS_OXptkr1fJ1Q8yof264aNK5TsBjjOkIC6CfzX0YUg1vSDqFkkdOC76QWXD41MqEz0RBrGp-uGut327ICMA4ihCygCR_4ucTW_Nr1leu5FfXf7ZuQwCR5BUmaOq66Iop7X9zpc"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg">Marcus Chen</h4>
                  <p className="text-xs text-on-surface-variant">Core Member • Join 2022</p>
                </div>
              </div>
              <div className="px-2 py-1 bg-surface-container-low rounded text-[10px] font-bold text-slate-500 flex items-center gap-1">
                ACTIVE
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Software", "Data"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-[10px] font-bold uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/5">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Tasks Done</span>
                <div className="text-xl font-extrabold text-on-surface">67</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Impact Rating</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-extrabold text-on-surface">4.7</span>
                  <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                    star
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-tertiary">
                <span>Progress to Ambassador</span>
                <span>45%</span>
              </div>
              <div className="h-2 w-full bg-tertiary-fixed rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: "45%" }} />
              </div>
            </div>
          </div>
  
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 hover:shadow-xl hover:shadow-on-surface/5 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    alt="Elena Fischer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF4k0cKsb2p7zbTvE_iT-OsPvZ-hCwintp-2u05RjdrFtkyPozV9-mLwfOYSyLymDp3EBn0K4aUTUdTf7kRi-fsI0R36N7XPWK8GsAI5EwBLFmn35cVYy1t7F87cjn3dO41Fsj415MNcjXUINuctjBGzV3G1Tz5PK742S4cPFX0eKTMRvTt4mdICeuqVptVgRGEXDcJp6U6LVXipdUsI_r1TiAVaS0lLZVm3pnbmir8N5bDegdoOib4jDQS6484GkwQkBYYzIOYso"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg">Elena Fischer</h4>
                  <p className="text-xs text-on-surface-variant">Rising Star • Join 2023</p>
                </div>
              </div>
              <div className="px-2 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded text-[10px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  bolt
                </span>
                FAST MOVER
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Community Outreach", "First Aid"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-[10px] font-bold uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/5">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Tasks Done</span>
                <div className="text-xl font-extrabold text-on-surface">31</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Impact Rating</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-extrabold text-on-surface">5.0</span>
                  <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                    star
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-tertiary">
                <span>Progress to Ambassador</span>
                <span>28%</span>
              </div>
              <div className="h-2 w-full bg-tertiary-fixed rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: "28%" }} />
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-12 bg-surface-container-low rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface">Matching Activity</h3>
              <p className="text-sm text-on-surface-variant">Real-time assignment and matching engine logs.</p>
            </div>
            <button className="text-sm font-bold text-primary hover:underline" type="button">
              View All Logs
            </button>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <span className="material-symbols-outlined">task_alt</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">
                    Alex Rivera assigned to <span className="text-tertiary">Urban Forestry Workshop</span>
                  </div>
                  <div className="text-xs text-on-surface-variant">98% skill match confidence • 2 mins ago</div>
                </div>
              </div>
              <button className="px-4 py-1.5 border border-outline-variant rounded-lg text-xs font-bold hover:bg-slate-50" type="button">
                Revoke
              </button>
            </div>
  
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <span className="material-symbols-outlined">person_search</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">
                    Automatic scan completed for <span className="text-secondary">Community Soup Kitchen</span>
                  </div>
                  <div className="text-xs text-on-surface-variant">Found 14 potential matches • 15 mins ago</div>
                </div>
              </div>
              <button className="px-4 py-1.5 border border-outline-variant rounded-lg text-xs font-bold hover:bg-slate-50" type="button">
                View Matches
              </button>
            </div>
  
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm opacity-60">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">
                    Broadcast sent to <span className="text-on-surface-variant">Tech Education Team</span>
                  </div>
                  <div className="text-xs text-on-surface-variant">Awaiting 4 confirmations • 1 hour ago</div>
                </div>
              </div>
              <div className="px-4 py-1.5 text-xs font-bold text-slate-400">PENDING</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Volunteers;
  