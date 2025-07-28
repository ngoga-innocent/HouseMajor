import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  house_category:null
};

const StateSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    
    setCategory: (state, action) => {
      state.house_category = action.payload;
    },
    
    resetFilters: () => initialState,
  },
});

export const { setCategory, resetFilters } = StateSlice.actions;
export default StateSlice.reducer;
