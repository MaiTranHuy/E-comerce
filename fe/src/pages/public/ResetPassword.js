import React, { useState } from 'react'
import Button from '../../components/common/Button'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'

const ResetPassword = () => {
  const [password, setPassword] = useState(null)
  const { token } = useParams()
  const navigate = useNavigate()

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token })
    if (!response.success) {
      toast.info(response.message, { theme: 'colored' })
    } else {
      navigate(`/${path.LOGIN}`)

      toast.info('Change password success!', { theme: 'colored' })
    }
  }
  return (
    <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center justify-center py-8 z-50">
      <div className="flex flex-col gap-4">
        <label htmlFor="email"> Enter New password</label>
        <input
          type="text"
          id="email"
          className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-end w-full gap-4">
          <Button
            style="px-4 py-2 rounded-md text-white my-2 bg-blue-500 text-semibold"
            name="Submit"
            handleOnclick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
