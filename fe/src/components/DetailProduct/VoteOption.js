import React, { memo, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { voteOptions } from '../../utils/constants'
import { AiFillStar } from 'react-icons/ai'
import { Button } from '../../components'

const VoteOption = ({ nameProduct, handleSubmitVote }) => {
  const [markScore, setMarkScore] = useState(null)
  const [comment, setComment] = useState('')
  const [score, setScore] = useState(null)
  const modalRef = useRef()

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [])
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px] p-4 flex flex-col gap-4 justify-center items-center"
    >
      <img src={logo} alt="logo" className="w-[300px] my-8 object-contain" />
      <h2 className="text-center text-medium text-lg">
        {' '}
        Voting product {nameProduct}{' '}
      </h2>
      <textarea
        placeholder="Type something"
        className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p>How do you like this product?</p>
        <div className="flex items-center justify-center gap-4">
          {voteOptions.map((el) => (
            <div
              className="w-[100px] bg-gray-200  cursor-pointer rounded-md p-4 flex items-center justify-center flex-col gap-2"
              key={el.id}
              onClick={() => {
                setMarkScore(el.id)
                setScore(el.id)
              }}
            >
              {Number(markScore) && markScore >= el.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}
              <span> {el.text} </span>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleOnclick={() => handleSubmitVote({ comment, score })}
        fw
        name="Submit"
      ></Button>
    </div>
  )
}

export default memo(VoteOption)
