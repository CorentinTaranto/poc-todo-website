import { useCallback } from 'react';
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  AnyAction,
  AsyncThunk,
  AsyncThunkAction,
  PayloadAction,
} from '@reduxjs/toolkit';


import { useAppDispatch } from '../store';

export type ActionCreatorAsyncBase = AsyncThunk<any, void, {}>;
export type ActionCreatorAsync<T> = AsyncThunk<any, T, {}>;
export type ActionCreatorBase = ActionCreatorWithoutPayload<string>;
export type ActionCreator<T> = ActionCreatorWithPayload<T, string>;

function useAction(actionCreator: ActionCreatorBase): () => AnyAction;
function useAction<T>(actionCreator: ActionCreator<T>): (args: T) => AnyAction;
function useAction(actionCreator: ActionCreatorAsyncBase): () => Promise<AnyAction>;
function useAction<T>(
  actionCreator: ActionCreatorAsync<T>,
): (args: T) => Promise<PayloadAction<T, string>>;
function useAction(
  actionCreator: (args?: any) => (
    AsyncThunkAction<any, any, {}>
    | PayloadAction<any, string>
  ),
) {
  const dispatch = useAppDispatch();

  const action: any = useCallback(
    // @ts-ignore
    (args) => dispatch(actionCreator(args)),
    [actionCreator, dispatch],
  );

  return action;
}

export default useAction;
