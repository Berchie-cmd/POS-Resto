function LoginForm({ onLogin }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onLogin(formData.get("role"));
  }

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-[#fffaf4] px-5 py-12 text-gray-900 dark:bg-gray-950 dark:text-gray-100"
    >
      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl dark:bg-orange-950">
            🍽️
          </div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Staff portal
          </p>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in to continue to the restaurant POS.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-semibold">
              Account type
            </label>
            <select
              id="role"
              name="role"
              required
              defaultValue=""
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-900"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="employee">Employee</option>
              <option value="owner">Owner</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              placeholder="you@restaurant.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-600 px-5 py-3 font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;