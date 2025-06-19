import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth :{
        accessToken: localStorage.getItem("accessToken") || false
    },
    homePage :{
        category:[],
        blogs: [],
    }
}

const appSlice = createSlice({
    name:"appSlice",
    initialState,
    reducers:{
        addCategory: (state, action) =>{
            state.homePage.category.push(action.payload);
        },
        addBlogs:(state, action) =>{
            state.homePage.blogs.push(action.payload);
        },
        addToken:(state, action)=>{
            state.auth.accessToken = action.payload
        }
    }
})

export const {addCategory, addBlogs, addToken} = appSlice.actions
export default appSlice.reducer