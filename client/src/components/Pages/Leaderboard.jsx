const globalRankRows = [
    {
      rank: 4,
      name: "David Chen",
      joined: "Joined Jan 2023",
      category: "EDUCATION",
      score: "9,840",
      trend: { icon: "trending_up", value: "12%", className: "text-green-600" },
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDE-aQf1oAPOU3gf3PB-ortBafhxLDyOFo_1hGX38m5dKCGv1U1XFDpEnMsb-8rLWaiphSYYgApEaFhJs2nXmXrQM9W59LZhrrz63nDVdvoT42ZOZOPvYQuc-1veO0ZbwFosgiA11bmn0ICifn6lyqoWaW27EE6HS3_uneucssxbRtn7hgN7EOtnTU3FcK2zS19cLYhW6cacEwC5sMHneN-0lBzhbyYSk-rPyghulntsni-cNVs9ZzzkpdVsCi0ngRzoYnn0rrydck"
    },
    {
      rank: 5,
      name: "Elena Rodriguez",
      joined: "Joined Mar 2023",
      category: "SUSTAINABILITY",
      score: "9,215",
      trend: { icon: "trending_up", value: "8%", className: "text-green-600" },
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBqAJThhjFRrnd-beac_JhRcfbYuYP5Lc1UfgGyT29MSBHbQ1g3nSAzY3ZG4wfXSJ5_Y2LWb21W3YQtVQeoxMfkI732ZWi9FoB2IzXfrPz_EuYCWVRG_hZ9lyHAEK6UXiWy4gVBZ5bzURHIT4NGODumCTHTZSF0GfLYxMMrOEyMUqn3e4Zai_9RAMMfoI6m1VPlaFV1EL6xFyAtATfRtXpIfyuCbGwF4VxZZLCgQkqrdjd4ndlctzg479VUAI5lJxfqoC-QibZZa_k"
    },
    {
      rank: 6,
      name: "James Wilson",
      joined: "Joined Feb 2023",
      category: "ADVOCACY",
      score: "8,950",
      trend: { icon: "trending_flat", value: "0%", className: "text-slate-400" },
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAcn75uQWvLQIB9wVZz3WNAoS-7XtPSUzVQdKHJKyMn0ygH6uUnOW_zTNbzcttqkWnKZ_JrzEKUI5D4WsYSDjqhZ8Em47Q6QA33-B3l40GIQzj-PBSk425bit3mmCLy2gkWxWUW52i5WMp1Hafped-tSK1qienbVRf46I_-bXnIwiTN233n88M9hfYK9d6ExhCLKDWnFeNS6XbCrxQzsXQJMCJmayx0S6EeJkWvpOF_ojR3kKqNEYH7Kl6jAZ2cuVm46f6nqabsUA4"
    },
    {
      rank: 7,
      name: "Lila Vance",
      joined: "Joined Aug 2023",
      category: "RELIEF WORK",
      score: "8,400",
      trend: { icon: "trending_up", value: "24%", className: "text-green-600" },
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBLlHH22Y5W6vFpqP0r-Q43uuN8pRR2wG9oawwcrjHL7W0LDOJAd2kY0mtI6ZTyDMG_O_CejvQafeDdGPkrzHxy84iGph9VpqR_Pv0UZ9YNjR6ivBnwzVYvEmRnISmxmSxU8Dto-L9F8ETh8cpb_817ZQJN3L7SUG3E0H6BQiTbJcO6XqRGL2zElHvbTfgffXH0PTESE9ObcapXE-5_laoL39qFgsPGY5T-hc0A4kKKnTtLBcP7nIdd9ENBzWTDbzFAuKYfEHVPjcU"
    }
  ];
  
  function Leaderboard() {
    return (
      <section className="w-full">
        <section className="pt-10 pb-6">
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">Impact Elite</h2>
            <p className="text-on-surface-variant font-medium">Recognizing the architects of change for the month of October.</p>
          </div>
  
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 md:col-span-4 lg:col-span-3 mt-8">
              <div className="bg-surface-container-lowest p-6 rounded-2xl relative flex flex-col items-center text-center group transition-all">
                <div className="absolute -top-6">
                  <div className="relative">
                    <img
                      alt="Sarah Volunteer"
                      className="w-20 h-20 rounded-full border-4 border-surface-container-lowest bg-surface shadow-md"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpxNLwKMO89n_nON30eEoLq_biX7d1QOPba6NDB_0tXUCW6Q0af3gOSQNTU-hG3vobKf6fp9biJAu3zHydvXiblAfZx54lg-SGr0VTpjz77G9sSKhzlMXesPNw0TTrSL2cR5S3A306UL3nxLr005mpO_ZpGJtwYPnoJId5DClQZf81VScs4cfdedGikdeuj0FA1mdZ-ZauuRjbCi7oDqyoJDoX5n2ArJZkgMAfWPkdk7MrnFmActWJ4FL2RAArfg6l6Nof4Fqscdc"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-slate-300 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-xs font-bold text-slate-700">2</span>
                    </div>
                  </div>
                </div>
  
                <div className="mt-14">
                  <h3 className="text-lg font-bold text-on-surface">Sarah Jenkins</h3>
                  <p className="text-sm text-secondary font-semibold mt-1">Crisis Response</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-2xl font-extrabold text-on-surface tracking-tight">12,450</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Points</span>
                  </div>
                  <div className="mt-4 w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[85%]" />
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-xs font-bold">
                      <span className="material-symbols-outlined text-sm">workspace_premium</span>
                      SILVER ELITE
                    </span>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-span-12 md:col-span-4 lg:col-span-5">
              <div className="impact-gradient p-1 rounded-[1.6rem] gold-glow">
                <div className="bg-surface-container-lowest p-8 rounded-2xl relative flex flex-col items-center text-center overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                      star
                    </span>
                  </div>
  
                  <div className="absolute -top-2 flex justify-center w-full">
                    <div className="relative">
                      <img
                        alt="Marcus Volunteer"
                        className="w-32 h-32 rounded-full border-4 border-primary bg-surface shadow-xl"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOqdC2e4617RayiA4JkTmH0PqsZo2wRxFcjjFa33SgD_db8kGBE4MizLESSfUn88iAsSqZbKanCf_jLVPqIj7lTah4ZqOUm2yY8PPkLa5gOIgChBPazyD40zhY3V9ybxMxq21hrkXB0EamGDyY3D0754ZQCFWOJfABg-rrtn7PtCIIlwvYd9AzywFeECpPwQ6iHAWOkJBZx6LTXrmHNuIrEbbuWyVCqVfod8R1DDw2G_ftm7VLG1Q68njZ9yoZt0vnGlTn2YI_RAo"
                      />
                      <div className="absolute -bottom-2 right-2 bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                          military_tech
                        </span>
                      </div>
                    </div>
                  </div>
  
                  <div className="mt-28">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">TOP PERFORMER</p>
                    <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">Marcus Thorne</h3>
                    <p className="text-base text-primary font-bold mt-1">Community Building</p>
                    <div className="mt-6 flex flex-col items-center">
                      <span className="text-5xl font-black text-on-surface tracking-tighter">15,820</span>
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Impact Score</span>
                    </div>
                    <div className="mt-8 flex gap-3">
                      <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-primary/20 transition-all" type="button">
                        View Full Profile
                      </button>
                      <button className="bg-surface-container-low text-on-surface-variant p-3 rounded-xl hover:bg-surface-container-high transition-all" type="button">
                        <span className="material-symbols-outlined">share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-span-12 md:col-span-4 lg:col-span-3 mt-8">
              <div className="bg-surface-container-lowest p-6 rounded-2xl relative flex flex-col items-center text-center group transition-all">
                <div className="absolute -top-6">
                  <div className="relative">
                    <img
                      alt="Anya Volunteer"
                      className="w-20 h-20 rounded-full border-4 border-surface-container-lowest bg-surface shadow-md"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU6wysREYoOvDVMUGixUHnmbOwx6p7V5BgPs-EYZ0RK2wDIRYIH9TTKVulKBestthCanQW29WqqhaV13dfyklQRx6ynpo1Ywq25w2g3lsNLkukn-ckWywhTSBJ3rHdUsfss0hEOfLThnCbqNiXacWfg5ZTsK5ZFU0_68NPoQy3ZYDjCEdK0b4enCwVOLpNyWQh3OvRoJb34MlqojAYJBMmGQIrl9FMMl_KvIDONvedm3wFCoovw9P3GXfSVGQDxN0pRDmi4V4GmQ4"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-amber-600 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-xs font-bold text-white">3</span>
                    </div>
                  </div>
                </div>
  
                <div className="mt-14">
                  <h3 className="text-lg font-bold text-on-surface">Anya Kostic</h3>
                  <p className="text-sm text-tertiary font-semibold mt-1">Medical Outreach</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-2xl font-extrabold text-on-surface tracking-tight">10,180</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Points</span>
                  </div>
                  <div className="mt-4 w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-[70%]" />
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      BRONZE ELITE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-surface-container-low flex justify-between items-center">
              <h4 className="font-bold text-lg">Global Rankings</h4>
              <div className="flex gap-2">
                <button className="bg-surface-container-low px-4 py-2 rounded-lg text-xs font-bold text-on-surface-variant hover:bg-surface-container-high transition-all" type="button">
                  All Categories
                </button>
                <button className="bg-surface-container-low px-4 py-2 rounded-lg text-xs font-bold text-on-surface-variant hover:bg-surface-container-high transition-all" type="button">
                  Monthly
                </button>
              </div>
            </div>
  
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Rank</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Volunteer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Impact Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Impact Score</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {globalRankRows.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-on-surface-variant">#{row.rank}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img alt={row.name} className="w-9 h-9 rounded-full bg-surface" src={row.avatar} />
                        <div>
                          <p className="text-sm font-bold text-on-surface">{row.name}</p>
                          <p className="text-[10px] font-medium text-on-surface-variant">{row.joined}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-[10px] font-bold">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-sm font-extrabold text-on-surface">{row.score}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`${row.trend.className} text-xs font-bold flex items-center justify-end gap-1`}>
                        <span className="material-symbols-outlined text-sm">{row.trend.icon}</span>
                        {row.trend.value}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <div className="p-6 bg-surface-container-low/30 text-center">
              <button className="text-primary font-bold text-sm hover:underline" type="button">
                Show All 245 Volunteers
              </button>
            </div>
          </div>
        </section>
  
        <section className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 md:col-span-6 bg-surface-container-low rounded-2xl p-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
            </div>
            <div>
              <h5 className="text-2xl font-black text-on-surface">42,850 hrs</h5>
              <p className="text-sm text-on-surface-variant font-medium uppercase tracking-wider">Total Impact Hours This Quarter</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 bg-surface-container-low rounded-2xl p-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-3xl">groups_3</span>
            </div>
            <div>
              <h5 className="text-2xl font-black text-on-surface">1,240 Active</h5>
              <p className="text-sm text-on-surface-variant font-medium uppercase tracking-wider">Global Volunteers Reaching Milestones</p>
            </div>
          </div>
        </section>
      </section>
    );
  }
  
  export default Leaderboard;
  