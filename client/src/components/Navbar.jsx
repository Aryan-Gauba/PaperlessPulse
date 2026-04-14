function Navbar() {
    return (
      <header className="w-full sticky top-0 z-40 glass-header flex justify-between items-center px-8 py-4 bg-slate-50">
        <div className="flex items-center gap-8">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-xl">search</span>
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-white/50 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Search analytics..."
              type="text"
            />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-1" href="#" onClick={(e) => e.preventDefault()}>
              Dashboard
            </a>
            <a className="text-sm font-medium text-slate-500 hover:text-indigo-500 transition-colors pb-1" href="#" onClick={(e) => e.preventDefault()}>
              Issues
            </a>
            <a className="text-sm font-medium text-slate-500 hover:text-indigo-500 transition-colors pb-1" href="#" onClick={(e) => e.preventDefault()}>
              Tasks
            </a>
          </nav>
        </div>
  
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative" type="button">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors" type="button">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
            type="button"
          >
            <span>Create New</span>
          </button>
          <img
            alt="Admin Avatar"
            className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmBBcXWMc2N5426nbbp09QhAUHBZtYDo_tB3vNRwOAsh9yNcMnuVU58lfHoE0eHgiBdocHuRoWNhB8JkqxpFuXuYraNfE_gtfZ2wCVJXJDiYVV9YyizkjSeMA6rzgEQ4gMk167i7v53BB3O1SD1yVK82yKyJHx9YAlyIhVnBHkXaQSIAqGQ0Wjtsq8y1MeC8rEmgzpIggcmYjlffqzzlN3CjvurSSI737HUfRlUslffMHKWtRVneJnXJit8p0coej-yscaE4QMra8"
          />
        </div>
      </header>
    );
  }
  
  export default Navbar;
  