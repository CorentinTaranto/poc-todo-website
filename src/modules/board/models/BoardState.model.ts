import Todo from "../../todo/models/Todo";

export default interface BoardState {
  id: string;
  title: string;
  isLocked: boolean;
  todos: Todo[];
}