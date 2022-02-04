import React, { FormEvent, useState } from "react";
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

  const createTodo = async (e : FormEvent) => {
    e.preventDefault();

    const todoCreated : AddTodo = {
      title: title,
      deadline: deadline === '' ? null : deadline,
      description: description,
      boardId: boardId
    }

    const result = await todoService.addTodo(todoCreated);

    onTodoCreated(result);

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
        Deadline : <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </label>
      <input type="submit" value="Create todo" />
    </form>
  );
}

export default AddTodoForm;