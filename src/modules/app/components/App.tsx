import React, { useState, useEffect } from 'react';

import Board from '../../board/models/Board';
import Todo from '../../todo/models/Todo';

import BoardDetails from '../../board/components/BoardDetails';
import AddBoardForm from '../../board/components/AddBoardForm';
import UpdateBoardForm from '../../board/components/UpdateBoardForm';
import AddTodoForm from '../../todo/components/AddTodoForm';
import boardsService from '../services/boards.service';

const App = () => {
    const [boards, setBoards] = useState<Board[]>([]);

    const addBoard = (board: Board) => {
        setBoards([...boards, board]);
    }

    const addTodo = (todo: Todo) => {
        const newBoards = boards.map((board) => {
            if(board.id === todo.boardId) {
                board.todos.push(todo);
                return board;
            }
            return board;
        });

        setBoards(newBoards);
    }

    const updateBoard = (board: Board) => {
        const newBoards = boards.map((b) => {
            if(b.id === board.id) {
                return board;
            }
            return b;
        });

        setBoards(newBoards);
    };

    useEffect(() => {
        const getBoards = async () => {
            const result = await boardsService.getAll();
            setBoards(result);
        }

        getBoards();
    }, []);

    return (
        <>
            {boards.map((board) => (
                <BoardDetails key={board.id} board={board} onUpdateBoard={updateBoard}/>
            ))}

            <AddBoardForm onBoardCreated={addBoard}/>

            {!!boards.length && (
                <>
                    <UpdateBoardForm boards={boards} onUpdateBoard={updateBoard} />
                    <AddTodoForm boards={boards} onTodoCreated={addTodo} />
                </>
            )}
        </>
    );
};

export default App;