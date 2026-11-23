import { useState } from "react";
import { money } from "../../utils/money";

export default function CheckoutSection({ cart, operatorRole, onQuantityChange, onRemove, onComplete, onSavePending, onBack }) {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [hasDiscountCard, setHasDiscountCard] = useState(false);
    const [discountCardNumber, setDiscountCardNumber] = useState("");
    const [confirmation, setConfirmation] = useState(null);
    const subtotalCents = cart.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0);
    const discountCents = hasDiscountCard && discountCardNumber.trim() ? Math.min(500, subtotalCents) : 0;
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
        setHasDiscountCard(false);
        setDiscountCardNumber("");
        onBack();
    }

    return (
        <section id="checkout" className="scroll-mt-20 px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 font-bold text-green-800 hover:text-green-950 dark:text-green-300 dark:hover:text-green-200">
                        <span aria-hidden="true">←</span> Back to menu
                    </button>
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">Review and pay</p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Review the order, select a payment method, and confirm.</p>
                </div>

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
                                {confirmation.discountCents > 0 && <div className="flex justify-between"><span>Discount card</span><span>−{money.format(confirmation.discountCents / 100)}</span></div>}
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
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="min-w-0 rounded-3xl border border-green-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                            <h3 className="text-xl font-bold">Order summary</h3>
                            {cart.length === 0 ? (
                                <div className="mt-6 rounded-2xl bg-green-50 p-6 text-center dark:bg-gray-900">
                                    <p className="font-semibold">Your order is empty.</p>
                                    <button type="button" onClick={onBack} className="mt-3 font-semibold text-green-800 hover:text-green-950 dark:text-green-300">Browse the menu</button>
                                </div>
                            ) : (
                                <ul className="mt-5 divide-y divide-green-100 dark:divide-gray-700">
                                    {cart.map((item) => (
                                        <li key={item.name} className="flex flex-wrap items-center gap-x-4 gap-y-3 py-4">
                                            <img src={item.image} alt="" aria-hidden="true" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                                            <div className="min-w-0 flex-1 basis-32"><p className="truncate font-semibold">{item.name}</p><p className="text-sm text-gray-500 dark:text-gray-400">{money.format(item.price)} each</p></div>
                                            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
                                                <div className="flex items-center gap-2">
                                                    <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onQuantityChange(item.name, -1)} className="h-8 w-8 rounded-full border border-gray-300 font-bold dark:border-gray-600">−</button>
                                                    <span className="w-6 text-center">{item.quantity}</span>
                                                    <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => onQuantityChange(item.name, 1)} className="h-8 w-8 rounded-full border border-gray-300 font-bold dark:border-gray-600">+</button>
                                                </div>
                                                <span className="text-right font-semibold sm:w-20">{money.format((Math.round(item.price * 100) * item.quantity) / 100)}</span>
                                                <button type="button" onClick={() => onRemove(item.name)} className="text-sm font-semibold text-green-600 hover:text-green-800">Remove</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="mt-5 space-y-3 border-t border-green-100 pt-5 dark:border-gray-700">
                                <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>{money.format(subtotalCents / 100)}</span></div>
                                {discountCents > 0 && <div className="flex justify-between text-green-800 dark:text-green-300"><span>Discount card</span><span>−{money.format(discountCents / 100)}</span></div>}
                                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{money.format(totalCents / 100)}</span></div>
                            </div>
                        </div>

                        <div className="min-w-0 space-y-6">
                            <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                                <h3 className="text-xl font-bold">Payment method</h3>
                                <div className="mt-4 grid gap-3">
                                    {[["cash", "/payment-cash.png", "Cash"], ["card", "/payment-card.png", "Card"], ["e-wallet", "/payment-ewallet.png", "E-wallet"]].map(([value, image, label]) => (
                                        <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === value ? "border-green-600 bg-green-50 dark:bg-green-950/40" : "border-gray-200 dark:border-gray-700"}`}>
                                            <input type="radio" name="paymentMethod" value={value} checked={paymentMethod === value} onChange={(event) => setPaymentMethod(event.target.value)} className="accent-green-700" />
                                            <img src={image} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
                                            <span className="font-semibold">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                                <h3 className="text-xl font-bold">Discount card</h3>
                                <label className="mt-4 flex items-center gap-3"><input type="checkbox" checked={hasDiscountCard} onChange={(event) => setHasDiscountCard(event.target.checked)} className="h-4 w-4 accent-green-700" /><span>I have a discount card</span></label>
                                {hasDiscountCard && <div className="mt-4"><label htmlFor="discount-card" className="mb-2 block text-sm font-semibold">Discount card number</label><input id="discount-card" value={discountCardNumber} onChange={(event) => setDiscountCardNumber(event.target.value)} required placeholder="Enter card number" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-900" /></div>}
                            </div>

                            <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                                <h3 className="text-xl font-bold">Processing by</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{operatorRole.charAt(0).toUpperCase() + operatorRole.slice(1)}</p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Role comes from the signed-in account.</p>
                            </div>

                            <button type="button" disabled={cart.length === 0} onClick={onSavePending} className="w-full rounded-xl border border-amber-500 px-5 py-3 font-bold text-amber-800 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-amber-300 dark:hover:bg-amber-950/30">Save as pending</button>
                            <button type="submit" disabled={cart.length === 0} className="w-full rounded-xl bg-green-700 px-5 py-4 font-bold text-white shadow-lg transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50">Confirm order · {money.format(totalCents / 100)}</button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
