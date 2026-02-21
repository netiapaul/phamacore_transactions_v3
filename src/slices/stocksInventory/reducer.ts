import { createSlice } from "@reduxjs/toolkit";
import { getInventoryListing } from "./thunk";

export const initialState: any = {
  error: "",
  isLoading: false,
  inventoryItems: [],
};

const StocksInventorySlice = createSlice({
  name: "StocksInventory",
  initialState,
  reducers: {
    addAnalysisFilter(state, action) {
      console.log(action.payload);
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      // state.branches = "";
    },
  },
  extraReducers: (builder) => {
    // Cashier ANALYSIS
    builder.addCase(getInventoryListing.pending, (state, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(getInventoryListing.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.inventoryItems = action.payload ?? [];
    });
    builder.addCase(getInventoryListing.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

export const { addAnalysisFilter } = StocksInventorySlice.actions;

export default StocksInventorySlice.reducer;
