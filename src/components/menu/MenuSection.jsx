import { money } from "../../utils/money";

function MenuCard({ item, onAdd }) {
    return (
        <article className="group overflow-hidden rounded-3xl border border-green-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="h-40 overflow-hidden bg-linear-to-br from-green-100 via-emerald-50 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-800">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span className="whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-900 dark:bg-green-950 dark:text-green-200">
                        {money.format(item.price)}
                    </span>
                </div>
                <p className="mb-4 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.detail}</p>
                <span className="mt-5 inline-flex rounded-full border border-green-200 px-3 py-1 text-xs font-semibold text-green-800 dark:border-green-900 dark:text-green-200">
                    {item.tag}
                </span>
                <button type="button" onClick={() => onAdd(item)} className="mt-5 w-full rounded-xl bg-green-700 px-4 py-3 font-bold text-white shadow-md transition hover:bg-green-800">
                    Add to order
                </button>
            </div>
        </article>
    );
}

export default function MenuSection({ id, title, subtitle, items, onAdd, onCheckout }) {
    return (
        <section id={id} className="scroll-mt-20 px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">From our kitchen</p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
                    </div>
                    <button type="button" onClick={onCheckout} className="font-semibold text-green-800 hover:text-green-950 dark:text-green-300 dark:hover:text-green-200">
                        Go to checkout <span aria-hidden="true">→</span>
                    </button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => <MenuCard key={item.name} item={item} onAdd={onAdd} />)}
                </div>
            </div>
        </section>
    );
}
