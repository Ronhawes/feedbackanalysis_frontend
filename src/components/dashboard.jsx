import Navbar from "./Navbar";
import Hero from "./Hero";
import Analytics from "./Analytics";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Footer from "./Footer";

function dashboard() {
    return (
      <div>
        <Navbar />
        <Hero />
        <Analytics />
        <Newsletter />
        <Cards />
        <Footer />
      </div>
    );
  }
  
export default dashboard;
  