import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Login,
  Home,
  Public,
  Blogs,
  DetailProduct,
  FAQ,
  Products,
  Services
} from './pages/public'
import path from './utils/path'
import { getCategories } from './store/app/asyncActions'
import { useDispatch } from 'react-redux'
import VerifyAccount from './pages/public/VerifyAccount'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div className="min-h-screen overflow-y-auto font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.VERIFY_ACCOUNT} element={<VerifyAccount />} />
          <Route
            path={path.DETAIL_PRODUCT__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
