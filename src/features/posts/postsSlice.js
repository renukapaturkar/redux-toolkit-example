import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getPosts = createAsyncThunk(
    'posts/posts', async() => {
        try {
            const {data} = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            )
            console.log(data, "data")
            return data
        }catch(error){
            console.log(error, "something is wrong")
        }
    }

)

const postsSlice = createSlice({
    name: 'posts', 
    initialState: {
        posts: [], 
        status: 'idle',
        error: null

    },
    reducers: {}, 
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.status = "pending"
        },
        [getPosts.fulfilled]: (state, action) => {
            state.status="success"
            state.posts = action.payload
        }, 
        [getPosts.rejected]: (state, action) => {
            state.status="failed"
            state.error = action.error
        }
    }
})



export default postsSlice.reducer