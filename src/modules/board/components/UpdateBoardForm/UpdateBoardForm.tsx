import React, { FormEvent, useEffect, useState } from 'react';
import useAction from '../../../shared/hooks/useAction.hook';
import { updateBoardAsync, UpdateBoardData } from '../../board.slice';
import Board from '../../models/Board';
import UpdateBoard from '../../models/UpdateBoard';
import boardService from '../../services/board.service';


interface Props {
  boards: Board[];
  onUpdateBoard: Function;
}

const UpdateBoardForm = ({boards, onUpdateBoard}: Props) => {
  const [boardId, setBoardId] = useState(boards[0].id);
  const [boardToUpdateTitle, setBoardToUpdateTitle] = useState(boards[0].title);
  const [isBoardToUpdateLocked, setIsBoardToUpdateLocked] = useState(boards[0].isLocked);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [error, setError] = useState(false);

  const updateBoardAction = useAction(updateBoardAsync);

  useEffect(() => {
    const timer = setTimeout(() => setConfirmMessage(''), 2000);

    return () => clearTimeout(timer);
  }, [confirmMessage]);

  const changeOption = (id: string) => {
    const currentBoard: Board = boards.filter(board => board.id === id)[0];
    setBoardId(id);
    setBoardToUpdateTitle(currentBoard.title);
    setIsBoardToUpdateLocked(currentBoard.isLocked);
  }

  const updateBoard = async (e: FormEvent) => {
    e.preventDefault();

    setError(false);

    if(boardToUpdateTitle === '') {
      setError(true);
      setConfirmMessage('The title field has not been filled !');
      return;
    }

    setConfirmMessage('The board has been updated !');

    const board: UpdateBoard = {
      title: boardToUpdateTitle,
      isLocked: isBoardToUpdateLocked
    }

    updateBoardAction({
      id: boardId,
      board
    });

    setBoardId(boards[0].id);
    setBoardToUpdateTitle(boards[0].title);
    setIsBoardToUpdateLocked(boards[0].isLocked);
  }

  return (
    <form onSubmit={updateBoard}>
      <h1>Update of a board</h1>

      <label>
        Board : <select value={boardId} onChange={(e) => changeOption(e.target.value)}>
          {boards.map((board) => {
            return (
              <option key={board.id} value={board.id}>{board.title}</option>
            );
          })}
        </select>  
      </label>

      <label>
        Title : <input type="text" value={boardToUpdateTitle} onChange={(e) => setBoardToUpdateTitle(e.target.value)} />
      </label>
      <label>
        Lock : <input type="checkbox" checked={isBoardToUpdateLocked} onChange={(e) => setIsBoardToUpdateLocked(e.target.checked)}/>
      </label>

      <input type="submit" value="Update board" />
      <div className={error ? 'error' : 'confirm'}>{confirmMessage}</div>
    </form>
  );
}

export default UpdateBoardForm;