import './App.css';
import HomePage from './Components/HomePage';
import AboutMe from './Components/AboutMe';
import Contact from './Components/Contact';
import BlogPage from './Components/BlogPage';
import { Link, Route, Routes } from 'react-router'
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllPosts from './AllPosts';
function App() {
  return (
    <div className='container'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutMe />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/all-posts' element={<AllPosts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
