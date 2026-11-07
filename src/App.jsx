import { useEffect, useRef, useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import { features } from "./data/homeData";
import LoginForm from "./components/LoginForm";

// Sample menu items. Replace these with your restaurant's actual menu and prices.
const menu = {
  foods: [
    {
      image: "/HUNGARIAN SAUSAGE.jpg",
      name: "HUNGARIAN SAUSAGE",
      detail: "Grilled sausage with your choice of sauce",
      price: 95, // NOT SURE PRICE
      tag: "Guest favorite",
    },
    {
      image: "/BABY BACKRIBS.jpg",
      name: "BABY BACK RIBS",
      detail: "Slow-cooked until tender, these ribs are coated in our smoky barbecue glaze and grilled for a rich, savory finish.",
      price: 110,
      tag: "Made fresh",
    },
    {
      image: "/TAPA.jpg",
      name: "TAPA",
      detail: "Golden, crispy pork belly with a tender center, served with your choice of sauce for a deliciously savory bite.",
      price: 100,
      tag: "Comfort food",
    },
    {
      image: "/CHICKEN WINGS.jpg",
      name: "CHICKEN WINGS",
      detail: "Crispy chicken wings with your choice of sauce",
      price: 110,
      tag: "Comfort food",
    },
    {
      image: "/LECHON KAWALI.jpg",
      name: "LECHON KAWALI",
      detail: "Crispy pork with your choice of sauce",
      price: 105,
      tag: "Comfort food",
    },

    {
      image: "/PORKCHOP.jpg",
      name: "PORKCHOP",
      detail: "Tender pork with a aromaticsmoky barbecue glaze",
      price: 110, // NOT SURE PRICE
      tag: "Made fresh",
    },
    {
      image: "/SISIG.jpg",
      name: "SISIG",
      detail: "Sizzling chopped pork with savory seasoning.",
      price: 110,
      tag: "Guest favorite",
    },
    {
      image: "/BANGUS.jpg",
      name: "BANGUS",
      detail: "A traditional Filipino fish dish, typically grilled or fried and served with a savory sauce",
      price: 100, // NOT SURE PRICE
      tag: "Guest favorite",
    },
    {
      image: "/CHOPSUEY.jpg",
      name: "CHOPSUEY",
      detail: "Stir-fried vegetables in a savory sauce.",
      price: 75, // NOT SURE PRICE
      tag: "Guest favorite",
    },
    {
      image: "/TOKWA'T BABOY.jpg",
      name: "TOKWA'T BABOY",
      detail: "A traditional Filipino dish made with pork and vegetables",
      price: 85,
      tag: "Guest favorite",
    },
    {
      image: "/PORKSTEAK.jpg",
      name: "PORKSTEAK",
      detail: "A tender piece of pork, seasoned and grilled to perfection",
      price: 115, // NOT SURE PRICE
      tag: "Guest favorite",
    },
    {
      image: "/BARBECUE LIEMPO.jpg",
      name: "BARBECUE LIEMPO",
      detail: "A tender piece of pork, seasoned and grilled to perfection",
      price: 115,
      tag: "Guest favorite",
    },
    {
      image: "/FRIED CHICKEN.jpg",
      name: "FRIED CHICKEN",
      detail: "Crispy fried chicken with a savory glaze",
      price: 110, // NOT SURE PRICE
      tag: "Guest favorite",
    },
    {
      image: "/CRISPY LIEMPO.jpg",
      name: "CRISPY LIEMPO",
      detail: "Crispy pork belly with a savory glaze",
      price: 115,
      tag: "Guest favorite",
    },
  ],
  drinks: [
    {
      image: "/drink-lemonade.png",
      name: "Fresh Lemonade",
      detail: "Freshly squeezed and served chilled",
      price: 15,
      tag: "Refreshing",
    },
    {
      image: "/drink-coffee.png",
      name: "Iced Coffee",
      detail: "Smooth coffee served over ice",
      price: 30,
      tag: "Popular",
    },
    {
      image: "/drink-cup.png",
      name: "Fruit Cooler",
      detail: "A bright, fruity drink served cold",
      price: 30,
      tag: "Chilled",
    },
  ],
  desserts: [
    {
      image: "/BUTTERED CORN.jpg",
      name: "BUTTERED CORN",
      detail: "Buttered corn on the cob with a hint of salt and pepper",
      price: 80, // NOT SURE PRICE
      tag: "Sweet pick",
    },
    {
      image: "/PANCIT BIHON.jpg",
      name: "PANCIT BIHON",
      detail: "A traditional Filipino noodle dish with vegetables",
      price: 25, // NOT SURE PRICE
      tag: "Sweet pick",
    },
    {
      image: "/PANCIT CANTON.jpg",
      name: "PANCIT CANTON",
      detail: "A traditional Filipino noodle dish with vegetables",
      price: 25, // NOT SURE PRICE
      tag: "Sweet pick",
    },
  ],
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

// Reusable menu item card.
function MenuCard({ item, onAdd }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-green-200 bg-white shadow-sm shadow-green-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-950/10 dark:border-gray-700 dark:bg-gray-800">
      <div className="h-40 overflow-hidden bg-linear-to-br from-green-100 via-emerald-50 to-white transition dark:from-gray-700 dark:via-gray-800 dark:to-gray-800">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <span className="whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-900 dark:bg-green-950 dark:text-green-200">
            {money.format(item.price)}
          </span>
        </div>

        <p className="mb-4 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {item.detail}
        </p>

        <span className="mt-5 inline-flex rounded-full border border-green-200 px-3 py-1 text-xs font-semibold text-green-800 dark:border-green-900 dark:text-green-200">
          {item.tag}
        </span>
        <button
          type="button"
          onClick={() => onAdd(item)}
          className="mt-5 w-full rounded-xl bg-green-700 px-4 py-3 font-bold text-white shadow-md shadow-green-900/15 transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
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
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
              From our kitchen
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>

          {/* Jump to ordering information further down the page. */}
          <a
            href="#checkout"
            className="font-semibold text-green-800 hover:text-green-950 dark:text-green-300 dark:hover:text-green-200"
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
      ? Math.min(500, subtotalCents)
      : 0;
  const totalCents = subtotalCents - discountCents;

  function handleSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) return;

    const completedAt = new Date();
    setConfirmation({
      orderNumber: `POS-${completedAt.getTime()}`,
      completedAt: completedAt.toLocaleString(),
      items: cart.map((item) => ({ ...item })),
      subtotalCents,
      discountCents,
      totalCents,
      paymentMethod,
      operatorRole,
    });
    onComplete();
  }

  function startNewOrder() {
    setConfirmation(null);
    setPaymentMethod("cash");
    setHasDiscountCard(false);
    setDiscountCardNumber("");
  }

  return (
    <section id="checkout" className="scroll-mt-20 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
            Review and pay
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Checkout
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Review the order, select a payment method, and confirm.
          </p>
        </div>

        {confirmation ? (
          <div>
            <div className="receipt-print mx-auto max-w-md rounded-3xl border border-green-300 bg-white p-8 text-gray-900 shadow-sm dark:border-green-900 dark:bg-white dark:text-gray-900">
              <div className="text-center">
                <h3 className="text-2xl font-bold">RD's Fudhaws</h3>
                <p className="mt-1 text-sm">Order receipt</p>
                <p className="mt-4 text-left text-sm">
                  Order: {confirmation.orderNumber}
                  <br />
                  Date: {confirmation.completedAt}
                  <br />
                  Served by:{" "}
                  {confirmation.operatorRole.charAt(0).toUpperCase() +
                    confirmation.operatorRole.slice(1)}
                </p>
              </div>

              <div className="my-5 border-t border-dashed border-gray-400" />
              <ul className="space-y-3">
                {confirmation.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span>
                      {item.name} × {item.quantity}
                      <span className="block text-gray-600">
                        {money.format(item.price)} each
                      </span>
                    </span>
                    <span className="shrink-0 font-semibold">
                      {money.format(
                        (Math.round(item.price * 100) * item.quantity) / 100,
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-5 border-t border-dashed border-gray-400" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{money.format(confirmation.subtotalCents / 100)}</span>
                </div>
                {confirmation.discountCents > 0 && (
                  <div className="flex justify-between">
                    <span>Discount card</span>
                    <span>
                      −{money.format(confirmation.discountCents / 100)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{money.format(confirmation.totalCents / 100)}</span>
                </div>
                <p className="pt-2">
                  Payment:{" "}
                  {{
                    cash: "Cash",
                    card: "Card",
                    "e-wallet": "E-wallet",
                  }[confirmation.paymentMethod]}
                </p>
              </div>
              <p className="mt-6 text-center text-sm">Thank you!</p>
            </div>

            <div className="receipt-actions mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl bg-green-800 px-5 py-3 font-bold text-white hover:bg-green-900"
              >
                Print receipt
              </button>
              <button
                type="button"
                onClick={startNewOrder}
                className="rounded-xl border border-green-800 px-5 py-3 font-bold text-green-900 hover:bg-green-50 dark:text-green-200 dark:hover:bg-green-950"
              >
                Start a new order
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            // grid-cols-1 keeps the column from growing wider than the phone screen
            className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="min-w-0 rounded-3xl border border-green-200 bg-white p-6 shadow-sm shadow-green-950/5 dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <h3 className="text-xl font-bold">Order summary</h3>

              {cart.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-green-50 p-6 text-center dark:bg-gray-900">
                  <p className="font-semibold">Your order is empty.</p>
                  <a
                    href="#foods"
                    className="mt-3 inline-block font-semibold text-green-800 hover:text-green-950 dark:text-green-300"
                  >
                    Browse the menu
                  </a>
                </div>
              ) : (
                <ul className="mt-5 divide-y divide-green-100 dark:divide-gray-700">
                  {cart.map((item) => (
                    <li
                      key={item.name}
                      // flex-wrap lets the row break into two lines on small screens
                      className="flex flex-wrap items-center gap-x-4 gap-y-3 py-4"
                    >
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                      />

                      {/* Name and price each. basis-32 = minimum width before wrapping */}
                      <div className="min-w-0 flex-1 basis-32">
                        <p className="truncate font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {money.format(item.price)} each
                        </p>
                      </div>

                      {/* Quantity, total, and Remove: full width on phones, auto width on sm+ */}
                      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
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

                        <span className="text-right font-semibold sm:w-20">
                          {money.format((Math.round(item.price * 100) * item.quantity) / 100)}
                        </span>

                        <button
                          type="button"
                          onClick={() => onRemove(item.name)}
                          aria-label={`Remove ${item.name}`}
                          className="text-sm font-semibold text-green-600 hover:text-green-800"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 space-y-3 border-t border-green-100 pt-5 dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>{money.format(subtotalCents / 100)}</span>
                </div>
                {discountCents > 0 && (
                  <div className="flex justify-between text-green-800 dark:text-green-300">
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

            <div className="min-w-0 space-y-6">
              <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm shadow-green-950/5 dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                <h3 className="text-xl font-bold">Payment method</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    ["cash", "/payment-cash.png", "Cash"],
                    ["card", "/payment-card.png", "Card"],
                    ["e-wallet", "/payment-ewallet.png", "E-wallet"],
                  ].map(([value, image, label]) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === value
                        ? "border-green-600 bg-green-50 dark:bg-green-950/40"
                        : "border-gray-200 dark:border-gray-700"
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={value}
                        checked={paymentMethod === value}
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                        className="accent-green-700"
                      />
                      <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="h-8 w-8 object-contain"
                      />
                      <span className="font-semibold">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm shadow-green-950/5 dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                <h3 className="text-xl font-bold">Discount card</h3>
                <label className="mt-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasDiscountCard}
                    onChange={(event) =>
                      setHasDiscountCard(event.target.checked)
                    }
                    className="h-4 w-4 accent-green-700"
                  />
                  <span>I have a discount card</span>
                </label>
                {hasDiscountCard && (
                  <div className="mt-4">
                    <label
                      htmlFor="discount-card"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Discount card number
                    </label>
                    <input
                      id="discount-card"
                      value={discountCardNumber}
                      onChange={(event) =>
                        setDiscountCardNumber(event.target.value)
                      }
                      required
                      placeholder="Enter card number"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-900"
                    />
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm shadow-green-950/5 dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                <h3 className="text-xl font-bold">Processing by</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {operatorRole.charAt(0).toUpperCase() + operatorRole.slice(1)}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Role comes from the signed-in account.
                </p>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full rounded-xl bg-green-700 px-5 py-4 font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm order · {money.format(totalCents / 100)}
              </button>
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
  const [cartNotice, setCartNotice] = useState("");
  const cartNoticeTimer = useRef(null);

  // The navbar uses this value to highlight the selected menu option.
  const [activePage, setActivePage] = useState("FEATURES");

  useEffect(
    () => () => window.clearTimeout(cartNoticeTimer.current),
    [],
  );

  function addToCart(item) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.name === item.name,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
    window.clearTimeout(cartNoticeTimer.current);
    setCartNotice(`${item.name} added to your order`);
    cartNoticeTimer.current = window.setTimeout(() => {
      setCartNotice("");
    }, 2500);
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
        <div className="min-h-screen overflow-x-hidden bg-[#f3faf5] pt-16 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100 md:ml-56">
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

          {cartNotice && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="fixed left-4 right-4 top-20 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 font-semibold text-green-900 shadow-lg dark:border-green-800 dark:bg-gray-800 dark:text-green-200 sm:left-auto sm:right-6"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
              >
                ✓
              </span>
              <span>{cartNotice}</span>
            </div>
          )}

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
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                  A better dining experience
                </p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Made for you
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
                  Everything you need to explore our menu and enjoy your visit.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((item) => (
                  <FeatureCard
                    key={item.title}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* These IDs match the sidebar links, so clicking a link scrolls here. */}
          <div className="border-y border-green-200 bg-green-50/80 dark:border-gray-800 dark:bg-gray-900/70">
            <MenuSection
              id="foods"
              title="Food Meals"
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
          <div className="border-y border-green-200 bg-green-50/80 dark:border-gray-800 dark:bg-gray-900/70">
            <MenuSection
              id="deserts"
              title="Merienda Combo"
              subtitle="Save a little room for our delicious merienda break"
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
          <section
            id="about"
            className="scroll-mt-20 border-t border-green-200 px-5 py-14 dark:border-gray-800 sm:px-8"
          >
            <div className="mx-auto max-w-6xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                About us
              </p>
              <h2 className="text-3xl font-bold">Welcome to RD's Fudhaws</h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
                We make it easy to browse the menu and find something delicious.
                Our team is happy to help you choose.
              </p>
            </div>
          </section>

          {/* Simple site footer. */}
          <footer className="border-t border-green-200 px-5 py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            © 2026 RD's Fudhaws · Good food, served with care.
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
