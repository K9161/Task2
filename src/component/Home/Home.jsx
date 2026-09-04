import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'
import { Link } from 'react-router-dom'

export default function Home() {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPerson, setTrendingPerson] = useState([])
  const [search, setSearch] = useState('')

  async function getTrending(mediaType, fun) {

    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=e37ad7a1fe3cdc9b11f70208d0f6c3d8`
    )

    console.log(data.results)

    fun(data.results)
  }

  useEffect(() => {
    getTrending('movie', setTrendingMovies)
    getTrending('tv', setTrendingTv)
    getTrending('person', setTrendingPerson)
  }, [])

  const searchedProducts = [
    ...trendingMovies,
    ...trendingTv,
    ...trendingPerson
  ].filter((item) =>
    (item.title || item.name || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <>

      {/* Search */}

      <input
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        value={search}
        type="search"
        placeholder="Search by name..."
        className="form-control my-4"
      />


      {/* Search Results */}

      {search !== '' && (
        <div className="row py-4">

          {searchedProducts.map((item) => (
            <MediaItem
              key={`${item.media_type}-${item.id}`}
              movie={item}
            />
          ))}

        </div>
      )}


      {/* ================= MOVIES ================= */}

      <div className="row py-5">

        <div className="col-md-4">

          <Link
            to="/Movies"
            className="text-decoration-none text-white"
          >

            <div className="brdr mb-4"></div>

            <h2 className="h3 text-center">
              Trending <br />
              Movies <br />
              To Watch Right Now
            </h2>

            <p className="text-muted py-3 text-center">
              Most Watched Movies By Days
            </p>

            <div className="brdr mt-4"></div>

          </Link>

        </div>


        <div className="col-md-8">

          <div className="row">

            {trendingMovies.slice(0,15).map((movie) => (
              <MediaItem
                key={movie.id}
                movie={movie}
              />
            ))}

          </div>

        </div>

      </div>


      {/* ================= TV ================= */}

      <div className="row py-5">

        <div className="col-md-4">

          <Link
            to="/Tv"
            className="text-decoration-none text-white"
          >

            <div className="brdr mb-4"></div>

            <h2 className="h3 text-center">
              Trending <br />
              TV <br />
              To Watch Soon
            </h2>

            <p className="text-muted py-3 text-center">
              Most Watched TV By Days
            </p>

            <div className="brdr mt-4"></div>

          </Link>

        </div>


        <div className="col-md-8">

          <div className="row">

            {trendingTv.slice(0,15).map((tv) => (
              <MediaItem
                key={tv.id}
                movie={tv}
              />
            ))}

          </div>

        </div>

      </div>


      {/* ================= PEOPLE ================= */}

      <div className="row py-5">

        <div className="col-md-4">

          <Link
            to="/People"
            className="text-decoration-none text-white"
          >

            <div className="brdr mb-4"></div>

            <h2 className="h3 text-center">
              Trending <br />
              People <br />
              Right Now
            </h2>

            <p className="text-muted py-3 text-center">
              Most Watched People By Weeks
            </p>

            <div className="brdr mt-4"></div>

          </Link>

        </div>


        <div className="col-md-8">

          <div className="row">

            {trendingPerson.slice(0,15).map((person) => (
              <MediaItem
                key={person.id}
                movie={person}
              />
            ))}

          </div>

        </div>

      </div>

    </>
  )
}