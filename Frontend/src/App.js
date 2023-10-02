import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bookings from "./pages/Bookings";
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import { useState,useEffect } from "react";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {

  const [movies, setMovies] = useState([]);
  const {user} = useAuthContext();

    useEffect(()=>{
      const fetchMovies = async () => {
        try {
          const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
          if (!response.ok) {
            console.log('Error-Unable to fetch movies');
          } else {
            const json = await response.json();
            setMovies(json);
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      }
        fetchMovies()
    },[])

  return (
    <div className="App">
      <Router>
        <Navbar/>
          <div className="pages">
            <Routes>
              <Route 
                path='/'
                element={user?<Home movies={movies}/>:<Navigate to='/login'/>}
              />
              <Route 
                path='/:id'
                element={<MovieDetails movies={movies}/>}
              />
              <Route 
                path='/login'
                element={!user?<Login/>:<Navigate to='/'/>}
              />
              <Route 
                path='/signup'
                element={!user?<Signup/>:<Navigate to='/'/>}
              />
              <Route 
                path='/bookings'
                element={user?<Bookings movies={movies}/>:<Navigate to='/login'/>}
              />
            </Routes>
          </div>
      </Router>
    </div>
  );
}

export default App;
