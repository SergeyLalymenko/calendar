import { combineReducers, configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';
import eventTypesSlice from './eventTypesSlice';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    events: eventsSlice,
    eventTypes: eventTypesSlice
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: () => [thunk],
});
