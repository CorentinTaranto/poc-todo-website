import React, { FormEvent, useEffect, useState} from 'react';
import useAction from '../../../shared/hooks/useAction.hook';
import boardsSlice, { addBoardAsync, boardsAction, getAllBoardAsync } from '../../board.slice';

import AddBoard from '../../models/AddBoard';
import boardService from '../../services/board.service';

interface Props {
  onBoardCreated: Function;
}

const AddBoardForm = ({onBoardCreated}: Props) => {
  const [title, setTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [error, setError] = useState(false);

  const addBoard = useAction(addBoardAsync);

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
    
    addBoard(newBoard);

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