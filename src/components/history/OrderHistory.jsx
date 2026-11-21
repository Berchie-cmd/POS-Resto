import { money } from "../../utils/money";

export default function OrderHistory({ orders, onClear }) {
    return (
        <section className="min-h-[calc(100vh-4rem)] px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <h2 className="text-3xl font-bold">Order History</h2>
                    {orders.length > 0 && (
                        <button type="button" onClick={onClear} className="rounded-xl border border-red-300 px-4 py-2 font-bold text-red-700 dark:border-red-900 dark:text-red-300">
                            Clear history
                        </button>
                    )}
                </div>

                {orders.length === 0 ? (
                    <p className="rounded-xl border p-8 text-center text-gray-500">No completed orders yet.</p>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-2">
                        {orders.map((order) => (
                            <article key={order.orderNumber} className="rounded-2xl border border-green-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <p className="font-bold">{order.orderNumber}</p>
                                        <p className="text-sm text-gray-500">{order.completedAt}</p>
                                    </div>
                                    <p className="font-bold">{money.format(order.totalCents / 100)}</p>
                                </div>
                                <ul className="mt-4 space-y-2 border-t pt-4">
                                    {order.items.map((item) => (
                                        <li key={item.name} className="flex justify-between gap-4">
                                            <span>{item.name} × {item.quantity}</span>
                                            <span>{money.format((Math.round(item.price * 100) * item.quantity) / 100)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4 text-sm">Payment: {{ cash: "Cash", card: "Card", "e-wallet": "E-wallet" }[order.paymentMethod]}</p>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
