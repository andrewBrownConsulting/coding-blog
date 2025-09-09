import Link from "next/link";
export default function NavBar() {
    return (
        <nav className='container m-0'>
            <ul className='row text-center p-4'>
                <li className='col'><Link className='link' href='/'><img className='img-fluid' src='/images/logoWhite.png' alt='Site Logo' /></Link></li>
                <li className='col'><Link className='link' href='/'>Home</Link></li>
                <li className='col'><Link className='link' href='/about'>About Me</Link></li>
                <li className='col'><Link className='link' href='/contact'>Contact</Link></li>
                <li className='col'><Link className='link' href='/all-posts'>All Posts</Link></li>
            </ul>
        </nav>
    )
}