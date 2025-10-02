import "./HomePage.styles.css";

import HomePageHeader from "./components/HomePageHeader/HomePageHeader";
import Footer from "./components/Footer/Footer";
import Divider from "./components/Divider/Divider";
import MainSection from "./components/MainSection/MainSection";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Blog from "./components/Blog/Blog";
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
      <Projects />
      <Divider color="yellow" />
      <Blog />
      <Footer />
    </div>
  );
}

export default HomePage;
