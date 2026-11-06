import { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import { features } from "./data/homeData";
import LoginForm from "./components/LoginForm";

// Sample menu items. Replace these with your restaurant's actual menu and prices.
const menu = {
  foods: [
    { icon: "🍔", name: "Classic Burger", detail: "Beef, lettuce, tomato, house sauce", price: 20, tag: "Guest favorite" },
    { icon: "🍕", name: "Cheese Pizza", detail: "Tomato sauce, mozzarella, fresh basil", price: 100, tag: "Made fresh" },
    { icon: "🍝", name: "Creamy Pasta", detail: "Parmesan, herbs, creamy house sauce", price: 30, tag: "Comfort food" },
  ],
  drinks: [
    { icon: "🍋", name: "Fresh Lemonade", detail: "Freshly squeezed and served chilled", price: 15, tag: "Refreshing" },
    { icon: "☕", name: "Iced Coffee", detail: "Smooth coffee served over ice", price: 30, tag: "Popular" },
    { icon: "🥤", name: "Fruit Cooler", detail: "A bright, fruity drink served cold", price: 30, tag: "Chilled" },
  ],
  desserts: [
    { icon: "🍰", name: "Chocolate Cake", detail: "Rich chocolate with a soft center", price: 50, tag: "Sweet pick" },
    { icon: "🍮", name: "Caramel Pudding", detail: "Silky custard with caramel", price: 55, tag: "House favorite" },
    { icon: "🍨", name: "Ice Cream", detail: "Ask us about today's flavors", price: 3.45, tag: "Cool treat" },
  ],
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

// Reusable menu item card.
function MenuCard({ item, onAdd }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-orange-100 via-amber-50 to-white text-7xl transition group-hover:scale-[1.02] dark:from-gray-700 dark:via-gray-800 dark:to-gray-800">
        <span role="img" aria-label={item.name}>{item.icon}</span>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <span className="whitespace-nowrap rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-800 dark:bg-orange-950 dark:text-orange-200">
            {money.format(item.price)}
          </span>
        </div>

        <p className="mb-4 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {item.detail}
        </p>

        <span className="inline-flex rounded-full border border-orange-200 px-3 py-1 text-xs font-semibold text-orange-800 dark:border-orange-900 dark:text-orange-200">
          {item.tag}
        </span>
        <button
          type="button"
          onClick={() => onAdd(item)}
          className="mt-5 w-full rounded-xl bg-orange-600 px-4 py-3 font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Add to order
        </button>
      </div>
    </article>
  );
}

// Reusable section for the food, drink, and dessert menus.
function MenuSection({ id, title, subtitle, items, onAdd }) {
  return (
    <section id={id} className="scroll-mt-20 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              From our kitchen
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>

          {/* Jump to ordering information further down the page. */}
          <a
            href="#checkout"
            className="font-semibold text-orange-700 hover:text-orange-900 dark:text-orange-300 dark:hover:text-orange-200"
          >
            How to order <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Display each menu item in a responsive card grid. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.name} item={item} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckoutSection({
  cart,
  operatorRole,
  onQuantityChange,
  onRemove,
  onComplete,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [hasDiscountCard, setHasDiscountCard] = useState(false);
  const [discountCardNumber, setDiscountCardNumber] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const subtotalCents = cart.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0,
  );
  const discountCents =
    hasDiscountCard && discountCardNumber.trim()
      ? Math.min(50000, subtotalCents)
      : 0;
  const totalCents = subtotalCents - discountCents;

  function handleSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) return;

    setConfirmation({ totalCents, paymentMethod });
    onComplete();
  }

  return (
    <section id="checkout" className="scroll-mt-20 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Review and pay
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Review the order, select a payment method, and confirm.
          </p>
        </div>

        {confirmation ? (
          <div className="rounded-3xl border border-green-200 bg-green-50 p-8 dark:border-green-900 dark:bg-green-950/40">
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-200">
              Order confirmed
            </h3>
            <p className="mt-2 text-green-800 dark:text-green-300">
              Demo confirmation: {money.format(confirmation.totalCents / 100)} by{" "}
              {confirmation.paymentMethod}. Processed by {operatorRole}.
            </p>
            <p className="mt-2 text-sm text-green-800 dark:text-green-300">
              No payment was actually collected or processed.
            </p>
            <button
              type="button"
              onClick={() => setConfirmation(null)}
              className="mt-6 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
            >
              Start a new order
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <h3 className="text-xl font-bold">Order summary</h3>

              {cart.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-orange-50 p-6 text-center dark:bg-gray-900">
                  <p className="font-semibold">Your order is empty.</p>
                  <a
                    href="#foods"
                    className="mt-3 inline-block font-semibold text-orange-700 hover:text-orange-900 dark:text-orange-300"
                  >
                    Browse the menu
                  </a>
                </div>
              ) : (
                <ul className="mt-5 divide-y divide-orange-100 dark:divide-gray-700">
                  {cart.map((item) => (
                    <li key={item.name} className="flex items-center gap-4 py-4">
                      <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {money.format(item.price)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => onQuantityChange(item.name, -1)}
                          className="h-8 w-8 rounded-full border border-gray-300 font-bold dark:border-gray-600"
                        >
                          −
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => onQuantityChange(item.name, 1)}
                          className="h-8 w-8 rounded-full border border-gray-300 font-bold dark:border-gray-600"
                        >
                          +
                        </button>
                      </div>
                      <span className="w-20 text-right font-semibold">
                        {money.format(
                          (Math.round(item.price * 100) * item.quantity) / 100,
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemove(item.name)}
                        aria-label={`Remove ${item.name}`}
                        className="text-sm font-semibold text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 space-y-3 border-t border-orange-100 pt-5 dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>{money.format(subtotalCents / 100)}</span>
                </div>
                {discountCents > 0 && (
                  <div className="flex justify-between text-green-700 dark:text-green-300">
                    <span>Discount card</span>
                    <span>−{money.format(discountCents / 100)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{money.format(totalCents / 100)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                <h3 className="text-xl font-bold">Payment method</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    ["cash", "💵", "Cash"],
                    ["card", "💳", "Card"],
                    ["e-wallet", "📱", "E-wallet"],
                  ].map(([value, icon, label]) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                        paymentMethod === value
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={value}
                        checked={paymentMethod === value}
                        onChange={(event) => setPaymentMethod(event.target.value)}
                        className="accent-orange-600"
                      />
                      <span aria-hidden="true">{icon}</span>
                      <span className="font-semibold">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                <h3 className="text-xl font-bold">Discount card</h3>
                <label className="mt-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasDiscountCard}
                    onChange={(event) => setHasDiscountCard(event.target.checked)}
                    className="h-4 w-4 accent-orange-600"
                  />
                  <span>I have a discount card</span>
                </label>
                {hasDiscountCard && (
                  <div className="mt-4">
                    <label htmlFor="discount-card" className="mb-2 block text-sm font-semibold">
                      Discount card number
                    </label>
                    <input
                      id="discount-card"
                      value={discountCardNumber}
                      onChange={(event) => setDiscountCardNumber(event.target.value)}
                      required
                      placeholder="Enter card number"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-900"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Demo rule: entering a card applies ₱500 off. Card validity is not checked.
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                <h3 className="text-xl font-bold">Processed by</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {operatorRole}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Role comes from the signed-in account.
                </p>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full rounded-xl bg-orange-600 px-5 py-4 font-bold text-white shadow-lg transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm order · {money.format(totalCents / 100)}
              </button>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                Demo checkout only. This does not process a real payment.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function App() {
  // Keep the theme state here so the navbar can toggle it.
  const [darkMode, setDarkMode] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [operatorRole, setOperatorRole] = useState("");
  const [cart, setCart] = useState([]);

  // The navbar uses this value to highlight the selected menu option.
  const [activePage, setActivePage] = useState("FEATURES");

  function addToCart(item) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.name === item.name);

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  }

  function changeQuantity(itemName, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    // Tailwind dark-mode styles activate when this wrapper has the "dark" class.
    <div className={darkMode ? "dark" : ""}>
      {!isSignedIn ? (
        <LoginForm
          onLogin={(role) => {
            setOperatorRole(role);
            setIsSignedIn(true);
          }}
        />
      ) : (
      <div className="min-h-screen bg-[#fffaf4] pt-16 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100 md:ml-56">
        {/* Pass the theme and navigation controls to the navbar. */}
        <Navbar
          darkMode={darkMode}
          toggleDark={() => setDarkMode((current) => !current)}
          activePage={activePage}
          onNavigate={setActivePage}
          onLogout={() => {
            setCart([]);
            setOperatorRole("");
            setActivePage("FEATURES");
            setIsSignedIn(false);
          }}
        />

        {/* Main welcome banner. */}
        <Hero
          title="Good food. Good mood."
          subtitle="Discover comforting favorites, refreshing drinks, and sweet treats—all in one place."
          buttonText="Explore the menu"
        />

        {/* Website features loaded from homeData.js. */}
        <section id="features" className="scroll-mt-20 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                A better dining experience
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Made for you</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
                Everything you need to explore our menu and enjoy your visit.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item) => (
                <FeatureCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* These IDs match the sidebar links, so clicking a link scrolls here. */}
        <div className="border-y border-orange-100 bg-orange-50/70 dark:border-gray-800 dark:bg-gray-900/70">
          <MenuSection
            id="foods"
            title="Food favorites"
            subtitle="Freshly prepared picks for a satisfying meal."
            items={menu.foods}
            onAdd={addToCart}
          />
        </div>

        <MenuSection
          id="drinks"
          title="Drinks"
          subtitle="A refreshing sip to go with your meal."
          items={menu.drinks}
          onAdd={addToCart}
        />

        {/* The section ID "deserts" matches the current DESERTS navbar label. */}
        <div className="border-y border-orange-100 bg-orange-50/70 dark:border-gray-800 dark:bg-gray-900/70">
          <MenuSection
            id="deserts"
            title="Desserts"
            subtitle="Save a little room for something sweet."
            items={menu.desserts}
            onAdd={addToCart}
          />
        </div>

        {/* Cart summary, payment selection, discount, and order confirmation. */}
        <CheckoutSection
          cart={cart}
          operatorRole={operatorRole}
          onQuantityChange={changeQuantity}
          onRemove={(itemName) =>
            setCart((currentCart) =>
              currentCart.filter((item) => item.name !== itemName),
            )
          }
          onComplete={() => setCart([])}
        />

        {/* Restaurant introduction. Update this with your real story and details. */}
        <section id="about" className="scroll-mt-20 border-t border-orange-100 px-5 py-14 dark:border-gray-800 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              About us
            </p>
            <h2 className="text-3xl font-bold">Welcome to POS Resto</h2>
            <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
              We make it easy to browse the menu and find something delicious.
              Our team is happy to help you choose.
            </p>
          </div>
        </section>

        {/* Simple site footer. */}
        <footer className="border-t border-orange-100 px-5 py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © 2026 POS Resto · Good food, served with care.
        </footer>
      </div>
      )}
    </div>
  );
}

export default App;