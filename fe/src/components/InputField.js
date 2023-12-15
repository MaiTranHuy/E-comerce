import React from 'react'

const InputField = ({
  value,
  setValue,
  nameKey,
  type = 'text',
  invalidFields,
  setInvalidField
}) => {
  return (
    <div className="w-full flex flex-col relative mb-2">
      {value.trim() !== '' && (
        <label
          className="absolute top-0 left-[12px] text-[10px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey}
        </label>
      )}
      <input
        type={type}
        className="px-4 py-2 rounded-sm border w-full mt-2 outline-none placeholder:text-sm placeholder:italic outline-none"
        placeholder={nameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
      {invalidFields?.some(el => el.name === nameKey) && (
        <small className="text-main text-[10px] italic">
          {invalidFields?.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  )
}

export default InputField
