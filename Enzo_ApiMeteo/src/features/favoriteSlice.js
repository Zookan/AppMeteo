import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name:"favorite",
    initialState:{
        favorite:[]
    },
    reducers:{
        addFav: (state, action)=>{
            if(!state.favorite.some(fav => fav.id === action.payload.id))
            {
                state.favorite.push(action.payload);
            }
        },
        removeFav:(state, action)=>{
            state.favorite = state.favorite.filter(fav => fav.id !== action.payload.id)
        }
    }
});

export const {addFav, removeFav} = favoriteSlice.actions;
export default favoriteSlice.reducer;
