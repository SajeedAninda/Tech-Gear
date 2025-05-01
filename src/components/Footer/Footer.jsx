import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-[#111111] text-white py-10'>
      <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-6 gap-10 items-start'>
        {/* Newsletter */}
        <div className='col-span-2'>
          <h3 className='text-lg font-semibold mb-4 '>
            Subscribe to Newsletter

          </h3>
          <input
            type='email'
            placeholder='Enter your email address'
            className='w-full bg-white p-3 rounded-md text-black placeholder-gray-600'
          />
        </div>

        {/* Company */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Company</h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li>About</li>
            <li>Contact</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Support</h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li>Shipping</li>
            <li>Returns</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Social</h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className='flex gap-4 text-xl mt-6'>
          <FaFacebookF className='hover:text-gray-400 cursor-pointer' />
          <FaTwitter className='hover:text-gray-400 cursor-pointer' />
          <FaInstagram className='hover:text-gray-400 cursor-pointer' />
        </div>
      </div>
    </footer>
  )
}

export default Footer
