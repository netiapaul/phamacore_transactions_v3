import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import { inventoryListingApi } from "../../services/stocks_inventory";

export const getInventoryListing = createAsyncThunk(
  "StocksInventory/getInventoryListing",
  async (_, thunkAPI) => {
    try {
      let response = await inventoryListingApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error || "Error with Inventory Listing API",
      );
    }
  },
);
