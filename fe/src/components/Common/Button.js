import React, { memo } from 'react'

const Button = ({ name, handleOnclick, style, iconBefore, iconAfter, fw,type = 'button' }) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white my-2 bg-main text-semibold ${
              fw ? 'w-full' : 'w-fit'
            }`
      }
      onClick={() => {
        handleOnclick && handleOnclick()
      }}
    >
      {iconBefore}

      <span>{name}</span>
      {iconAfter}
    </button>
  )
}

export default memo(Button)
