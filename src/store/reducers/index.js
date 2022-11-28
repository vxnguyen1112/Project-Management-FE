import { combineReducers } from "redux";
import backlogReducer from "./backlogSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const allReducers = combineReducers({
    backlog: backlogReducer
});

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, allReducers)


export default persistedReducer;