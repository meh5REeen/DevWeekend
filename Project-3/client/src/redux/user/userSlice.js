import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser : null,
    error : null,
    loading : false,
}


const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state,action) => {
            state.currentUser = state.currentUser = {
                ...action.payload,
                avatar: action.payload.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_Op4Qn7cM-RkGM2MFM0EmODTGSEBCG7ehA6K7AB0Ak6-SmgpMFhQYpQuHjhOddSQlJw&usqp=CAU.png",
            };
            state.loading = false;
            state.error = null;
            
        },
        signInFailure : (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setAvatar: (state, action) => {
        if (state.currentUser) {
            state.currentUser.avatar = action.payload;
        }},
    }
});

export const {signInStart,signInSuccess,signInFailure,setAvatar} = userSlice.actions;

export default userSlice.reducer;