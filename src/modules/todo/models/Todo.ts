export default interface Todo {
    id: string;
    title: string;
    deadline?: string;
    description: string;
    section: number;
    boardId: string;
}