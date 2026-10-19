import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const captainLogin = () => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});
  
  
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        email: email,
        password: password
      })
  
      console.log(captainData);
  
      setEmail('');
      setPassword('');
  
    }
  
  
  return (
   <div className='h-screen'>
      <img className='w-20  ml-7 mt-9' src='https://tse4.mm.bing.net/th/id/OIP.PUwImL9UnA9PqIhros6OUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' alt='image Loading ...' />

      <form className='p-9 ' onSubmit={submitHandler}>
        <div className='flex flex-col gap-4 mb-5'>
          <label className='text-xl font-medium'>what is your email?</label>
          <input className='border rounded-md p-3 text-lg'
            required type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder='example@gmail.com' />
        </div>

        <div className='flex flex-col gap-4'>
          <label className='text-xl font-medium'>password</label>
          <input className='border rounded-md p-3  text-lg'
            type='password' placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }} />
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-black font-semibold border mt-8 w-full py-3 text-2xl text-white rounded-lg active:scale-95">
            Login
          </button>
        </div>

      </form >
      <p className="text-center mt text-lg">
        New here?
        <Link to="/Captain-Signup" className="text-blue-700 font-semibold hover:underline active:scale-90">
          Create an account
        </Link>
      </p>

      <div className='flex justify-center gap-9 border m-9 items-center p-2 rounded-lg bg-amber-600 font-medium text-lg'>
        <Link to={'/login'}>signup as a user</Link>
      </div>
    </div>
  )
}

export default captainLogin
