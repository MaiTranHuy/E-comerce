import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategories()
    if(!response.status === "OK") 
        return rejectWithValue(response)
    return response.data.data
  }
);

export const getBrands = createAsyncThunk(
  "app/brands",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetBrands()
    if(!response.status === "OK") 
        return rejectWithValue(response)
    return response.data.data
  }
);
