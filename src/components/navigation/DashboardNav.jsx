import { useState } from "react";

const navItems = [
  ["FEATURES", "Features", "star"],
  ["FOODS", "Foods", "lunch_dining"],
  ["DRINKS", "Drinks", "local_cafe"],
  ["DESERTS", "Desserts", "icecream"],
  ["CHECKOUT", "Checkout", "shopping_bag"],
  ["PENDING", "Pending", "pending_actions"],
];

export default function DashboardNav({
  darkMode,
  toggleDark,
  activePage,
  onNavigate,
  onLogout,
  cartCount = 0,
  operatorRole = "employee",
  operatorName = "",
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function navigate(page) {
    onNavigate(page);
    setMobileOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[#BFC9BF] bg-[#F7FAF4] px-4 dark:border-[#3F4942] dark:bg-[#101411] md:hidden">
        <div className="flex items-center gap-3">
          <img src="/restaurant-logo.jpg" alt="" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-semibold">RD&apos;s Fudhaws</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#BFC9BF] dark:border-[#3F4942]"
          aria-label="Toggle navigation"
        >
          <span aria-hidden="true" className="text-xl">{mobileOpen ? "×" : "☰"}</span>
        </button>
      </header>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-[#101411]/40 md:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-40 flex w-60 flex-col justify-between border-r border-[#BFC9BF] bg-[#F1F5EF] p-4 transition-transform duration-200 dark:border-[#3F4942] dark:bg-[#181D19] md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="mb-6 flex items-center gap-2 px-1">
            <img src="/restaurant-logo.jpg" alt="RD's Fudhaws" className="h-10 w-10 shrink-0 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="truncate font-semibold">RD&apos;s Fudhaws</p>
              <p className="truncate text-xs text-[#496552] dark:text-[#AFCEB7]">
                {operatorName || "Staff"} • {operatorRole === "owner" ? "Owner" : "Cashier"}
              </p>
            </div>
          </div>

          <nav aria-label="POS navigation" className="flex flex-col gap-1">
            <p className="mb-1 px-3 text-xs font-semibold text-[#496552] dark:text-[#AFCEB7]">Menu</p>
            {navItems.slice(0, 4).map(([page, label, icon]) => (
              <button
                key={page}
                type="button"
                onClick={() => navigate(page)}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold ${activePage === page ? "bg-[#005230] text-white dark:bg-[#8AD7A7] dark:text-[#003920]" : "text-[#181D19] hover:bg-[#E6E9E3] dark:text-[#E0E3DE] dark:hover:bg-[#272B27]"}`}
              >
                <span aria-hidden="true" className="w-5 text-center text-base">{icon === "star" ? "★" : icon === "lunch_dining" ? "◫" : icon === "local_cafe" ? "◡" : "◇"}</span>
                <span>{label}</span>
              </button>
            ))}

            <p className="mb-1 mt-4 px-3 text-xs font-semibold text-[#496552] dark:text-[#AFCEB7]">Operations</p>
            {navItems.slice(4).map(([page, label, icon]) => (
              <button
                key={page}
                type="button"
                onClick={() => navigate(page)}
                className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-left text-sm font-semibold ${activePage === page ? "bg-[#005230] text-white dark:bg-[#8AD7A7] dark:text-[#003920]" : "text-[#181D19] hover:bg-[#E6E9E3] dark:text-[#E0E3DE] dark:hover:bg-[#272B27]"}`}
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="w-5 text-center">{icon === "shopping_bag" ? "▢" : "◷"}</span>
                  <span>{label}</span>
                </span>
                {page === "CHECKOUT" && cartCount > 0 && (
                  <span className="rounded-full bg-[#C8E7D0] px-2 py-0.5 text-xs text-[#1B3626] dark:bg-[#314D3B] dark:text-[#CBEAD2]">{cartCount}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-2 border-t border-[#BFC9BF] pt-4 dark:border-[#3F4942]">
          <button
            type="button"
            onClick={toggleDark}
            className="flex min-h-11 w-full items-center justify-between rounded-lg bg-[#EBEFE9] px-3 text-sm font-semibold dark:bg-[#1C211D]"
          >
            <span>Dark Mode</span>
            <span className="text-xs text-[#005230] dark:text-[#8AD7A7]">{darkMode ? "ON" : "OFF"}</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="min-h-11 w-full rounded-lg px-3 text-left text-sm font-semibold text-[#BA1A1A] hover:bg-[#FFDAD6]/60 dark:text-[#FFB4AB] dark:hover:bg-[#93000A]/30"
          >
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
