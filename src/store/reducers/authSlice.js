import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from 'Services/api';

import { setMessage } from "./messageSlide"     ;

const user = JSON.parse(localStorage.getItem("user"));
export const login = createAsyncThunk(
  "auth/login",
  async (dataUser, thunkAPI) => {
    try {
      const data = await api.post('/api/auth/signin', JSON.stringify(dataUser));
      thunkAPI.dispatch(setMessage('Loggin in successfully'));
      console.log("thunkAPI.getState().message")
      console.log(thunkAPI.getState().board)
      return data;
    } catch (error) {
      console.log(`err:${error}`)
      thunkAPI.dispatch(setMessage(error));
      console.log(`message:${thunkAPI.getState().message.message}`)
      return thunkAPI.rejectWithValue();
    }
  }
);
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
        
        state.isLoggedIn = false;
        state.user = null;
      },
   },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export const {logout}=authSlice.actions
const { reducer } = authSlice;
export default reducer;