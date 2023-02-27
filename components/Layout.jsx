import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
    <div className='bodylayout'>
        <Header />
        {children}
    </div>
    </>
  )
}

export default Layout
