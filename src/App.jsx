import { useEffect, useRef, useState } from "react";
import DashboardNav from "./components/navigation/DashboardNav";

import About from "./components/about/About";
import DashboardCatalog from "./components/menu/DashboardCatalog";
import ExtractedCheckoutSection from "./components/checkout/CheckoutSection";
import OrderHistory from "./components/history/OrderHistory";
import PendingOrders from "./components/pending/PendingOrders";
import { menu } from "./data/menuData";
import { money } from "./utils/money";
import LoginForm from "./components/auth/LoginForm";
import { ConfirmDialog } from "./components/ui/DashboardDialog";

function App() {
  // Keep the theme state here so the navbar can toggle it.
  const [darkMode, setDarkMode] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [operatorRole, setOperatorRole] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [cart, setCart] = useState([]);
  const [cartNotice, setCartNotice] = useState("");
  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rd-order-history") || "[]");
    } catch {
      return [];
    }
  });
  const [pendingOrders, setPendingOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rd-pending-orders") || "[]");
    } catch {
      return [];
    }
  });
  const [editingPendingId, setEditingPendingId] = useState(null);
  const [deletePendingId, setDeletePendingId] = useState(null);
  const [appNotice, setAppNotice] = useState(null);
  const cartNoticeTimer = useRef(null);
  const appNoticeTimer = useRef(null);

  // The navbar uses this value to highlight the selected menu option.
  const [activePage, setActivePage] = useState("FEATURES");

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotalCents = cart.reduce(
    (total, item) => total + Math.round(item.price * 100) * item.quantity,
    0,
  );

  useEffect(() => () => {
    window.clearTimeout(cartNoticeTimer.current);
    window.clearTimeout(appNoticeTimer.current);
  }, []);

  function showAppNotice(message, tone = "success") {
    window.clearTimeout(appNoticeTimer.current);
    setAppNotice({ message, tone });
    appNoticeTimer.current = window.setTimeout(() => setAppNotice(null), 2800);
  }

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

    if (label === "CHECKOUT" || label === "ABOUT" || label === "HISTORY" || label === "PENDING") {
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
          darkMode={darkMode}
          toggleDark={() => setDarkMode((current) => !current)}
          onLogin={({ role, username }) => {
            setOperatorRole(role);
            setOperatorName(username);
            setIsSignedIn(true);
          }}
        />
      ) : (
        <div className="min-h-screen overflow-x-hidden bg-[#F7FAF4] text-[#181D19] transition-colors dark:bg-[#101411] dark:text-[#E0E3DE] md:pl-60">
          <DashboardNav
            darkMode={darkMode}
            toggleDark={() => setDarkMode((current) => !current)}
            activePage={activePage}
            onNavigate={navigateTo}
            cartCount={cartItemCount}
            operatorRole={operatorRole}
            operatorName={operatorName}
            onLogout={() => {
              setCart([]);
              setEditingPendingId(null);
              setOperatorRole("");
              setOperatorName("");
              setActivePage("FEATURES");
              setIsSignedIn(false);
            }}
          />

          {appNotice && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="fixed right-4 top-4 z-[70] flex max-w-sm items-center gap-3 rounded-lg border border-[#BFC9BF] bg-white px-4 py-3 shadow-lg shadow-[#181D19]/10 dark:border-[#3F4942] dark:bg-[#181D19] md:right-6"
            >
              <span
                aria-hidden="true"
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-semibold ${appNotice.tone === "error" ? "bg-[#FFDAD6] text-[#93000A] dark:bg-[#93000A] dark:text-[#FFDAD6]" : "bg-[#C8E7D0] text-[#1B3626] dark:bg-[#314D3B] dark:text-[#CBEAD2]"}`}
              >
                {appNotice.tone === "error" ? "!" : "✓"}
              </span>
              <p className="text-sm font-semibold text-[#181D19] dark:text-[#E0E3DE]">
                {appNotice.message}
              </p>
            </div>
          )}

          {cartNotice && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="fixed left-4 right-4 top-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-lg border border-[#BFC9BF] bg-white px-4 py-3 shadow-lg shadow-[#181D19]/10 dark:border-[#3F4942] dark:bg-[#181D19] sm:left-auto sm:right-6 md:left-[272px] md:right-6"
            >
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#C8E7D0] text-sm font-semibold text-[#1B3626] dark:bg-[#314D3B] dark:text-[#CBEAD2]"
              >
                ✓
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#496552] dark:text-[#AFCEB7]">
                  Current order
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-[#181D19] dark:text-[#E0E3DE]">
                  {cartNotice}
                </p>
              </div>
            </div>
          )}

          {cartItemCount > 0 && activePage !== "CHECKOUT" && (
            <div
              role="region"
              aria-label="Current order"
              className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-lg border border-[#BFC9BF] bg-white px-4 py-3 shadow-lg shadow-[#181D19]/10 dark:border-[#3F4942] dark:bg-[#181D19] md:left-[272px]"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#496552] dark:text-[#AFCEB7]">
                  Current order
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-[#181D19] dark:text-[#E0E3DE]">
                  {cartItemCount} {cartItemCount === 1 ? "item" : "items"} ·{" "}
                  {money.format(cartTotalCents / 100)}
                </p>
              </div>
              <button
                type="button"
                onClick={openCheckout}
                className="min-h-10 shrink-0 rounded-lg bg-[#005230] px-4 text-sm font-semibold text-white transition hover:bg-[#1B6B44] focus:outline-none focus:ring-2 focus:ring-[#005230]/30 dark:bg-[#8AD7A7] dark:text-[#003920] dark:hover:bg-[#AFCEB7]"
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
                if (editingPendingId) {
                  setPendingOrders((currentOrders) => {
                    const updatedOrders = currentOrders.filter((order) => order.id !== editingPendingId);
                    localStorage.setItem("rd-pending-orders", JSON.stringify(updatedOrders));
                    return updatedOrders;
                  });
                  setEditingPendingId(null);
                }

                setOrderHistory((currentHistory) => {
                  const updatedHistory = [completedOrder, ...currentHistory];
                  localStorage.setItem(
                    "rd-order-history",
                    JSON.stringify(updatedHistory),
                  );
                  return updatedHistory;
                });
              }}
              onSavePending={() => {
                const now = new Date();
                const pendingOrder = {
                  id: editingPendingId || `pending-${now.getTime()}`,
                  orderNumber: editingPendingId
                    ? pendingOrders.find((order) => order.id === editingPendingId)?.orderNumber
                    : `PENDING-${now.getTime()}`,
                  createdAt: now.toLocaleString(),
                  items: cart.map((item) => ({ ...item })),
                  totalCents: cart.reduce(
                    (total, item) => total + Math.round(item.price * 100) * item.quantity,
                    0,
                  ),
                };
                setPendingOrders((currentOrders) => {
                  const updatedOrders = editingPendingId
                    ? currentOrders.map((order) => order.id === editingPendingId ? pendingOrder : order)
                    : [pendingOrder, ...currentOrders];
                  localStorage.setItem("rd-pending-orders", JSON.stringify(updatedOrders));
                  return updatedOrders;
                });
                setCart([]);
                setEditingPendingId(null);
                navigateTo("PENDING");
              }}
              onBack={backToMenu}
            />
          ) : activePage === "PENDING" ? (
            <PendingOrders
              orders={pendingOrders}
              onResume={(order) => {
                setCart(order.items);
                setEditingPendingId(order.id);
                navigateTo("CHECKOUT");
              }}
              onDelete={(orderId) => setDeletePendingId(orderId)}
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
            <DashboardCatalog
              activePage={activePage}
              menu={menu}
              cartCount={cartItemCount}
              onAdd={addToCart}
              onCheckout={openCheckout}
            />
          )}

          <ConfirmDialog
            open={deletePendingId !== null}
            title="Delete pending order?"
            message="This order will be removed from pending orders and cannot be restored."
            confirmLabel="Delete order"
            onCancel={() => setDeletePendingId(null)}
            onConfirm={() => {
              setPendingOrders((currentOrders) => {
                const updatedOrders = currentOrders.filter((order) => order.id !== deletePendingId);
                localStorage.setItem("rd-pending-orders", JSON.stringify(updatedOrders));
                return updatedOrders;
              });
              setDeletePendingId(null);
              showAppNotice("Pending order deleted", "success");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
