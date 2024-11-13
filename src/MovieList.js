import React, { useState } from 'react';

const MovieList = ({ movies, title,handleBookNow}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTheater, setShowTheater] = useState(false); 
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowOverlay(true);
    setShowTheater(false); 
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedMovie(null);
  };

  const showTheaterPage = () => {
    setShowTheater(true);
  };

  
  const formatTrailerUrl = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1] || url.split('youtu.be/')[1]; 
      return `https://www.youtube.com/embed/${videoId}`; 
    }
    return url; 
  };


  const theaters = [
    { name: 'LA CINEMAS', timings: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] },
    { name: 'INOX', timings: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM'] },
    { name: 'PVR', timings: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] },
    { name: 'KG Cinemas', timings: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'] },
    { name: 'SAKTHI', timings: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] }
  ];

  return (
    <div>
      <div className='text-slate-300 text-5xl text-start'>{title}</div>
      <div className='overflow-x-scroll scrollbar-hide p-6 flex space-x-20'>
        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className='transition-all delay-100 hover:scale-110 ease-in-out shadow-lg rounded-sm text-center text-slate-50 bg-[#202020]'
          >
            <div
              className='h-72 w-56 bg-cover bg-no-repeat bg-center'
              style={{ backgroundImage: `url(${movie.movie_url})` }}
            ></div>

            <div className='text-lg transition-all delay-100 hover:scale-110 ease-in-out p-2'>
              <p className='text-wrap transition-all delay-100 hover:scale-110 ease-in-out cursor-pointer'>
                {movie.title1}
              </p>
              <p className=''>{movie.genre1}</p>
              <p className=''>Language: {movie.language}</p>
              <div className='bg-red-700 rounded-md'>
                <button
                  className='text-neutral-50 transition-all hover:scale-110 ease-out'
                  onClick={() => handleMovieClick(movie)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showOverlay && selectedMovie && (
        <div className='fixed inset-0 flex items-center bg-black bg-opacity-75'>
          {!showTheater ? (
            <div className="bg-[#ffffff70] p-6 rounded-lg shadow-lg">
              <div className='grid grid-cols-2'>
                <div className='text-black'>
                  <h2 className='text-5xl tracking-wider mx-4 font-bold mb-4'>{selectedMovie.title1}</h2>
                  <p className='mb-2 mx-4 text-lg'>
                    <span className='text-2xl font-semibold text-red-700'>Genre</span> {selectedMovie.genre1}
                  </p>
                  <p className='mb-2 mx-4 text-lg'>
                    <span className='text-2xl font-semibold text-red-700'>Language</span> {selectedMovie.language}
                  </p>
                  <p className='mb-2 mx-4 text-lg'>
                    <span className='text-2xl font-semibold text-red-700'>About</span>{' '}
                    {selectedMovie.description || 'No description available.'}
                  </p>
                </div>
                {selectedMovie.Movie_trailer ? (
                  <div className="mb-4">
                    <iframe
                      width="100%"
                      height="360"
                      src={formatTrailerUrl(selectedMovie.Movie_trailer)} 
                      title="Movie Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p>No trailer available for this movie.</p>
                )}
              </div>

              <div className='flex justify-end mr-60'>
                <button
                  className='bg-red-700 px-4 hover transition ease-in-out text-white rounded mx-16'
                  onClick={showTheaterPage}
                >
                  Book Tickets
                </button>

                <button className='bg-red-700 text-white px-4 py-2 rounded' onClick={closeOverlay}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#ffffff6c] p-6 rounded-lg shadow-lg">
              
              <h2 className='text-5xl tracking-wider text-[#2e2e2e] mx-4 font-bold mb-4'>Select Theater for {selectedMovie.title1}</h2>
              
              {theaters.map((theater, index) => (

                <div key={index} className="mb-6">
                  <h3 className="text-3xl text-[#000000c4] font-semibold mb-2">{theater.name}</h3>
                  <div className="flex space-x-4">
                    {theater.timings.map((time, timeIndex) => (
                      <button
                        key={timeIndex}
                        className="bg-[#a74343] text-white px-4 py-2 rounded-lg transition hover:bg-[#f80101]"
                        onClick={handleBookNow}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}


              <div className='flex justify-end mt-4'>
              
                <button className='bg-red-700 text-white px-4 py-2 rounded' onClick={() => setShowTheater(false)}>
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;
