import { createSlice } from "@reduxjs/toolkit";

const initialState = {message:"oke"};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
     state.message= action.payload;
    },
    clearMessage: (state) => {
      state.message="";
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;