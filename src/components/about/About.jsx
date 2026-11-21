function About({ onBack }) {
  return (
    <section
      id="about"
      className="min-h-[calc(100vh-4rem)] px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
          About us
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to RD&apos;s Fudhaws
        </h2>
        <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300">
          RD&apos;s Fudhaws is a point-of-sale system for browsing the menu,
          taking orders, selecting payment methods, and producing a receipt.
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          RD&apos;s Fudhaws - A Point of Sale System for Small Restaurants
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-8 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
        >
          Back to menu
        </button>
      </div>
    </section>
  );
}

export default About;