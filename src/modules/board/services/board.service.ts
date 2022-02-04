import Board from '../models/Board';
import AddBoard from '../models/AddBoard';
import httpService from '../../shared/services/http.service';
import UpdateBoard from '../models/UpdateBoard';

const endpoint = '/boards';

const addBoard = (board: AddBoard): Promise<Board> => httpService.post<Board>(`${endpoint}`, board);

const updateBoard = (id: string, board: UpdateBoard) => httpService.put<Board>(`${endpoint}/${id}`, board);

export default {
  addBoard,
  updateBoard,
};