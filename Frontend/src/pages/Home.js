import MovieComponent from "../components/MovieComponent";

const Home = ({movies}) => {

    return (
        <div className="Home">
           <h1>Now Playing</h1>
           <MovieComponent movies={movies} />
        </div>
    );
  };
  
  export default Home;
