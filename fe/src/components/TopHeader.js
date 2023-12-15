import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { getCurrent } from '../store/user/asyncAction'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineLogout } from 'react-icons/ai'
import { logout } from '../store/user/userSlice'

const TopHeader = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, current } = useSelector((state) => state.user)
  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent())
  }, [dispatch, isLoggedIn])

  return (
    <div className="w-full h-[38px] bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <div>
          ORDER ONLINE OR CALL US{' '}
          <span className="text-yellow-500">(+1800) 000 8808</span>
        </div>
        {isLoggedIn ? (
          <div className="flex gap-2 text-sm items-center">
            <span>
              Welcome {current?.lastName} {current?.FirstName}
            </span>
            <span
              onClick={() => dispatch(logout())}
              className="hover:rounded-full hover:bg-gray-200 hover:text-main p-2 cursor-pointer"
            >
              {' '}
              <AiOutlineLogout size={18} />{' '}
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="mr-4">
              <Link to={`/${path.LOGIN}`} className="text-white">
                Sign In
              </Link>
            </div>
            <div>
              <a href="/" className="text-white">
                Create Account
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(TopHeader)
