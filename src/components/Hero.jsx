// Props: title, subtitle, buttonText
// Because it uses props, you can reuse this component with different text.
function Hero({ title, subtitle, buttonText }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-white px-6 py-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 sm:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-500/10" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-800 shadow-sm dark:border-orange-900 dark:bg-gray-800/80 dark:text-orange-200">
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
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-600/25 transition hover:-translate-y-0.5 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
          <div className="absolute inset-6 rounded-full bg-orange-200/70 blur-2xl dark:bg-orange-500/10" />
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[12px] border-white bg-gradient-to-br from-orange-100 to-amber-200 text-8xl shadow-2xl shadow-orange-900/10 dark:border-gray-700 dark:from-gray-800 dark:to-gray-700 sm:h-80 sm:w-80 sm:text-9xl">
            <span role="img" aria-label="A delicious meal">
              🍽️
            </span>
          </div>

          <div className="absolute right-0 top-12 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-800/90">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Made fresh
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Every single day
            </p>
          </div>

          <div className="absolute bottom-10 left-0 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-800/90">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              🍊 Delicious choices
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Find your new favorite
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;