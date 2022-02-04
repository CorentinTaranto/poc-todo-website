import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import Todo from '../../models/Todo';
import UpdateTodo from '../../models/UpdateTodo';
import todoService from '../../services/todo.service';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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
  const [deadline, setDeadline] = useState(todo.deadline ? todo.deadline : '');

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

    const todoToUpdate: UpdateTodo = {
      title: title,
      description: description,
      deadline: deadline
    };

    const result = await todoService.updateTodo(todo.id, todoToUpdate);

    onUpdateTodo(result);

    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Update todo</button>
      <Modal
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        style={customStyles}
        contentLabel='Cotent label'
      >

        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update of a todo</h2>
        
        <form onSubmit={updateTodo} className='modal-form'>
          <label>
            Title : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Description : <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Deadline : <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
          </label>

          <input type="submit" value="Update todo" />
        </form>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default UpdateTodoModal;