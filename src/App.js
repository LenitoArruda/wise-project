import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Pages
import Company from './component/pages/Company';
import Contact from './component/pages/Contact';
import Home from './component/pages/Home';
import Projects from './component/pages/Projects';
import NewProject from './component/pages/NewProject';
import Project from './component/pages/Project';

// Layouts
import Container from './component/layouts/Container';
import Navbar from './component/layouts/Navbar';
import Footer from './component/layouts/Footer';



function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/company' element={<Company />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
          <Route path='/project/:id' element={<Project />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
