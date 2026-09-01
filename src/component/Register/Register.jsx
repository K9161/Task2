
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'

export default function Register() {

    let navigate = useNavigate()

    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        rePassword: ""
    })

    function getUserData(e) {

        let myUser = { ...user }

        myUser[e.target.name] = e.target.value

        setUser(myUser)

        console.log(myUser)
    }

    function validateRegisterForm() {

        let schema = Joi.object({

            name: Joi.string()
                .min(3)
                .max(20)
                .required(),

            username: Joi.string()
                .min(3)
                .max(20)
                .required(),

            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net']
                    }
                })
                .required(),

            dateOfBirth: Joi.string()
                .required(),

            gender: Joi.string()
                .valid("male", "female")
                .required(),

            password: Joi.string()
                .min(6)
                .required(),

            rePassword: Joi.any()
                .valid(Joi.ref("password"))
                .required()
                .messages({
                    "any.only": "Passwords do not match"
                })

        })

        return schema.validate(user, {
            abortEarly: false
        })
    }

    async function postDataToApi() {

        try {

            let { data } = await axios.post(
                'https://route-posts.routemisr.com/users/signup',
                user
            )

            console.log("REGISTER RESPONSE:", data)

            if (data.success === true) {

                setLoading(false)

                navigate('/login')

            } else {

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

            console.log("REGISTER ERROR:", err.response?.data)

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

    function submitRegisterForm(event) {

        event.preventDefault()

        let validation = validateRegisterForm()

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

            <form onSubmit={submitRegisterForm}>

                <label htmlFor="name">
                    Name :
                </label>

                <input
                    onChange={getUserData}
                    type="text"
                    className="form-control my-input my-2"
                    name="name"
                    id="name"
                />

                <label htmlFor="username">
                    Username :
                </label>

                <input
                    onChange={getUserData}
                    type="text"
                    className="form-control my-input my-2"
                    name="username"
                    id="username"
                />

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

                <label htmlFor="dateOfBirth">
                    Date Of Birth :
                </label>

                <input
                    onChange={getUserData}
                    type="date"
                    className="form-control my-input my-2"
                    name="dateOfBirth"
                    id="dateOfBirth"
                />

                <label htmlFor="gender">
                    Gender :
                </label>

                <select
                    onChange={getUserData}
                    className="form-control my-input my-2"
                    name="gender"
                    id="gender"
                >

                    <option value="">
                        Select Gender
                    </option>

                    <option value="male">
                        Male
                    </option>

                    <option value="female">
                        Female
                    </option>

                </select>

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

                <label htmlFor="rePassword">
                    Confirm Password :
                </label>

                <input
                    onChange={getUserData}
                    type="password"
                    className="form-control my-input my-2"
                    name="rePassword"
                    id="rePassword"
                />

                <button
                    type="submit"
                    className="btn btn-info"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Register"}
                </button>

            </form>

        </>
    )
}
