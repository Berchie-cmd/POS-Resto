import { useState } from "react";
import { Trash2 } from "lucide-react";
import { money } from "../../utils/money";

export default function CheckoutSection({ cart, operatorRole, onQuantityChange, onRemove, onClear, onComplete, onSavePending, onBack }) {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [confirmation, setConfirmation] = useState(null);
    const [hasFivePesoDiscount, setHasFivePesoDiscount] = useState(false);
    const subtotalCents = cart.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0);
    const discountCents = hasFivePesoDiscount ? Math.min(500, subtotalCents) : 0;
    const totalCents = subtotalCents - discountCents;

    function handleSubmit(event) {
        event.preventDefault();
        if (!cart.length) return;

        const completedAt = new Date();
        const completedOrder = {
            orderNumber: `POS-${completedAt.getTime()}`,
            completedAt: completedAt.toLocaleString(),
            items: cart.map((item) => ({ ...item })),
            subtotalCents,
            discountCents,
            totalCents,
            paymentMethod,
            operatorRole,
        };

        setConfirmation(completedOrder);
        onComplete(completedOrder);
    }

    function startNewOrder() {
        setConfirmation(null);
        setPaymentMethod("cash");
        setHasFivePesoDiscount(false);
        onBack();
    }

    return (
        <section id="checkout" className="min-h-[calc(100vh-56px)] scroll-mt-20 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto max-w-[1180px]">

                {confirmation ? (
                    <div>
                        <div className="receipt-print mx-auto max-w-md rounded-3xl border border-green-300 bg-white p-8 text-gray-900 shadow-sm dark:border-green-900">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold">RD&apos;s Fudhaws</h3>
                                <p className="mt-1 text-sm">Order receipt</p>
                                <p className="mt-4 text-left text-sm">
                                    Order: {confirmation.orderNumber}<br />
                                    Date: {confirmation.completedAt}<br />
                                    Served by: {confirmation.operatorRole.charAt(0).toUpperCase() + confirmation.operatorRole.slice(1)}
                                </p>
                            </div>
                            <div className="my-5 border-t border-dashed border-gray-400" />
                            <ul className="space-y-3">
                                {confirmation.items.map((item) => (
                                    <li key={item.name} className="flex justify-between gap-4 text-sm">
                                        <span>{item.name} × {item.quantity}<span className="block text-gray-600">{money.format(item.price)} each</span></span>
                                        <span className="shrink-0 font-semibold">{money.format((Math.round(item.price * 100) * item.quantity) / 100)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="my-5 border-t border-dashed border-gray-400" />
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>{money.format(confirmation.subtotalCents / 100)}</span></div>
                                {confirmation.discountCents > 0 && <div className="flex justify-between"><span>₱5 Discount</span><span>−{money.format(confirmation.discountCents / 100)}</span></div>}
                                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{money.format(confirmation.totalCents / 100)}</span></div>
                                <p className="pt-2">Payment: {{ cash: "Cash", card: "Card", "e-wallet": "E-wallet" }[confirmation.paymentMethod]}</p>
                            </div>
                            <p className="mt-6 text-center text-sm">Thank you!</p>
                        </div>
                        <div className="receipt-actions mt-6 flex flex-wrap justify-center gap-3">
                            <button type="button" onClick={() => window.print()} className="rounded-xl bg-green-800 px-5 py-3 font-bold text-white hover:bg-green-900">Print receipt</button>
                            <button type="button" onClick={startNewOrder} className="rounded-xl border border-green-800 px-5 py-3 font-bold text-green-900 hover:bg-green-50 dark:text-green-200 dark:hover:bg-green-950">Start a new order</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <button type="button" onClick={onBack} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#E6E9E3] px-4 py-2 text-xs font-semibold text-[#181D19] hover:bg-[#C8E7D0] dark:bg-[#272B27] dark:text-[#E0E3DE] dark:hover:bg-[#314D3B]">
                                    <span aria-hidden="true">←</span>
                                    <span>Back to Menu</span>
                                </button>
                                <div>
                                    <h1 className="text-[28px] font-bold leading-[34px] text-[#181D19] dark:text-[#E0E3DE]">Current Order</h1>
                                    <p className="font-mono text-xs text-[#005230] dark:text-[#8AD7A7]">#ORD-1042 • Dine-in • Table 04</p>
                                </div>
                            </div>
                            <button type="button" onClick={onClear} disabled={cart.length === 0} className="self-end rounded-lg border border-[#BFC9BF] px-4 py-2 text-sm font-semibold text-[#BA1A1A] hover:bg-[#FFDAD6]/40 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto dark:border-[#3F4942] dark:text-[#FFB4AB]">Clear Order</button>
                        </header>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                            <section className="flex min-h-[240px] flex-col gap-4 rounded-lg border border-[#BFC9BF] bg-white p-3 sm:p-5 dark:border-[#3F4942] dark:bg-[#181D19] lg:col-span-7">
                                <div className="flex items-center justify-between border-b border-[#BFC9BF] pb-3 dark:border-[#3F4942]">
                                    <h2 className="text-lg font-semibold">Order Items</h2>
                                    <span className="font-mono text-xs text-[#6F7A71] dark:text-[#BFC9BF]">{cart.reduce((count, item) => count + item.quantity, 0)} items</span>
                                </div>
                                {cart.length === 0 ? (
                                    <div className="grid flex-1 place-items-center rounded-lg border border-dashed border-[#BFC9BF] p-8 text-center dark:border-[#3F4942]">
                                        <div><p className="font-semibold">Your order is empty.</p><button type="button" onClick={onBack} className="mt-2 text-sm font-semibold text-[#005230] dark:text-[#8AD7A7]">Browse the menu</button></div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {cart.map((item) => (
                                            <div key={item.name} className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-[#BFC9BF] bg-[#F1F5EF] p-3 sm:grid-cols-[56px_minmax(0,1fr)_auto] dark:border-[#3F4942] dark:bg-[#1C211D]">
                                                <img src={item.image} alt="" aria-hidden="true" className="h-14 w-14 shrink-0 rounded-md object-cover" />
                                                <div className="min-w-0">
                                                    <p className="truncate text-base font-semibold">{item.name}</p>
                                                    <p className="text-xs text-[#6F7A71] dark:text-[#BFC9BF]">{item.category || "Menu"} • {money.format(item.price)} each</p>
                                                </div>
                                                <div className="col-span-2 grid grid-cols-[96px_minmax(64px,1fr)_32px] items-center gap-2 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:flex sm:w-auto sm:items-center sm:gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onQuantityChange(item.name, -1)} className="grid h-8 w-8 place-items-center rounded-md bg-[#E6E9E3] text-lg font-semibold dark:bg-[#272B27]">−</button>
                                                        <span className="w-6 text-center font-mono text-sm tabular-nums">{item.quantity}</span>
                                                        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => onQuantityChange(item.name, 1)} className="grid h-8 w-8 place-items-center rounded-md bg-[#E6E9E3] text-lg font-semibold dark:bg-[#272B27]">+</button>
                                                    </div>
                                                    <span className="w-20 text-right font-mono text-sm font-semibold tabular-nums text-[#005230] dark:text-[#8AD7A7]">{money.format((Math.round(item.price * 100) * item.quantity) / 100)}</span>
                                                    <button type="button" aria-label={`Remove ${item.name} from order`} onClick={() => onRemove(item.name)} className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#BA1A1A] hover:bg-[#FFDAD6]/60 dark:text-[#FFB4AB] dark:hover:bg-[#93000A]/30">
                                                        <Trash2 aria-hidden="true" size={18} strokeWidth={2} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <section className="flex flex-col gap-6 rounded-lg border border-[#BFC9BF] bg-white p-3 sm:p-5 dark:border-[#3F4942] dark:bg-[#181D19] lg:col-span-5">
                                <h2 className="border-b border-[#BFC9BF] pb-3 text-lg font-semibold dark:border-[#3F4942]">Payment Details</h2>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-sm text-[#6F7A71] dark:text-[#BFC9BF]"><span>Subtotal</span><span className="font-mono tabular-nums text-[#181D19] dark:text-[#E0E3DE]">{money.format(subtotalCents / 100)}</span></div>
                                    {discountCents > 0 && <div className="flex justify-between text-sm text-[#1B6B44] dark:text-[#8AD7A7]"><span>₱5 Discount</span><span className="font-mono tabular-nums">−{money.format(discountCents / 100)}</span></div>}
                                    <div className="flex justify-between text-sm text-[#6F7A71] dark:text-[#BFC9BF]"><span>Service Charge (0%)</span><span className="font-mono tabular-nums">₱0.00</span></div>
                                    <div className="mt-2 flex justify-between border-t border-[#BFC9BF] pt-3 text-xl font-bold dark:border-[#3F4942]"><span>Total Due</span><span className="font-mono tabular-nums text-[#005230] dark:text-[#8AD7A7]">{money.format(totalCents / 100)}</span></div>
                                </div>

                                <button type="button" onClick={() => setHasFivePesoDiscount((current) => !current)} disabled={cart.length === 0} className={`flex min-h-11 w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${hasFivePesoDiscount ? "border-[#1B6B44] bg-[#C8E7D0] text-[#1B3626] dark:border-[#8AD7A7] dark:bg-[#314D3B] dark:text-[#CBEAD2]" : "border-[#BFC9BF] bg-[#F1F5EF] text-[#181D19] dark:border-[#3F4942] dark:bg-[#1C211D] dark:text-[#E0E3DE]"}`}>
                                    <span>Apply ₱5 Discount</span>
                                    <span className="font-mono text-xs">{hasFivePesoDiscount ? "ON" : "OFF"}</span>
                                </button>

                                <div>
                                    <p className="mb-2 text-xs font-semibold text-[#6F7A71] dark:text-[#BFC9BF]">Select Payment Method</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[["cash", "Cash", "$"], ["card", "Card", "▣"], ["e-wallet", "E-Wallet", "▦"]].map(([value, label, symbol]) => (
                                            <button key={value} type="button" onClick={() => setPaymentMethod(value)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg text-sm font-semibold ${paymentMethod === value ? "bg-[#005230] text-white dark:bg-[#8AD7A7] dark:text-[#003920]" : "border border-[#BFC9BF] bg-[#F1F5EF] text-[#181D19] dark:border-[#3F4942] dark:bg-[#1C211D] dark:text-[#E0E3DE]"}`}>
                                                <span aria-hidden="true" className="text-lg">{symbol}</span><span>{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button type="submit" disabled={cart.length === 0} className="min-h-12 w-full rounded-lg bg-[#005230] px-5 py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#8AD7A7] dark:text-[#003920]">Complete Payment · {{ cash: "Cash", card: "Card", "e-wallet": "E-Wallet" }[paymentMethod]}</button>
                                    <button type="button" disabled={cart.length === 0} onClick={onSavePending} className="min-h-11 w-full rounded-lg bg-[#C8E7D0] px-5 py-3 text-base font-semibold text-[#1B3626] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#314D3B] dark:text-[#CBEAD2]">Park as Pending</button>
                                </div>
                            </section>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}
