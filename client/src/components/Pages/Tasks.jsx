function Tasks() {
  return (
    <section className="w-full">
      <div className="py-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Impact Pipeline</h2>
          <p className="text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">rocket_launch</span>
            Active NGO Task Board • 12 Tasks in Progress
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl">
          <button className="px-4 py-2 rounded-xl bg-white shadow-sm text-primary font-bold text-xs uppercase tracking-wider" type="button">
            Kanban
          </button>
          <button className="px-4 py-2 rounded-xl text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:bg-surface-container-high" type="button">
            Calendar
          </button>
          <button className="px-4 py-2 rounded-xl text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:bg-surface-container-high" type="button">
            List View
          </button>
        </div>
      </div>

      <div className="pb-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-tertiary-container rounded-full" />
              <h3 className="text-lg font-bold tracking-tight">To Do</h3>
              <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-lg">4</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors" type="button">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-grab active:cursor-grabbing">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary bg-tertiary-fixed px-2 py-1 rounded-md">
                Logistics
              </span>
              <div className="flex -space-x-2 group-hover:translate-x-1 transition-transform">
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  alt=""
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvgSh-n7uPwmoPXc5q45hNAOh_iRAz1XBARJFK1qH8LJ9vDLoDNoFSBah0mZqVh2y9_8rbPx3JDtYtV-NqP1ExhtAkrrXXIV7vG6CZx__31i7q95roU0A1hODUlN7wmwh9l3a_nGUoHDGtV_mfbnE8T9nsiBKgm0y2OsAm_BQHWhdTA6Z--HPLWSyq761JxUmB17mr6qw2kVB9vObbS9Bq1wmjnhsEiDpLsRC6NTGFTOa520ywysIFdmnYlxei21f1fFOgQo7j4ek"
                />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  +2
                </div>
              </div>
            </div>
            <h4 className="text-md font-bold text-on-surface leading-tight mb-2">Organize water distribution for Sector 4</h4>
            <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
              Coordinate with the supply warehouse for 500 cases of emergency water supplies.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-medium text-outline mb-4">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">warning</span>
                High Priority
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">event</span>
                Oct 12
              </span>
            </div>
            <div className="pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                <span className="material-symbols-outlined text-sm">link</span>
                #ISS-231
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary-fixed px-2 py-1 rounded-md">
                Medical
              </span>
            </div>
            <h4 className="text-md font-bold text-on-surface leading-tight mb-2">Vaccination drive prep</h4>
            <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
              Ensure all cold-chain equipment is calibrated for Monday&apos;s drive.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-medium text-outline mb-4">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                  flag
                </span>
                Critical
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">event</span>
                Oct 15
              </span>
            </div>
            <div className="pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                <span className="material-symbols-outlined text-sm">link</span>
                #ISS-245
              </div>
              <div className="flex items-center gap-1">
                <img
                  className="w-6 h-6 rounded-full grayscale hover:grayscale-0 transition-all"
                  alt=""
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDIpjqWmZxPbumeq0Yk49V-DEJNfSU7ApwxhhkiddYKH5s7LkhT5LrCoF7XY_2HizjaYzGqe_zw_Pk6-3SBqxxLG9QHXAwVcCE1RBJ_ACzp0yW4vcXy7Ea4ZxH5hy3yXW7AEQVCqVuGCcKRwLwLupk5hHz7oIR0FZfg5yq6HXHooMfvEBxDDUev-vV8Djd6cvuQmJBbfnp9w3l_jqWH7-Ndhtv0U25p9mBG9lNPkgZNXNT8Ttm9JXiSymOGVH1t5bBncjWU1stUa0"
                />
              </div>
            </div>
          </div>

          <button className="w-full py-4 border-2 border-dashed border-outline-variant/30 rounded-2xl text-outline-variant font-bold text-sm hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2" type="button">
            <span className="material-symbols-outlined">add_circle</span>
            Add new task
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-secondary-container rounded-full" />
              <h3 className="text-lg font-bold tracking-tight">In Progress</h3>
              <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-lg">3</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors" type="button">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-l-4 border-secondary transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-fixed px-2 py-1 rounded-md">
                Advocacy
              </span>
              <div className="flex">
                <img
                  className="w-8 h-8 rounded-full border-2 border-white object-cover ring-2 ring-secondary/20"
                  alt=""
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2mbtjMLwSJGkmSpzYsDeABbsb43D2Sagl4Orm_zUysdwZ2BfFHhS-FyYxKgm-AsUsKdivYP2JC7i_yazkK3rhWfKY9aV63SNTKiun__QHDh8eHb7o4dyd3poHIb21m0WuqMFBKQrO9cL3TN5EThP3tqiINqcNWraao4ocipAtFVCHXQQunoQVE5GWe8Nj9J-RlAJOqHOe8fqdy0VT6ctxlhD9JFmhnkUNNe1JeCCCb_NXuSAwLhZVo9G8R-cBDANPIZB0nlfZMS4"
                />
              </div>
            </div>
            <h4 className="text-md font-bold text-on-surface leading-tight mb-2">Finalize annual impact report draft</h4>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full mb-4 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-sm text-on-surface-variant mb-4">Drafting visual charts and community success stories from the field.</p>
            <div className="flex items-center gap-4 text-[11px] font-medium text-outline mb-4">
              <span className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Due Today
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                12 comments
              </span>
            </div>
            <div className="pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                <span className="material-symbols-outlined text-sm">link</span>
                #ADM-102
              </div>
              <span className="material-symbols-outlined text-outline">sync</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary bg-tertiary-fixed px-2 py-1 rounded-md">
                Logistics
              </span>
            </div>
            <h4 className="text-md font-bold text-on-surface leading-tight mb-2">Fleet maintenance checkup</h4>
            <p className="text-sm text-on-surface-variant mb-4">Regular inspection of the transport vans used for rural food delivery.</p>
            <div className="flex items-center gap-4 text-[11px] font-medium text-outline">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                Recurring
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-surface-container-low flex justify-between items-center">
              <div className="flex -space-x-2">
                <img
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  alt=""
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBvqWAEk045AykwxZMSCcNf7eItPBzOCZe994LasbjwyKrNFiG1HeRcYCYmdGUZ3tMp7o5Bkd67YMkefMAdd_I-YYPLRbNIkCfdRGWrf2ihpKlcraL9xIkdU_i5K5a_84oT04RtHYxRumd4NDLt_hiljbUdCC-UozdoRjbulO09tppvv3GtN_U3JEiOirlQwgmP6ut0hQSXqI1KTMjDRmkL4bB9Oee2F71V1n_A-25yCR1lfqBq2-23iO6BBmlb6t9I95oynLy4nM"
                />
              </div>
              <div className="text-[10px] text-outline italic">Updated 2h ago</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-surface-container-highest rounded-full" />
              <h3 className="text-lg font-bold tracking-tight">Completed</h3>
              <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-lg">5</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors" type="button">
              <span className="material-symbols-outlined">done_all</span>
            </button>
          </div>

          <div className="bg-surface-container-low/50 p-5 rounded-2xl transition-all opacity-80 border border-transparent hover:border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline bg-surface-container-high px-2 py-1 rounded-md">
                Donor Relations
              </span>
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: '"FILL" 1' }}>
                check_circle
              </span>
            </div>
            <h4 className="text-md font-bold text-on-surface leading-tight mb-2 line-through decoration-outline/30">
              Quarterly Newsletter Sendout
            </h4>
            <p className="text-sm text-outline mb-4">Sent to 5,000+ active donors and corporate partners.</p>
            <div className="pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-outline-variant">
                <span className="material-symbols-outlined text-sm">link</span>
                #MKT-088
              </div>
              <div className="flex items-center gap-1">
                <img
                  className="w-6 h-6 rounded-full grayscale opacity-50"
                  alt=""
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp-pGkhZXR8MilmgVnXx8FNvoxQ0E1THToqvT61x1RH7V1Vnc2BAAHA8jis2GEZph6rJUJ2-DqxxPIj6g8gMYcZ02TO1anlCdBxC2bnqr8rPmHDBSLt97B-4kcKh108ygG2-AupMALo-eoDWelHwGUSzQSZZqUekHZOeBwqrspUcA71D9CIyyMzF3uaWMIkjK5M2_yVGEbHt2zcKtliIW-AgwNmprlMt4_IuBpByuBSY_NsGpbtB1pZ3NQR8XbjpBxfCOWXbIzViU"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low/50 p-5 rounded-2xl transition-all opacity-80 border border-transparent hover:border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline bg-surface-container-high px-2 py-1 rounded-md">
                Logistics
              </span>
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: '"FILL" 1' }}>
                check_circle
              </span>
            </div>
            <h4 className="text-md font-bold text-on-surface leading-tight mb-2 line-through decoration-outline/30">
              Warehouse lease renewal
            </h4>
            <div className="pt-4 border-t border-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-outline-variant">
                <span className="material-symbols-outlined text-sm">link</span>
                #ADM-055
              </div>
              <div className="text-[10px] text-outline font-medium uppercase tracking-tighter">Done Oct 01</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 -z-10 w-1/2 h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-to-tl from-secondary/10 to-transparent blur-[100px] rounded-full" />
      </div>
    </section>
  );
}

export default Tasks;
