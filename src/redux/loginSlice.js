// redux/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    isAuthenticated: false,
    user: null,
};

// Slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

// Export actions
export const { login, logout } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;
