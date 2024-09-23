import {configureStore} from "@reduxjs/toolkit"
import favoriteSlice from "./features/favoriteSlice"
import citySlice from "./features/citySlice"

export const store = configureStore({
    reducer:{
        favorite: favoriteSlice,
        city: citySlice,
    }
})