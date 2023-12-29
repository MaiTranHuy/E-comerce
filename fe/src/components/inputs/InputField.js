import React, { memo } from 'react'
import clsx from 'clsx'
const InputField = ({
  value,
  setValue,
  nameKey,
  type = 'text',
  invalidFields,
  setInvalidField,
  style,
  fullWidth,
  placeholder,
  isHideLabel
}) => {
  return (
    <div className={clsx('flex flex-col relative mb-2', fullWidth && 'w-full')}>
      {!isHideLabel && value?.trim() !== '' && (
        <label
          className="absolute top-0 left-[12px] text-[10px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey}
        </label>
      )}
      <input
        type={type}
        className={clsx(
          'px-4 py-2 rounded-sm border w-full mt-2 outline-none placeholder:text-sm placeholder:italic placeholder:outline-none',
          style
        )}
        placeholder={placeholder||nameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main text-[10px] italic">
          {invalidFields?.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  )
}

export default memo(InputField)
