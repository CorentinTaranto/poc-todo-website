import httpService from "../../shared/services/http.service";
import AddTodo from "../models/AddTodo";
import Todo from "../models/Todo";
import UpdateTodo from "../models/UpdateTodo";

const endpoint = '/todos';

const addTodo = (todo: AddTodo): Promise<Todo> => httpService.post<Todo>(`${endpoint}`, todo);

const removeTodo = (id: string): Promise<void> => httpService.remove(`${endpoint}/${id}`);

const changeTodoSection = (id: string): Promise<Todo> => httpService.put(`${endpoint}/section/${id}`, undefined);

const updateTodo = (id: string, todo: UpdateTodo): Promise<Todo> => httpService.put(`${endpoint}/${id}`, todo);

export default {
  addTodo,
  removeTodo,
  changeTodoSection,
  updateTodo
};