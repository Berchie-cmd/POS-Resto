import { useMemo, useState } from "react";
import { money } from "../../utils/money";

export default function DashboardCatalog({ activePage, menu, cartCount, onAdd, onCheckout }) {
  const [search, setSearch] = useState("");
  const [orderType, setOrderType] = useState("Dine-in");
  const [table, setTable] = useState("Table 04");

  const items = useMemo(() => {
    const source =
      activePage === "FOODS" ? menu.foods :
      activePage === "DRINKS" ? menu.drinks :
      activePage === "DESERTS" ? menu.desserts :
      [...menu.foods, ...menu.drinks, ...menu.desserts];

    const query = search.trim().toLowerCase();
    return query
      ? source.filter((item) => `${item.name} ${item.detail}`.toLowerCase().includes(query))
      : source;
  }, [activePage, menu, search]);

  const titles = {
    FEATURES: ["Featured Menu", "Tap any dish or drink to add to the active ticket."],
    FOODS: ["Foods", "Choose a meal for the active ticket."],
    DRINKS: ["Drinks", "Add a chilled drink or beverage."],
    DESERTS: ["Desserts", "Add a sweet finish to the active ticket."],
  };
  const [title, subtitle] = titles[activePage] || titles.FEATURES;

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold leading-8">{title}</h1>
          <p className="mt-1 text-sm text-[#496552] dark:text-[#AFCEB7]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="relative">
            <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6F7A71]">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              placeholder="Search dishes..."
              className="min-h-10 w-44 rounded-full border border-[#BFC9BF] bg-white pl-8 pr-3 text-sm outline-none focus:border-[#005230] focus:ring-2 focus:ring-[#005230]/20 dark:border-[#3F4942] dark:bg-[#181D19]"
            />
          </label>

          <div className="flex rounded-full bg-[#E6E9E3] p-1 dark:bg-[#272B27]">
            {["Dine-in", "Takeout"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOrderType(type)}
                className={`min-h-8 rounded-full px-3 text-sm font-semibold ${orderType === type ? "bg-[#005230] text-white dark:bg-[#8AD7A7] dark:text-[#003920]" : "text-[#496552] dark:text-[#AFCEB7]"}`}
              >
                {type}
              </button>
            ))}
          </div>

          {orderType === "Dine-in" && (
            <select
              value={table}
              onChange={(event) => setTable(event.target.value)}
              aria-label="Select table"
              className="min-h-10 rounded-full border border-[#BFC9BF] bg-white px-3 text-sm dark:border-[#3F4942] dark:bg-[#181D19]"
            >
              {["Table 04", "Table 01", "Table 02", "Table 03", "Table 05", "Table 06"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={onCheckout}
            className="min-h-10 rounded-full bg-[#005230] px-4 text-sm font-semibold text-white dark:bg-[#8AD7A7] dark:text-[#003920]"
          >
            Checkout ({cartCount})
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.name}
            className="flex min-h-[340px] flex-col justify-between overflow-hidden rounded-lg border border-[#BFC9BF] bg-white transition hover:border-[#005230] dark:border-[#3F4942] dark:bg-[#181D19]"
          >
            <div>
              <img src={item.image} alt={item.name} className="h-36 w-full object-cover" />
              <div className="flex flex-col gap-1 px-4 pt-4">
                <span className="text-xs font-semibold text-[#005230] dark:text-[#8AD7A7]">{item.tag}</span>
                <h2 className="text-base font-semibold">{item.name}</h2>
                <p className="line-clamp-2 text-sm text-[#496552] dark:text-[#AFCEB7]">{item.detail}</p>
              </div>
            </div>
            <footer className="flex items-center justify-between px-4 pb-4 pt-3">
              <span className="font-mono text-sm font-semibold text-[#005230] dark:text-[#8AD7A7]">{money.format(item.price)}</span>
              <button
                type="button"
                onClick={() => onAdd(item)}
                aria-label={`Add ${item.name}`}
                className="grid h-9 w-9 place-items-center rounded bg-[#005230] text-white dark:bg-[#8AD7A7] dark:text-[#003920]"
              >
                <span aria-hidden="true" className="text-xl leading-none">+</span>
              </button>
            </footer>
          </article>
        ))}
      </section>

      {items.length === 0 && (
        <div className="rounded-lg border border-[#BFC9BF] px-6 py-16 text-center text-sm text-[#496552] dark:border-[#3F4942] dark:text-[#AFCEB7]">
          No menu items match your search.
        </div>
      )}
    </main>
  );
}
