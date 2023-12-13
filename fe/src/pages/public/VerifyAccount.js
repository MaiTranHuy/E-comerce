import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiVerify } from '../../apis/user'

const VerifyAccount = () => {
  const { userVerifyResetToken } = useParams()
  const [verificationStatus, setVerificationStatus] = useState(null)

  useEffect(() => {
    const verifyAccount = async () => {
      const response = await apiVerify(userVerifyResetToken)
      if (response.success) {
        setVerificationStatus('success')
      } else {
        setVerificationStatus('error')
      }
    }
    verifyAccount()
  }, [userVerifyResetToken])

  return (
    <div>
      {verificationStatus === 'success' ? (
        <div>Chúc mừng bạn! Tài khoản của bạn đã được xác minh thành công.</div>
      ) : (
        <div>
          Có lỗi xảy ra khi xác minh tài khoản. Vui lòng thử lại hoặc liên hệ hỗ
          trợ.
        </div>
      )}
    </div>
  )
}

export default VerifyAccount
