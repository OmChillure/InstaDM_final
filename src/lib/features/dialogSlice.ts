import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {DialogSliceType} from "../types"
import { ReactNode } from "react";

const initialState: DialogSliceType = {
  open: false,
  child: null,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setOpenDialog: (state, action: PayloadAction<{ open: boolean, child: ReactNode }>) => {
      state.open = action.payload.open;
      state.child = action.payload.child;
    },
    setCloseDialog: (state) => {
      state.open = false;
      state.child = null;
    }
  },
});

export const { setOpenDialog, setCloseDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
