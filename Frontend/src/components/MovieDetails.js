import { useParams } from "react-router-dom";
import TicketForm from "./TicketsForm";
import { useState } from "react";

const MovieDetails = ({movies}) => {

    const [isbooking,setIsbooking] = useState(false)
    
    const { id } = useParams();
    const movie = movies.find((val) => val.show.id === parseInt(id));
    return ( <div className="moviedetails">
        {movie.show.image && movie.show.image.medium && (
            <img src={movie.show.image.original} alt={movie.show.name} className="image"/>
          )}
        <div className="moviedescription">
            <h2>{movie.show.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: movie.show.summary }} />
            {!isbooking && 
                <button 
                onClick={(e)=>setIsbooking(true)}>Book Tickets</button>
            }
            {isbooking && <TicketForm name={movie.show.name} />}
        </div>
    </div> );
}
 
export default MovieDetails;