import React, { FormEvent, useState} from 'react';

import AddBoard from '../../models/AddBoard';
import boardService from '../../services/board.service';

interface Props {
  onBoardCreated: Function;
}

const AddBoardForm = ({onBoardCreated}: Props) => {
  const [title, setTitle] = useState('');
  
  const createBoard = async (e: FormEvent) => {
    e.preventDefault();

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
    </form>
  );
};

export default AddBoardForm;