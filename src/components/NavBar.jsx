import { useEffect, useState } from "react";

// Props received from App.jsx:
//   darkMode   -> current light/dark theme
//   toggleDark -> switches the theme
//   activePage -> currently selected section
//   onNavigate -> updates the selected section
//   onLogout   -> returns to the sign-in screen
function Navbar({ darkMode, toggleDark, activePage, onNavigate, onLogout }) {
    // Opens and closes the mobile navigation drawer.
    const [menuOpen, setMenuOpen] = useState(false);

    // Links should match the section IDs in App.jsx.
    const links = ["FEATURES", "FOODS", "DRINKS", "DESERTS", "CHECKOUT", "ABOUT"];

    // Allow keyboard users to close the drawer with Escape.
    useEffect(() => {
        function closeOnEscape(event) {
            if (event.key === "Escape") setMenuOpen(false);
        }

        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, []);

    function navigateTo(label) {
        const section = document.getElementById(label.toLowerCase());

        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            onNavigate(label);
        }

        setMenuOpen(false);
    }

    return (
        <>
            {/* Top bar: restaurant name on the left, controls on the right. */}
            <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-green-800/40 bg-green-800 text-white shadow-lg shadow-green-950/15 transition-colors duration-300 dark:border-white/10 dark:bg-gray-950 md:left-56">
                <div className="flex h-full items-center justify-between gap-2 px-4 sm:px-6">
                    <h1 className="truncate text-lg font-extrabold tracking-tight sm:text-2xl">
                        RD&apos;s Fudhaws
                    </h1>

                    <div className="flex shrink-0 items-center gap-2">
                        {/* Mobile menu toggle with an animated menu/close icon. */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-label={
                                menuOpen ? "Close navigation menu" : "Open navigation menu"
                            }
                            aria-expanded={menuOpen}
                            aria-controls="main-navigation"
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="h-6 w-6"
                                aria-hidden="true"
                            >
                                {menuOpen ? (
                                    <path d="M6 6l12 12M18 6L6 18" />
                                ) : (
                                    <path d="M4 7h16M4 12h16M4 17h16" />
                                )}
                            </svg>
                        </button>

                        {/* Light/dark theme toggle. */}
                        <button
                            type="button"
                            onClick={toggleDark}
                            aria-label={
                                darkMode ? "Switch to light mode" : "Switch to dark mode"
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg text-green-900 shadow-sm transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white dark:bg-green-700 dark:text-white dark:hover:bg-green-600"
                        >
                            <img
                                src={darkMode ? "/theme-sun.png" : "/theme-moon.png"}
                                alt=""
                                aria-hidden="true"
                                className="h-6 w-6 object-contain"
                            />
                        </button>

                        {/* End the current demo session and return to sign-in. */}
                        <button
                            type="button"
                            onClick={onLogout}
                            className="rounded-xl bg-green-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-white dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </header>

            {/* Tap outside the drawer to dismiss it on mobile. */}
            {menuOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-x-0 bottom-0 top-16 z-30 bg-gray-950/55 backdrop-blur-sm md:hidden"
                />
            )}

            {/* Navigation drawer on mobile; persistent sidebar on desktop. */}
            <nav
                id="main-navigation"
                aria-label="Main navigation"
                className={`fixed bottom-0 left-0 top-16 z-40 w-[min(20rem,85vw)] overflow-y-auto border-r border-green-800/30 bg-gradient-to-b from-green-800 to-green-950 p-5 text-white shadow-2xl transition-transform duration-300 ease-out dark:border-white/10 dark:from-gray-950 dark:to-gray-900 md:top-0 md:w-56 md:translate-x-0 ${menuOpen ? "visible translate-x-0" : "invisible -translate-x-full"
                    } md:visible`}
            >
                <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-5 md:pt-5">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-200">
                            Restaurant POS
                        </p>
                        <p className="mt-1 text-xl font-extrabold">Navigation</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close navigation menu"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
                    >
                        ×
                    </button>
                </div>

                <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-green-200/75">
                    Explore
                </p>

                <ul className="space-y-1.5">
                    {links.map((label) => {
                        const isActive = activePage === label;

                        return (
                            <li key={label}>
                                <button
                                    type="button"
                                    onClick={() => navigateTo(label)}
                                    aria-current={isActive ? "location" : undefined}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold tracking-wide transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-200 ${isActive
                                            ? "bg-white text-green-900 shadow-lg shadow-green-950/20"
                                            : "text-green-50 hover:translate-x-1 hover:bg-white/10"
                                        }`}
                                >
                                    <span className="flex-1">{label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
