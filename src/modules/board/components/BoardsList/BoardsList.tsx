import React, { useEffect, useState } from 'react';
import useAction from '../../../shared/hooks/useAction.hook';
import AddTodoForm from '../../../todo/components/AddTodoForm';
import Todo from '../../../todo/models/Todo';
import { getAllBoardAsync } from '../../board.slice';
import Board from '../../models/Board';
import boardService from '../../services/board.service';
import AddBoardForm from '../AddBoardForm';
import BoardDetails from '../BoardDetails';
import UpdateBoardForm from '../UpdateBoardForm';
import boardsSelectors from '../../selectors/boards.selector';

import styles from './boardsList.module.scss';
import { useSelector } from 'react-redux';

const BoardsList = () => {
  //const [boards, setBoards] = useState<Board[]>([]);

  const getAllBoards = useAction(getAllBoardAsync);

  const boards = useSelector(boardsSelectors.selectBoards);

  useEffect(() => {
    getAllBoards()
  }, []);

  return (
    <>
      {!!boards.length && (boards.map((board) => (
        <BoardDetails key={board.id} board={board} onUpdateBoard={() => {}}/>
      )))}

      <AddBoardForm onBoardCreated={() => {}}/>

      {!!boards.length && (
        <>
          <UpdateBoardForm boards={boards} onUpdateBoard={() => {}} />
          <AddTodoForm boards={boards} onTodoCreated={() => {}} />
        </>
      )}
    </>
  );
};

export default BoardsList;
