
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'

export default function Login({ saveUserData }) {

    let navigate = useNavigate()

    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function getUserData(e) {

        let myUser = { ...user }

        myUser[e.target.name] = e.target.value

        setUser(myUser)

        console.log(myUser)
    }

    function validateLoginForm() {

        let schema = Joi.object({

            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net']
                    }
                })
                .required(),

            password: Joi.string()
                .min(6)
                .required()

        })

        return schema.validate(user, {
            abortEarly: false
        })
    }

    async function postDataToApi() {

        try {

            let { data } = await axios.post(
                'https://route-posts.routemisr.com/users/signin',
                user
            )

            console.log("LOGIN RESPONSE:", data)

            if (data.success === true) {

    console.log("LOGIN RESPONSE:", data)

    setLoading(false)

    localStorage.setItem(
        'userToken',
        data.data.token
    )

    saveUserData()

    navigate('/home')
}

             else {

                setLoading(false)

                setError([
                    {
                        message: data.message,
                        context: {
                            label: "general"
                        }
                    }
                ])
            }

        } catch (err) {

            console.log("LOGIN ERROR:", err.response?.data)

            setLoading(false)

            setError([
                {
                    message:
                        err.response?.data?.message ||
                        "Something went wrong",

                    context: {
                        label: "general"
                    }
                }
            ])
        }
    }

    function submitLoginForm(event) {

        event.preventDefault()

        let validation = validateLoginForm()

        if (validation.error) {

            setError(validation.error.details)

            return
        }

        setError([])

        setLoading(true)

        postDataToApi()
    }

    return (
        <>

            {error.length > 0 && (

                <div className="alert alert-danger my-2">

                    {error.map((err, index) => (

                        <div key={index}>
                            {err.message}
                        </div>

                    ))}

                </div>

            )}

            <form onSubmit={submitLoginForm}>

                <label htmlFor="email">
                    Email :
                </label>

                <input
                    onChange={getUserData}
                    type="email"
                    className="form-control my-input my-2"
                    name="email"
                    id="email"
                />

                <label htmlFor="password">
                    Password :
                </label>

                <input
                    onChange={getUserData}
                    type="password"
                    className="form-control my-input my-2"
                    name="password"
                    id="password"
                />

                <button
                    type="submit"
                    className="btn btn-info"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </button>

            </form>

        </>
    )
}
