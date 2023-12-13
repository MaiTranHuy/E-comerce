import React from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const TopHeader = () => {
  return (
    <div className="w-full h-[38px] bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <div>
          ORDER ONLINE OR CALL US{' '}
          <span className="text-yellow-500">(+1800) 000 8808</span>
        </div>
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
      </div>
    </div>
  )
}

export default TopHeader
