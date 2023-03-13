import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCategories } from '@/services'

const Header = () => {

  const [categories, setCategories] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  
  const toggleDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark")
  }

  const toggleLigthMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light")
  }

  const toggleThemeSwitch = () => {
    setDarkMode(prev => !prev)
    darkMode ? toggleLigthMode() : toggleDarkMode()
    document.getElementById("theme-button").innerText = darkMode ? "Dark Mode" : "Light Mode"
  }

  useEffect(() => {
    getCategories()
    .then(result => setCategories(prev => result))
  }, [])
  
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block head-border py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Transcribe</span>
          </Link>
          <button onClick={toggleThemeSwitch} id="theme-button" className='mx-3 px-5 py-2 text-white rounded-full'>Dark Mode</button>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                    {category.name}
                </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
