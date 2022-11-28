import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import allReducers from './reducers';

export const store = configureStore({
    reducer: allReducers
})

export const persistor = persistStore(store);