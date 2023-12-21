import React, { memo, useCallback, useState } from 'react'
import { productInfoTabs } from '../../utils/constants'
import { VoteBar, Button, VoteOption, Comment } from '../../components'
import { renderStars } from '../../utils/helpers'
import { apiRatings } from '../../apis'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../store/app/appSlice'
import Swal from 'sweetalert2'
import path from '../../utils/path'
import { useNavigate } from 'react-router-dom'

const ProductInformation = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender
}) => {
  const [activeTab, setActiveTab] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector((state) => state.user)
  const handleSubmitVote = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert('Please vote when click submit')
      return
    }
    await apiRatings({ star: score, comment, pid })
    dispatch(showModal({ isShowModal: false, modalChildren: null }))
    rerender()
  }

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: 'Login to vote',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Go login',
        title: 'Oops',
        showCancelButton: true
      }).then((res) => {
        if (res.isConfirmed) {
          navigate(`/${path.LOGIN}`)
        }
      })
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVote={handleSubmitVote}
            />
          )
        })
      )
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            className={`p-2 px-4 cursor-pointer ${
              activeTab === el.id ? 'bg-white border border-b-0' : 'bg-gray-200'
            } `}
            key={el.id}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">
        {productInfoTabs.some((el) => el.id === activeTab) &&
          productInfoTabs.find((el) => el.id === activeTab)?.content}
      </div>

      <div className="flex flex-col w-main py-8">
        <div className="flex border">
          <div className="flex-4 flex-col  flex items-center justify-center ">
            <span className="font-semibold text-3xl"> {totalRatings}/5 </span>
            <span className="flex items-center gap-1">
              {renderStars(ratings?.length, 20)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}{' '}
            </span>
            <span className="text-sm"> {ratings?.length} review </span>
          </div>
          <div className="flex-6  flex flex-col gap-2 p-4 ">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <VoteBar
                  key={el}
                  number={el + 1}
                  ratingTotal={ratings?.length}
                  ratingCount={
                    ratings?.filter((i) => i.star === el + 1)?.length
                  }
                />
              ))}
          </div>
        </div>
        <div className="p-4 flex items-center justify-center text-sm flex-col gap-2">
          <span>Do you want to review</span>
          <Button name="Vote now" handleOnclick={handleVoteNow}></Button>
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((el) => (
            <Comment
              key={el._id}
              star={el.star}
              name={el?.postedBy?.firstName + ' ' + el?.postedBy?.lastName}
              updatedAt={el.updatedAt}
              comment={el.comment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ProductInformation)
