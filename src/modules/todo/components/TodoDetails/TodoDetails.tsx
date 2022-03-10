import React from 'react';
import { changeTodoSectionAsync, removeTodoAsync } from '../../../board/board.slice';
import useAction from '../../../shared/hooks/useAction.hook';

import Todo from '../../models/Todo';
import todoService from '../../services/todo.service';
import UpdateTodoModal from '../UpdateTodoModal';

import styles from './TodoDetails.module.scss';

interface Props {
    todo: Todo;
    onRemoveTodo: Function;
    onUpdateTodo: Function;
}

const TodoDetails = ({todo, onRemoveTodo, onUpdateTodo} : Props) => {
    const removeTodoAction = useAction(removeTodoAsync);
    const changeTodoSectionAction = useAction(changeTodoSectionAsync);

    const removeTodo = async () => {
        removeTodoAction(todo);
    }

    const updateTodo = (todo: Todo) => {
        onUpdateTodo(todo);
    }

    const moveTodo = async () => {
        changeTodoSectionAction(todo.id);
    }

    return (
        <>
            <h3>{todo.title}</h3>
            <div>{todo.description}</div>
            <div className={styles.deadline}>Deadline : {todo.deadline == null ? "No deadline" : todo.deadline?.substring(0, 10) + " at " + todo.deadline?.substring(11, 16)}</div>
            <button onClick={() => removeTodo()}>Remove</button>&emsp;
            {
                todo.section !== 2 && <>
                    <button onClick={() => moveTodo()}>Next section</button> <br />
                </>
            }

            <UpdateTodoModal todo={todo} onUpdateTodo={updateTodo} />
        </>
    );
};

export default TodoDetails;