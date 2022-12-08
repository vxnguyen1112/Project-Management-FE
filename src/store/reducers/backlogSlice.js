import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'Services/api'; 

const initialState = {
    boards: [],
    state: 'empty'
}

export const getAllSprints = createAsyncThunk(
    'backlog/getAllSprints',
    async (projectId) => {
        const res = await api.get(`/api/backlogs?project_id=${projectId}`);
        return res;
    }
)

export const addSprint = createAsyncThunk(
    'backlog/addSprint',
    async (newSprint) => {
        const res = await api.post(`/api/sprints`, JSON.stringify(newSprint));
        return res;
    }
)

export const updateSprint = createAsyncThunk(
    'backlog/updateSprint',
    async (editedSprint) => {
        const res = await api.put(`/api/sprints/${editedSprint.id}`, JSON.stringify(editedSprint));
        return res;
    }
)

export const deleteSprint = createAsyncThunk(
    'backlog/deleteSprint',
    async (sprintId) => {
        const res = await api.delete(`/api/sprints/${sprintId}`);
        return res;
    }
)

export const addIssue = createAsyncThunk(
    'backlog/addIssue',
    async (newIssue) => {
        const res = await api.put(`/api/issues`, JSON.stringify(newIssue));
        return res;
    }
)

export const deleteIssue = createAsyncThunk(
    'backlog/deleteIssue',
    async (existedIssue) => {
        const res = await api.delete(`/api/issues`, JSON.stringify(existedIssue));
        return res;
    }
)

export const moveIssue = createAsyncThunk(
    'backlog/moveIssue',
    async (movedIssue) => {
        console.log(movedIssue);
        const res = await api.post(`/api/issues/move`, JSON.stringify(movedIssue));
        return res;
    }
)

export const backlogSlice = createSlice({
    name: 'backlog',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [getAllSprints.fulfilled]: (state, action) => {
            state.state = 'successed';  
            state.boards = action.payload;  
        },
        [addSprint.fulfilled]: (state) => {
            state.state = 'changed';
        },
        [deleteSprint.fulfilled]: (state) => {
            state.state = 'changed';
        },
        [addIssue.fulfilled]: (state) => {
            state.state = 'changed';
        },
        [deleteIssue.fulfilled]: (state) => {
            state.state = 'changed';
        },
        [moveIssue.fulfilled]: (state, action) => {
            state.state = 'changed';
            // console.log("Resutl", action.payload);
        },
        [moveIssue.rejected]: (state, action) => {
            // state.state = 'changed';
            // console.log("Resutl", action.payload);
        },
    }
})

export const selectBacklog = (state) => state.backlog.boards;

export default backlogSlice.reducer;