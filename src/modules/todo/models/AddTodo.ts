export default interface AddTodo {
    title: string;
    deadline?: string | null;
    description: string;
    boardId: string;
}