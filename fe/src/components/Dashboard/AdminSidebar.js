import React, { Fragment, useState, memo } from 'react'
import logo from '../../assets/logo.png'
import { adminSidebar } from 'utils/constants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from '../../utils/icons'
const activeStyle =
  'px-4 py-2 flex items-center gap-2 bg-blue-500'
const notActiveStyle =
  'px-4 py-2 flex items-center gap-2 hover:bg-blue-100'

const AdminSidebar = () => {
  const { AiOutlineCaretDown, AiOutlineCaretRight } = icons
  const [activeParentStyle, setActiveParentStyle] = useState([])

  const handleShowTabs = (tabId) => {
    if (activeParentStyle.some((el) => el === tabId))
      setActiveParentStyle((prev) => prev.filter((el) => el !== tabId))
    else setActiveParentStyle((prev) => [...prev, tabId])
  }

  return (
    <div className=" bg-white h-full py-4">
      <div className="flex flex-col justify-center p-4 items-center gap-2">
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <small>Admin Workspace</small>
      </div>
      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === 'SINGLE' && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activeStyle, !isActive && notActiveStyle)
                }
              >
                <span> {el.icon} </span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === 'PARENT' && (
              <div
                className="cursor-pointer"
                onClick={() => handleShowTabs(el.id)}
              >
                <div className="flex justify-between cursor-pointer items-center hover:bg-blue-100 gap-2 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span> {el.icon} </span>
                    <span>{el.text}</span>
                  </div>
                  {!activeParentStyle.some((id) => id === el.id) ? (
                    <AiOutlineCaretDown />
                  ) : (
                    <AiOutlineCaretRight />
                  )}
                </div>
                {activeParentStyle.some((id) => id === el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu.map((item) => (
                      <NavLink
                        to={item.path}
                        key={item.text}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activeStyle,
                            !isActive && notActiveStyle,
                            'pl-6'
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(AdminSidebar)
