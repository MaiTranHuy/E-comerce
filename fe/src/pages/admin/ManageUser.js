import { apiGetUsers } from 'apis'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { InputField, Pagination } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'


const ManageUser = () => {
  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    search: ''
  })
  const [params] = useSearchParams()
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({...params,limit: process.env.REACT_APP_PRODUCT_LIMIT})
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
  }, [queriesDebounce,params])

  return (
    <div className="w-full">
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
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold bg-gray-700 text-[13px]  text-white">
            <tr className="border border-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
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
                <td className="py-2 px-4">{el.email}</td>
                <td className="py-2 px-4">
                  {el.lastName} {el.firstName}{' '}
                </td>
                <td className="py-2 px-4">{el.phoneNumber}</td>
                <td className="py-2 px-4">{el.role}</td>
                <td className="py-2 px-4">
                  {el.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="py-2 px-4">
                  {moment(el.createdAt).format('DD/MM/YYYY')}
                </td>
                <td className="py-2 px-4 ">
                  <span className="px-2 text-orange-600 hover:underline cursor-pointer">
                    Edit
                  </span>
                  <span className="px-2 text-orange-600 hover:underline cursor-pointer">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='w-full text-right'>
        <Pagination
        totalCount={users?.counts}
        />
      </div>
    </div>
  )
}

export default ManageUser
