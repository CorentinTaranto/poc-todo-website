import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardSlice from "../board/board.slice";
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    boards: boardSlice.reducer
  }});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default { store };