import React, { useState, useEffect } from 'react';
import './'
const Header = ({ setHome, setToggleTheater }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showWishList, setShowWishList] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
  const [wishListContent, setWishlistContent] = useState(''); 
  const [overlayContent, setOverlayContent] = useState('');
  const [contactUs, setContactUs] = useState(false);
  const [movies, setMovies] = useState([]); 
  const [theater,setTheater] = useState([]);
  const [wishlist,setWishlist] = useState([]);
  const [selectedIndex,setSelectedIndex] = useState([]);
  const [selectedIndex1,setSelectedIndex1] = useState([]);
  const [location,setLocation]=useState(false);
  const cities = ["Chennai", "Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli", "Vellore","Erode","Kanyakumari","Visakhapatnam","Hyderabad","Vijayawada", "Bengaluru","Mysuru"];
  const [searchCity,setSearchCity]=useState('');
  const [filteredCities,setFilteredCities]=useState([]);
  const handlesearch=(e)=>{
    const value=e.target.value;
    setSearchCity(value);
    const filtered =cities.filter(city=>city.toLowerCase().includes(value.toLowerCase()));
    setFilteredCities(filtered)
  };
  const handleCitySelect = (city) => {
    setSearchCity(city);
    setFilteredCities([]); 
  }; 
  const toggleLocation=()=>{
    setLocation(!location);
  }
  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
        setMovies(data.movies || [])})
      .catch(error => console.error('Error fetching movies:', error));
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
        setTheater(data.theaters || [])})
      .catch(error => console.error('Error fetching movies:', error));
  }, []);
  useEffect(()=>{
    fetch('http://localhost:5000/data')
    .then(response=>response.json())
    .then(data => {
      setWishlist(data.wishList || [])})
  },[showOverlay]
  );

  const handleOverlay = (content) => {
    setOverlayContent(content);
    setShowOverlay(true);
  };
  const handleWishList = (e)=>{
    setWishlistContent(e);
    setShowWishList(true);
  }
  const toggleFavorite=(index)=>{
    if(selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter(e => e !== index))
    }
    else {
      setSelectedIndex([...selectedIndex,index])
    }
    
  }
  const toggleFavoriteMovie=(index)=>{
    if(selectedIndex1.includes(index)) {
      setSelectedIndex1(selectedIndex1.filter(e => e !== index))
    }
    else {
      setSelectedIndex1([...selectedIndex1,index])
    }
    
  }
  const toggleContactUs=()=>{
    setContactUs(!contactUs);
  }

  const addWishList = (movie) => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
        if(!data.wishList.some(movies => movies.movie_name === movie)) {
          
          let updatedWishList = [...data.wishList, movie]; 
        fetch('http://localhost:5000/data', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            movies: [...data.movies],
            theaters: [...data.theaters], 
            wishList: updatedWishList 
          })
        })
        .then(response => response.json())
        .then(updatedData => {
          console.log('Success:', updatedData)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  const removeWishList = (movie) => {
    setWishlist(wishlist.filter( e => e.movie_id !== movie.movie_id ))
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
        const updatedWishList = [ ...data.wishList.filter((e)=> e.movie_id !== movie.movie_id )]; 
        fetch('http://localhost:5000/data', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data, 
            wishList: updatedWishList 
          })
        })
        .then(response => response.json())
        .then(updatedData => {
          console.log('Success:', updatedData); 
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <>
      <div className='flex p-4 bg-black'>
        <div className='flex space-x-6 items-center'>
          <p className="size-14 bg-contain bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGivBqzp-aY284Ves9BV7VEkVBqio66UAmQWCMj8c2mZIyLXHXkrzFCsl2B-vQW7Ddr_U&usqp=CAU')] bg-no-repeat"></p>

         
          <p className='text-gray-50 transition-all cursor-pointer w-fit delay-100 hover:scale-110 ease-in-out text-2xl'onClick={() => handleOverlay('Theaters')}>
            Theaters
          </p>
          <p className='text-gray-50 transition-all cursor-pointer w-fit delay-100 hover:scale-110 ease-in-out text-2xl'onClick={() => handleOverlay('Movies')}>
             Movies
          </p>
          <p className='text-gray-50 transition-all delay-100 hover:scale-110 cursor-pointer w-fit ease-in-out text-2xl' onClick={toggleContactUs}>{contactUs ? "Home" :" Contact Us" }</p>
          <div className={`transform transition-all duration-1000 ease-out ${contactUs ? "max-h-16 opacity-100 w-48" : "max-h-0 opacity-0 w-0"} overflow-hidden`}>
          <div className="bg-gray-400 p-2 rounded-md  ">
            <div className='flex'>
            <span class="material-symbols-outlined">call</span>
            <h2>9042369799</h2>
            </div>
            <div className='flex'>
            <span class="material-symbols-outlined">mail</span>
            <h2>cineapp@gmail.com</h2>
            </div>
          </div>
      </div>
   
      <span 
            className="material-symbols-outlined text-white text-3xl cursor-pointer"
            onClick={toggleLocation}
          >
            location_on
          </span>
          <p className='text-gray-50 transition-all delay-100 hover:scale-110 cursor-pointer w-fit ease-in-out text-2xl ' onClick={toggleLocation}>Select City</p>
         <div className={`fixed top-20 z-40 right-0 w-64  text-white p-4 transition-transform duration-700 ease-in-out ${location ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='bg-opacity-50'>
        <button className="absolute top-2 right-2 text-black text-lg p-2 py-1 font-bold cursor-pointer"onClick={() => {toggleLocation() ; handleOverlay('Theaters')}}>
          <span className='material-symbols-outlined p-3 text-red-600 font-semibold'>Search</span>
          </button>
        <input type="text" value={searchCity} onChange={handlesearch} placeholder='Enter a city ' className="p-2 px-1 rounded w-full text-black"></input>
            {filteredCities.length>0 && (
             <ul className="absolute text-[#000000c5] bg-[#edececc4]  border  rounded w-full mt-1 z-10 shadow-lg">
             {filteredCities.map((city, index) => (
               <li
                 key={index}
                 className="p-2 cursor-pointer hover:bg-[#ff4848] transition duration-200"
                 onClick={() => handleCitySelect(city)}
               >
                 {city}
               </li>
             ))}
           </ul> 
            )
            }
            
      </div>
          </div> 
        </div>

        <input
          type='text'
          className='flex-1 mx-16 focus:outline-none px-6 bg-[#414040] text-2xl'
          placeholder='Search for a Movie'
        ></input>

        <span className="material-symbols-outlined cursor-pointer w-fit text-white text-3xl p-4" onClick={() => handleWishList('Wishlist')}>
          bookmark
        </span>

        <div
          className='flex items-center text-2xl  text-gray-50 cursor-pointer px-3 transition-all delay-100 hover:scale-110 ease-in-out'
          onClick={() => setHome(prev => !prev)}
        >
          Logout
        </div>

        <p className="bg-[url('https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg')] rounded-full bg-cover transition-all delay-100 hover:scale-110 ease-in-out h-6 w-8 flex items-center p-7"></p>
      </div>
      {showWishList &&
          <div className='fixed h-screen bg-opacity-95 flex inset-0 justify-center items-center'>
               <div className="bg-white p-6 rounded-lg shadow-lg relative  bg-no-repeat bg-cover bg-[url('https://static.vecteezy.com/system/resources/thumbnails/007/992/391/small/cinema-movie-background-concept-cinema-seat-watch-movie-concept-with-copy-space-3d-rendering-photo.jpg')] w-1/2 h-80">
                  <div>
                    <h3 className='text-xl'>Wishlist</h3>
                    <ul className='overflow-y-auto overscroll-contain  h-44 '>
                  {wishlist.map((wishlist,i) => (
                    <li key={i} className='text-[#d8b6b6] cursor-pointer w-fit font-bold' >
                        <span className={`material-symbols-outlined text-[#e4aaaa] text-xl font-bold`}onClick={()=> removeWishList(wishlist)}>delete</span>
                        {wishlist.movie_name}
                    </li>
                  ))}
                </ul>
                  </div>
               <button className='absolute top-2 right-2 text-black font-bold'onClick={()=>setShowWishList(false)}>X
                  
               </button>
               </div>
          </div>
      }
      
      {showOverlay && (
  <div className="fixed h-screen inset-0 cursor-pointer bg-black bg-opacity-65 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg relative bg-no-repeat bg-cover bg-[url('https://static.vecteezy.com/system/resources/thumbnails/007/992/391/small/cinema-movie-background-concept-cinema-seat-watch-movie-concept-with-copy-space-3d-rendering-photo.jpg')] w-1/2 h-80">
      <h2 className="text-xl font-bold cursor-pointer w-fit mb-4">
        {overlayContent === 'Theaters' ? 'Theater Information' : 'Movie Information'}
      </h2>

      {overlayContent === 'Movies' ? (
        <section className="overscroll-none z-10 w-fit scrollbar-hide">
          <div>
            <h3 className="font-bold mb-2 overflow-hidden cursor-pointer w-fit">Movies List:</h3>
            <ul className="overflow-y-auto scrollbar-hide h-44">
              {movies.map((movie, index) => (
                <li key={movie.movie_id} className="text-[#d8b6b6] cursor-pointer w-fit font-bold">
                  <span
                    className={`material-symbols-outlined text-lg font-semibold ${selectedIndex1.includes(index) ? 'text-[#000000]' : 'text-[#d6c0c0]'}`}
                    onClick={() => {
                      addWishList(movie);
                      toggleFavoriteMovie(index);
                    }}
                  >
                    favorite
                  </span>
                  -{movie.movie_id}-{movie.movie_name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="overscroll-none z-10 scrollbar-hide">
          <div>
            <h3 className="font-bold mb-2 cursor-pointer w-fit overflow-hidden">Theater List:</h3>
            <ul className="overflow-y-auto scrollbar-hide h-36">
              {theater.map((theaters, index) => (
                <li key={theaters.theater_id} className="text-[#d8b6b6] cursor-pointer w-fit font-bold" onClick={() => setShowOverlay(false)}>
                  {theaters.theater_id}-{theaters.theater_name}
                  <span
                    className={`material-symbols-outlined text-sm ${selectedIndex.includes(index) ? 'text-[#000000]' : 'text-[#d6c0c0]'}`}
                    onClick={() => toggleFavorite(index)}
                  >
                    favorite
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <button
        className="absolute top-2 right-2 text-lg font-bold text-black"
        onClick={() => setShowOverlay(false)}
      >
        X
      </button>
    </div>
  </div>
)}
  </>
  );
};

export default Header;
