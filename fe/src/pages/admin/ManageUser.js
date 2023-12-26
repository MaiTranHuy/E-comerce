import { apiDeleteUserByAdmin, apiGetUsers, apiUpdateUserByAdmin } from 'apis'
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { InputField, Pagination, InputForm, Select, Button } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
    isBlocked: ''
  })
  const [users, setUsers] = useState(null)
  const [editElement, setEditElement] = useState(null)
  const [update, setUpdate] = useState(false)
  const [queries, setQueries] = useState({
    search: ''
  })
  const [params] = useSearchParams()
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT
    })
    if (response.success) setUsers(response.data.data)
  }

  const queriesDebounce = useDebounce(queries.search, 800)
  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) queries.search = queriesDebounce
    fetchUsers(queries)
  }, [queriesDebounce, params, update])

  const render = useCallback(async () => {
    setUpdate(!update)
  })

  const handleUpdate = async (data) => {
    const response = await apiUpdateUserByAdmin(data, editElement._id)
    if (response.success) {
      setEditElement(null)
      render()
      toast.success(response.message)
    } else toast.error(response.message)
  }

  const handleDelete =  (uid) => {
    Swal.fire({
      title:'Are you sure you want to delete?',
      text:'Are you ready to remove user',
      showCancelButton:true
    }).then(async (res) => {
      if(res.isConfirmed) {
        const response = await apiDeleteUserByAdmin(uid)
        if (response.success) {
          render()
          toast.success(response.message)
        } else toast.error(response.message)
      }
    } )
   
  }

  return (
    <div className="w-full pl-8">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Manage User</span>
      </h1>
      <div className="w-full  py-4">
        <div className="flex justify-end py-4">
          <InputField
            value={queries.search}
            setValue={setQueries}
            nameKey={'search'}
            style="w500"
            placeholder="Search name or email..."
            isHideLabel
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editElement && <Button type="submit" name="Update"></Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-700 text-[13px]  text-white">
              <tr className="border border-gray-500">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.user?.map((el, idx) => (
                <tr key={el._id} className="border border-gray-500">
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">
                    {editElement?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={'email'}
                        fullWidth
                        validate={{
                          required: 'Require fill',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'invalid email address'
                          }
                        }}
                        defaultValue={editElement?.email}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={'firstName'}
                        fullWidth
                        validate={{ required: 'Require fill' }}
                        defaultValue={editElement?.firstName}
                      />
                    ) : (
                      <span>{el.firstName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={'lastName'}
                        fullWidth
                        validate={{ required: 'Require fill' }}
                        defaultValue={editElement?.lastName}
                      />
                    ) : (
                      <span>{el.lastName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={'phoneNumber'}
                        fullWidth
                        validate={{
                          required: 'Require fill',
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: 'invalid phone number'
                          }
                        }}
                        defaultValue={editElement?.phoneNumber}
                      />
                    ) : (
                      <span>{el.phoneNumber}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === el._id ? (
                      <Select />
                    ) : (
                      <span>{el.role}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === el._id ? (
                      <Select />
                    ) : (
                      <span>{!el.isBlocked ? 'Active' : 'Block'}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {' '}
                    {moment(el.createdAt).format('DD/MM/YYYY')}
                  </td>
                  <td className="py-2 px-4 ">
                    {editElement?._id === el._id ? (
                      <span
                        onClick={() => setEditElement(null)}
                        className="px-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Back
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditElement(el)}
                        className="px-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                    )}
                    <span
                    onClick={() => handleDelete(el._id)}
                    className="px-2 text-orange-600 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      <div className="w-full text-right">
        <Pagination totalCount={users?.counts} />
      </div>
    </div>
  )
}

export default ManageUser
