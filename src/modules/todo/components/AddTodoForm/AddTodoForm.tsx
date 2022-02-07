import React, { FormEvent, useState, useEffect } from "react";
import Board from "../../../board/models/Board";
import AddTodo from "../../models/AddTodo";
import todoService from "../../services/todo.service";


interface Props {
  boards: Board[];
  onTodoCreated: Function;
}

const AddTodoForm = ({boards, onTodoCreated} : Props) => {
  const [boardId, setBoardId] = useState(boards[0].id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setConfirmMessage(''), 2000);

    return () => clearTimeout(timer);
  }, [confirmMessage]);

  const createTodo = async (e : FormEvent) => {
    e.preventDefault();

    setError(false);

    if(title === '' || description === '') {
      setError(true);
      setConfirmMessage('One or more field have not been filled !');
      return;
    }

    const todoCreated : AddTodo = {
      title: title,
      deadline: deadline === '' ? null : deadline,
      description: description,
      boardId: boardId
    }

    try {
      const result = await todoService.addTodo(todoCreated);
      onTodoCreated(result);
      setConfirmMessage('The todo has been added to the list')
    } catch(e) {
      setError(true);
      setConfirmMessage('An error has occured ! Check if the board selected isn t locked.');
      return; 
    }

    setBoardId(boards[0].id);
    setTitle('');
    setDescription('');
    setDeadline('');
  }

  return (
    <form onSubmit={createTodo}>
      <h1>Creation of a new todo</h1>

      <label>
        Board : <select value={boardId} onChange={(e) => setBoardId(e.target.value)}>
          {boards.map((board) => {
            return <option key={board.id} value={board.id}>{board.title}</option>
          })}
        </select>
      </label>
      <label>
        Title : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </label>
      <label>
        Description : <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Deadline (test) : <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </label>
      <input type="submit" value="Create todo" />
      <div className={error ? 'error' : 'confirm'}>{confirmMessage}</div>
    </form>
  );
}

export default AddTodoForm;