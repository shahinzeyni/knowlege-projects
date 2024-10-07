import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";

export const getUsersFromServer = createAsyncThunk("users/getUsersFormServer",
    async(url) => {
        console.log("url",url);
        return fetch(url)
          .then((res) => res.json())
          .then((data) => data);
    }
)



const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},

  extraReducers:(builder) => {
    builder.addCase(getUsersFromServer.fulfilled,(state,action) => {
      console.log(state);
      console.log(action);
    })
  }
});

export default slice.reducer;