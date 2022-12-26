import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'Services/api';
import { store } from 'store';

const initialState = {
    project: null
}
export const createProject = createAsyncThunk(
    'project/createProject',
    async (newProject) => {
        const res = await api.post(`/api/organizations/${store.getState().auth.user.organizationId}/projects`, JSON.stringify(newProject));
        return res;
    }
)

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {

    },
    extraReducers: {
        [createProject.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.project = action.payload;
        }
    }
})

export const selectProject = (state) => state.project.project;

export default projectSlice.reducer; 