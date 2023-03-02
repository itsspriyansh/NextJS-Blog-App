import React, { useEffect, useState } from 'react'
import { getCategories } from '@/services'
import Link from 'next/link'

const Categories = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
    .then(result => setCategories(prev => result))
  }, [])

  return (
    <div className="card shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 card-border">
        Categories
      </h3>
      {
        categories.map((category, index) => (
          <Link key={index} href={`/category/${category.slug}`}>
            <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>
              <p className='hover-underline-animation'>{category.name}</p>
            </span>
          </Link>
        ))
      }
    </div>
  )
}

export default Categories