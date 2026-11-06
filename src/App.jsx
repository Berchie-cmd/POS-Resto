import { useState } from "react";
import Navbar from "./components/NavBar"; // file is named NavBar.jsx
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";
import { features } from "./data/homeData";

function App() {
  // Dark mode state. It lives here so we can pass it to the Navbar.
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("MENU");

  return (
    // When darkMode is true, we add the class "dark" so the dark: styles work
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white pt-16 text-gray-800 dark:bg-gray-900 dark:text-gray-100 md:ml-56">
        {/* Pass the state and the switch function to the Navbar as props */}
        <Navbar
          darkMode={darkMode}
          toggleDark={() => setDarkMode(!darkMode)}
          activePage={activePage}
          onNavigate={setActivePage}
        />

        {/* Hero with its text passed as props */}
        <Hero
          title="Fast and Easy Restaurant Ordering"
          subtitle="Manage orders, payments, and menu in one simple system."
          buttonText="See More"
        />

        {/* Features section */}
        <section id="features" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>

          {/* 1 column on phone, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* One FeatureCard for each item in the features list */}
            {features.map((item) => (
              <FeatureCard
                key={item.title}
                image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;