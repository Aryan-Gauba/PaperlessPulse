import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "Issues", path: "/issues", icon: "emergency" },
  { label: "Tasks", path: "/tasks", icon: "assignment" },
  { label: "Volunteers", path: "/volunteers", icon: "group" },
  { label: "Leaderboard", path: "/leaderboard", icon: "leaderboard" }
];

function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col gap-2 p-6 border-r border-slate-100 z-50">
      <div className="mb-10 px-2">
        <h1 className="font-bold text-slate-900 text-xl tracking-tight">Elysian Compass</h1>
        <p className="text-xs text-on-surface-variant font-medium">Impact Management</p>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-transform duration-200 hover:translate-x-1 ${
                isActive
                  ? "text-indigo-700 bg-white font-bold shadow-sm shadow-indigo-500/5"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <span className="material-symbols-outlined" data-icon={item.icon}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-slate-100">
        <a
          className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-transform duration-200 hover:translate-x-1"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined" data-icon="contact_support">
            contact_support
          </span>
          <span className="text-sm">Support</span>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
