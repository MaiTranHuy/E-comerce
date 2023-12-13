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
    <div className="w-full relative">
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
        className="px-4 py-2 rounded-sm border w-full my-2 outline-none placeholder:text-sm placeholder:italic"
        placeholder={nameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  )
}

export default InputField
