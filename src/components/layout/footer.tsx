import Link from 'next/link'

export function Footer() {
  return (
    <footer className='bg-black text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>Fernando Govea</h3>
            <p className='text-gray-400'>Custom tattoo artistry with precision and passion</p>
          </div>

          <div>
            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/gallery' className='text-gray-400 hover:text-white'>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-gray-400 hover:text-white'>
                  About
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-gray-400 hover:text-white'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='/book' className='text-gray-400 hover:text-white'>
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-xl font-bold mb-4'>Contact</h3>
            <address className='not-italic text-gray-400'>
              <p>Dallas/Fort Worth Metroplex, Texas</p>
              <p className='mt-2'>fennyg83@gmail.com</p>
            </address>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-500'>
          <p>© {new Date().getFullYear()} Fernando Govea Tattoo Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
