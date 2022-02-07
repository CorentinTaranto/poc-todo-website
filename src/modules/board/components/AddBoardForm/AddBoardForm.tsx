import React, { FormEvent, useEffect, useState} from 'react';

import AddBoard from '../../models/AddBoard';
import boardService from '../../services/board.service';

interface Props {
  onBoardCreated: Function;
}

const AddBoardForm = ({onBoardCreated}: Props) => {
  const [title, setTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfirmMessage(''), 2000);

    return () => clearTimeout(timer);
  }, [confirmMessage]);

  const createBoard = async (e: FormEvent) => {
    e.preventDefault();

    setError(false);

    if(title === '') {
      setError(true);
      setConfirmMessage('The title field has not been filled !');
      return;
    }

    setConfirmMessage('The board has been added !');

    const newBoard: AddBoard = {
      title: title
    };
    
    const result = await boardService.addBoard(newBoard);

    onBoardCreated(result);

    setTitle('');
  }

  return (
    <form onSubmit={createBoard}>
      <h1>Creation of a new board</h1>

      <label>
        Title : <input type='text' value={title} onChange={(e) => {
          setTitle(e.target.value);
        }}/>
      </label>

      <input type='submit' value='Create board' />

      <div className={error ? 'error' : 'confirm'}>{confirmMessage}</div>
    </form>
  );
};

export default AddBoardForm;