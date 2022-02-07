import React from 'react';
import Board from '../../../board/models/Board';

import ListTodos from '../../../todo/components/ListTodos';
import Todo from '../../../todo/models/Todo';

interface Props {
    board: Board;
    onUpdateBoard: Function;
}

const BoardDetails = ({board, onUpdateBoard}: Props) => {
    const updateTodo = (todo: Todo) => {
        const todoToUpdate = board.todos.filter((t) => t.id === todo.id)[0];
        onUpdateBoard(board.todos.splice(board.todos.indexOf(todoToUpdate), 1, todo));
    }

    const removeTodo = (id: string) => {
        const todoToRemove = board.todos.filter((todo) => todo.id === id)[0];

        board.todos.splice(board.todos.indexOf(todoToRemove), 1);

        onUpdateBoard(board);
    }

    const renderNoTodoMessage = () => {
        return (
            <h2 className='no-todo-message'>No todos for this board</h2>
        );
    }

    return (
        <>
            <div className='board-title'>
                {board.title} {board.isLocked && ("( Locked )")}
            </div>
            {!!board.todos.length && (
                <ListTodos todos={board.todos} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} /> 
            )}
            {!board.todos.length && renderNoTodoMessage()}
        </>
    );
};



export default BoardDetails;