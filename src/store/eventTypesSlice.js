import api from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchEventTypes = createAsyncThunk(
    'eventTypes/fetchEventTypes',
    async function(_, { rejectWithValue }) {
        try {
            const res = await api.get('eventTypes/');

            if (res.statusText !== 'OK') {
                throw new Error('Can not fetch events!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

const eventTypesSlice = createSlice({
    name: 'eventTypes',
    initialState: {
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEventTypes.fulfilled, (state, { payload }) => {
            state.data = payload;
        })
    }
});

export default eventTypesSlice.reducer;
