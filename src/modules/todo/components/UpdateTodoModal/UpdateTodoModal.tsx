import React, { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { updateTodoAsync } from '../../../board/board.slice';
import useAction from '../../../shared/hooks/useAction.hook';
import Todo from '../../models/Todo';
import UpdateTodo from '../../models/UpdateTodo';
import todoService from '../../services/todo.service';

import styles from './UpdateTodoModal.module.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
  },
};

interface Props {
  todo: Todo;
  onUpdateTodo: Function;
}

Modal.setAppElement('#modal');

const UpdateTodoModal = ({todo, onUpdateTodo}: Props) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [deadline, setDeadline] = useState(todo.deadline ? todo.deadline.substring(0,10) + 'T' + todo.deadline.substring(11, 16) : '');
  const [errorMessage, setErrorMessage] = useState('');

  const updateTodoAction = useAction(updateTodoAsync);

  useEffect(() => {
    const timer = setTimeout(() => setErrorMessage(''), 2000);

    return () => clearTimeout(timer);
  }, [errorMessage])

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const updateTodo = async (e: FormEvent) => {
    e.preventDefault();

    if(title === '' || description === '') {
      setErrorMessage('One or more field have not been filled !');
      return;
    }

    const todoToUpdate: UpdateTodo = {
      title: title,
      description: description,
      deadline: deadline === '' ? null : deadline
    };

    updateTodoAction({
      id: todo.id,
      todo: todoToUpdate
    });

    setIsOpen(false);
  }

  return (
    <>
      <button onClick={openModal}>Update todo</button>
      <Modal
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        style={customStyles}
        contentLabel='Cotent label'
      >

        <button onClick={closeModal} className={styles.closeButton}>X</button>
        <h2 className={styles.title} ref={(_subtitle) => (subtitle = _subtitle)}>Update of a todo</h2>
        
        <form onSubmit={updateTodo} className={styles.form}>
          <label>
            Title : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Description : <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Deadline : <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </label>
          
          <input type="submit" value="Update todo" className={styles.submitButton} />
          <div className='error'>{errorMessage}</div>
        </form>
      </Modal>
    </>
  );
}

export default UpdateTodoModal;