import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'Services/api';
import { setMessage } from './messageSlide';

export const getListProject = createAsyncThunk(
  'listproject/getListProject',
  async (dataUser,thunkAPI) => {
    try {
      let query;
      if(thunkAPI.getState().auth.user.roles.indexOf("ROLE_ADMIN_ORGANIZATION")>=0)
      {
      query=`/api/organizations/${thunkAPI.getState().auth.user.organizationId}/projects`;
      }else
      {
      query=`/api/organizations/${thunkAPI.getState().auth.user.organizationId}/projects/attending`;
      }
      console.log(query)
      const data = await api.get(query);
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
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
    clear(state) {
        
      state.projectId = "";
      state.name = [];
      state.listproject=[]
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
export const {selectProject,clear}=listprojectSlice.actions
const { reducer } = listprojectSlice;
export default reducer;
