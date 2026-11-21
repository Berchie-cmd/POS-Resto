// Props: title, subtitle, buttonText
// Because it uses props, you can reuse this component with different text.
function Hero({ title, subtitle, buttonText }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-linear-to-br from-green-100 via-emerald-50 to-white px-6 py-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 sm:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-emerald-300/35 blur-3xl dark:bg-emerald-500/10" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-green-300/40 blur-3xl dark:bg-green-600/10" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm dark:border-green-900 dark:bg-gray-800/80 dark:text-green-200">
            <span aria-hidden="true">✦</span>
            Fresh ingredients, made with care
          </div>

          <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-800/25 transition hover:-translate-y-0.5 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              {buttonText}
              <span aria-hidden="true">→</span>
            </a>

            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Good food. Easy ordering.
            </span>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          {/* Soft green glow behind the logo */}
          <div className="absolute inset-8 rounded-full bg-green-300/40 blur-3xl dark:bg-green-500/20" />

          {/* Decorative rings around the logo */}
          <div className="absolute h-[85%] w-[85%] rounded-full border border-green-700/15 dark:border-green-300/15" />
          <div className="absolute h-[72%] w-[72%] rounded-full border border-dashed border-green-700/25 dark:border-green-300/25" />

          {/* Framed restaurant logo */}
          <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full bg-white p-2 shadow-2xl shadow-green-950/20 ring-1 ring-green-900/10 dark:bg-gray-800 dark:ring-white/10">
            <img
              src="/restaurant-logo.jpg"
              alt="RD's Fudhaws restaurant logo"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          {/* Floating restaurant highlight */}
          <div className="absolute right-0 top-[18%] rounded-2xl border border-green-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-800/95">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Freshly made
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              With care, every day
            </p>
          </div>

          <div className="absolute bottom-[16%] left-0 rounded-2xl border border-green-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-800/95">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              RD&apos;s Fudhaws
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Good food, good mood
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;