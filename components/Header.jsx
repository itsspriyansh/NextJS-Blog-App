import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCategories } from '@/services'

const Header = () => {

  const [categories, setCategories] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    getCategories()
    .then(result => setCategories(prev => result))
  }, [])

  const toggleDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark")
  }

  const toggleLigthMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light")
  }

  const toggleThemeSwitch = () => {
    if (!darkMode) {
      toggleDarkMode()
      setDarkMode(prev => !prev)
    } else {
      toggleLigthMode()
      setDarkMode(prev => !prev)
    }
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Transcribe</span>
          </Link>
          <button onClick={toggleThemeSwitch}>Dark Mode</button>
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
