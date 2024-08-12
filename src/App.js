// import logo from './logo.svg';
import './App.css';
import { Banner } from './component/Banner';
import { Contact } from './component/Contact';
import { NavBar } from './component/Navbar';
import { Projects } from './component/Project';
import { Skills } from './component/Skills';
import { Footer } from './component/Footer';
function App() {
  return (
    <div className="app">
     <NavBar/>
     <Banner/>
     <Skills/>
     <Projects/>
     <Contact/>
     <Footer/> 
    </div>
  );
}

export default App;
