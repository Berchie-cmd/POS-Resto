import { money } from "../../utils/money";

export default function PendingOrders({ orders, onResume, onDelete }) {
    return (
        <section className="min-h-[calc(100vh-4rem)] px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">Unpaid orders</p>
                    <h2 className="text-3xl font-bold">Pending Orders</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Resume an order to update it, complete payment, or delete it.</p>
                </div>

                {orders.length === 0 ? (
                    <p className="rounded-xl border p-8 text-center text-gray-500">No pending orders.</p>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-2">
                        {orders.map((order) => (
                            <article key={order.id} className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-900 dark:bg-gray-800">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <p className="font-bold">{order.orderNumber}</p>
                                        <p className="text-sm text-gray-500">{order.createdAt}</p>
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
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <button type="button" onClick={() => onResume(order)} className="rounded-xl bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-800">View / update</button>
                                    <button type="button" onClick={() => onDelete(order.id)} className="rounded-xl border border-red-300 px-4 py-2 font-bold text-red-700 dark:border-red-900 dark:text-red-300">Delete</button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
