import React from 'react';

const MovieList2 = ({ movies, title, handleBookNow2 }) => (
  <div>
    <div className='text-slate-300 text-5xl text-start '>{title}</div>
    <div className='overflow-x-scroll scrollbar-hide p-6 flex space-x-20'>
      {movies.map((movie2) => (
        <div key={movie2.id} className='transition-all delay-100 hover:scale-110 ease-in-out shadow-lg rounded-sm text-center text-slate-50 bg-[#202020]'>
          <div className='h-72 w-56 bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${movie2.m1})` }}></div>
          <div className='text-lg transition-all delay-100 hover:scale-110 ease-in-out p-2'>
            <p className='text-wrap transition-all delay-100 hover:scale-110 ease-in-out'>{movie2.t2}</p>
            <p className='transition-all delay-100 hover:scale-110 ease-in-out'>{movie2.genre1}</p>
            <p className='transition-all delay-100 hover:scale-110 ease-in-out'>Language-{movie2.language}</p>
            <div className='bg-red-700 rounded-md'>
              <button className='text-neutral-50 transition-all hover:scale-110 ease-out' onClick={handleBookNow2}>Book Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MovieList2;
