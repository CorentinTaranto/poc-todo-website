import React from 'react';

import Todo from '../../models/Todo';

import TodoDetails from '../TodoDetails';

interface Props {
    todos: Todo[];
    onRemoveTodo: Function;
    onUpdateTodo: Function;
}

const ListTodos = ({ todos, onRemoveTodo, onUpdateTodo }: Props) => {
    const removeTodo = (id: string) => {
        onRemoveTodo(id);
    }

    const updateTodo = (todo: Todo) => {
        onUpdateTodo(todo);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>TO DO</th>
                    <th>DOING</th>
                    <th>DONE</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => {
                    return (
                        <tr key={todo.id}>
                            <td>{todo.section === 0 ? <TodoDetails todo={todo} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} /> : ""}</td>
                            <td>{todo.section === 1 ? <TodoDetails todo={todo} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} /> : ""}</td>
                            <td>{todo.section === 2 ? <TodoDetails todo={todo} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} /> : ""}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ListTodos;