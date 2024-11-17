import api from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async function(_, { rejectWithValue }) {
        try {
            const res = await api.get('events/');

            if (res.statusText !== 'OK') {
                throw new Error('Can not fetch events!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
            state.data = payload;
        })
    }
});

export default eventsSlice.reducer;
