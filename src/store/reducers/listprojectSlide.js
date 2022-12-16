import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'Services/api';
import { setMessage } from './messageSlide';

export const getListProject = createAsyncThunk(
  'listproject/getListProject',
  async (thunkAPI) => {
    try {
      const data = await api.get('/api/organizations/fbecadea-273c-48cb-bbbe-04ddaa12d0a7/projects');
      return data;
    } catch (error) {
      thunkAPI.dispatch(setMessage(error));
      return thunkAPI.rejectWithValue();
    }
  },
);
const initialState = { projectId: "",name: [],listproject: [] };

const listprojectSlice = createSlice({
  name: 'listproject',
  initialState,
  reducers: {
      selectProject(state,action) {
      state.projectId = action.payload;
      state.name=state.listproject.filter((project) =>project.id===state.projectId)[0].name;
    },
  },
  extraReducers: {
    [getListProject.fulfilled]: (state, action) => {
      state.listproject = action.payload;
    },
    [getListProject.rejected]: state => {
      state.listproject = [];
    },
  },
});
export const {selectProject}=listprojectSlice.actions
const { reducer } = listprojectSlice;
export default reducer;
