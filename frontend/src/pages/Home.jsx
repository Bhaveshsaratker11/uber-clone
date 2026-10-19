import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className=' bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)] h-screen w-full flex  flex-col justify-between bg-red-300 '>
       <img className='w-22 ml-7 mt-9' src='https://www.pngplay.com/wp-content/uploads/8/Uber-Transparent-Background.png' alt='image Loading ...' />
        <div className='bg-white flex items-center flex-col py-7 px-5 '>
            <h2 className='text-3xl font-bold  '>Get started with Uber</h2>
          <Link to={'/login'} className='flex items-center justify-center bg-black text-white text-2xl w-full rounded-lg py-3 my-6' >continue</Link>
        </div>

      </div>
    </div>
  )
}

export default Home
