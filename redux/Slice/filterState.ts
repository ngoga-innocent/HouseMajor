// redux/Slice/filteredHousesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { house } from "./houseSlice"; // Assuming House type is defined

interface FilteredHousesState {
  houses: house[];
}

const initialState: FilteredHousesState = {
  houses: [],
};

const filteredHousesSlice = createSlice({
  name: "filteredHouses",
  initialState,
  reducers: {
    setFilteredHouses: (state, action: PayloadAction<house[]>) => {
      state.houses = action.payload;
    },
    clearFilteredHouses: (state) => {
      state.houses = [];
    },
  },
});

export const { setFilteredHouses, clearFilteredHouses } = filteredHousesSlice.actions;
export default filteredHousesSlice.reducer;
