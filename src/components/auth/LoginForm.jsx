import { useState } from "react";

function LoginForm({ onLogin, darkMode = false, toggleDark }) {
  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!username || !email || !password) {
      setValidationMessage("Enter a username, email address, and password to continue.");
      return;
    }

    setValidationMessage("");
    onLogin({ role, username });
  }

  const roleHint =
    role === "owner"
      ? "Owner access: Full POS, order history analytics, menu pricing and shift settings."
      : "Employee access: Take orders, manage pending tickets, and process payments.";

  return (
    <div className="min-h-screen bg-[#F7FAF4] text-[#181D19] transition-colors dark:bg-[#101411] dark:text-[#E0E3DE] lg:grid lg:grid-cols-12">
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#005230] text-white lg:col-span-6 lg:flex lg:flex-col lg:justify-between lg:p-8">
        <img
          src="/FRIED CHICKEN.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,82,48,.96),rgba(27,107,68,.88),rgba(0,82,48,.96))]" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
            Morning &amp; All-Day Service
          </span>
          <span className="rounded-full border border-white/20 bg-white/15 px-4 py-1 text-sm font-semibold">
            POS-01
          </span>
        </div>

        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-6 text-center">
          <div className="h-56 w-56 overflow-hidden rounded-full ring-8 ring-white/25 shadow-2xl">
            <img
              src="/restaurant-logo.jpg"
              alt="RD's Fudhaws logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold leading-[44px]">
              Fresh from the grill, served fast.
            </h1>
            <p className="text-base leading-6 text-white/90">
              Manage dine-in tables, takeout queues, kitchen pending tickets,
              and cash, card, or e-wallet payments.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/10 p-4">
          <div>
            <p className="font-semibold">Counter Terminal Active</p>
            <p className="mt-1 text-sm text-white/85">Tables 01-12 &amp; Takeout Ready • Cash, Card, E-Wallet</p>
          </div>
          <span className="text-sm font-semibold tabular-nums text-white/90">v2.4</span>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col items-center justify-between gap-6 p-5 sm:p-8 lg:col-span-6 lg:p-10">
        <div className="flex w-full max-w-md items-center justify-between gap-3">
          <span className="text-sm font-semibold text-[#496552] dark:text-[#AFCEB7]">
            Encrypted Staff Session
          </span>
          <button
            type="button"
            onClick={toggleDark}
            className="rounded-full bg-[#E6E9E3] px-4 py-2 text-sm font-semibold text-[#181D19] transition hover:bg-[#C8E7D0] dark:bg-[#272B27] dark:text-[#E0E3DE]"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <section className="flex w-full max-w-md flex-col gap-5 rounded-lg border border-[#BFC9BF] bg-white p-5 shadow-sm dark:border-[#3F4942] dark:bg-[#181D19] sm:p-8">
          <header className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full lg:hidden">
              <img src="/restaurant-logo.jpg" alt="RD's Fudhaws logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-[28px] font-bold leading-8">Staff Sign In</h2>
              <p className="mt-1 text-sm text-[#3F4942] dark:text-[#BFC9BF]">
                Select your role and enter your credentials to open the register.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#EBEFE9] p-1 dark:bg-[#1C211D]" role="tablist" aria-label="Account role">
            {[
              ["employee", "Employee"],
              ["owner", "Owner"],
            ].map(([roleValue, label]) => (
              <button
                key={roleValue}
                type="button"
                role="tab"
                aria-selected={role === roleValue}
                onClick={() => setRole(roleValue)}
                className={`min-h-11 rounded px-3 text-sm font-semibold transition ${role === roleValue ? "bg-[#005230] text-white dark:bg-[#8AD7A7] dark:text-[#003920]" : "text-[#496552] hover:text-[#181D19] dark:text-[#AFCEB7] dark:hover:text-[#E0E3DE]"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="flex items-center rounded bg-[#C8E7D0]/70 px-3 py-2 text-sm font-semibold text-[#005230] dark:bg-[#314D3B]/50 dark:text-[#8AD7A7]">
            {roleHint}
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {validationMessage && (
              <div role="alert" className="rounded-lg border border-[#FFDAD6] bg-[#FFDAD6]/60 px-3 py-2 text-sm font-semibold text-[#93000A] dark:border-[#93000A] dark:bg-[#93000A]/30 dark:text-[#FFDAD6]">
                {validationMessage}
              </div>
            )}
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold">Username</span>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="e.g. Juan Dela Cruz"
                className="min-h-11 w-full rounded-lg border border-[#BFC9BF] bg-white px-3 text-sm outline-none focus:border-[#005230] focus:ring-2 focus:ring-[#005230]/20 dark:border-[#3F4942] dark:bg-[#101411]"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold">Email Address</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="staff@rdsfudhaws.com"
                className="min-h-11 w-full rounded-lg border border-[#BFC9BF] bg-white px-3 text-sm outline-none focus:border-[#005230] focus:ring-2 focus:ring-[#005230]/20 dark:border-[#3F4942] dark:bg-[#101411]"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="flex items-center justify-between">
                <span className="text-sm font-semibold">Password</span>
                <a href="#forgot" className="text-sm font-semibold text-[#005230] hover:underline dark:text-[#8AD7A7]">Forgot password?</a>
              </span>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="min-h-11 w-full rounded-lg border border-[#BFC9BF] bg-white px-3 pr-12 text-sm outline-none focus:border-[#005230] focus:ring-2 focus:ring-[#005230]/20 dark:border-[#3F4942] dark:bg-[#101411]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6F7A71] dark:text-[#89938A]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="mt-1 min-h-12 w-full rounded bg-[#005230] px-5 text-sm font-semibold text-white transition hover:bg-[#1B6B44] active:scale-[.99] dark:bg-[#8AD7A7] dark:text-[#003920]"
            >
              Sign In as {role === "owner" ? "Owner" : "Employee"}
            </button>
          </form>
        </section>

        <footer className="w-full max-w-md text-center text-sm text-[#496552] dark:text-[#89938A]">
          RD&apos;s Fudhaws Food House • Need terminal access? Ask the store owner.
        </footer>
      </main>
    </div>
  );
}

export { LoginForm as default };
