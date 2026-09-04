import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import avatar from "../../avatar.jpg"

export default function MovieDetails() {

    const [details, setDetails] = useState({})

    let params = useParams()

    console.log(params.x)

    async function getItemDetails() {

        let { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${params.x}?api_key=e37ad7a1fe3cdc9b11f70208d0f6c3d8`
        )

        console.log(data)
        setDetails(data)
    }

    useEffect(() => {
        getItemDetails()
    }, [])

    return <>
        <div className="row py-3">

            <div className="col-md-4">

                {details.poster_path ? (
                    <img
                        className="w-100"
                        src={"https://image.tmdb.org/t/p/w500" + details.poster_path}
                        alt={details.title}
                    />
                ) : (
                    <img
                        className="w-100"
                        src={avatar}
                        alt={details.title}
                    />
                )}

            </div>

            <div className="col-md-8">

                <h2>{details.title}</h2>

                <p className="text-muted">
                    {details.overview}
                </p>

            </div>

        </div>
    </>
}