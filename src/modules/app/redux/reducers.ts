import { Action, combineReducers, EntityState, Reducer, ThunkAction } from "@reduxjs/toolkit";
import boardSlice from "../../board/board.slice";
import Board from "../../board/models/Board";
import BoardState from "../../board/models/BoardState.model";

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export interface RootState {
  boards: EntityState<BoardState>;
}