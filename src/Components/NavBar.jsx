import { Link } from "react-router"
export default function NavBar() {
    return (
        <nav className='container m-0'>
            <ul className='row text-center p-4'>
                <li className='col'><Link className='link' to='/'><img className='img-fluid' src='/logoWhite.svg' alt='Site Logo' /></Link></li>
                <li className='col'><Link className='link' to='/'>Home</Link></li>
                <li className='col'><Link className='link' to='/about'>About Me</Link></li>
                <li className='col'><Link className='link' to='/contact'>Contact</Link></li>
                <li className='col'><Link className='link' to='/all-posts'>All Posts</Link></li>
            </ul>
        </nav>
    )
}