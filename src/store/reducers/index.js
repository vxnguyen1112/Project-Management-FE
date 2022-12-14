import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import backlogReducer from "./backlogSlice";
import projectReducer from "./projectSlice";
import boardReducer from "./boardSlice";

const allReducers = combineReducers({
    backlog: backlogReducer,
    project: projectReducer,
    board: boardReducer
});

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, allReducers)


export default persistedReducer;