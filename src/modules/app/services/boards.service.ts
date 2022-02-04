import Board from '../../board/models/Board';
import httpService from '../../shared/services/http.service';

const endpoint = '/boards';

const getAll = (): Promise<Board[]> => httpService.get<Board[]>(`${endpoint}`);

export default {
  getAll,
};