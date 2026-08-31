import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tv() {

    const [tv, setTv] = useState([]);

    async function getTv() {

        let { data } = await axios.get(
            "https://api.themoviedb.org/3/tv/popular?api_key=YOUR_API_KEY"
        );

        setTv(data.results);
    }

    useEffect(() => {
        getTv();
    }, []);

    return (
        <div className="container">
            <div className="row">

                {tv.map((show) => (
                    <div className="col-md-3 mb-4" key={show.id}>

                        <img
                            className="w-100"
                            src={
                                "https://image.tmdb.org/t/p/w500" +
                                show.poster_path
                            }
                            alt={show.name}
                        />

                        <h5>{show.name}</h5>

                    </div>
                ))}

            </div>
        </div>
    );
}