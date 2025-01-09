import {useState,useEffect} from 'react'
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'
//14e9adcc
const API_URL ="http://www.omdbapi.com?apikey=14e9adcc";

const App = () => {
    const[movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm] = useState("");
    const searchMovies = async (title) => {
        const response =await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);   
    }
    useEffect(() => {
       searchMovies("Batman");
    }, [])
  return (
    <div className="app">
       <h1>MovieLand</h1>
       <div className='search'>
          <input 
             placeholder='Search for a movie'
             value={searchTerm}
             onChange={(e)=>{ setSearchTerm(e.target.value)}}
          />
      
          <img 
            src={SearchIcon} 
            alt='Search Icon'
            onClick={()=>{searchMovies(searchTerm)}}
          />
       </div>
      {
        movies.length > 0 ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
          </div>
        ) : (<div className='empty'>
          <h2>Movie not found!</h2>
          </div>
        )
      }
    </div>
    

    
  );
}

export default App;