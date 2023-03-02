import { getComments } from '@/services'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const Comments = ({ slug }) => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then (result => {
      setComments(prev => result)
    })
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="card shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4 card-border">
            {comments.length}
            {' '}
            Comments
          </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-b card-border mb-4 pb-4">
                <p className="whitespace-pre-line text-box w-full">{comment.comment}</p>
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default Comments
