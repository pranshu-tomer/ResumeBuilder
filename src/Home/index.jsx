import Header from '../components/custom/Header'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'


function Home() {

  const { isSignedIn } = useUser();
  return (
    <div
      style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url('./background.jpg')`,backgroundSize: 'cover'}}
      className='h-screen'
    >
      <Header/>
      <div className="py-[12%] text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Build Your Resume <span className='text-[#9f5bff]'>With AI</span> </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Effortlessly Craft a Standout Resume with Our AI-Powered Builder</p>
        {isSignedIn ?
          <Link to={'/dashboard'}>
            <button className='border p-2 bg-[#9f5bff] text-white rounded-lg'>DashBoard</button>
          </Link>
          :
          <Link to={'/sign-in'}>
            <button className='border p-2 bg-[#9f5bff] text-white rounded-lg'>Get Started</button>
          </Link>
        }
      </div>
    </div>
  )
}

export default Home