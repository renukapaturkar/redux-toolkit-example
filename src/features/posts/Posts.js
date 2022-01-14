import { unwrapResult } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getPosts } from "./postsSlice"

export const Posts = () => {
    const [status, setStatus] = useState("idle")
    const {posts} = useSelector((state)=> state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        (async() => {
            try{
                setStatus("pending")
                const result = await dispatch(getPosts())
                unwrapResult(result)
                setStatus("success")
            }catch(error){
                setStatus("idle")
                console.log("something went wrong", error)
            }
        })()
    }, [])


    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }


    return (
        <>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1 style={{textAlign:"center"}}>Posts</h1>
            <button style={{width:"4rem", height:"2rem", margin:"1rem", border:"none", backgroundColor:"black", color:"white"}} onClick={logout}>logout</button>

        </div>

            <div style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center"}}>
                {
                    posts.map((post) => {
                        return (<>
                            <div key={post.id}
                            style={{display:"flex",width:"40rem" ,flexDirection:"column", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",  margin:"0.5rem", padding:"1rem"}}>
                                
                                
                                <div style={{display:"flex", margin:"0.5rem"}}>
                                <div style={{display:"flex",fontSize:"1.5rem",padding:"1rem", justifyContent:"center", width:"2rem", height:"2rem", borderRadius:"50%",backgroundColor:"#f43f5e", color:"white"}}>
                                    <span style={{justifySelf:"center"}}>{post.userId}</span>
                                </div>
                                <h3 style={{color:"#475569", padding:"0 1rem 0 1rem"}}>{post.title}</h3>

                                </div>
                                <p>{post.body}</p>
                            </div>
                        
                        </>)
                    })
                }

            </div>

        </>
    )
}