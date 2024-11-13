import React from 'react';

const Login = ({ userName, password, togglePass, toggleNavigate, setTogglePass, setToggleNavigate, getUserName, getPassword, button, email, getEmail }) => (
  <section className="bg-cover bg-center bg-[url('https://img.freepik.com/free-photo/assortment-cinema-elements-red-background-with-copy-space_23-2148457848.jpg')] h-dvh">
    <div className='flex backdrop-blur-sm items-center h-full'>
      <div className='flex m-[15%] bg-[#f0f0f0] rounded-md flex-col items-center space-y-8 border px-16 py-12'>
        <p className='text-5xl font-semibold'>{toggleNavigate ? 'Log In' : 'Sign Up'}</p>
        <input type='text' placeholder='Username' className='px-6 p-2 focus:outline-none w-96' onChange={(e) => getUserName(e.target.value)} value={userName} />
        {!toggleNavigate && <input type='email' placeholder='Email' className='px-6 p-2 focus:outline-none w-96' onChange={(e) => getEmail(e.target.value)} value={email} />}
        <div>
          <input type={togglePass ? 'text' : 'password'} placeholder='Password' className='px-6 p-2 focus:outline-none w-96' onChange={(e) => getPassword(e.target.value)} value={password} />
          <p className='pl-6 pt-2 cursor-pointer' onClick={() => setTogglePass((prev) => !prev)}>{togglePass ? 'Hide Password' : 'Show Password'}</p>
        </div>
        <div className='w-full flex flex-col'>
          <input type='submit' value={toggleNavigate ? 'Login' : 'Signup'} onClick={button} className='bg-red-500 rounded-md text-white border px-8 p-2 transition-all delay-200 ease-in hover:bg-red-700' />
          <p className='self-end p-2 transition-all delay-300 hover:text-red-600 cursor-pointer ease-in' onClick={() => setToggleNavigate((prev) => !prev)}>{toggleNavigate ? 'Click Here To Register !' : 'Already a User ?'}</p>
        </div>
      </div>
    </div>
  </section>
);

export default Login;
