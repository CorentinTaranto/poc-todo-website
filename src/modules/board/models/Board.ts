import Todo from '../../todo/models/Todo';

export default interface Board {
    id: string;
    title: string;
    isLocked: boolean;
    todos: Todo[];
}