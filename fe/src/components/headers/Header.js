import React, { Fragment, memo } from 'react'
import logo from '../../assets/logo.png'
import icons from '../../utils/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import path from '../../utils/path'
import { jwtDecode } from 'jwt-decode'
const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons

  const { token } = useSelector((state) => state.user)
  const decodedToken = typeof token === 'string' ? jwtDecode(token) : null
  const userRole = decodedToken?.role

  return (
    <div className="flex justify-between w-main h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-3 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+84) 984943638</span>
          </span>
          <span>Mon-Fri 8:00AM - 6:00PM</span>
        </div>
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-3 items-center">
            <MdEmail color="red" />
            <span className="font-semibold">SUPPORT@huymt.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {token && (
          <Fragment>
            <div className="flex items-center justify-center px-6 border-r gap-2">
              <BsHandbagFill color="red" />
              <span>0 item(s)</span>
            </div>
            <Link
              to={
                userRole === 'admin'
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
              className="flex justify-center items-center px-6"
            >
              <FaUserCircle size={24} />
              <span>Profile</span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default memo(Header)
