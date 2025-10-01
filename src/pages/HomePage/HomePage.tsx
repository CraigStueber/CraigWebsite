import "./HomePage.styles.css";

import HomePageHeader from "./components/HomePageHeader/HomePageHeader";
import Footer from "./components/Footer/Footer";
import Divider from "./components/Divider/Divider";
import MainSection from "./components/MainSection/MainSection";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
function HomePage() {
  return (
    <div className="homePage">
      <HomePageHeader />
      <MainSection />
      <Divider color="yellow" />
      <About />
      <Divider color="yellow" />
      <Experience />
      <Divider color="yellow" />
      <Education />
      <Divider color="yellow" />
      <Skills />
      <Divider color="yellow" />
      <Footer />
    </div>
  );
}

export default HomePage;
