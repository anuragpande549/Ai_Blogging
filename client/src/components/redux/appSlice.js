import { createSlice } from "@reduxjs/toolkit";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


const initialState = {
    auth :{
        accessToken: getCookie('accessToken')|| false
    },
    homePage :{
        category:[],
        blogs: [],
    },
    search : "",
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
        },
        searchAdd:(state, action)=>{
            state.search  = action.payload
        }
    }
})

export const {addCategory, addBlogs, searchAdd,addToken} = appSlice.actions
export default appSlice.reducer