import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { updateTypePredicateNodeWithModifier } from "typescript";
import Todo from "../todo/models/Todo";
import UpdateTodo from "../todo/models/UpdateTodo";
import todoService from "../todo/services/todo.service";
import BoardState from "./models/BoardState.model";
import UpdateBoard from "./models/UpdateBoard";
import boardService from "./services/board.service";

const initialState: BoardState = {
  id: '',
  title: '',
  isLocked: false,
  todos: []
};

export interface UpdateBoardData {
  id: string,
  board: UpdateBoard
}

export interface UpdateTodoData {
  id: string,
  todo: UpdateTodo
}

export const boardsAdapter = createEntityAdapter<BoardState>({
  selectId: (board) => board.id,
});

export const getAllBoardAsync = createAsyncThunk(
  'board/getAll',
  boardService.getAll
)

export const addBoardAsync = createAsyncThunk(
  'board/addBoard',
  boardService.addBoard
);

export const updateBoardAsync = createAsyncThunk(
  'boards/updateBoard',
  async (updateBoardData: UpdateBoardData) => {
    const {id, board} = updateBoardData;

    const updatedBoard = await boardService.updateBoard(id, board);

    return updatedBoard;
  }
);

export const addTodoAsync = createAsyncThunk(
  'board/addTodo',
  todoService.addTodo
);

export const removeTodoAsync = createAsyncThunk(
  'board/removeTodo',
  async (todo: Todo) => {
    await todoService.removeTodo(todo.id);

    return todo;
  }
);

export const updateTodoAsync = createAsyncThunk(
  'board/updateTodo',
  async (updateTodoData: UpdateTodoData) => {
    const {id, todo} = updateTodoData;

    const updatedTodo = await todoService.updateTodo(id, todo);

    return updatedTodo;
  }
);

export const changeTodoSectionAsync = createAsyncThunk(
  'board/changeTodoSection',
  todoService.changeTodoSection
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState: boardsAdapter.getInitialState(),
  reducers: {
    boardAdded: boardsAdapter.addOne,
    boardsReceived(state, action) {
      boardsAdapter.setAll(state, action.payload.boards)
    }
  }, 
  extraReducers: (builder) => {
    builder
    .addCase(addBoardAsync.fulfilled, (state, action) => {
      boardsAdapter.addOne(state, action.payload);
    })
    .addCase(getAllBoardAsync.fulfilled, (state, action) => {
      boardsAdapter.setAll(state, action.payload);
    })
    .addCase(updateBoardAsync.fulfilled, (state, action) => {
      state.entities[action.payload.id] = action.payload;
    })
    .addCase(addTodoAsync.fulfilled, (state, action) => {
      const id = action.payload.boardId;
      const boardToUpdate = boardsAdapter.getSelectors().selectById(state, action.payload.boardId);

      if (boardToUpdate) {
        boardsAdapter.updateOne(state, {id: boardToUpdate.id, changes: {todos: [...boardToUpdate.todos, action.payload]}});
      }
    })
    .addCase(removeTodoAsync.fulfilled, (state, action) => {
      const boardToUpdate = boardsAdapter.getSelectors().selectById(state, action.payload.boardId);

      if (boardToUpdate) {
        const newTodos = boardToUpdate.todos.filter((todo) => {
          if (todo.id === action.payload.id) {
            return;
          }

          return todo;
        });

        boardsAdapter.updateOne(state, {id: boardToUpdate.id, changes: {todos: newTodos}});
      }
    })
    .addCase(updateTodoAsync.fulfilled, (state, action) => {
      const boardToUpdate = boardsAdapter.getSelectors().selectById(state, action.payload.boardId);

      if (boardToUpdate) {
        const newTodos = boardToUpdate.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }

          return todo;
        });

        boardsAdapter.updateOne(state, {id: boardToUpdate.id, changes: {todos: newTodos}});
      }
    })
    .addCase(changeTodoSectionAsync.fulfilled, (state, action) => {
      const boardToUpdate = boardsAdapter.getSelectors().selectById(state, action.payload.boardId);

      if (boardToUpdate) {
        const newTodos = boardToUpdate.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }

          return todo;
        });

        boardsAdapter.updateOne(state, {id: boardToUpdate.id, changes: {todos: newTodos}});
      }
    });
  }
});

export const { reducer } = boardsSlice;

export const boardsAction = boardsSlice.actions;

export default boardsSlice;