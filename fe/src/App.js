import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Login,
  Home,
  Public,
  Blogs,
  DetailProduct,
  FAQ,
  ProductCategory,
  Services,
  FinalRegister,
  ResetPassword
} from './pages/public'
import path from './utils/path'
import { getCategories,getBrands } from './store/app/asyncActions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal } from './components'
import {
  AdminLayout,
  CreateProduct,
  Dashboard,
  ManageOrder,
  ManageProduct,
  ManageUser
} from 'pages/admin'
import { MemberLayout, Personal } from 'pages/private'

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren } = useSelector((state) => state.app)
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getBrands())
  }, [dispatch])

  return (
    <div className="font-main relative">
      {isShowModal && <Modal> {modalChildren} </Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.PRODUCTS} element={<ProductCategory />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProduct />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>

        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  )
}

export default App
