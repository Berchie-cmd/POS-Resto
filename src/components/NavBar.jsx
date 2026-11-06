import { useState } from "react";

// Props received from App.jsx:
//   darkMode   -> true or false
//   toggleDark -> function that switches dark/light
//   activePage -> string representing the currently active page
//   onNavigate -> function to handle navigation
function Navbar({ darkMode, toggleDark, activePage, onNavigate }) {
    // INTERACTIVE FEATURE #1: opens/closes the menu on phones
    const [menuOpen, setMenuOpen] = useState(false);

    // Links in the navbar. Edit the names here.
    const links = ["FEATURES", "FOODS", "DRINKS", "DESERTS", "ORDER", "ABOUT", "USER"];

    return (
        <>
            {/* System name and dark mode stay in the top horizontal bar */}
            <header className="fixed inset-x-0 top-0 z-50 h-16 w-auto border-b border-amber-500/30 bg-amber-400 text-amber-950 shadow-md transition-colors duration-300 dark:border-white/10 dark:bg-gray-950 dark:text-white md:left-56">
                <div className="flex h-full justify-end items-center px-4">
                    <div className="flex items-center gap-2">
                        {/* Hamburger button: only visible on phones (md:hidden) */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={menuOpen}
                            className="text-2xl md:hidden"
                        >
                            ☰
                        </button>

                        {/* INTERACTIVE FEATURE #2: dark mode button */}
                        <button
                            onClick={toggleDark}
                            className="rounded-lg bg-white px-3 py-2 font-semibold text-amber-900 shadow-sm transition hover:bg-amber-50 dark:bg-amber-400 dark:text-gray-950 dark:hover:bg-amber-300"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>
                    </div>
                </div>
            </header>

            {/* Links appear vertically in the sidebar */}
            <nav
                aria-label="Main navigation"
                className={`${menuOpen ? "block" : "hidden"} fixed bottom-0 left-0 top-0 z-40 w-56 border-r border-amber-500/30 bg-amber-400 p-4 text-amber-950 shadow-md transition-colors duration-300 dark:border-white/10 dark:bg-gray-950 dark:text-white md:block`}
            >
                <ul className="flex flex-col gap-2">
                    <h1 className="flex justify-center text-2xl font-bold">POS Resto</h1>
                    {links.map((link) => (
                        <li key={link}>
                            <button
                                onClick={() => {
                                    const section = document.getElementById(link.toLowerCase());

                                    if (section) {
                                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                                        onNavigate(link);
                                    }

                                    setMenuOpen(false);
                                }}
                                className={`block w-full rounded-lg px-3 py-2 text-left font-medium transition-colors ${activePage === link
                                        ? "bg-amber-700 text-white dark:bg-amber-400 dark:text-gray-950"
                                        : "text-amber-950 hover:bg-amber-500/50 dark:text-gray-200 dark:hover:bg-white/10"
                                    }`}
                            >
                                {link}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
