import React from 'react';

import Todo from '../../models/Todo';
import todoService from '../../services/todo.service';
import UpdateTodoModal from '../UpdateTodoModal';

interface Props {
    todo: Todo;
    onRemoveTodo: Function;
    onUpdateTodo: Function;
}

const TodoDetails = ({todo, onRemoveTodo, onUpdateTodo} : Props) => {
    const removeTodo = async () => {
        await todoService.removeTodo(todo.id);

        onRemoveTodo(todo.id);
    }

    const updateTodo = (todo: Todo) => {
        onUpdateTodo(todo);
    }

    const moveTodo = async () => {
        const result = await todoService.changeTodoSection(todo.id);

        onUpdateTodo(result);
    }

    return (
        <div>
            <h3>{todo.title}</h3>
            <div>{todo.description}</div>
            <div>{todo.deadline == null ? "No deadline" : todo.deadline?.substring(0, 10) + " at " + todo.deadline?.substring(11, 16)}</div>
            <button onClick={() => removeTodo()}>Remove</button> <br/>
            {
                todo.section !== 2 && <button onClick={() => moveTodo()}>Next section</button>
            }

            <UpdateTodoModal todo={todo} onUpdateTodo={updateTodo} />
        </div>
    );
};

export default TodoDetails;