import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navigation/NavBar";
import Hero from "./components/landing/Hero";
import FeatureCard from "./components/landing/FeatureCard";
import About from "./components/about/About";
import MenuSection from "./components/menu/MenuSection";
import ExtractedCheckoutSection from "./components/checkout/CheckoutSection";
import OrderHistory from "./components/history/OrderHistory";
import { features } from "./data/homeData";
import { menu } from "./data/menuData";
import { money } from "./utils/money";
import LoginForm from "./components/auth/LoginForm";

function App() {
  // Keep the theme state here so the navbar can toggle it.
  const [darkMode, setDarkMode] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [operatorRole, setOperatorRole] = useState("");
  const [cart, setCart] = useState([]);
  const [cartNotice, setCartNotice] = useState("");
  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rd-order-history") || "[]");
    } catch {
      return [];
    }
  });
  const cartNoticeTimer = useRef(null);

  // The navbar uses this value to highlight the selected menu option.
  const [activePage, setActivePage] = useState("FEATURES");

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotalCents = cart.reduce(
    (total, item) => total + Math.round(item.price * 100) * item.quantity,
    0,
  );

  useEffect(() => () => window.clearTimeout(cartNoticeTimer.current), []);

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

  function navigateTo(label) {
    setActivePage(label);

    if (label === "CHECKOUT" || label === "ABOUT" || label === "HISTORY") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.requestAnimationFrame(() => {
      const sectionId = label === "DESERTS" ? "deserts" : label.toLowerCase();
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function openCheckout() {
    navigateTo("CHECKOUT");
  }

  function backToMenu() {
    setActivePage("FOODS");

    window.requestAnimationFrame(() => {
      document
        .getElementById("foods")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
            onNavigate={navigateTo}
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

          {cartItemCount > 0 && activePage !== "CHECKOUT" && (
            <div
              role="region"
              aria-label="Current order"
              className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-green-700/20 bg-white p-3 shadow-2xl shadow-green-950/20 dark:border-green-700 dark:bg-gray-900 md:left-60"
            >
              <div className="min-w-0 pl-1">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-green-700 dark:text-green-400">
                  Current order
                </p>
                <p className="mt-1 truncate font-bold text-gray-950 dark:text-white">
                  {cartItemCount} {cartItemCount === 1 ? "item" : "items"} ·{" "}
                  {money.format(cartTotalCents / 100)}
                </p>
              </div>
              <button
                type="button"
                onClick={openCheckout}
                className="shrink-0 rounded-xl bg-green-700 px-4 py-3 font-bold text-white shadow-md transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Check orders
              </button>
            </div>
          )}

          {activePage === "CHECKOUT" ? (
            <ExtractedCheckoutSection
              cart={cart}
              operatorRole={operatorRole}
              onQuantityChange={changeQuantity}
              onRemove={(itemName) =>
                setCart((currentCart) =>
                  currentCart.filter((item) => item.name !== itemName),
                )
              }
              onComplete={(completedOrder) => {
                setCart([]);

                setOrderHistory((currentHistory) => {
                  const updatedHistory = [completedOrder, ...currentHistory];
                  localStorage.setItem(
                    "rd-order-history",
                    JSON.stringify(updatedHistory),
                  );
                  return updatedHistory;
                });
              }}
              onBack={backToMenu}
            />
          ) : activePage === "HISTORY" ? (
            <OrderHistory
              orders={orderHistory}
              onClear={() => {
                setOrderHistory([]);
                localStorage.removeItem("rd-order-history");
              }}
            />
          ) : activePage === "ABOUT" ? (
            <About onBack={() => navigateTo("FEATURES")} />
          ) : (
            <>
              {/* Main welcome banner. */}
              <Hero
                title="Good food. Good mood."
                subtitle="Discover comforting favorites, refreshing drinks, and sweet treats—all in one place."
                buttonText="Explore the menu"
              />

              {/* Website features loaded from homeData.js. */}
              <section
                id="features"
                className="scroll-mt-20 px-5 py-16 sm:px-8"
              >
                <div className="mx-auto max-w-6xl">
                  <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                      A better dining experience
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      Made for you
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
                      Everything you need to explore our menu and enjoy your
                      visit.
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
                  onCheckout={openCheckout}
                />
              </div>

              <MenuSection
                id="drinks"
                title="Drinks"
                subtitle="A refreshing sip to go with your meal."
                items={menu.drinks}
                onAdd={addToCart}
                onCheckout={openCheckout}
              />

              {/* The section ID "deserts" matches the current DESERTS navbar label. */}
              <div className="border-y border-green-200 bg-green-50/80 dark:border-gray-800 dark:bg-gray-900/70">
                <MenuSection
                  id="deserts"
                  title="Merienda Combo"
                  subtitle="Save a little room for our delicious merienda break"
                  items={menu.desserts}
                  onAdd={addToCart}
                  onCheckout={openCheckout}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
