import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className=" mx-20 flex flex-col md:flex-row justify-between">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Liên Hệ</h3>
          <p>Địa chỉ của bạn</p>
          <p>Email: contact@example.com</p>
          <p>Điện thoại: 0123 456 789</p>
        </div>
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Danh Mục</h3>
          <ul>
            <li>
              <a href="/">Điện thoại</a>
            </li>
            <li>
              <a href="/">Tablet</a>
            </li>
            <li>
              <a href="/">Phụ kiện</a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Theo dõi chúng tôi</h3>
          <div className="flex space-x-4">
            <a href="/">
              <FaFacebook size={24} />
            </a>
            <a href="/">
              <FaTwitter size={24} />
            </a>
            <a href="/">
              <FaInstagram size={24} />
            </a>
            <a href="/">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Nhận tin tức</h3>
          <p>
            Đăng ký để nhận tin tức mới nhất và các chương trình khuyến mãi.
          </p>
          <form className="mt-4 flex items-center">
  <input
    type="email"
    placeholder="Nhập email của bạn"
    className="border p-2 flex-grow mr-2"
  />
  <button
    type="submit"
    className="bg-white text-gray-800 rounded px-4 py-2"
  >
    Đăng ký
  </button>
</form>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2023 Tên Công Ty. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
