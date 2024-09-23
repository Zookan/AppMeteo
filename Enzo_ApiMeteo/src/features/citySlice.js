import { createSlice } from "@reduxjs/toolkit";

export const citySlice = createSlice({
    name:"city",
    initialState:{
        city:[]
    },
    reducers:{
        addCity: (state, action)=>{
            state.city.push(action.payload);
        },
        removeCity:(state, action)=>{
            state.city = state.city.filter(fav => fav !== action.payload)
        }
    }
});
export const {addCity, removeCity} = citySlice.actions;
export default citySlice.reducer;