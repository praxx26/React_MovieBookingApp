import React, { useEffect, useState } from 'react';
import './App.css'
import Header from './Header';
import MovieList from './MovieList';
import MovieList1 from './Movielist1';
import MovieList2 from './M2';
import Login from './Login';
import Booking from './Booking';

function App() {
  const [home, setHome] = useState(false);
  const [togglePass, setTogglePass] = useState(false);
  const [toggleNavigate, setToggleNavigate] = useState(true);
  const [toggleTheater, setToggleTheater] = useState(true);
  const [movie, getMovie] = useState([]);
  const [movie1, getMovie1] = useState([]);
  const [movie2, getMovie2] = useState([]);
  const [userName, getUserName] = useState('');
  const [password, getPassword] = useState('');
  const [email, getEmail] = useState('');
  const [booking, setBooking] = useState(false);
 

  const button = () => {
    if (toggleNavigate) {
      if (userName === '' && password === '') {
        setHome((prev) => !prev);
      } else {
        alert('wrong user');
      }
    } else {
      setToggleNavigate((prev) => !prev);
    }
  };

  useEffect(() => {
    fetch('./moviedata.json')
      .then((res) => res.json())
      .then((data) => {
        getMovie(data.movies);
      });
  }, []);
  useEffect(() => {
    fetch('./moviedata.json')
      .then((res) => res.json())
      .then((data) => {
        getMovie1(data.movies);
      });
  }, []);
  useEffect(() => {
    fetch('./moviedata.json')
      .then((res) => res.json())
      .then((data) => {
        getMovie2(data.movies);
      });
  }, []);


  const handleBookNow = () => {
    setBooking(true);
  };

  return (
    <>
      {home ? (
        booking ? (
          <Booking setBooking={setBooking} />
        ) : (
          <section className="bg-no-repeat bg-fixed bg-cover bg-[url('https://i.redd.it/xm7k71pyvgh81.jpg')]">
            <Header setHome={setHome} setToggleTheater={setToggleTheater} />
            <MovieList movies={movie} title="New Releasing Movies" handleBookNow={handleBookNow} />
            <MovieList2 movies={movie2} title="Rereleasing classic Movies" handleBookNow2={handleBookNow} />
            <MovieList1 movies={movie1} title="Rereleasing Romantic Movies" handleBookNow1={handleBookNow} />
          </section>
        )
      ) : (
        <Login
          userName={userName}
          password={password}
          togglePass={togglePass}
          toggleNavigate={toggleNavigate}
          setTogglePass={setTogglePass}
          setToggleNavigate={setToggleNavigate}
          getUserName={getUserName}
          getPassword={getPassword}
          button={button}
          email={email}
          getEmail={getEmail}
        />
      )}
    </>
  );
}

export default App;
