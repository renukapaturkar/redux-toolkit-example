import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
// import PhoneInput from 'react-phone-number-input/input'
// import 'react-phone-number-input/style.css'
import { useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { login } from './authSlice'

export const Login = () => {
    const [id, setMobileId] = useState("")
    const [status, setStatus] = useState("idle")
    const dispatch = useDispatch()
    const navigate = useNavigate()




    const onChangeHandler = (e) => {
        let mobileId = "+91" + e.target.value
        setMobileId(mobileId)
    }

    const loginHandler = async(e) => {
        e.preventDefault()
        try {
            setStatus("pending")
            const result = await dispatch(login({id}))
            console.log(result, "result")
            unwrapResult(result)
            setStatus("success")
            navigate('/posts')
        }catch(error){
            setStatus("idle")
            console.log("something is wrong", error)
        }


    }

    return (
        <>
            <h1 style={{textAlign: "center"}}>Login</h1>
            <div>
            <form onSubmit={loginHandler}  style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div>
                    <input 
                    style={{padding:"1rem", margin:"0.5rem", width:"15rem"}}
                    placeholder='Mobile Number'
                    value={id}
                    type="text"
                    onChange={onChangeHandler}
                    />
                </div>

                <div>
                    <button
                    type="submit"
                    style={{padding:"1rem", margin:"0.5rem", width:"6rem", color:"white", backgroundColor:"black", fontSize:"1rem", border:"none"}}>
                       {status === 'pending' ? 'loading...' : 'Login'}
                    </button>
                </div>
            </form>
            </div>

        </>
    )
}