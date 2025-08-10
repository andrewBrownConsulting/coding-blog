import './App.css';
import HomePage from './HomePage';
import AboutMe from './AboutMe';
import Contact from './Contact';
import BlogPage from './BlogPage';
import { Link, Route, Routes } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
