import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function About() {

  const [details, setDetails] = useState(null)

  const params = useParams()

  async function getDetails() {

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.z}?api_key=e37ad7a1fe3cdc9b11f70208d0f6c3d8`
    )

    console.log(data)

    setDetails(data)
  }

  useEffect(() => {
    getDetails()
  }, [])

  if (!details) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="row py-5">

      <div className="col-md-4">

        <img
          className="w-100"
          src={
            "https://image.tmdb.org/t/p/w500" +
            details.poster_path
          }
          alt={details.title}
        />

      </div>

      <div className="col-md-8">

        <h2>{details.title}</h2>

        <p>{details.overview}</p>

        <p>
          Rating: {details.vote_average}
        </p>

        <p>
          Release Date: {details.release_date}
        </p>

        <p>
          Runtime: {details.runtime} minutes
        </p>

      </div>

    </div>
  )
}