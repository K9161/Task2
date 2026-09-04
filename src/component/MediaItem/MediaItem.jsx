import React from 'react'
import avatar from "../../avatar.jpg"
import { Link } from 'react-router-dom'

export default function MediaItem({ movie }) {

  return <>
    <div className="col-md-2 ">
      <Link to={"/MovieDetails/"+movie.id+"/"+movie.media_type}>
      
      <div className="movie position-relative">

        {movie.profile_path ? (
          <img
            className="w-100"
            src={"https://image.tmdb.org/t/p/w500" + movie.profile_path}
            alt={movie.name}
          />
        ) : movie.poster_path ? (
          <img
            className="w-100"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={movie.title || movie.name}
          />
        ) : (
          <img
            className="w-100"
            src={avatar}
            alt={movie.title || movie.name}
          />
        )}

        <h3 className="h6 mt-2">
          {movie.title || movie.name}
        </h3>

        <div className="vote p-2 text-center position-absolute top-0 end-0">
          {movie.vote_average?.toFixed(1)}
        </div>
        </div>
</Link>
 
       </div>
    

 </>
}