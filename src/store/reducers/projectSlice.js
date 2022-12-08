import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'Services/api';

const initialState = {
    project: null
}
export const createProject = createAsyncThunk(
    'project/createProject',
    async (newProject) => {
        const organizationId = 'fbecadea-273c-48cb-bbbe-04ddaa12d0a7';
        const res = await api.post(`/api/organizations/${organizationId}/projects`, JSON.stringify(newProject));
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