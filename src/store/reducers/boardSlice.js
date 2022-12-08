import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'Services/api'; 

const initialState = {
    sprintBoards: [],
    state: 'empty'
}

export const getAllBoardsFromSprint = createAsyncThunk(
    'backlog/getAllBoardsFromSprint',
    async (projectId) => {
        const res = await api.get(`/api/backlogs?project_id=${projectId}`);
        return res;
    }
)


export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getAllBoardsFromSprint.fulfilled]: (state, action) => {
            state.state = 'successed';
            state.sprintBoards = action.payload;
        }
    }
})

export const selectBoardSprint = (state) => state.board.sprintBoards;

export default boardSlice.reducer;