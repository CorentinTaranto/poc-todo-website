import { RootState } from "../../app/redux/reducers";
import {boardsAdapter} from '../board.slice';

const {
  selectAll: selectBoards,
  selectById: selectBoard,
} = boardsAdapter.getSelectors<RootState>(
  (state) => state.boards,
);

export default {
  selectBoards,
  selectBoard,
};