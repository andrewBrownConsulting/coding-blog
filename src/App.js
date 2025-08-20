import './App.css';
import HomePage from './Components/HomePage';
import AboutMe from './Components/AboutMe';
import Contact from './Components/Contact';
import BlogPage from './Components/BlogPage';
import { Link, Route, Routes } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';

function App() {
  return (
    <div className='container'>
      <nav className='container'>
        <ul className='row text-center p-4'>
          <li className='col'><Link className='link' to='/'><img className='img-fluid' src='/logoWhite.svg' alt='Site Logo' /></Link></li>
          <li className='col'><Link className='link' to='/'>Home</Link></li>
          <li className='col'><Link className='link' to='/about'>About Me</Link></li>
          <li className='col'><Link className='link' to='/contact'>Contact</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutMe />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blog' element={<BlogPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
