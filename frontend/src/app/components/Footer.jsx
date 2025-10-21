import Image from "next/image"
export default function Footer() {
  return (
    <footer>
      <ul className='row text-center p-4'>
        <li className='col'>
          <a href='https://github.com/andrewBrownConsulting'>
            <Image src={'/github.png'}
              width={100}
              height={100}
              alt="github logo"
            />
          </a>
        </li>
        <li className='col'>
          <a href='https://www.linkedin.com/in/andrew-brown-b50592183/'>
            <Image
              src='/linkedin.png' alt='LinkedIn'
              width={100}
              height={100}
            />
          </a>
        </li>
      </ul>
    </footer>
  )
}
