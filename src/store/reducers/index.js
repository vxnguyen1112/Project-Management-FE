import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import backlogReducer from "./backlogSlice";
import authReducer  from "./authSlice";
import messageReducer from "./messageSlide";
import listProjectReducer from "./listprojectSlide";
import projectReducer from './projectSlice'

const allReducers = combineReducers({
    backlog: backlogReducer,
    auth: authReducer,
    message: messageReducer ,
    listproject:listProjectReducer,
    project:projectReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export default persistedReducer;
